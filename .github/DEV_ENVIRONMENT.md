# Prerequisites

> There is a docker container provided to run Open Salt, it would be more easy to setup than configuring your dev environment manually


## Toolings
- Node.js (v18 or higher)
- npm
- PostgreSQL (v14 or higher)
- Stable and fast internet access

### Local Development Setup
These are the steps required to set up a local development environment.

1. Clone the Repository
```bash
git clone https://github.com/your-username/open-salt.git
cd open-salt/
```

Replace your-username  with the actual GitHub username.

2. Install Dependencies

```bash
npm install
```

Use yarn or pnpm install if you're using Yarn / pnpm.

3. Configure Environment Variables  

Example .env file:
```env
SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

DIRECT_URL="postgres://username:password@localhost:5432/your-database"
DATABASE_URL="postgres://username:password@localhost:5432/your-database"
```
4. Start the Development Server

  
```bash
npm start
```