import { Supplier } from "../domain/model/supplier.entity.js";

export class SupplierAssembler {
    static toEntity(resource) {
        return new Supplier(resource);
    }
    // Cambiamos el nombre para que coincida con el Store
    static toEntitiesFromResponse(resources) {
        return resources.map(resource => this.toEntity(resource));
    }
}