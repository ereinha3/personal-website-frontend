# Frontend Documentation

## Overview

Modern developer portfolio built with React, TypeScript, and Tailwind CSS. Features a dark-themed bento-grid design with glassmorphism effects and live GitHub integration.

---

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **GitHub REST API** for dynamic data

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx         # Glassmorphic navigation
│   ├── Hero.tsx           # Animated hero section
│   ├── About.tsx          # Bento grid about section
│   ├── Skills.tsx         # Skill bars with categories
│   ├── Projects.tsx       # Featured + filterable projects
│   ├── Contact.tsx        # CTA section
│   ├── Organizations.tsx  # GitHub orgs display
│   ├── GitHub.tsx        # Stats + repo cards
│   └── ui/
│       └── index.tsx     # Reusable components
├── hooks/
│   └── useGitHub.ts      # GitHub API hooks
├── context/
│   └── ThemeContext.tsx  # Dark/light mode
├── App.tsx               # Main app
├── index.css             # Global styles + CSS variables
└── main.tsx             # Entry point
```

---

## Key Features

### 1. Dark/Light Mode
- Toggle in navbar
- Persisted to localStorage
- Smooth transitions between themes
- CSS variables for easy theming

### 2. GitHub Integration
All data fetched client-side via React hooks:

```typescript
// Example usage
const { user, loading } = useGitHubUser();
const { repos } = useGitHubRepos({ sort: 'updated', perPage: 10 });
const { stats, topLanguages } = useGitHubStats();
const { orgRepos } = useGitHubOrgRepos(['FarmGPU', 'oregonquantgroup']);
```

**Endpoints used:**
- `GET /users/{username}` - User profile
- `GET /users/{username}/repos` - Repository list
- `GET /orgs/{org}/repos` - Organization repos

### 3. Bento Grid Layout
Modern card-based design with:
- Responsive grid (12-column)
- Varied card sizes
- Glassmorphic backgrounds
- Hover animations

### 4. Animations
- Framer Motion for complex animations
- Scroll-triggered reveals
- Typewriter effect on hero
- Smooth page transitions

---

## Customization

### Adding Organizations

Edit `src/components/Organizations.tsx`:

```typescript
const ORGS = [
  { name: 'FarmGPU', description: 'Your description' },
  { name: 'your-org', description: 'Another org' },
  // Add more...
];
```

### Adding Projects

Projects are displayed from your GitHub. To feature specific repos:

1. Star them on GitHub (sorts by stars)
2. Or modify `src/components/Projects.tsx` to filter manually

### Modifying Skills

Edit `src/components/Skills.tsx`:

```typescript
const skillCategories = {
  languages: {
    title: 'Languages',
    skills: [
      { name: 'Python', level: 95 },  // level: 0-100
      // Add more...
    ]
  },
  // Add more categories...
};
```

### Theme Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --accent-primary: #22d3ee;  /* Cyan */
  --accent-secondary: #a78bfa; /* Purple */
  --bg-primary: #09090b;      /* Dark background */
  /* ... */
}
```

---

## Connecting to Backend (Optional)

Currently, the frontend fetches directly from GitHub. To use a backend:

1. Run backend on `http://localhost:8000`
2. Update API calls in `src/hooks/useGitHub.ts`:

```typescript
const API_BASE = 'http://localhost:8000/api';

// Instead of GitHub API, call your backend:
// fetch(`${API_BASE}/projects`)
// fetch(`${API_BASE}/github/stats`)
// etc.
```

**Benefits of backend:**
- Higher rate limits (with GitHub token)
- Caching (faster loads)
- Contact form email forwarding
- Future: chatbot

---

## Deployment

### Local Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Deploy Options

| Platform | Notes |
|----------|-------|
| Vercel | `npm i -g vercel && vercel` |
| Netlify | Drag build folder to Netlify |
| Cloudflare Pages | Connect GitHub repo |
| Docker | `docker build -t portfolio .` |

---

## Future Enhancements

### High Priority
- [ ] Connect to backend API
- [ ] Add more organizations
- [ ] Optimize images

### Medium Priority
- [ ] Blog section
- [ ] Resume download
- [ ] SEO optimization
- [ ] PWA support

### Lower Priority
- [ ] Chatbot (requires backend)
- [ ] Analytics
- [ ] A/B testing

---

## Troubleshooting

### GitHub API Rate Limit
```
Error: API rate limit exceeded
```
**Solution:** Wait 1 hour, or add backend with GitHub token

### Missing Headshot
Place `headshot.png` in `public/` folder

### Font Not Loading
Fonts load from Fontshare CDN. Check internet connection.

---

## Credits

- Design inspired by modern bento-grid portfolios
- Fonts: [Fontshare](https://fontshare.com) (Clash Display, Satoshi)
- Icons: [React Icons](https://react-icons.github.io/react-icons/)
- Animations: [Framer Motion](https://www.framer.com/motion/)
