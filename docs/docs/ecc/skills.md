---
title: Skills 技能
---

# Skills 技能

Skills 是 ECC 的主要工作流界面。它们可以被直接调用、自动推荐，并由 Agents 复用。ECC 包含 183 个技能，覆盖开发全流程。

## 技能格式

```markdown
# TDD Workflow
1. Define interfaces first
2. Write failing tests (RED)
3. Implement minimal code (GREEN)
4. Refactor (IMPROVE)
5. Verify 80%+ coverage
```

## 技能目录

### 编码标准与模式

| 技能 | 说明 |
|------|------|
| `coding-standards` | 通用编码最佳实践 |
| `golang-patterns` | Go 语言惯用模式和最佳实践 |
| `golang-testing` | Go 测试模式、TDD、基准测试 |
| `python-patterns` | Python 惯用模式和最佳实践 |
| `python-testing` | Python pytest 测试 |
| `cpp-coding-standards` | C++ 编码标准（C++ Core Guidelines）|
| `cpp-testing` | C++ GoogleTest、CMake/CTest 测试 |
| `java-coding-standards` | Java 编码标准 |
| `perl-patterns` | 现代 Perl 5.36+ 惯用模式 |
| `perl-security` | Perl 安全模式 |
| `perl-testing` | Perl TDD（Test2::V0、prove）|

### 前端开发

| 技能 | 说明 |
|------|------|
| `frontend-patterns` | React、Next.js 模式 |
| `frontend-slides` | HTML 幻灯片和 PPTX 转 Web |
| `nextjs-turbopack` | Next.js 16+ 和 Turbopack |
| `bun-runtime` | Bun 运行时、包管理器、打包器 |
| `liquid-glass-design` | iOS 26 Liquid Glass 设计系统 |

### 后端开发

| 技能 | 说明 |
|------|------|
| `backend-patterns` | API、数据库、缓存模式 |
| `django-patterns` | Django 模式、模型、视图 |
| `django-security` | Django 安全最佳实践 |
| `django-tdd` | Django TDD 工作流 |
| `django-verification` | Django 验证循环 |
| `springboot-patterns` | Java Spring Boot 模式 |
| `springboot-security` | Spring Boot 安全 |
| `springboot-tdd` | Spring Boot TDD |
| `laravel-patterns` | Laravel 架构模式 |
| `laravel-security` | Laravel 安全最佳实践 |
| `laravel-tdd` | Laravel TDD 工作流 |
| `nestjs-patterns` | NestJS 模式 |

### 数据库与基础设施

| 技能 | 说明 |
|------|------|
| `database-migrations` | 迁移模式（Prisma、Drizzle、Django、Go）|
| `postgres-patterns` | PostgreSQL 优化模式 |
| `jpa-patterns` | JPA/Hibernate 模式 |
| `docker-patterns` | Docker Compose、网络、卷、容器安全 |
| `deployment-patterns` | CI/CD、Docker、健康检查、回滚 |
| `api-design` | REST API 设计、分页、错误响应 |

### 测试与质量

| 技能 | 说明 |
|------|------|
| `tdd-workflow` | TDD 方法论 |
| `e2e-testing` | Playwright E2E 模式和 Page Object Model |
| `verification-loop` | 持续验证（构建、测试、lint、类型检查、安全）|
| `eval-harness` | 验证循环评估 |
| `security-review` | 安全检查清单 |

### AI/ML 与数据

| 技能 | 说明 |
|------|------|
| `pytorch-patterns` | 深度学习工作流 |
| `clickhouse-io` | ClickHouse 分析、查询、数据工程 |
| `cost-aware-llm-pipeline` | LLM 成本优化、模型路由、预算跟踪 |
| `regex-vs-llm-structured-text` | 正则 vs LLM 文本解析决策框架 |
| `content-hash-cache-pattern` | SHA-256 内容哈希缓存 |
| `foundation-models-on-device` | Apple 设备端 LLM（FoundationModels）|

### 移动端

| 技能 | 说明 |
|------|------|
| `swift-actor-persistence` | Swift Actor 线程安全数据持久化 |
| `swift-protocol-di-testing` | Swift Protocol 依赖注入和测试 |
| `swift-concurrency-6-2` | Swift 6.2 并发 |

### 内容与商业

| 技能 | 说明 |
|------|------|
| `article-writing` | 长文写作，遵循指定风格 |
| `content-engine` | 多平台社交内容和内容复用 |
| `market-research` | 带来源引用的市场和竞品研究 |
| `investor-materials` | 路演 PPT、一页纸、备忘录、财务模型 |
| `investor-outreach` | 个性化融资外联和跟进 |
| `brand-voice` | 品牌声音写作风格配置 |
| `videodb` | 视频和音频：摄取、搜索、编辑、生成、流媒体 |

### 开发工具

| 技能 | 说明 |
|------|------|
| `search-first` | 研究优先编码工作流 |
| `documentation-lookup` | 通过 Context7 MCP 查询最新库文档 |
| `mcp-server-patterns` | 用 Node/TypeScript SDK 构建 MCP 服务器 |
| `configure-ecc` | 交互式安装向导 |
| `security-scan` | AgentShield 安全审计集成 |
| `skill-stocktake` | 审计技能和命令质量 |
| `strategic-compact` | 上下文管理 |
| `iterative-retrieval` | 渐进式上下文精炼 |
| `autonomous-loops` | 自主循环模式：顺序管道、PR 循环、DAG 编排 |

### 持续学习

| 技能 | 说明 |
|------|------|
| `continuous-learning` | Legacy v1 Stop-hook 模式提取 |
| `continuous-learning-v2` | 基于本能的学习，带置信度评分 |

## 创建自定义技能

```bash
# 从当前仓库 git 历史自动生成技能
/skill-create

# 同时生成本能（用于 continuous-learning-v2）
/skill-create --instincts
```
