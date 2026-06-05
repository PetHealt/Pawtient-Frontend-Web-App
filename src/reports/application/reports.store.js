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
            const [summaryRes, appointmentsRes, inventoryRes] = await Promise.all([
                reportsApi.fetchSummary(),
                reportsApi.fetchAppointments(),
                reportsApi.fetchInventory()
            ]);

            const totalIncome = summaryRes.data.totalIncome ?? 0;
            const inventoryProducts = inventoryRes.data.map(product => new Product(product));
            const inventoryExpenses = inventoryProducts.reduce((total, product) => {
                return total + ((Number(product.price) || 0) * (Number(product.stock) || 0));
            }, 0);
            const netProfit = totalIncome - inventoryExpenses;
            const lowStockAlerts = inventoryProducts
                .filter(product => product.stock < 5)
                .length;

            this.appointments = appointmentsRes.data;
            this.summary = new ReportSummary({
                totalRevenue: totalIncome,
                totalExpenses: inventoryExpenses,
                netProfit,
                lowStockAlerts,
                totalAppointments: appointmentsRes.data.length
            });
        } finally {
            this.loading = false;
        }
    },

    async loadInvoices() {
        const res = await reportsApi.fetchInvoices();
        this.invoices = res.data.map(invoice => ({
            ...invoice,
            petName: invoice.petName ?? invoice.patient ?? '',
            ownerName: invoice.ownerName ?? invoice.client ?? ''
        }));
    },

    async addInvoice(invoiceData) {
        await reportsApi.createInvoice(invoiceData);
        await this.loadInvoices();
        await this.generateGeneralReport();
    },

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
        try {
            await reportsApi.deleteInvoice(id);
            this.invoices = this.invoices.filter(inv => inv.id !== id);
            await this.generateGeneralReport();
        } catch (error) {
            console.error("El backend no tiene endpoint para eliminar facturas:", error);
        }
    }
});
