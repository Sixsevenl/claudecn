<script setup lang="ts">
import { useData } from 'vitepress'

const { lang } = useData()

const isZh = lang.value.startsWith('zh')
</script>

<template>
  <div class="home-hero">
    <h1 v-if="isZh">用 Claude AI 构建智能应用</h1>
    <h1 v-else>Build Intelligent Apps with Claude AI</h1>
    <p class="tagline" v-if="isZh">
      探索 Claude AI 的无限可能 — 从 Claude Code 到 Agent Skills，从 Everything Claude Code 到最佳实践
    </p>
    <p class="tagline" v-else>
      Explore the infinite possibilities of Claude AI — from Claude Code to Agent Skills, from Everything Claude Code to best practices
    </p>
    <div class="actions">
      <a href="/docs/claude-code/getting-started/" class="action-button primary" v-if="isZh">
        开始使用 Claude Code
      </a>
      <a href="/en/docs/claude-code/getting-started/" class="action-button primary" v-else>
        Get Started with Claude Code
      </a>
      <a href="/docs/ecc/" class="action-button secondary" v-if="isZh">
        Everything Claude Code
      </a>
      <a href="/en/docs/ecc/" class="action-button secondary" v-else>
        Everything Claude Code
      </a>
      <a href="/docs/quickstarts" class="action-button secondary" v-if="isZh">
        快速入门
      </a>
      <a href="/en/docs/quickstarts" class="action-button secondary" v-else>
        Quick Start
      </a>
    </div>
  </div>
</template>

<style scoped>
.home-hero {
  padding: 80px 24px 40px;
  text-align: center;
}

.home-hero h1 {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
  color: #D97757;
}

.dark .home-hero h1 {
  color: #E8956E;
}

.tagline {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-button {
  display: inline-flex;
  align-items: center;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.action-button.primary {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.action-button.primary:hover {
  background: var(--vp-c-brand-2);
}

.action-button.secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.action-button.secondary:hover {
  background: var(--vp-c-bg-mute);
}

@media (max-width: 640px) {
  .home-hero h1 {
    font-size: 2rem;
  }
  .tagline {
    font-size: 1rem;
  }
}
</style>
