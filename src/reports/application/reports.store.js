import { reactive } from "vue";
import { ReportsApi } from "../infrastructure/reports-api.js";
import { ReportSummary } from "../domain/model/report.entity.js";
import { Product } from "../../store/domain/model/product.entity.js";
import jsPDF from "jspdf";

const reportsApi = new ReportsApi();

export const reportsStore = reactive({
    summary: new ReportSummary(),
    invoices: [],
    appointments: [],
    loading: false,

    async generateGeneralReport() {
        this.loading = true;
        const user = JSON.parse(localStorage.getItem('currentUser'));
        try {
            const [appRes, invRes] = await Promise.all([
                reportsApi.http.get(`${import.meta.env.VITE_APPOINTMENTS_ENDPOINT_PATH}?clinicId=${user.clinicId}`),
                reportsApi.http.get(`/products?clinicId=${user.clinicId}`)
            ]);

            this.appointments = appRes.data;
            const revenue = appRes.data.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
            const expenses = invRes.data.reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.stock) || 0), 0);
            const alerts = invRes.data.filter(p => new Product(p).isLowStock()).length;

            this.summary = new ReportSummary({
                totalRevenue: revenue,
                totalExpenses: expenses,
                netProfit: revenue - expenses,
                lowStockAlerts: alerts,
                totalAppointments: appRes.data.length
            });
        } finally { this.loading = false; }
    },

    async loadInvoices() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const res = await reportsApi.fetchInvoices(user.clinicId);
        this.invoices = res.data;
    },

    // AHORA SOLO REGISTRA EL PAGO
    async addInvoice(invoiceData) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const dataWithOwnership = { ...invoiceData, clinicId: user.clinicId };

        await reportsApi.createInvoice(dataWithOwnership);
        await this.loadInvoices();
        await this.generateGeneralReport();
    },

    // AHORA DESCARGA EL PDF DE MANERA INDEPENDIENTE
    async downloadInvoicePdf(invoiceId) {
        const invoice = this.invoices.find(inv => inv.id === invoiceId);
        if (!invoice) return;

        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text("Boleta de Pago - Pawtient", 20, 20);
        doc.setFontSize(14);
        doc.text(`Monto: S/ ${invoice.amount}`, 20, 40);
        doc.text(`Fecha: ${new Date(invoice.date).toLocaleDateString()}`, 20, 60);
        doc.text(`Paciente: ${invoice.petName || 'N/A'}`, 20, 80);
        doc.text(`Dueño: ${invoice.ownerName || 'N/A'}`, 20, 100);
        doc.save(`Boleta_${invoice.petName || 'Paciente'}.pdf`);
    },

    async deleteInvoice(id) {
        await reportsApi.deleteInvoice(id);
        this.invoices = this.invoices.filter(inv => inv.id !== id);
        await this.generateGeneralReport();
    }
});