import { Product } from "../domain/model/product.entity.js";

export class ProductAssembler {
    static toEntity(resource) {
        return new Product(resource);
    }

    static toEntitiesFromResponse(resources) {
        return resources.map(resource => this.toEntity(resource));
    }
}
