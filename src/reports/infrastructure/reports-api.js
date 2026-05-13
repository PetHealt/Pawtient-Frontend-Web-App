import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";
import { BaseApi } from "../../shared/infrastructure/base-api.js";

export class ReportsApi extends BaseEndpoint {
    constructor() {
        super(new BaseApi(), "");
    }

    // Endpoints principales (usando variables de entorno)
    fetchAppointments() { return this.http.get(import.meta.env.VITE_APPOINTMENTS_ENDPOINT_PATH); }
    fetchInventory() { return this.http.get('/products'); }

    // Endpoints de facturación
    fetchInvoices() { return this.http.get(import.meta.env.VITE_INVOICES_ENDPOINT_PATH); }
    createInvoice(data) { return this.http.post(import.meta.env.VITE_INVOICES_ENDPOINT_PATH, data); }
    updateInvoice(id, data) { return this.http.put(`${import.meta.env.VITE_INVOICES_ENDPOINT_PATH}/${id}`, data); }
    deleteInvoice(id) { return this.http.delete(`${import.meta.env.VITE_INVOICES_ENDPOINT_PATH}/${id}`); }
}