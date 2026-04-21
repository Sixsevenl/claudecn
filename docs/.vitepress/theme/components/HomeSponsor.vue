<script setup lang="ts">
import { useData } from 'vitepress'

const { lang } = useData()
const isZh = lang.value.startsWith('zh')
</script>

<template>
  <div class="home-sponsor">
    <h2 v-if="isZh">赞助商</h2>
    <h2 v-else>Sponsors</h2>
    <p class="sponsor-desc" v-if="isZh">感谢以下赞助商对本项目的支持</p>
    <p class="sponsor-desc" v-else>Thanks to our sponsors for supporting this project</p>
    <div class="sponsor-grid">
      <a href="http://newclaudeapi.icu" target="_blank" rel="noopener noreferrer" class="sponsor-card">
        <div class="sponsor-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>
        <div class="sponsor-info">
          <h3 v-if="isZh">Claude API 中转站</h3>
          <h3 v-else>Claude API Relay</h3>
          <p v-if="isZh">稳定可靠的 Claude API 中转服务，低延迟、高可用，助力开发者快速接入 Claude 能力。</p>
          <p v-else>Stable and reliable Claude API relay service with low latency and high availability for developers.</p>
        </div>
        <span class="sponsor-badge" v-if="isZh">赞助</span>
        <span class="sponsor-badge" v-else>Sponsor</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.home-sponsor {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px 80px;
  text-align: center;
}

.home-sponsor h2 {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.sponsor-desc {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin-bottom: 32px;
}

.sponsor-grid {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.sponsor-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 28px 36px;
  text-decoration: none;
  transition: all 0.3s ease;
  max-width: 560px;
  width: 100%;
  text-align: left;
}

.sponsor-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(217, 119, 87, 0.15);
}

.dark .sponsor-card:hover {
  box-shadow: 0 12px 32px rgba(232, 149, 110, 0.1);
}

.sponsor-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--vp-c-brand-soft);
  display: flex;
  align-items: center;
  justify-content: center;
}

.sponsor-icon svg {
  width: 24px;
  height: 24px;
  color: var(--vp-c-brand-1);
}

.sponsor-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}

.sponsor-info p {
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

.sponsor-badge {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  letter-spacing: 0.5px;
}

@media (max-width: 640px) {
  .sponsor-card {
    padding: 24px 20px;
    gap: 16px;
  }
}
</style>
