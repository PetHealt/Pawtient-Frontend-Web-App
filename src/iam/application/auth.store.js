import { reactive } from "vue";
import { User } from "../domain/model/user.entity.js";
import { AuthApi } from "../infrastructure/auth-api.js";
import { UserAssembler } from "../infrastructure/user.assembler.js";

const authApi = new AuthApi();

function getAuthErrorMessage(error, fallbackMessage) {
    const responseData = error.response?.data;

    if (typeof responseData === 'string') return responseData;
    if (responseData?.message) return responseData.message;
    if (responseData?.title) return responseData.title;
    if (error.message) return error.message;

    return fallbackMessage;
}

export const authStore = reactive({
    currentUser: null,
    errors: [],

    init() {
        const stored = localStorage.getItem('currentUser');
        if (stored) this.currentUser = new User(JSON.parse(stored));
    },

    async login(email, password) {
        this.errors = [];
        try {
            const response = await authApi.signIn({ email, password });
            this.currentUser = UserAssembler.toEntityFromResource(response.data);
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return true;
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            this.errors.push(getAuthErrorMessage(error, "Credenciales incorrectas"));
            return false;
        }
    },

    async register(userData) {
        this.errors = [];
        try {
            const response = await authApi.signUp({
                fullName: userData.name,
                email: userData.email,
                password: userData.password,
                role: userData.role,
                clinicName: userData.clinicName
            });
            this.currentUser = UserAssembler.toEntityFromResource(response.data);
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return true;
        } catch (error) {
            console.error("Error al crear la cuenta:", error);
            this.errors.push(getAuthErrorMessage(error, "Error al crear la cuenta"));
            return false;
        }
    },

    async updatePlan(planName) {
        if (!this.currentUser) return false;

        try {
            await authApi.selectPlan(planName);
            this.currentUser.plan = planName;
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return true;
        } catch (error) {
            console.error("Error al guardar el plan:", error);
            return false;
        }
    },

    async updateProfile(updatedData) {
        if (!this.currentUser) return false;

        try {
            const response = await authApi.updateProfile({
                fullName: updatedData.name ?? this.currentUser.name,
                email: updatedData.email ?? this.currentUser.email,
                clinicName: updatedData.clinicName ?? this.currentUser.clinicName
            });
            const token = this.currentUser.token;
            this.currentUser = UserAssembler.toEntityFromResource({ ...response.data, token });
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return true;
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
            return false;
        }
    },

    async deleteUserAccount() {
        try {
            await authApi.deleteAccount();
            this.logout();
            return true;
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            return false;
        }
    },

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }
});

authStore.init();
