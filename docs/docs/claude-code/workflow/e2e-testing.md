---
title: "E2E 测试工作流"
---

# E2E 测试工作流

端到端（E2E）测试是验证应用整体功能的关键手段。本指南介绍如何使用 Claude Code 建立高效的 E2E 测试工作流。

## E2E 测试概述

### 什么是 E2E 测试

E2E 测试模拟真实用户操作，验证应用从前端到后端的完整流程。

### E2E 测试的价值

- 验证用户场景
- 发现集成问题
- 确保功能正常
- 提高发布信心
- 减少生产问题

### 测试金字塔

```
       /\
      /E2E\      少量 E2E 测试
     /------\
    /集成测试\    适量集成测试
   /----------\
  /  单元测试  \  大量单元测试
 /--------------\
```

## 使用 Claude 编写 E2E 测试

### 生成测试用例

让 Claude 生成 E2E 测试：

```
为用户注册流程编写 E2E 测试：

流程：
1. 访问注册页面
2. 填写表单（用户名、邮箱、密码）
3. 提交表单
4. 验证成功消息
5. 验证跳转到首页

使用 Cypress
包含：
- 正常流程
- 表单验证
- 错误处理
```

### 测试用例示例

```typescript
describe('用户注册', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('应该成功注册新用户', () => {
    // 填写表单
    cy.get('[data-testid="username"]').type('testuser');
    cy.get('[data-testid="email"]').type('test@example.com');
    cy.get('[data-testid="password"]').type('SecurePass123!');
    cy.get('[data-testid="confirm-password"]').type('SecurePass123!');

    // 提交表单
    cy.get('[data-testid="submit"]').click();

    // 验证结果
    cy.get('[data-testid="success-message"]')
      .should('be.visible')
      .and('contain', '注册成功');

    // 验证跳转
    cy.url().should('include', '/dashboard');
  });

  it('应该验证必填字段', () => {
    cy.get('[data-testid="submit"]').click();

    cy.get('[data-testid="username-error"]')
      .should('be.visible')
      .and('contain', '用户名不能为空');
  });

  it('应该验证邮箱格式', () => {
    cy.get('[data-testid="email"]').type('invalid-email');
    cy.get('[data-testid="submit"]').click();

    cy.get('[data-testid="email-error"]')
      .should('be.visible')
      .and('contain', '邮箱格式不正确');
  });

  it('应该验证密码强度', () => {
    cy.get('[data-testid="password"]').type('weak');
    cy.get('[data-testid="submit"]').click();

    cy.get('[data-testid="password-error"]')
      .should('be.visible')
      .and('contain', '密码强度不足');
  });

  it('应该处理重复邮箱', () => {
    // 使用已存在的邮箱
    cy.get('[data-testid="email"]').type('existing@example.com');
    cy.get('[data-testid="username"]').type('testuser');
    cy.get('[data-testid="password"]').type('SecurePass123!');
    cy.get('[data-testid="confirm-password"]').type('SecurePass123!');
    cy.get('[data-testid="submit"]').click();

    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', '邮箱已被注册');
  });
});
```

## 测试框架选择

### Cypress

使用 Cypress 进行 E2E 测试：

```
设置 Cypress 测试环境：

安装：
npm install --save-dev cypress

配置：
// cypress.config.js
export default {
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
  },
};

创建测试：
cypress/e2e/user-flow.cy.js
```

### Playwright

使用 Playwright 进行 E2E 测试：

```
设置 Playwright 测试环境：

安装：
npm install --save-dev @playwright/test

配置：
// playwright.config.js
export default {
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
};

创建测试：
tests/user-flow.spec.js
```

### Puppeteer

使用 Puppeteer 进行 E2E 测试：

```
设置 Puppeteer 测试环境：

安装：
npm install --save-dev puppeteer jest-puppeteer

配置：
// jest-puppeteer.config.js
module.exports = {
  launch: {
    headless: true,
    slowMo: 50,
  },
  server: {
    command: 'npm start',
    port: 3000,
    launchTimeout: 10000,
  },
};

创建测试：
tests/user-flow.test.js
```

## 测试场景设计

### 关键用户流程

识别和测试关键流程：

```
识别关键用户流程：

电商应用：
1. 用户注册/登录
2. 浏览商品
3. 添加到购物车
4. 结账支付
5. 查看订单

为每个流程编写 E2E 测试
```

### 用户旅程测试

测试完整的用户旅程：

```typescript
describe('完整购物流程', () => {
  it('应该完成从浏览到购买的完整流程', () => {
    // 1. 访问首页
    cy.visit('/');
    cy.get('[data-testid="hero"]').should('be.visible');

    // 2. 搜索商品
    cy.get('[data-testid="search"]').type('笔记本电脑');
    cy.get('[data-testid="search-button"]').click();

    // 3. 选择商品
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('[data-testid="product-title"]').should('be.visible');

    // 4. 添加到购物车
    cy.get('[data-testid="add-to-cart"]').click();
    cy.get('[data-testid="cart-badge"]').should('contain', '1');

    // 5. 查看购物车
    cy.get('[data-testid="cart-icon"]').click();
    cy.get('[data-testid="cart-item"]').should('have.length', 1);

    // 6. 结账
    cy.get('[data-testid="checkout"]').click();

    // 7. 填写配送信息
    cy.get('[data-testid="address"]').type('测试地址');
    cy.get('[data-testid="phone"]').type('13800138000');

    // 8. 选择支付方式
    cy.get('[data-testid="payment-method"]').select('credit-card');

    // 9. 确认订单
    cy.get('[data-testid="place-order"]').click();

    // 10. 验证成功
    cy.get('[data-testid="order-success"]').should('be.visible');
    cy.get('[data-testid="order-number"]').should('exist');
  });
});
```

### 边界情况测试

测试边界情况和错误处理：

```typescript
describe('边界情况', () => {
  it('应该处理网络错误', () => {
    // 模拟网络错误
    cy.intercept('POST', '/api/orders', {
      statusCode: 500,
      body: { error: 'Server error' },
    });

    cy.visit('/checkout');
    cy.get('[data-testid="place-order"]').click();

    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', '订单提交失败');
  });

  it('应该处理会话过期', () => {
    // 清除认证
    cy.clearCookies();

    cy.visit('/dashboard');

    // 应该重定向到登录页
    cy.url().should('include', '/login');
  });

  it('应该处理并发操作', () => {
    // 测试库存竞争
    cy.visit('/product/123');

    // 模拟库存不足
    cy.intercept('POST', '/api/cart', {
      statusCode: 409,
      body: { error: 'Out of stock' },
    });

    cy.get('[data-testid="add-to-cart"]').click();

    cy.get('[data-testid="error-message"]')
      .should('contain', '商品已售罄');
  });
});
```

## 测试数据管理

### 测试数据准备

准备测试数据：

```typescript
// cypress/support/commands.js
Cypress.Commands.add('seedDatabase', () => {
  cy.request('POST', '/api/test/seed', {
    users: [
      { username: 'testuser', email: 'test@example.com' },
    ],
    products: [
      { name: '测试商品', price: 99.99 },
    ],
  });
});

Cypress.Commands.add('cleanDatabase', () => {
  cy.request('POST', '/api/test/clean');
});

// 使用
describe('测试套件', () => {
  beforeEach(() => {
    cy.cleanDatabase();
    cy.seedDatabase();
  });

  it('测试用例', () => {
    // 测试代码
  });
});
```

### 测试隔离

确保测试之间的隔离：

```typescript
describe('测试隔离', () => {
  beforeEach(() => {
    // 每个测试前重置状态
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.cleanDatabase();
    cy.seedDatabase();
  });

  afterEach(() => {
    // 每个测试后清理
    cy.cleanDatabase();
  });

  it('测试 1', () => {
    // 独立的测试
  });

  it('测试 2', () => {
    // 不依赖测试 1
  });
});
```

## 测试辅助功能

### 自定义命令

创建可复用的测试命令：

```typescript
// cypress/support/commands.js
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');
  cy.get('[data-testid="username"]').type(username);
  cy.get('[data-testid="password"]').type(password);
  cy.get('[data-testid="submit"]').click();
  cy.url().should('not.include', '/login');
});

Cypress.Commands.add('addToCart', (productId) => {
  cy.visit(`/product/${productId}`);
  cy.get('[data-testid="add-to-cart"]').click();
  cy.get('[data-testid="cart-badge"]').should('exist');
});

// 使用
describe('购物流程', () => {
  it('应该允许已登录用户购物', () => {
    cy.login('testuser', 'password');
    cy.addToCart('product-123');
    // 继续测试
  });
});
```

### Page Object 模式

使用 Page Object 模式组织测试：

```typescript
// cypress/pages/LoginPage.js
export class LoginPage {
  visit() {
    cy.visit('/login');
  }

  fillUsername(username) {
    cy.get('[data-testid="username"]').type(username);
    return this;
  }

  fillPassword(password) {
    cy.get('[data-testid="password"]').type(password);
    return this;
  }

  submit() {
    cy.get('[data-testid="submit"]').click();
    return this;
  }

  getErrorMessage() {
    return cy.get('[data-testid="error-message"]');
  }
}

// 使用
import { LoginPage } from '../pages/LoginPage';

describe('登录', () => {
  const loginPage = new LoginPage();

  it('应该成功登录', () => {
    loginPage
      .visit()
      .fillUsername('testuser')
      .fillPassword('password')
      .submit();

    cy.url().should('include', '/dashboard');
  });

  it('应该显示错误消息', () => {
    loginPage
      .visit()
      .fillUsername('invalid')
      .fillPassword('wrong')
      .submit();

    loginPage
      .getErrorMessage()
      .should('contain', '用户名或密码错误');
  });
});
```

## API 模拟和拦截

### 模拟 API 响应

模拟 API 响应进行测试：

```typescript
describe('API 模拟', () => {
  it('应该显示商品列表', () => {
    // 模拟 API 响应
    cy.intercept('GET', '/api/products', {
      statusCode: 200,
      body: [
        { id: 1, name: '商品 1', price: 99.99 },
        { id: 2, name: '商品 2', price: 199.99 },
      ],
    });

    cy.visit('/products');

    cy.get('[data-testid="product-card"]').should('have.length', 2);
  });

  it('应该处理加载状态', () => {
    // 延迟响应
    cy.intercept('GET', '/api/products', (req) => {
      req.reply({
        delay: 2000,
        statusCode: 200,
        body: [],
      });
    });

    cy.visit('/products');

    // 应该显示加载状态
    cy.get('[data-testid="loading"]').should('be.visible');

    // 等待加载完成
    cy.get('[data-testid="loading"]').should('not.exist');
  });
});
```

### 验证 API 调用

验证 API 调用的正确性：

```typescript
describe('API 验证', () => {
  it('应该发送正确的请求', () => {
    cy.intercept('POST', '/api/orders').as('createOrder');

    cy.visit('/checkout');
    cy.get('[data-testid="place-order"]').click();

    cy.wait('@createOrder').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        items: [{ productId: 1, quantity: 1 }],
        address: '测试地址',
        paymentMethod: 'credit-card',
      });
    });
  });
});
```

## 视觉回归测试

### 截图对比

进行视觉回归测试：

```typescript
describe('视觉回归', () => {
  it('应该匹配首页快照', () => {
    cy.visit('/');
    cy.matchImageSnapshot('homepage');
  });

  it('应该匹配商品详情页快照', () => {
    cy.visit('/product/123');
    cy.matchImageSnapshot('product-detail');
  });
});
```

### 响应式测试

测试不同屏幕尺寸：

```typescript
describe('响应式设计', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1920, height: 1080 },
  ];

  viewports.forEach(({ name, width, height }) => {
    it(`应该在 ${name} 上正确显示`, () => {
      cy.viewport(width, height);
      cy.visit('/');
      cy.matchImageSnapshot(`homepage-${name}`);
    });
  });
});
```

## 性能测试

### 加载时间测试

测试页面加载性能：

```typescript
describe('性能', () => {
  it('应该在 2 秒内加载首页', () => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.performance.mark('start');
      },
    });

    cy.window().then((win) => {
      win.performance.mark('end');
      win.performance.measure('pageLoad', 'start', 'end');
      const measure = win.performance.getEntriesByName('pageLoad')[0];
      expect(measure.duration).to.be.lessThan(2000);
    });
  });
});
```

## CI/CD 集成

### GitHub Actions 配置

在 CI/CD 中运行 E2E 测试：

```yaml
# .github/workflows/e2e.yml
name: E2E Tests

on: [push, pull_request]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Start server
        run: npm start &
        env:
          NODE_ENV: test

      - name: Wait for server
        run: npx wait-on http://localhost:3000

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload screenshots
        if: failure()
        uses: actions/upload-artifact@v2
        with:
          name: cypress-screenshots
          path: cypress/screenshots

      - name: Upload videos
        if: failure()
        uses: actions/upload-artifact@v2
        with:
          name: cypress-videos
          path: cypress/videos
```

## 测试报告

### 生成测试报告

生成详细的测试报告：

```javascript
// cypress.config.js
import { defineConfig } from 'cypress';

export default defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
  },
});
```

### 分析测试结果

分析和改进测试：

```
分析 E2E 测试结果：

指标：
- 测试通过率
- 测试执行时间
- 失败的测试
- 不稳定的测试

改进：
- 修复失败的测试
- 优化慢的测试
- 稳定不稳定的测试
- 增加测试覆盖
```

## 最佳实践

1. 测试用户场景而非实现细节
2. 保持测试独立和隔离
3. 使用有意义的测试数据
4. 避免测试不稳定
5. 合理使用等待和重试
6. 使用 data-testid 而非 CSS 选择器
7. 定期审查和维护测试
8. 在 CI/CD 中运行测试

## 总结

有效的 E2E 测试工作流需要：

- 清晰的测试策略
- 合适的测试框架
- 良好的测试组织
- 可靠的测试数据
- 完善的 CI/CD 集成

通过 Claude Code 的帮助，你可以快速编写高质量的 E2E 测试，确保应用的整体质量。
