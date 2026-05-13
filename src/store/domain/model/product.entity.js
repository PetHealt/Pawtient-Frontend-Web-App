export class Product {
    constructor({ id = "", name = "", stock = 0, minStock = 5, price = 0 } = {}) {
        this.id = id;
        this.name = name;
        this.stock = stock;
        this.minStock = minStock;
        this.price = price;
    }

    isLowStock() {
        return this.stock <= this.minStock;
    }
}