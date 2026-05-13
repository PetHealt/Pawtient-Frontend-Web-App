// src/store/infrastructure/store-api.js
import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";
import { BaseApi } from "../../shared/infrastructure/base-api.js";

export class StoreApi extends BaseEndpoint {
    constructor() {
        // Hereda la configuración de BaseApi (puerto 3001)
        super(new BaseApi(), "");
    }

    // --- PRODUCTOS (Inventario) ---
    getProducts() { return this.http.get('/products'); }
    createProduct(data) { return this.http.post('/products', data); }
    updateProduct(id, data) { return this.http.put(`/products/${id}`, data); }
    deleteProduct(id) { return this.http.delete(`/products/${id}`); }

    // --- PROVEEDORES ---
    getSuppliers() { return this.http.get('/suppliers'); }
    createSupplier(data) { return this.http.post('/suppliers', data); }
    updateSupplier(id, data) { return this.http.put(`/suppliers/${id}`, data); }
    deleteSupplier(id) { return this.http.delete(`/suppliers/${id}`); }
}