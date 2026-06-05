<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  visible: Boolean,
  pet: Object
});

const emit = defineEmits(['close', 'save']);
const localPet = ref({ name: '', type: '', breed: '', age: 0 });

watch(() => props.pet, (newPet) => {
  if (newPet) {
    localPet.value = { ...newPet };
  } else {
    localPet.value = { name: '', type: '', breed: '', age: 0 };
  }
}, { immediate: true });

const onSave = () => {
  if (localPet.value.name.trim()) {
    emit('save', { ...localPet.value });
  }
};
</script>

<template>
  <pv-dialog
      :visible="visible"
      @update:visible="emit('close')"
      modal
      appendTo="body"
      :draggable="false"
      :closable="false"
      :style="{ width: '450px' }"
      class="clinic-dialog"
  >
    <!-- CABECERA PERSONALIZADA -->
    <template #header>
      <div class="flex align-items-center justify-content-between w-full pb-2">
        <div class="flex align-items-center gap-3">
          <div class="bg-blue-50 p-2 border-round-lg flex align-items-center justify-content-center">
            <!-- Icono de huella de mascota (Heart/Star como alternativa si no hay paw) -->
            <i class="pi pi-heart-fill text-blue-600 text-xl"></i>
          </div>
          <h2 class="text-xl font-bold text-gray-800 m-0">{{ localPet.id ? 'Editar Paciente' : 'Nuevo Paciente' }}</h2>
        </div>
        <button @click="emit('close')" class="p-link w-2rem h-2rem flex align-items-center justify-content-center border-circle hover:surface-100 transition-colors cursor-pointer border-none bg-transparent text-gray-500">
          <i class="pi pi-times text-lg"></i>
        </button>
      </div>
    </template>

    <div class="grid formgrid pt-3">
      <div class="col-12 mb-4">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Nombre de la Mascota</label>
        <pv-input-text v-model="localPet.name" placeholder="Ej: Max" class="clinic-input" />
      </div>

      <div class="col-12 md:col-6 mb-4">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Especie</label>
        <pv-input-text v-model="localPet.type" placeholder="Ej: Perro" class="clinic-input" />
      </div>

      <div class="col-12 md:col-6 mb-4">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Raza</label>
        <pv-input-text v-model="localPet.breed" placeholder="Ej: Labrador" class="clinic-input" />
      </div>

      <div class="col-12 mb-2">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Edad (Años)</label>
        <!-- Forzamos el input-number a ser del 100% del ancho para que no se rompa -->
        <pv-input-number v-model="localPet.age" class="clinic-input-num" :min="0" suffix=" años" />
      </div>
    </div>

    <!-- FOOTER PERSONALIZADO -->
    <template #footer>
      <div class="flex justify-content-end gap-3 pt-3 mt-1">
        <pv-button label="Cancelar" class="p-button-text text-gray-500 hover:text-gray-800 font-semibold transition-colors p-2" @click="emit('close')" />
        <pv-button label="Guardar Paciente" icon="pi pi-check" class="btn-primary-clinic" @click="onSave" />
      </div>
    </template>
  </pv-dialog>
</template>

<!-- NO USAMOS SCOPED PARA QUE EL DIÁLOGO FLOTANTE (appendTo="body") TOME LOS ESTILOS -->
<style>
/* Fondo oscuro suave detrás del modal */
.p-dialog-mask { background-color: rgba(15, 23, 42, 0.45) !important; backdrop-filter: blur(3px); }

/* Modal Pawtient Blanco */
.clinic-dialog {
  background-color: #ffffff !important;
  border-radius: 16px !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.2) !important;
  border: none !important;
  padding: 1rem !important;
}
.clinic-dialog .p-dialog-header, .clinic-dialog .p-dialog-content, .clinic-dialog .p-dialog-footer {
  background-color: transparent !important;
  color: #1f2937 !important;
}

/* ========================================================
   SOLUCIÓN A LOS INPUTS
   ======================================================== */
.clinic-input, .clinic-input-num { width: 100% !important; }

/* Inputs internos */
.clinic-dialog .p-inputtext,
.clinic-dialog .p-inputnumber-input {
  width: 100% !important;
  background-color: #f8fafc !important;
  border: 1px solid #cbd5e1 !important;
  color: #334155 !important;
  border-radius: 8px !important;
  padding: 0.8rem 1rem !important;
  font-size: 0.95rem !important;
  transition: all 0.2s ease !important;
  box-shadow: none !important;
}

.clinic-dialog .p-inputtext:focus {
  background-color: #ffffff !important;
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15) !important;
  outline: none !important;
}

/* Botón Principal Pawtient */
.btn-primary-clinic {
  background-color: #2563eb !important;
  border: none !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
  padding: 0.75rem 1.5rem !important;
  transition: background-color 0.2s, transform 0.1s !important;
  color: white !important;
}
.btn-primary-clinic:hover { background-color: #1d4ed8 !important; transform: translateY(-1px) !important; }
</style>