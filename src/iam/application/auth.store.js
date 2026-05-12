import { reactive } from "vue";
import { User } from "../domain/model/user.entity.js";
import { AuthApi } from "../infrastructure/auth-api.js";
import { UserAssembler } from "../infrastructure/user.assembler.js";

const authApi = new AuthApi();

/**
 * Application-layer state container that orchestrates authentication.
 */
export const authStore = reactive({
    /** @type {User | null} */
    currentUser: null,
    /** @type {Array<unknown>} */
    errors: [],

    /**
     * Initializes store from local storage
     */
    init() {
        const stored = localStorage.getItem('currentUser');
        if (stored) this.currentUser = new User(JSON.parse(stored));
    },

    /**
     * Logs in a user by email and password
     * @param {string} email
     * @param {string} password
     * @returns {Promise<boolean>}
     */
    async login(email, password) {
        this.errors = [];
        try {
            const response = await authApi.getUserByEmail(email);
            const users = UserAssembler.toEntitiesFromResponse(response);

            if (users.length > 0 && users[0].password === password) {
                this.currentUser = users[0];
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                return true;
            } else {
                this.errors.push("Credenciales incorrectas");
                return false;
            }
        } catch (error) {
            this.errors.push("Error de conexión al servidor");
            return false;
        }
    },
    /**
     * Registers a new user and logs them in
     * @param {Object} userData
     * @returns {Promise<boolean>}
     */
    async register(userData) {
        this.errors = [];
        try {
            // Verificamos si el correo ya existe
            const check = await authApi.getUserByEmail(userData.email);
            if (check.data.length > 0) {
                this.errors.push("El correo ya está registrado");
                return false;
            }

            // Creamos el usuario en el json-server
            const response = await authApi.registerUser(userData);
            this.currentUser = UserAssembler.toEntityFromResource(response.data);

            // Iniciamos sesión automáticamente
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return true;
        } catch (error) {
            this.errors.push("Error al crear la cuenta");
            return false;
        }
    },
    /**
     * Updates the user's selected plan in the database
     * @param {string} planName
     */
    async updatePlan(planName) {
        if (!this.currentUser) return false;

        // Le agregamos el plan al usuario actual
        this.currentUser.plan = planName;

        try {
            // Hacemos un PUT a /users/id para actualizarlo en el db.json
            await authApi.update(this.currentUser.id, this.currentUser);
            // Actualizamos la sesión local
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return true;
        } catch (error) {
            console.error("Error al guardar el plan:", error);
            return false;
        }
    },
    /**
     * Updates general profile data (name, email, clinicName)
     * @param {Object} updatedData
     */
    async updateProfile(updatedData) {
        if (!this.currentUser) return false;

        // Combinamos los datos actuales con los nuevos
        this.currentUser = { ...this.currentUser, ...updatedData };

        try {
            await authApi.update(this.currentUser.id, this.currentUser);
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return true;
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
            return false;
        }
    },
    /**
     * Logs out the current user
     */
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }
});

authStore.init();