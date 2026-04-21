<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
  link: string
}>()
</script>

<template>
  <a :href="link" class="feature-card">
    <div class="icon">{{ icon }}</div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </a>
</template>

<style scoped>
.feature-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s;
  text-decoration: none;
  display: block;
}

.feature-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.dark .feature-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.icon {
  width: 40px;
  height: 40px;
  margin-bottom: 12px;
  font-size: 2rem;
  line-height: 40px;
}

h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

p {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}
</style>
