# Paywall-Conversion-Optimizer

![GitHub](https://img.shields.io/github/license/MounirMeziani/PayWall-Conversion-Optimizer)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![Coverage](https://img.shields.io/badge/coverage-90%2B-brightgreen)

<p align="center">
  <img src="public/demo-waterfall.gif" alt="Revenue Waterfall Demo" width="600">
</p>

## 🚀 Overview

A turnkey solution that lets any SaaS founder drop-in a dynamic, A/B-tested paywall and track the revenue in real-time. Optimize your conversion rates and maximize your MRR with minimal setup.

### ✨ Features

- **Responsive Paywall Templates**
  - Layout A: "Starter vs Pro" toggles
  - Layout B: Content-gate overlay with blur effect

- **Dynamic Copy Testing**
  - JSON-driven headline and copy permutations
  - 1-click hot-swap for live tests

- **Advanced Traffic Splitting**
  - Lightweight JS tag (<2 KB)
  - Cookie-based bucketing with minimal performance overhead

- **Revenue Dashboard**
  - Real-time Stripe integration
  - Key metrics: Conversion Rate, AOV, MRR delta
  - Interactive Plotly charts

- **Revenue Waterfall Visualization**
  - Stacked bar showing MRR additions, churn & expansion
  - Auto-generating GIF reports every 24h

## 🔧 Tech Stack

- **Frontend**: Next.js 13 (App Router), TypeScript, Tailwind CSS
- **Backend**: Express server for Stripe webhooks
- **Database**: Prisma with SQLite (dev) / PostgreSQL (prod)
- **Testing**: Vitest with 90%+ coverage
- **Schema Validation**: Zod
- **Deployment**: One-click deploy to Vercel or Netlify

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/MounirMeziani/PayWall-Conversion-Optimizer.git
cd PayWall-Conversion-Optimizer

# Install dependencies
pnpm i

# Set up environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

## 🚢 Deployment

### Deploy with Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMounirMeziani%2FPayWall-Conversion-Optimizer)

### Deploy with Netlify
[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/MounirMeziani/PayWall-Conversion-Optimizer)

## 📖 Usage

### Implementing the Paywall

Add the paywall snippet to your site:

```html
<script src="https://your-domain.com/paywall-split.js"></script>
<div id="paywall-container" data-plan="pro"></div>
```

### Creating A/B Tests

Configure test variants in the dashboard or directly in JSON:

```json
{
  "variants": {
    "A": {
      "headline": "Unlock Premium Features",
      "subheadline": "Get more done with our Pro plan"
    },
    "B": {
      "headline": "Take Your Business to the Next Level",
      "subheadline": "Join thousands of successful companies"
    }
  }
}
```

## 📊 Performance

Check out detailed benchmarks and load testing results in `/bench/README.md`. The system has been tested up to 10k RPS with minimal latency impact.

## 🤝 Contributing

Contributions are welcome! Please check out our [Contributing Guide](.github/CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 