import { reactive } from "vue";
import { ClinicApi } from "../infrastructure/clinic-api.js";
import { PetAssembler } from "../infrastructure/pet.assembler.js";

const clinicApi = new ClinicApi();

export const clinicStore = reactive({
    pets: [],
    loading: false,

    async loadPets() {
        this.loading = true;
        try {
            const response = await clinicApi.getAllPets();
            this.pets = PetAssembler.toEntitiesFromResources(response.data);
        } finally {
            this.loading = false;
        }
    },

    async savePet(petData) {
        if (petData.id) {
            await clinicApi.updatePet(petData.id, petData);
        } else {
            await clinicApi.http.post('/pets', petData); // Usamos POST para nuevos
        }
        await this.loadPets(); // Refrescar lista
    },

    async deletePet(id) {
        try {
            await clinicApi.deletePet(id);
            await this.loadPets();
        } catch (error) {
            console.error("Error al eliminar mascota:", error);
            throw error;
        }
    }
});