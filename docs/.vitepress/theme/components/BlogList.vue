<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface BlogPost {
  title: string
  link: string
  date: string
  tags: string[]
  description: string
}

const posts = ref<BlogPost[]>([])

onMounted(async () => {
  try {
    const res = await fetch('/blog-data.json')
    if (res.ok) {
      posts.value = await res.json()
    }
  } catch {
    // Blog data will be populated after scraping
  }
})
</script>

<template>
  <div class="blog-list">
    <div v-if="posts.length === 0" class="empty">
      <p>暂无博客文章</p>
    </div>
    <a v-for="post in posts" :key="post.link" :href="post.link" class="blog-item">
      <h3>{{ post.title }}</h3>
      <p class="description">{{ post.description }}</p>
      <div class="meta">
        <span class="date">{{ post.date }}</span>
        <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.blog-list {
  max-width: 800px;
  margin: 0 auto;
}

.empty {
  text-align: center;
  padding: 40px 0;
  color: var(--vp-c-text-3);
}

.blog-item {
  padding: 16px 0;
  border-bottom: 1px solid var(--vp-c-divider);
  display: block;
  text-decoration: none;
}

.blog-item:last-child {
  border-bottom: none;
}

.blog-item:hover h3 {
  color: var(--vp-c-brand-1);
}

.blog-item h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 4px;
  transition: color 0.2s;
}

.blog-item .description {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 4px 0 8px;
  line-height: 1.5;
}

.meta {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  display: flex;
  gap: 12px;
  align-items: center;
}

.tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
</style>
