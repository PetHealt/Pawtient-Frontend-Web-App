import { reactive } from "vue";
import { StoreApi } from "../infrastructure/store-api.js";
import { ProductAssembler } from "../infrastructure/product.assembler.js";
import { SupplierAssembler } from "../infrastructure/supplier.assembler.js";

const storeApi = new StoreApi();

export const storeStore = reactive({
    products: [],
    suppliers: [],
    loading: false,

    async loadInventory() {
        this.loading = true;
        try {
            const response = await storeApi.getProducts();
            this.products = ProductAssembler.toEntitiesFromResponse(response.data);
        } finally {
            this.loading = false;
        }
    },

    async addProduct(productData) {
        try {
            if (productData.id && productData.id !== 0) {
                await storeApi.updateProduct(productData.id, productData);
            } else {
                await storeApi.createProduct(productData);
            }
            await this.loadInventory();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    },

    async deleteProduct(id) {
        if (!id || id === 0) return;
        try {
            await storeApi.deleteProduct(id);
            this.products = this.products.filter(p => p.id !== id);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    },

    async loadSuppliers() {
        this.loading = true;
        try {
            const response = await storeApi.getSuppliers();
            this.suppliers = SupplierAssembler.toEntitiesFromResponse(response.data);
        } finally {
            this.loading = false;
        }
    },

    async addSupplier(supplierData) {
        try {
            if (supplierData.id && supplierData.id !== 0) {
                await storeApi.updateSupplier(supplierData.id, supplierData);
            } else {
                await storeApi.createSupplier(supplierData);
            }
            await this.loadSuppliers();
        } catch (error) {
            console.error("Error saving supplier:", error);
        }
    },

    async deleteSupplier(id) {
        if (!id || id === 0) return;
        try {
            await storeApi.deleteSupplier(id);
            this.suppliers = this.suppliers.filter(s => s.id !== id);
        } catch (error) {
            console.error("Error deleting supplier:", error);
        }
    }
});
