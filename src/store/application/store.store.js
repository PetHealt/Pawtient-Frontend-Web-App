// src/store/application/store.store.js
import { reactive } from "vue";
import { StoreApi } from "../infrastructure/store-api.js";
import { ProductAssembler } from "../infrastructure/product.assembler.js";
import { SupplierAssembler } from "../infrastructure/supplier.assembler.js";

const storeApi = new StoreApi();

export const storeStore = reactive({
    products: [],
    suppliers: [],
    loading: false,

    // --- LÓGICA DE INVENTARIO ---
    async loadInventory() {
        this.loading = true;
        const user = JSON.parse(localStorage.getItem('currentUser'));
        try {
            // Pasamos el clinicId para filtrar
            const response = await storeApi.getProducts(user.clinicId);
            this.products = ProductAssembler.toEntitiesFromResponse(response.data);
        } finally { this.loading = false; }
    },

    async addProduct(productData) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const dataWithOwnership = { ...productData, clinicId: user.clinicId };

        try {
            if (dataWithOwnership.id && dataWithOwnership.id !== 0) {
                await storeApi.updateProduct(dataWithOwnership.id, dataWithOwnership);
            } else {
                const { id, ...newData } = dataWithOwnership;
                await storeApi.createProduct(newData);
            }
            await this.loadInventory();
        } catch (error) { console.error("Error saving product:", error); }
    },

    async deleteProduct(id) {
        if (!id || id === 0) return;
        try {
            await storeApi.deleteProduct(id);
            // Filtro local para respuesta inmediata
            this.products = this.products.filter(p => p.id !== id);
        } catch (error) { console.error("Error deleting product:", error); }
    },

    // --- LÓGICA DE PROVEEDORES ---
    async loadSuppliers() {
        this.loading = true;
        const user = JSON.parse(localStorage.getItem('currentUser'));
        try {
            // Pasamos el clinicId para filtrar
            const response = await storeApi.getSuppliers(user.clinicId);
            this.suppliers = SupplierAssembler.toEntitiesFromResponse(response.data);
        } finally { this.loading = false; }
    },

    async addSupplier(supplierData) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const dataWithOwnership = { ...supplierData, clinicId: user.clinicId };

        try {
            if (dataWithOwnership.id && dataWithOwnership.id !== 0) {
                await storeApi.updateSupplier(dataWithOwnership.id, dataWithOwnership);
            } else {
                const { id, ...newData } = dataWithOwnership;
                await storeApi.createSupplier(newData);
            }
            await this.loadSuppliers();
        } catch (error) { console.error("Error saving supplier:", error); }
    },

    async deleteSupplier(id) {
        if (!id || id === 0) return;
        try {
            await storeApi.deleteSupplier(id);
            this.suppliers = this.suppliers.filter(s => s.id !== id);
        } catch (error) { console.error("Error deleting supplier:", error); }
    }
});