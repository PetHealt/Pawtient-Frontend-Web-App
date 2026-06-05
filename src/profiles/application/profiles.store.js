import { reactive } from "vue";
import { ProfilesApi } from "../infrastructure/profiles-api.js";
import { ProfileAssembler } from "../infrastructure/profile.assembler.js";

const profilesApi = new ProfilesApi();

export const profilesStore = reactive({
    currentProfile: null,

    async loadProfile() {
        try {
            const response = await profilesApi.getProfile();
            this.currentProfile = ProfileAssembler.toEntityFromResource(response.data);
        } catch (error) {
            console.error("Error cargando el perfil:", error);
        }
    }
});
