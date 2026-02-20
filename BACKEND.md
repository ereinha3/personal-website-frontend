# Backend Implementation Plan

## Overview

This document outlines the recommended backend implementation to complement the modernized frontend.

---

## Current Architecture

### Frontend (This Repo)
- React + TypeScript + Tailwind CSS
- Fetches GitHub data directly from public API (60 req/hr limit)
- Already has: Navbar, Hero, GitHub Stats, Organizations, About, Skills, Projects, Contact

### Backend (../backend)
- FastAPI server
- Currently has: Basic structure, but needs modernization

---

## Recommended Implementation

### 1. Knowledge Base Structure

Create markdown files in `backend/knowledge/`:

```
backend/
├── knowledge/
│   ├── about.md              # Bio, background
│   ├── accomplishments.md     # Awards, achievements
│   ├── experience/
│   │   ├── dermoproai.md
│   │   ├── houser.md
│   │   └── ...
│   └── projects/
│       ├── dermo-ai.md
│       ├── houser.md
│       ├── beat-the-books.md
│       └── ...
```

**about.md example:**
```markdown
---
title: Ethan Reinhart
subtitle: M.S. Computer Science Candidate at University of Oregon
tags: [ai, ml, systems]
---

Computer Scientist passionate about improving accuracy and efficiency in AI.
Currently focused on Recommender Systems, RAG Architecture, and LLM Evaluation.
```

**project .md example:**
```markdown
---
name: Dermo AI
github: https://github.com/ereinha3/dermo-ai
live: https://dermoai.com
featured: true
category: ml
technologies: [Python, PyTorch, Vision Transformers, LLM]
year: 2024
---

Award-winning BeaverHacks project using Vision Transformers for skin condition 
diagnosis with LLM integration. Achieved 94% accuracy on test dataset.
```

### 2. API Endpoints to Implement

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check for monitoring |
| `/projects` | GET | Combined GitHub + knowledge base data |
| `/github/activity` | GET | Recent commits, contributions |
| `/github/stats` | GET | Cached stats (stars, forks, languages) |
| `/github/orgs/{org}/repos` | GET | Organization repositories |
| `/contact` | POST | Contact form (optional) |

### 3. GitHub Service with Caching

```python
# backend/app/services/github.py

import httpx
from functools import lru_cache
from datetime import datetime, timedelta

GITHUB_API = "https://api.github.com"
CACHE_DURATION = timedelta(minutes=15)

class GitHubService:
    def __init__(self, token: str = None):
        self.token = token
        self.headers = {"Authorization": f"Bearer {token}"} if token else {}
    
    async def get_user(self, username: str) -> dict:
        """Get user profile"""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{GITHUB_API}/users/{username}",
                headers=self.headers
            )
            return response.json()
    
    async def get_repos(self, username: str, sort: str = "updated") -> list:
        """Get user repositories"""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{GITHUB_API}/users/{username}/repos",
                params={"sort": sort, "per_page": 100},
                headers=self.headers
            )
            return response.json()
    
    async def get_org_repos(self, org: str) -> list:
        """Get organization repositories"""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{GITHUB_API}/orgs/{org}/repos",
                params={"sort": "updated", "per_page": 10},
                headers=self.headers
            )
            return response.json()
```

### 4. Projects Endpoint (Combines GitHub + Knowledge)

```python
# backend/app/routers/projects.py

from fastapi import APIRouter
from pathlib import Path
import yaml

router = APIRouter()

KNOWLEDGE_DIR = Path(__file__).parent.parent / "knowledge" / "projects"

@router.get("/projects")
async def get_projects():
    """Combine GitHub repos with knowledge base metadata"""
    
    # Load knowledge base metadata
    projects_metadata = {}
    for md_file in KNOWLEDGE_DIR.glob("*.md"):
        with open(md_file) as f:
            content = f.read()
            # Parse frontmatter
            # ...
            projects_metadata[slug] = metadata
    
    # Fetch GitHub data
    github_repos = await github_service.get_repos("ereinha3")
    
    # Merge and return
    combined = []
    for repo in github_repos:
        slug = repo["name"].lower().replace("-", "_")
        if slug in projects_metadata:
            combined.append({**repo, **projects_metadata[slug]})
        else:
            combined.append({**repo, "featured": False})
    
    return {
        "projects": combined,
        "featured": [p for p in combined if p.get("featured")]
    }
```

### 5. Configuration

```python
# backend/app/config.py

from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    github_token: str = ""  # Optional - for higher rate limits
    resend_api_key: str = ""  # For contact form
    cors_origins: list = [
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # Alternative
    ]
    
    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()
```

---

## Environment Variables

Create `backend/.env`:

```bash
# Optional - increases GitHub rate limit from 60 to 5000 req/hour
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

# Optional - for contact form email
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Server config
HOST=0.0.0.0
PORT=8000
```

---

## Running the Backend

```bash
cd ../backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## Rate Limits

| Auth Level | Requests/Hour |
|------------|---------------|
| Unauthenticated | 60 |
| With GitHub Token | 5,000 |

For a portfolio, unauthenticated is usually fine with caching.

---

## Future: Chatbot (Lower Priority)

If you want to add a chatbot later:

1. Add knowledge base markdown files (already planned)
2. Create `/chat` endpoint with Claude or similar
3. Use tool calling to search knowledge base
4. Stream responses with SSE

**Cost estimate**: ~$5-20/month depending on usage.

---

## Files to Create/Modify

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py           # Update with new routes
│   ├── config.py         # Add settings
│   ├── services/
│   │   ├── __init__.py
│   │   └── github.py     # New: GitHub service
│   └── routers/
│       ├── __init__.py
│       ├── health.py     # New
│       ├── projects.py   # New
│       └── github.py     # New
├── knowledge/           # New: Markdown content
│   ├── about.md
│   ├── accomplishments.md
│   ├── experience/
│   └── projects/
├── .env                 # Create
└── requirements.txt    # Update
```
