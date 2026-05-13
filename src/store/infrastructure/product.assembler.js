import { Product } from "../domain/model/product.entity.js";

export class ProductAssembler {
    static toEntity(resource) {
        return new Product(resource);
    }
    // Cambiamos el nombre para que coincida con el Store
    static toEntitiesFromResponse(resources) {
        return resources.map(resource => this.toEntity(resource));
    }
}