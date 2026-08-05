# Ledger — Loan Origination & Multi-Tier Approval System

<p align="center">
  <strong>A full-stack enterprise loan origination platform with multi-tier approval workflows, risk scoring, and audit logging.</strong>
</p>

---

## 🏗️ Architecture

| Layer | Technology | Port |
|-------|-----------|------|
| **Frontend** | React 19 + TypeScript + Vite | 5173 |
| **Backend** | Spring Boot 3.3 (Java 17) | 8080 |
| **Risk Scoring** | Node.js + Express + TypeScript | 3001 |
| **Database** | MySQL 8.0 | 3306 |

```
┌──────────────┐     REST + JWT     ┌──────────────────┐     WebClient     ┌─────────────────┐
│   React SPA  │ ────────────────▶  │  Spring Boot API │ ───────────────▶  │  Risk Scoring   │
│  (Vite/TS)   │                    │  (Java 17)       │                   │  (Node.js/TS)   │
└──────────────┘                    └────────┬─────────┘                   └─────────────────┘
                                             │
                                             │ JPA / Hibernate
                                             ▼
                                    ┌──────────────────┐
                                    │   MySQL 8.0      │
                                    └──────────────────┘
```

## 🔑 Key Features

- **Multi-Step Loan Application Wizard** — 4-step form with localStorage persistence for resume capability
- **Custom State Machine Pattern** — OOP-based state transitions (DRAFT → SUBMITTED → UNDER_REVIEW → APPROVED/REJECTED/ESCALATED)
- **Multi-Tier Approval Workflow** — Amount-based routing: ≤₹5L (Loan Officer) → ≤₹25L (Branch Manager) → >₹25L (Credit Risk Officer)
- **Role-Based Access Control** — 5 roles with JWT authentication and method-level Spring Security
- **Risk Scoring Microservice** — Separate Node.js service calculating credit scores (300-900) based on DTI, employment, loan-to-income ratios
- **Immutable Audit Logging** — Every approval/rejection/escalation logged with timestamp + actor
- **Document Upload & Verification** — KYC document management with file type validation and SHA-256 checksums
- **Executive Dashboard** — Real-time stats, approval trends, and loan distribution charts
- **Optimistic Locking** — Prevents concurrent approval race conditions

## 📋 Prerequisites

- **Java 17+** (tested with Java 20)
- **Node.js 18+** (tested with Node.js 22)
- **Maven 3.8+** (tested with Maven 3.9.11)
- **MySQL 8.0** (or Docker)

## 🚀 Quick Start

### 1. Start MySQL

```bash
# Using Docker
docker run -d --name ledger-mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=ledger -p 3306:3306 mysql:8.0

# Or use an existing MySQL instance and create the database:
# CREATE DATABASE ledger;
```

### 2. Start the Risk Scoring Service

```bash
cd risk-scoring-service
npm install
npm run dev
# Running on http://localhost:3001
```

### 3. Start the Spring Boot Backend

```bash
cd backend
mvn spring-boot:run
# Running on http://localhost:8080
# Swagger UI: http://localhost:8080/swagger-ui.html
```

### 4. Start the React Frontend

```bash
cd frontend
npm install
npm run dev
# Running on http://localhost:5173
```

### 5. Using Docker Compose (Alternative)

```bash
docker-compose up -d
# Frontend: http://localhost:5173
# Backend:  http://localhost:8080
# Risk API: http://localhost:3001
```

## 👤 Demo Credentials

| Username | Password | Role |
|----------|----------|------|
| `admin` | `password123` | Admin |
| `officer1` | `password123` | Loan Officer |
| `manager1` | `password123` | Branch Manager |
| `risk1` | `password123` | Credit Risk Officer |
| `applicant1` | `password123` | Applicant |

## 📐 Design Patterns Used

| Pattern | Where | Why |
|---------|-------|-----|
| **State Pattern** | Loan status transitions | Each state is a Java class with guard logic, replacing fragile switch-statements |
| **Strategy Pattern** | Approval routing | Different approval strategies based on loan amount tiers |
| **Repository Pattern** | Data access layer | Spring Data JPA abstracts database operations |
| **DTO Pattern** | API layer | Never expose JPA entities directly; use records for API contracts |
| **Observer Pattern** | Audit logging | Domain events trigger immutable audit log entries |
| **Factory Pattern** | State instantiation | LoanStateFactory creates the correct state object from a LoanStatus enum |

## 🔒 Security Architecture

- **Stateless JWT Authentication** — No server-side sessions
- **BCrypt Password Hashing** — Industry-standard password security
- **Role-Based URL Security** — Spring Security filter chain
- **Method-Level Authorization** — `@PreAuthorize` annotations on service methods
- **CORS Configuration** — Controlled cross-origin access
- **Optimistic Locking** — `@Version` on Loan entity prevents concurrent modification

## 📊 API Endpoints

### Authentication
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/v1/auth/register` | Public |
| POST | `/api/v1/auth/login` | Public |
| GET | `/api/v1/auth/me` | Authenticated |

### Loans
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/v1/loans` | Authenticated |
| GET | `/api/v1/loans` | Authenticated |
| GET | `/api/v1/loans/{id}` | Authenticated |
| PUT | `/api/v1/loans/{id}/submit` | Owner |
| PUT | `/api/v1/loans/{id}/review` | Loan Officer+ |
| PUT | `/api/v1/loans/{id}/approve` | Role-gated by amount |
| PUT | `/api/v1/loans/{id}/reject` | Loan Officer+ |
| PUT | `/api/v1/loans/{id}/escalate` | Loan Officer+ |

### Documents
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/v1/loans/{id}/documents` | Authenticated |
| GET | `/api/v1/loans/{id}/documents` | Authenticated |
| GET | `/api/v1/documents/{id}/download` | Authenticated |

### Dashboard & Audit
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/v1/dashboard/stats` | Authenticated |
| GET | `/api/v1/audit` | Admin |

## 🧪 Testing

```bash
# Backend (JUnit)
cd backend && mvn test

# Frontend (Vitest)
cd frontend && npm test

# Risk Scoring (Jest)
cd risk-scoring-service && npm test
```

## 📁 Project Structure

```
ledger/
├── backend/                    # Spring Boot 3.3 (Java 17)
│   ├── src/main/java/com/ledger/
│   │   ├── config/             # Security, CORS, RestTemplate config
│   │   ├── security/           # JWT provider, auth filter
│   │   ├── common/             # Base entity, enums, exceptions, DTOs
│   │   ├── user/               # User entity, auth endpoints
│   │   ├── applicant/          # Applicant CRUD
│   │   ├── loan/               # Loan CRUD + State Machine
│   │   ├── document/           # File upload/download
│   │   ├── approval/           # Approval workflow
│   │   ├── audit/              # Immutable audit logging
│   │   ├── risk/               # Risk scoring client
│   │   └── dashboard/          # Stats & reporting
│   └── pom.xml
│
├── frontend/                   # React 19 + TypeScript + Vite
│   ├── src/
│   │   ├── api/                # Axios client & API functions
│   │   ├── components/         # Reusable UI & layout components
│   │   ├── context/            # Auth context
│   │   ├── hooks/              # Custom hooks
│   │   ├── pages/              # Route pages
│   │   ├── types/              # TypeScript interfaces
│   │   └── index.css           # Design system
│   └── package.json
│
├── risk-scoring-service/       # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── services/           # Scoring algorithm
│   │   ├── routes/             # Express routes
│   │   └── middleware/         # Validation, error handling
│   ├── tests/                  # Jest tests
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## 📝 License

This project is for educational/portfolio purposes.
