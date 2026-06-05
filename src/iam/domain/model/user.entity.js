/**
 * Domain entity representing a system user.
 */
export class User {
    constructor({
                    id = '',
                    clinicId = '',
                    clinicName = '',
                    role = '',
                    name = '',
                    email = '',
                    password = '',
                    plan = '',
                    token = ''
                } = {}) {
        this.id = id;
        this.clinicId = clinicId;
        this.clinicName = clinicName;
        this.role = role;
        this.name = name;
        this.email = email;
        this.password = password;
        this.plan = plan;
        this.token = token;
    }

    getFormattedRole() {
        if (this.role === 'ADMIN' || this.role === 'admin') return 'Administrador de Clínica';
        if (this.role === 'FREELANCER' || this.role === 'freelancer') return 'Veterinario Independiente';
        return 'Personal Clínico';
    }
}
