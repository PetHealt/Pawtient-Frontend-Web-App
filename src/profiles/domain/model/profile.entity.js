/**
 * Profile Entity
 * Representa la información personal de un usuario en el sistema.
 */
export class Profile {
    constructor({ id = 0, firstName = '', lastName = '', email = '', street = '', number = '', city = '' }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = `${street} ${number}, ${city}`; // Lógica de dominio simple
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}