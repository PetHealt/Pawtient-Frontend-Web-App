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
        try {
            const [appRes, invRes] = await Promise.all([
                reportsApi.fetchAppointments(),
                reportsApi.fetchInventory()
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
        } finally {
            this.loading = false;
        }
    },

    async loadInvoices() {
        const res = await reportsApi.fetchInvoices();
        this.invoices = res.data;
    },

    async saveInvoice(invoiceData) {
        if (invoiceData.id) {
            await reportsApi.updateInvoice(invoiceData.id, invoiceData);
        } else {
            await reportsApi.createInvoice(invoiceData);
        }
        await this.loadInvoices();
        await this.generateGeneralReport();
    },

    async deleteInvoice(id) {
        await reportsApi.deleteInvoice(id);
        this.invoices = this.invoices.filter(inv => inv.id !== id);
    },

    async emitInvoice(invoiceData) {
        await reportsApi.createInvoice(invoiceData);
        await this.loadInvoices();

        const doc = new jsPDF();
        doc.text("Boleta de Pago - Pawtient", 20, 20);
        doc.text(`Monto: S/ ${invoiceData.amount}`, 20, 40);
        doc.text(`Fecha: ${new Date(invoiceData.date).toLocaleDateString()}`, 20, 60);
        if (invoiceData.petName) doc.text(`Paciente: ${invoiceData.petName}`, 20, 80);
        if (invoiceData.ownerName) doc.text(`Dueño: ${invoiceData.ownerName}`, 20, 100);
        doc.save("Boleta_Pawtient.pdf");
    }
});
