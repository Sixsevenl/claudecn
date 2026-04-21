<script setup lang="ts">
import { useData } from 'vitepress'
import FeatureCard from './FeatureCard.vue'

const { lang } = useData()

const isZh = lang.value.startsWith('zh')

const featuresZh = [
  {
    icon: '⌨️',
    title: 'Claude Code',
    description: '强大的 AI 编程助手，支持终端、IDE 集成、代码审查与自动化工作流。',
    link: '/docs/claude-code/getting-started/',
  },
  {
    icon: '🤖',
    title: 'Agent Skills',
    description: '构建智能 Agent 所需的技能系统，让 AI 拥有更强大的工具使用能力。',
    link: '/docs/agent-skills/',
  },
  {
    icon: '🚀',
    title: 'Everything Claude Code',
    description: 'AI Agent 性能优化系统，48 个 Agents、183 个 Skills、跨平台支持。',
    link: '/docs/ecc/',
  },
  {
    icon: '🧠',
    title: '扩展思维',
    description: '深入理解 Claude 的扩展思维能力，掌握 Chain-of-Thought 推理技巧。',
    link: '/docs/extended-thinking',
  },
  {
    icon: '🖥️',
    title: '计算机控制',
    description: '通过 Computer Use 让 Claude 操控计算机界面，实现自动化任务执行。',
    link: '/docs/computer-use',
  },
  {
    icon: '🔌',
    title: 'MCP 集成',
    description: 'Model Context Protocol 让 Claude 连接外部工具和数据源，扩展无限可能。',
    link: '/docs/claude-code/workflow/mcp-servers',
  },
]

const featuresEn = [
  {
    icon: '⌨️',
    title: 'Claude Code',
    description: 'Powerful AI programming assistant with terminal, IDE integration, code review, and automated workflows.',
    link: '/en/docs/claude-code/getting-started/',
  },
  {
    icon: '🤖',
    title: 'Agent Skills',
    description: 'Skill system for building intelligent agents, empowering AI with powerful tool-using capabilities.',
    link: '/en/docs/agent-skills/',
  },
  {
    icon: '🚀',
    title: 'Everything Claude Code',
    description: 'AI Agent performance optimization system — 48 Agents, 183 Skills, cross-platform support.',
    link: '/en/docs/ecc/',
  },
  {
    icon: '🧠',
    title: 'Extended Thinking',
    description: 'Deep dive into Claude\'s extended thinking capabilities and master Chain-of-Thought reasoning techniques.',
    link: '/en/docs/extended-thinking',
  },
  {
    icon: '🖥️',
    title: 'Computer Use',
    description: 'Enable Claude to control computer interfaces through Computer Use, automating task execution.',
    link: '/en/docs/computer-use',
  },
  {
    icon: '🔌',
    title: 'MCP Integration',
    description: 'Model Context Protocol connects Claude to external tools and data sources, unlocking infinite possibilities.',
    link: '/en/docs/claude-code/workflow/mcp-servers',
  },
]

const features = isZh ? featuresZh : featuresEn
</script>

<template>
  <div class="home-features">
    <div class="grid">
      <FeatureCard
        v-for="feature in features"
        :key="feature.title"
        :icon="feature.icon"
        :title="feature.title"
        :description="feature.description"
        :link="feature.link"
      />
    </div>
  </div>
</template>

<style scoped>
.home-features {
  max-width: 1152px;
  margin: 0 auto;
  padding: 40px 24px 80px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
