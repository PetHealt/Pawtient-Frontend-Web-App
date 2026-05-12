/**
 * @typedef {Object} UserProps
 * @property {string} [id]
 * @property {string} [clinicId]
 * @property {string} [clinicName]
 * @property {string} [role]
 * @property {string} [name]
 * @property {string} [email]
 * @property {string} [password]
 * @property {string} [plan]
 */

/**
 * Domain entity representing a system user (Admin, Veterinarian, or Freelancer).
 */
export class User {
    /**
     * @param {UserProps} [props]
     */
    constructor({ id = '', clinicId = '', clinicName = '', role = '', name = '', email = '', password = '', plan = '' } = {}) {
        this.id = id;
        this.clinicId = clinicId;
        this.clinicName = clinicName; // ¡Aquí guardamos el nombre del negocio!
        this.role = role;
        this.name = name;
        this.email = email;
        this.password = password;
        this.plan = plan; // Y aquí dejamos listo el plan para cuando lo elija
    }

    /**
     * Devuelve el nombre del rol formateado para la interfaz
     * @returns {string}
     */
    getFormattedRole() {
        if (this.role === 'admin') return 'Administrador de Clínica';
        if (this.role === 'freelancer') return 'Veterinario Independiente';
        return 'Personal Clínico';
    }
}