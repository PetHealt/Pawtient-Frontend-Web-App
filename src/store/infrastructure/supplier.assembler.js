import { Supplier } from "../domain/model/supplier.entity.js";

export class SupplierAssembler {
    static toEntity(resource) {
        return new Supplier({
            ...resource,
            name: resource.name ?? resource.companyName ?? ''
        });
    }

    static toEntitiesFromResponse(resources) {
        return resources.map(resource => this.toEntity(resource));
    }
}
