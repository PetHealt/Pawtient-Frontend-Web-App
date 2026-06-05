import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";
import { BaseApi } from "../../shared/infrastructure/base-api.js";

const invoicesPath = import.meta.env.VITE_INVOICES_ENDPOINT_PATH || '/invoices';
const appointmentsPath = import.meta.env.VITE_APPOINTMENTS_ENDPOINT_PATH || '/appointments';
const inventoryPath = import.meta.env.VITE_INVENTORY_ENDPOINT_PATH || '/products';

export class ReportsApi extends BaseEndpoint {
    constructor() {
        super(new BaseApi(), "");
    }

    fetchSummary() {
        return this.http.get('/reports/summary');
    }

    fetchAppointments() {
        return this.http.get(appointmentsPath);
    }

    fetchInventory() {
        return this.http.get(inventoryPath);
    }

    fetchInvoices() {
        return this.http.get(invoicesPath);
    }

    createInvoice(data) {
        return this.http.post(invoicesPath, {
            appointmentId: data.appointmentId ?? null,
            patient: data.patient ?? data.petName,
            client: data.client ?? data.ownerName,
            date: data.date,
            amount: Number(data.amount) || 0
        });
    }

    deleteInvoice(id) {
        return this.http.delete(`${invoicesPath}/${id}`);
    }
}
