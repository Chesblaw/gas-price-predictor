# Gas Price Predictor AI — Smart Transaction Timing Assistant

> ⚡ Predict optimal transaction times and gas fees using AI and real-time blockchain data.
 
**Gas Price Predictor AI** helps users schedule or execute blockchain transactions when gas prices are lowest.  
Combining live on-chain data (via `web3.js`), historical gas trends, and AI forecasting models, it gives users actionable insights for cheaper transactions.

Next.js • NestJS • FastAPI • PostgreSQL • Redis • Docker • Azure • web3.js

---

## ✨ Highlights

- **AI-powered gas price forecasting** using time-series models (FastAPI microservice)
- **Real-time chain data** via `web3.js` (Ethereum, Base, or compatible EVM networks)
- **Dashboard & alerts** for predicted vs actual gas trends
- **Efficient caching layer** (Redis) for high-frequency data updates
- **Secure backend APIs** (NestJS) for analytics, users, and auth
- **Modern Next.js frontend** with real-time visualizations
- **Cloud-native deployment** (Dockerized microservices on Azure)
- **Scalable monorepo architecture** with clean separation of concerns

---
### 🧩 Tech Stack
| Layer             | Technologies                                 |
| ----------------- | -------------------------------------------- |
| **Frontend**      | Next.js 14, TypeScript, Tailwind, shadcn/ui  |
| **Backend**       | NestJS, TypeORM/Prisma, PostgreSQL, Redis    |
| **AI Service**    | FastAPI, scikit-learn, Prophet, or PyTorch   |
| **Chain Access**  | web3.js / ethers.js                          |
| **Infra & CI/CD** | Docker, GitHub Actions, Azure Container Apps |
| **Monitoring**    | Azure App Insights, Prometheus (optional)    |

---

## 🏗️ Project Structure

```
├── GAS-PRICE-PRIDICTOR/
│ ├── frontend/ # Next.js 14 app (React + Tailwind UI)
│ ├── backend/ # NestJS API (auth, users, data access)
│ └── ai-service/ # FastAPI ML microservice (AI gas predictor)
│
├── infra/
│ ├── docker/ # Dockerfiles for each service
│ ├── k8s/ # Optional: Kubernetes manifests for Azure
│ └── ci-cd/ # GitHub Actions / Azure pipelines
│
├── shared/ # Shared libs, types, and utils
├── scripts/ # Setup, DB migration, seed, and data fetch scripts
├── .github/ # GitHub Actions workflows, issue templates
└── docs/ # Architecture diagrams, contributor guides
```

---

## 🚀 Quick Start

### Install the core package:

```bash
- Node.js ≥ 18  
- Python ≥ 3.9  
- PostgreSQL ≥ 14  
- Redis ≥ 6  
- Docker + Docker Compose  
- Azure CLI (for deployment)
- An Ethereum RPC endpoint (Infura, Alchemy, or self-hosted)```

### Install the CLI tool:

```bash
git clone https://github.com/<your-username>/gas-price-predictor-ai.git
cd gas-price-predictor-ai
cp .env.example .env```
```

---

## 🤝 Contributing

We welcome community contributions!

Fork the repo

Create a branch

```git checkout -b feature/amazing-feature```

Commit changes

```git commit -m "feat: add amazing feature"```

Push and open a PR

```git push origin feature/amazing-feature```


Wait for review — PRs must pass CI + 1 review before merge.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
