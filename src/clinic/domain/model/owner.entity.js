export class Owner {
    constructor({ id = 0, firstName = '', lastName = '', dni = '', phone = '' } = {}) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dni = dni;
        this.phone = phone;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}