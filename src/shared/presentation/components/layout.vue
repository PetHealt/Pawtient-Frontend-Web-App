<script setup>
import LanguageSwitcher from "./language-switcher.vue";
import FooterContent from "./footer-content.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Rutas de Pawtient
const items = [
  { label: "Inicio", to: "/home", icon: "pi pi-home" },
  { label: "Pacientes", to: "/clinic/patients", icon: "pi pi-users" },
  { label: "Agenda", to: "/appointments/schedule", icon: "pi pi-calendar" },
  { label: "Inventario", to: "/store/inventory", icon: "pi pi-box" },
  { label: "Reportes", to: "/reports/dashboard", icon: "pi pi-chart-bar" }
];

// Rutas públicas donde no se debe ver el menú lateral
const publicRoutes = ["/login", "/register", "/choose-plan", "/"];
const isPublicRoute = computed(() => publicRoutes.includes(route.path));
</script>

<template>
  <div class="app-layout">

    <aside v-if="!isPublicRoute" class="sidebar">
      <div class="logo-section">
        <i class="pi pi-verified" style="font-size: 2rem; margin-right: 0.5rem;"></i>
        <h2>Pawtient</h2>
      </div>

      <nav class="nav-menu">
        <router-link
            v-for="item in items"
            :key="item.label"
            :to="item.to"
            class="nav-item"
            active-class="active-link"
        >
          <i :class="item.icon" class="nav-icon"></i>
          {{ item.label }}
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <language-switcher />
      </div>
    </aside>

    <div class="main-wrapper" :class="{ 'full-width': isPublicRoute }">
      <main class="main-content">
        <router-view />
      </main>

      <footer v-if="!isPublicRoute" class="footer">
        <footer-content />
      </footer>
    </div>

  </div>
</template>

<style scoped>
/* Contenedor global para que ocupe toda la pantalla */
.app-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* SIDEBAR: Fijo a la izquierda */
.sidebar {
  width: 250px;
  background-color: #3b82f6; /* Azul primario */
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  z-index: 1000;
}

/* Logo */
.logo-section {
  display: flex;
  align-items: center;
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.logo-section h2 {
  margin: 0;
  font-size: 1.5rem;
}

/* Navegación */
.nav-menu {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  flex-grow: 1; /* Empuja el footer hacia abajo */
}
.nav-item {
  padding: 1rem 1.5rem;
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  transition: background-color 0.2s, border-left 0.2s;
  border-left: 4px solid transparent;
}
.nav-icon {
  margin-right: 1rem;
  font-size: 1.2rem;
}
.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
/* Estilo para el link activo (cuando estás en esa página) */
.active-link {
  background-color: rgba(255, 255, 255, 0.2);
  border-left: 4px solid #ffffff;
  font-weight: bold;
}

/* Footer del Sidebar (Selector de idiomas) */
.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
}

/* CONTENIDO PRINCIPAL: Se desplaza 250px a la derecha para no chocar con el Sidebar */
.main-wrapper {
  margin-left: 250px; /* Exactamente el ancho del sidebar */
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Si es Login/Registro, ocupa toda la pantalla */
.main-wrapper.full-width {
  margin-left: 0;
}

.main-content {
  flex-grow: 1; /* Ocupa el espacio restante antes del footer */
  padding: 2rem;
}

.footer {
  background-color: white;
  border-top: 1px solid #e9ecef;
}
</style>