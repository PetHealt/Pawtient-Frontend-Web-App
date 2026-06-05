import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";
import { BaseApi } from "../../shared/infrastructure/base-api.js";

const productsPath = import.meta.env.VITE_INVENTORY_ENDPOINT_PATH || '/products';
const suppliersPath = import.meta.env.VITE_SUPPLIERS_ENDPOINT_PATH || '/suppliers';

export class StoreApi extends BaseEndpoint {
    constructor() {
        super(new BaseApi(), "");
    }

    getProducts() {
        return this.http.get(productsPath);
    }

    createProduct(data) {
        return this.http.post(productsPath, this.toBackendProduct(data));
    }

    updateProduct(id, data) {
        return this.http.put(`${productsPath}/${id}`, this.toBackendProduct(data));
    }

    deleteProduct(id) {
        return this.http.delete(`${productsPath}/${id}`);
    }

    getSuppliers() {
        return this.http.get(suppliersPath);
    }

    createSupplier(data) {
        return this.http.post(suppliersPath, this.toBackendSupplier(data));
    }

    updateSupplier(id, data) {
        return this.http.put(`${suppliersPath}/${id}`, this.toBackendSupplier(data));
    }

    deleteSupplier(id) {
        return this.http.delete(`${suppliersPath}/${id}`);
    }

    toBackendProduct(data) {
        return {
            name: data.name,
            stock: Number(data.stock) || 0,
            price: Number(data.price) || 0
        };
    }

    toBackendSupplier(data) {
        return {
            companyName: data.companyName ?? data.name,
            contact: data.contact ?? '',
            category: data.category ?? ''
        };
    }
}
