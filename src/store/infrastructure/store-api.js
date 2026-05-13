import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";
import { BaseApi } from "../../shared/infrastructure/base-api.js";

const productsPath = import.meta.env.VITE_INVENTORY_ENDPOINT_PATH || '/products';
const suppliersPath = import.meta.env.VITE_SUPPLIERS_ENDPOINT_PATH || '/suppliers';

export class StoreApi extends BaseEndpoint {
    constructor() {
        super(new BaseApi(), "");
    }

    // --- PRODUCTOS (Inventario) ---
    getProducts() { return this.http.get(productsPath); }
    createProduct(data) { return this.http.post(productsPath, data); }
    updateProduct(id, data) { return this.http.put(`${productsPath}/${id}`, data); }
    deleteProduct(id) { return this.http.delete(`${productsPath}/${id}`); }

    // --- PROVEEDORES ---
    getSuppliers() { return this.http.get(suppliersPath); }
    createSupplier(data) { return this.http.post(suppliersPath, data); }
    updateSupplier(id, data) { return this.http.put(`${suppliersPath}/${id}`, data); }
    deleteSupplier(id) { return this.http.delete(`${suppliersPath}/${id}`); }
}
