export class Profile {
    constructor({
                    id = 0,
                    firstName = '',
                    lastName = '',
                    email = '',
                    street = '',
                    number = '',
                    city = '',
                    clinicName = '',
                    role = '',
                    plan = ''
                } = {}) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = [street, number, city].filter(Boolean).join(' ');
        this.clinicName = clinicName;
        this.role = role;
        this.plan = plan;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`.trim();
    }
}
