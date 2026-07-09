<script setup>
import { useRouter } from 'vue-router';
import { authStore } from '../../application/auth.store.js';
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n();

const selectPlan = async (planName) => {
  await authStore.updatePlan(planName);
  router.push('/home');
};
</script>

<template>
  <div class="plans-layout">
    <div class="plans-header">
      <h1 class="title">{{ t('plans.title') }}</h1>
      <p class="subtitle">{{ t('plans.subtitle') }}</p>
    </div>

    <div class="cards-container">
      <div class="plan-card">
        <h2 class="plan-name">Paw Basic</h2>
        <p class="plan-desc">{{ t('plans.basicDesc') }}</p>
        <div class="plan-price">$29.99<span class="price-month">{{ t('plans.month') }}</span></div>
        <button @click="selectPlan('Paw Basic')" class="select-btn">
          {{ t('plans.select') }}
        </button>
      </div>

      <div class="plan-card highlighted">
        <div class="popular-badge">{{ t('plans.popular') }}</div>
        <h2 class="plan-name">Paw Care</h2>
        <p class="plan-desc">{{ t('plans.careDesc') }}</p>
        <div class="plan-price text-blue">$59.99<span class="price-month">{{ t('plans.month') }}</span></div>
        <button @click="selectPlan('Paw Care')" class="select-btn primary-btn">
          {{ t('plans.select') }}
        </button>
      </div>

      <div class="plan-card">
        <h2 class="plan-name">Paw Pro</h2>
        <p class="plan-desc">{{ t('plans.proDesc') }}</p>
        <div class="plan-price">$99.99<span class="price-month">{{ t('plans.month') }}</span></div>
        <button @click="selectPlan('Paw Pro')" class="select-btn">
          {{ t('plans.select') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.plans-layout { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; width: 100vw; background: linear-gradient(180deg, #f8fbff, #eef5fb); position: fixed; top: 0; left: 0; z-index: 2000; padding: 2rem; overflow-y: auto; }
.plans-header { text-align: center; margin-bottom: 3rem; }
.title { font-size: 2.5rem; font-weight: 850; color: #17233c; margin: 0 0 0.5rem 0; }
.subtitle { font-size: 1.25rem; color: #64748b; margin: 0; }
.cards-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; width: 100%; max-width: 1200px; }
.plan-card { background: rgba(255, 255, 255, 0.96); border-radius: 8px; padding: 2.5rem 2rem; width: 100%; max-width: 320px; box-shadow: 0 14px 34px rgba(36, 72, 112, 0.1); display: flex; flex-direction: column; align-items: center; border: 1px solid #dbe5f1; transition: transform 0.3s ease, box-shadow 0.3s ease; position: relative; }
.plan-card:hover { transform: translateY(-8px); box-shadow: 0 24px 54px rgba(36, 72, 112, 0.15); }
.plan-card.highlighted { border: 2px solid #1d6ce3; transform: scale(1.05); box-shadow: 0 24px 54px rgba(29, 108, 227, 0.16); }
.plan-card.highlighted:hover { transform: scale(1.05) translateY(-10px); }
.popular-badge { position: absolute; top: -12px; background: linear-gradient(135deg, #1d6ce3, #16a3a3); color: white; padding: 0.25rem 1rem; border-radius: 8px; font-size: 0.85rem; font-weight: bold; }
.plan-name { font-size: 1.5rem; font-weight: 700; color: #1e293b; margin: 0 0 0.5rem 0; }
.plan-desc { color: #64748b; text-align: center; margin: 0 0 2rem 0; font-size: 0.95rem; }
.plan-price { font-size: 3rem; font-weight: 800; color: #0f172a; margin-bottom: 2rem; display: flex; align-items: baseline; }
.plan-price.text-blue { color: #1455d9; }
.price-month { font-size: 1rem; color: #64748b; font-weight: 400; margin-left: 0.25rem; }
.select-btn { width: 100%; padding: 1rem; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer; border: 2px solid #e2e8f0; background: white; color: #0f172a; transition: all 0.2s; margin-top: auto; }
.select-btn:hover { border-color: #cbd5e1; background: #f8fafc; }
.primary-btn { background: linear-gradient(135deg, #1d6ce3, #1455d9); color: white; border: none; box-shadow: 0 12px 22px rgba(29, 108, 227, 0.22); }
.primary-btn:hover { background: linear-gradient(135deg, #0f63d8, #114bbd); border: none; }
@media (max-width: 768px) {
  .plan-card.highlighted { transform: scale(1); }
  .plan-card.highlighted:hover { transform: translateY(-5px); }
}
</style>
