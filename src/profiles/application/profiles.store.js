import { reactive } from "vue";
import { ProfilesApi } from "../infrastructure/profiles-api.js";
import { ProfileAssembler } from "../infrastructure/profile.assembler.js";

const profilesApi = new ProfilesApi();

export const profilesStore = reactive({
    currentProfile: null,

    async loadProfile(email) {
        try {
            const response = await profilesApi.getProfileByEmail(email);
            // Asumiendo que la API devuelve un array y tomamos el primero
            if (response.data.length > 0) {
                this.currentProfile = ProfileAssembler.toEntityFromResource(response.data[0]);
            }
        } catch (error) {
            console.error("Error cargando el perfil:", error);
        }
    }
});