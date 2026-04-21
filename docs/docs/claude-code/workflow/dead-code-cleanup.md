---
title: "安全清理死代码"
---

# 安全清理死代码

死代码（未使用的代码）会增加维护成本、影响性能、造成混淆。本指南介绍如何使用 Claude Code 安全地识别和清理死代码。

## 什么是死代码

### 死代码的类型

**未使用的导入：**
```typescript
import { unused } from 'lodash'; // 从未使用
import { debounce } from 'lodash'; // 实际使用
```

**未使用的函数：**
```typescript
// 从未被调用
function oldFunction() {
  // ...
}
```

**未使用的变量：**
```typescript
const unusedVar = 'value'; // 从未使用
```

**废弃的代码：**
```typescript
// 旧的实现，已被替换
// function oldImplementation() {
//   // ...
// }
```

**未使用的组件：**
```typescript
// 从未被引用的 React 组件
export function UnusedComponent() {
  return <div>Never used</div>;
}
```

### 死代码的危害

- 增加代码库大小
- 增加打包体积
- 降低代码可读性
- 增加维护成本
- 可能包含安全漏洞
- 造成混淆和误导

## 识别死代码

### 使用 Claude 分析

让 Claude 识别死代码：

```
分析项目中的死代码：

检查：
- 未使用的导入
- 未使用的函数
- 未使用的变量
- 未使用的组件
- 未使用的类型定义

范围：src/ 目录

输出：
- 死代码列表
- 按文件分组
- 标注风险级别
```

### 分析特定文件

分析单个文件：

```
分析这个文件的死代码：
@src/utils/helpers.ts

识别：
- 未使用的导出
- 未使用的内部函数
- 未使用的变量

提供：
- 详细列表
- 是否可以安全删除
- 删除建议
```

### 分析依赖关系

理解代码的使用情况：

```
分析 UserService 的使用情况：

检查：
- 哪些文件导入了它
- 哪些方法被使用
- 哪些方法未被使用

输出：
- 使用关系图
- 未使用的方法列表
- 清理建议
```

## 安全清理流程

### 第一步：识别和分类

识别并分类死代码：

```
识别和分类死代码：

分类：
1. 明确未使用（可以安全删除）
2. 可能未使用（需要验证）
3. 看似未使用但实际使用（动态引用等）
4. 废弃但需要保留（向后兼容）

对每个分类：
- 列出代码
- 说明原因
- 提供建议
```

### 第二步：验证影响

验证删除的影响：

```
验证删除这些代码的影响：

代码：
- src/utils/oldHelper.ts
- src/components/OldButton.tsx

检查：
1. 是否有动态引用
2. 是否在测试中使用
3. 是否在配置中引用
4. 是否被外部依赖

输出风险评估
```

### 第三步：创建清理计划

制定清理计划：

```
制定死代码清理计划：

死代码列表：[列表]

计划：
1. 优先级排序
2. 分批清理
3. 每批的范围
4. 验证方法
5. 回滚方案

时间表：2 周
```

### 第四步：执行清理

执行清理操作：

```
执行死代码清理：

批次 1：明确未使用的导入

步骤：
1. 删除未使用的导入
2. 运行 linter
3. 运行测试
4. 验证构建
5. 创建提交

如果所有检查通过，继续下一批
```

### 第五步：验证和测试

全面验证清理结果：

```
验证死代码清理：

检查：
1. 所有测试通过
2. 构建成功
3. 应用功能正常
4. 性能无退化
5. 打包体积减小

输出验证报告
```

## 工具辅助

### ESLint

使用 ESLint 检测未使用的代码：

```
配置 ESLint 检测死代码：

规则：
- no-unused-vars
- no-unused-imports (需要插件)
- @typescript-eslint/no-unused-vars

配置：
{
  "rules": {
    "no-unused-vars": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ]
  }
}
```

### TypeScript

使用 TypeScript 检测未使用的代码：

```
配置 TypeScript 检测：

tsconfig.json:
{
  "compilerOptions": {
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}

运行：tsc --noEmit
```

### 依赖分析工具

使用工具分析依赖：

```
使用 depcheck 检测未使用的依赖：

安装：npm install -g depcheck

运行：depcheck

输出：
- 未使用的依赖
- 缺失的依赖
- 建议操作
```

### 打包分析

分析打包结果：

```
使用 webpack-bundle-analyzer：

配置：
plugins: [
  new BundleAnalyzerPlugin()
]

分析：
- 哪些模块被打包
- 模块大小
- 未使用的代码

识别可以删除的代码
```

## 特殊情况处理

### 动态导入

处理动态导入的代码：

```
检查动态导入：

搜索模式：
- require(variable)
- import(variable)
- eval()

对每个动态导入：
- 理解其用途
- 确定是否真的需要
- 如果可能，改为静态导入
```

### 条件导出

处理条件导出的代码：

```
分析条件导出：

代码：
if (process.env.NODE_ENV === 'development') {
  export { DevTool };
}

处理：
- 理解条件
- 确定是否需要
- 考虑环境差异
```

### 向后兼容

处理需要保留的废弃代码：

```
标记废弃但保留的代码：

/**
 * @deprecated 使用 newFunction 代替
 * 保留用于向后兼容，将在 v3.0 移除
 */
export function oldFunction() {
  // ...
}

添加：
- 废弃警告
- 迁移指南
- 移除计划
```

### 测试代码

处理测试中的死代码：

```
清理测试中的死代码：

检查：
- 未使用的测试工具
- 未使用的 mock
- 废弃的测试用例

清理：
- 删除未使用的代码
- 更新测试
- 保持测试覆盖率
```

## 自动化清理

### 自动化脚本

创建自动化清理脚本：

```bash
#!/bin/bash
# scripts/clean-dead-code.sh

echo "检测死代码..."

# 运行 ESLint
npm run lint

# 运行 TypeScript 检查
npm run type-check

# 运行 depcheck
npx depcheck

# 生成报告
echo "死代码检测完成，查看报告"
```

### CI/CD 集成

在 CI/CD 中检测死代码：

```yaml
# .github/workflows/dead-code-check.yml
name: Dead Code Check

on: [pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm ci
      - name: Check unused code
        run: |
          npm run lint
          npm run type-check
          npx depcheck
      - name: Comment PR
        if: failure()
        uses: actions/github-script@v5
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '发现未使用的代码，请清理后再合并'
            })
```

### 定期清理

建立定期清理机制：

```
建立定期清理流程：

频率：每月

流程：
1. 运行死代码检测
2. 生成清理报告
3. 评估清理优先级
4. 分配清理任务
5. 执行清理
6. 验证结果

记录：
- 清理的代码量
- 减小的体积
- 遇到的问题
```

## 清理策略

### 渐进式清理

采用渐进式清理策略：

```
渐进式清理计划：

第一阶段：低风险清理
- 未使用的导入
- 明确未使用的变量
- 注释掉的代码

第二阶段：中风险清理
- 未使用的函数
- 未使用的组件
- 未使用的工具

第三阶段：高风险清理
- 废弃的 API
- 旧的实现
- 复杂的依赖

每个阶段：
- 充分测试
- 逐步推进
- 及时回滚（如需要）
```

### 优先级排序

按优先级清理：

```
清理优先级：

高优先级：
- 影响性能的死代码
- 包含安全问题的代码
- 大量未使用的依赖

中优先级：
- 未使用的组件
- 未使用的工具函数
- 废弃的 API

低优先级：
- 未使用的类型定义
- 未使用的常量
- 注释掉的代码
```

## 预防措施

### 代码审查

在代码审查中关注死代码：

```
代码审查清单：

检查项：
- [ ] 没有未使用的导入
- [ ] 没有未使用的变量
- [ ] 没有注释掉的代码
- [ ] 新增的代码都被使用
- [ ] 删除了相关的死代码
```

### 开发规范

建立防止死代码的规范：

```
开发规范：

1. 及时删除未使用的代码
2. 不要注释代码，使用 Git 历史
3. 重构时清理相关代码
4. 使用 linter 检测
5. 定期审查和清理
```

### 工具配置

配置工具自动检测：

```
配置自动检测：

1. ESLint 配置
   - 启用未使用代码检测
   - 设置为错误级别

2. TypeScript 配置
   - noUnusedLocals: true
   - noUnusedParameters: true

3. IDE 配置
   - 高亮未使用的代码
   - 提供快速修复

4. Git hooks
   - pre-commit 检查
   - 阻止提交死代码
```

## 文档化

### 记录清理过程

记录清理活动：

```markdown
# 死代码清理记录

## 2024-01-15 清理

### 清理内容
- 删除 50 个未使用的导入
- 删除 10 个未使用的组件
- 删除 5 个未使用的工具函数

### 影响
- 代码行数减少：500 行
- 打包体积减小：50KB
- 构建时间减少：5 秒

### 问题
- 无

### 经验
- 使用自动化工具提高效率
- 分批清理降低风险
```

### 维护清理清单

维护待清理列表：

```markdown
# 待清理死代码

## 高优先级
- [ ] src/legacy/ 目录（废弃代码）
- [ ] 未使用的大型依赖包

## 中优先级
- [ ] src/utils/old-helpers.ts
- [ ] src/components/deprecated/

## 低优先级
- [ ] 未使用的类型定义
- [ ] 注释掉的代码
```

## 最佳实践

1. 定期检测和清理
2. 使用自动化工具
3. 渐进式清理
4. 充分测试验证
5. 记录清理过程
6. 建立预防机制
7. 团队共同参与
8. 持续改进流程

## 总结

安全清理死代码需要：

- 系统化的识别方法
- 谨慎的验证流程
- 合适的工具支持
- 完善的预防机制

通过 Claude Code 和自动化工具，你可以安全高效地清理死代码，保持代码库的健康。
