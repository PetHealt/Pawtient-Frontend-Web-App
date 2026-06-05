<script setup>
import LanguageSwitcher from "./language-switcher.vue";
import FooterContent from "./footer-content.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { authStore } from "../../../iam/application/auth.store.js";
import { useI18n } from "vue-i18n";

const route = useRoute();
const { t } = useI18n();

const items = [
  { labelKey: "navigation.home", to: "/home", icon: "pi pi-home" },
  { labelKey: "navigation.profile", to: "/profile", icon: "pi pi-user" },
  { labelKey: "navigation.patients", to: "/clinic/patients", icon: "pi pi-users" },
  { labelKey: "navigation.appointments", to: "/appointments/schedule", icon: "pi pi-calendar" },
  { labelKey: "navigation.store", icon: "pi pi-package", isHeader: true },
  { labelKey: "navigation.inventory", to: "/store/inventory", icon: "pi pi-box", isSubItem: true },
  { labelKey: "navigation.suppliers", to: "/store/suppliers", icon: "pi pi-truck", isSubItem: true },
  { labelKey: "navigation.reports", to: "/reports/dashboard", icon: "pi pi-chart-bar" }
];

const publicRoutes = ["/login", "/register", "/choose-plan", "/"];
const isPublicRoute = computed(() => publicRoutes.includes(route.path));

const handleLogout = () => {
  authStore.logout();
  window.location.href = "/login";
};
</script>

<template>
  <div class="app-layout">
    <aside v-if="!isPublicRoute" class="sidebar">
      <div class="logo-section">
        <i class="pi pi-verified" style="font-size: 2rem; margin-right: 0.5rem;"></i>
        <h2>Pawtient</h2>
      </div>

      <nav class="nav-menu">
        <template v-for="item in items" :key="item.labelKey">
          <div v-if="item.isHeader" class="menu-section-header">
            <i :class="item.icon" class="mr-2"></i>
            <span>{{ t(item.labelKey) }}</span>
          </div>

          <router-link
              v-else
              :to="item.to"
              class="nav-item"
              :class="{ 'sub-item': item.isSubItem }"
              active-class="active-link"
          >
            <i :class="item.icon" class="nav-icon"></i>
            {{ t(item.labelKey) }}
          </router-link>
        </template>
      </nav>

      <div class="sidebar-footer">
        <div class="footer-actions">
          <language-switcher />
          <button @click="handleLogout" class="logout-btn">
            <i class="pi pi-power-off"></i>
            <span>{{ t('navigation.logout') }}</span>
          </button>
        </div>
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
.app-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.sidebar {
  width: 250px;
  background-color: #3b82f6;
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

.nav-menu {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  flex-grow: 1;
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

.active-link {
  background-color: rgba(255, 255, 255, 0.2);
  border-left: 4px solid #ffffff;
  font-weight: bold;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.footer-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.logout-btn {
  width: 100%;
  padding: 0.8rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: #dc2626;
}

.main-wrapper {
  margin-left: 250px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-wrapper.full-width {
  margin-left: 0;
}

.main-content {
  flex-grow: 1;
  padding: 2rem;
}

.footer {
  background-color: white;
  border-top: 1px solid #e9ecef;
}

.menu-section-header {
  padding: 1.5rem 1.5rem 0.5rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  font-weight: bold;
  display: flex;
  align-items: center;
}

.sub-item {
  padding-left: 3rem !important;
  font-size: 0.95rem !important;
}
</style>
