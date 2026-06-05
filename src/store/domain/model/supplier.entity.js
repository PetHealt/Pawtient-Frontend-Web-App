export class Supplier {
    constructor({ id = "", name = "", companyName = "", contact = "", category = "" } = {}) {
        this.id = id;
        this.companyName = companyName || name;
        this.name = name || companyName;
        this.contact = contact;
        this.category = category;
    }
}
