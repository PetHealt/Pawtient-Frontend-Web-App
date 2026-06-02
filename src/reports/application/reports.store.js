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
            // Filtramos ambas peticiones por clinicId
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

    async saveInvoice(invoiceData) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const dataWithOwnership = { ...invoiceData, clinicId: user.clinicId };

        if (dataWithOwnership.id) {
            await reportsApi.updateInvoice(dataWithOwnership.id, dataWithOwnership);
        } else {
            await reportsApi.createInvoice(dataWithOwnership);
        }
        await this.loadInvoices();
        await this.generateGeneralReport();
    },

    async deleteInvoice(id) {
        await reportsApi.deleteInvoice(id);
        this.invoices = this.invoices.filter(inv => inv.id !== id);

        // CORRECCIÓN: Volvemos a calcular los números del dashboard para que no queden datos fantasma
        await this.generateGeneralReport();
    },

    async emitInvoice(invoiceData) {
        const user = JSON.parse(localStorage.getItem('currentUser'));

        const dataWithOwnership = { ...invoiceData, clinicId: user.clinicId };

        await reportsApi.createInvoice(dataWithOwnership);

        await this.loadInvoices();
        await this.generateGeneralReport();

        const doc = new jsPDF();
        doc.text("Boleta de Pago - Pawtient", 20, 20);
        doc.text(`Monto: S/ ${dataWithOwnership.amount}`, 20, 40);
        doc.text(`Fecha: ${new Date(dataWithOwnership.date).toLocaleDateString()}`, 20, 60);
        if (dataWithOwnership.petName) doc.text(`Paciente: ${dataWithOwnership.petName}`, 20, 80);
        if (dataWithOwnership.ownerName) doc.text(`Dueño: ${dataWithOwnership.ownerName}`, 20, 100);
        doc.save("Boleta_Pawtient.pdf");
    }
});