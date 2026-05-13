export class ReportSummary {
    constructor({
                    totalRevenue = 0,
                    totalExpenses = 0,
                    netProfit = 0,
                    lowStockAlerts = 0,
                    totalAppointments = 0
                } = {}) {
        this.totalRevenue = totalRevenue;     // Reporte de ingresos
        this.totalExpenses = totalExpenses;   // Gastos de inventario
        this.netProfit = netProfit;           // Rentabilidad neta
        this.lowStockAlerts = lowStockAlerts; // Alertas de stock bajo
        this.totalAppointments = totalAppointments; // Número de citas
    }
}