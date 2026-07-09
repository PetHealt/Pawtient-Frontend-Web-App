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
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.65), rgba(245, 248, 252, 0.55)),
    #f4f8fc;
}

.sidebar {
  width: 250px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0)),
    linear-gradient(160deg, #1666df 0%, #1d6ce3 50%, #16a3a3 100%);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 10px 0 30px rgba(20, 85, 217, 0.14);
  z-index: 1000;
  overflow: hidden;
}

.sidebar::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 42px 42px;
  pointer-events: none;
  opacity: 0.18;
}

.logo-section {
  position: relative;
  display: flex;
  align-items: center;
  padding: 1.75rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.logo-section h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
}

.nav-menu {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  flex-grow: 1;
}

.nav-item {
  padding: 1rem 1.5rem;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 650;
  display: flex;
  align-items: center;
  transition: background-color 0.2s, border-left 0.2s, transform 0.2s;
  border-left: 4px solid transparent;
  margin: 0.15rem 0.65rem;
  border-radius: 8px;
  padding-left: 1rem;
}

.nav-icon {
  margin-right: 1rem;
  font-size: 1.2rem;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.13);
  transform: translateX(2px);
}

.active-link {
  background-color: rgba(255, 255, 255, 0.2);
  border-left: 4px solid #ffffff;
  font-weight: bold;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
}

.sidebar-footer {
  position: relative;
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
  background: linear-gradient(135deg, #f15f5f, #e33f4d);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  box-shadow: 0 10px 18px rgba(227, 63, 77, 0.22);
  transition: transform 0.2s, box-shadow 0.2s;
}

.logout-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 22px rgba(227, 63, 77, 0.28);
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
  padding: 2.25rem;
}

.footer {
  background-color: rgba(255, 255, 255, 0.82);
  border-top: 1px solid #dbe5f1;
  backdrop-filter: blur(10px);
}

.menu-section-header {
  position: relative;
  padding: 1.5rem 1.5rem 0.45rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
  font-weight: bold;
  display: flex;
  align-items: center;
  letter-spacing: 0;
}

.sub-item {
  padding-left: 2.8rem !important;
  font-size: 0.95rem !important;
}

@media (max-width: 900px) {
  .sidebar {
    width: 220px;
  }

  .main-wrapper {
    margin-left: 220px;
  }

  .main-content {
    padding: 1rem;
  }
}
</style>
