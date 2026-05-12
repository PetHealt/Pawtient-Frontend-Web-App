<script setup>
import { useRouter } from 'vue-router';
import { authStore } from '../../application/auth.store.js';

const router = useRouter();

const selectPlan = async (planName) => {
  // Guardamos el plan en la base de datos
  await authStore.updatePlan(planName);
  // Redirigimos al Home
  router.push('/home');
};
</script>

<template>
  <div class="plans-layout">

    <div class="plans-header">
      <h1 class="title">Elige el plan ideal para ti</h1>
      <p class="subtitle">Potencia tu práctica veterinaria con Pawtient</p>
    </div>

    <div class="cards-container">

      <div class="plan-card">
        <h2 class="plan-name">Paw Basic</h2>
        <p class="plan-desc">Para Veterinarios Independientes</p>
        <div class="plan-price">$29.99<span class="price-month">/mes</span></div>
        <button @click="selectPlan('Paw Basic')" class="select-btn">
          Seleccionar
        </button>
      </div>

      <div class="plan-card highlighted">
        <div class="popular-badge">Más Popular</div>
        <h2 class="plan-name">Paw Care</h2>
        <p class="plan-desc">Para Clínicas en crecimiento</p>
        <div class="plan-price text-blue">$59.99<span class="price-month">/mes</span></div>
        <button @click="selectPlan('Paw Care')" class="select-btn primary-btn">
          Seleccionar
        </button>
      </div>

      <div class="plan-card">
        <h2 class="plan-name">Paw Pro</h2>
        <p class="plan-desc">Para Hospitales Veterinarios</p>
        <div class="plan-price">$99.99<span class="price-month">/mes</span></div>
        <button @click="selectPlan('Paw Pro')" class="select-btn">
          Seleccionar
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.plans-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background-color: #f8fafc;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  padding: 2rem;
  overflow-y: auto;
}

.plans-header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
}

.subtitle {
  font-size: 1.25rem;
  color: #64748b;
  margin: 0;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
}

.plan-card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 320px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.plan-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.plan-card.highlighted {
  border: 2px solid #3b82f6;
  transform: scale(1.05);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.plan-card.highlighted:hover {
  transform: scale(1.05) translateY(-10px);
}

.popular-badge {
  position: absolute;
  top: -12px;
  background: #3b82f6;
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.plan-desc {
  color: #64748b;
  text-align: center;
  margin: 0 0 2rem 0;
  font-size: 0.95rem;
}

.plan-price {
  font-size: 3rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 2rem;
  display: flex;
  align-items: baseline;
}

.plan-price.text-blue {
  color: #2563eb;
}

.price-month {
  font-size: 1rem;
  color: #64748b;
  font-weight: 400;
  margin-left: 0.25rem;
}

.select-btn {
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid #e2e8f0;
  background: white;
  color: #0f172a;
  transition: all 0.2s;
  margin-top: auto;
}

.select-btn:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
}

.primary-btn {
  background: #3b82f6;
  color: white;
  border: none;
}

.primary-btn:hover {
  background: #2563eb;
  border: none;
}

/* Responsivo para móviles */
@media (max-width: 768px) {
  .plan-card.highlighted {
    transform: scale(1);
  }
  .plan-card.highlighted:hover {
    transform: translateY(-5px);
  }
}
</style>