import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";
import { BaseApi } from "../../shared/infrastructure/base-api.js";

const inventoryPath = import.meta.env.VITE_INVENTORY_ENDPOINT_PATH || '/products';
const invoicesPath = import.meta.env.VITE_INVOICES_ENDPOINT_PATH || '/invoices';
const appointmentsPath = import.meta.env.VITE_APPOINTMENTS_ENDPOINT_PATH || '/appointments';

export class ReportsApi extends BaseEndpoint {
    constructor() {
        super(new BaseApi(), "");
    }

    fetchAppointments() { return this.http.get(appointmentsPath); }
    fetchInventory() { return this.http.get(inventoryPath); }

    fetchInvoices() { return this.http.get(invoicesPath); }
    createInvoice(data) { return this.http.post(invoicesPath, data); }
    updateInvoice(id, data) { return this.http.put(`${invoicesPath}/${id}`, data); }
    deleteInvoice(id) { return this.http.delete(`${invoicesPath}/${id}`); }
}
