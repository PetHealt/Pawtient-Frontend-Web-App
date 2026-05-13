export class Supplier {
    constructor({ id = "", name = "", contact = "", category = "" } = {}) {
        this.id = id;
        this.name = name;
        this.contact = contact;
        this.category = category;
    }
}