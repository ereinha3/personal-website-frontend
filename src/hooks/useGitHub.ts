import { useState, useEffect } from 'react';

export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  company: string;
  location: string;
  blog: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  size: number;
  default_branch: string;
  pushed_at: string;
  created_at: string;
  updated_at: string;
  topics: string[];
  homepage: string | null;
  fork: boolean;
  archived: boolean;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
}

const GITHUB_USERNAME = 'ereinha3';
const GITHUB_API_BASE = 'https://api.github.com';
const API_BASE = import.meta.env.VITE_API_BASE || '';

console.log('[GitHub Hooks] API_BASE:', API_BASE);

// Cache for storing API responses
const cache: Record<string, { data: unknown; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const fetchWithCache = async (url: string) => {
  const cached = cache[url];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  const data = await response.json();
  cache[url] = { data, timestamp: Date.now() };
  return data;
};

export const useGitHubUser = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let data: GitHubUser;
        
        if (API_BASE) {
          const response = await fetch(`${API_BASE}/api/github/user`);
          if (!response.ok) {
            throw new Error(`Backend API error: ${response.status}`);
          }
          data = await response.json();
        } else {
          data = await fetchWithCache(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`) as GitHubUser;
        }
        
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export const useGitHubRepos = (options?: { 
  sort?: 'updated' | 'created' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
  perPage?: number;
  type?: 'all' | 'owner' | 'member';
}) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { 
    sort = 'updated', 
    direction = 'desc', 
    perPage = 10,
    type = 'owner'
  } = options || {};

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        let data: GitHubRepo[];
        
        if (API_BASE) {
          const response = await fetch(
            `${API_BASE}/api/github/repos?sort=${sort}&per_page=${perPage}`
          );
          if (!response.ok) {
            throw new Error(`Backend API error: ${response.status}`);
          }
          data = await response.json();
          
          if (type !== 'all') {
            data = data.filter((repo: GitHubRepo) => 
              type === 'owner' ? !repo.fork : true
            );
          }
        } else {
          const url = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=${sort}&direction=${direction}&per_page=${perPage}&type=${type}`;
          data = await fetchWithCache(url) as GitHubRepo[];
        }
        
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repos');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [sort, direction, perPage, type]);

  return { repos, loading, error };
};

export const useGitHubStats = () => {
  const { repos, loading: reposLoading, error: reposError } = useGitHubRepos({ perPage: 100 });
  const { user, loading: userLoading, error: userError } = useGitHubUser();
  
  const loading = reposLoading || userLoading;
  const error = reposError || userError;
  
  const stats = user ? {
    totalRepos: user.public_repos,
    totalStars: repos.reduce((acc, repo) => acc + repo.stargazers_count, 0),
    totalForks: repos.reduce((acc, repo) => acc + repo.forks_count, 0),
    followers: user.followers,
    following: user.following,
  } : null;

  const languageStats = repos
    .filter(repo => repo.language)
    .reduce((acc, repo) => {
      const lang = repo.language!;
      acc[lang] = (acc[lang] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const topLanguages = Object.entries(languageStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([language, count]) => ({ language, count }));

  return { stats, topLanguages, loading, error };
};

export const useGitHubOrgRepos = (orgs: string[]) => {
  const [orgRepos, setOrgRepos] = useState<Record<string, GitHubRepo[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrgRepos = async () => {
      console.log('[useGitHubOrgRepos] Fetching orgs:', orgs, 'API_BASE:', API_BASE);
      try {
        if (API_BASE && orgs.length > 0) {
          console.log('[useGitHubOrgRepos] Using backend API');
          const results: Record<string, GitHubRepo[]> = {};
          
          await Promise.all(orgs.map(async (org) => {
            const response = await fetch(`${API_BASE}/api/github/orgs/${org}/repos`);
            if (!response.ok) {
              throw new Error(`Backend API error: ${response.status}`);
            }
            results[org] = await response.json();
          }));
          
          setOrgRepos(results);
        } else {
          const results: Record<string, GitHubRepo[]> = {};
          
          await Promise.all(orgs.map(async (org) => {
            const url = `${GITHUB_API_BASE}/orgs/${org}/repos?sort=updated&per_page=5&type=public`;
            const data = await fetchWithCache(url) as GitHubRepo[];
            results[org] = data;
          }));
          
          setOrgRepos(results);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch org repos');
      } finally {
        setLoading(false);
      }
    };

    if (orgs.length > 0) {
      fetchOrgRepos();
    }
  }, [orgs.join(',')]);

  return { orgRepos, loading, error };
};

export const useGitHubContributions = () => {
  const [contributions, setContributions] = useState<{
    total: number;
    thisYear: number;
    weeks: { contributionDays: { contributionCount: number; date: string }[] }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // Fetch from GitHub's undocumented contribution API
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch contributions');
        }
        
        const data = await response.json();
        setContributions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch contributions');
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  return { contributions, loading, error };
};

export const getLanguageColor = (language: string): string => {
  const colors: Record<string, string> = {
    Python: '#3572A5',
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    'C++': '#f34b7d',
    C: '#555555',
    Java: '#b07219',
    'C#': '#178600',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    R: '#198CE7',
    MATLAB: '#E16737',
    Jupyter: '#DA5B0B',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Shell: '#89e051',
    SQL: '#e38c00',
  };
  
  return colors[language] || '#8b949e';
};

export interface GitHubCommit {
  sha: string;
  message: string;
  date: string;
  repo: string;
  url: string;
  author_name: string;
}

export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendMessage = async (name: string, email: string, message: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE || '';
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) throw new Error('Failed to send message');
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error, success };
};

export interface ContributionWeek {
  week: string;
  count: number;
}

export const useGitHubContributionTimeline = (weeks: number = 52) => {
  const [timeline, setTimeline] = useState<ContributionWeek[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE || '';
        const url = `${baseUrl}/api/github/contribution-timeline?weeks=${weeks}`;
        console.log('[useGitHubContributionTimeline] Fetching:', url);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch timeline');
        const data = await response.json();
        console.log('[useGitHubContributionTimeline] Data:', data);
        setTimeline(data.timeline || []);
      } catch (err) {
        console.error('[useGitHubContributionTimeline] Error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch timeline');
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, [weeks]);

  return { timeline, loading, error };
};

export const useGitHubCommits = (username: string) => {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE || '';
        const url = baseUrl 
          ? `${baseUrl}/api/github/commits`
          : `https://api.github.com/users/${username}/events/public`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch commits');
        
        const data = await response.json();
        
        if (baseUrl) {
          setCommits(data.slice(0, 10));
        } else {
          const pushEvents = data
            .filter((e: any) => e.type === 'PushEvent')
            .slice(0, 10);
          
          const formatted = pushEvents.map((e: any) => ({
            sha: e.payload.commits?.[0]?.sha?.slice(0, 7) || '',
            message: e.payload.commits?.[0]?.message || '',
            date: e.created_at,
            repo: e.repo.name,
            url: `https://github.com/${e.repo.name}/commit/${e.payload.commits?.[0]?.sha}`,
            author: e.payload.commits?.[0]?.author?.name || username,
          }));
          setCommits(formatted);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch commits');
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, [username]);

  return { commits, loading, error };
};

export interface LinkedInProfile {
  name: string;
  headline: string;
  about: string;
  experience: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
}

export const useLinkedIn = () => {
  const [profile, setProfile] = useState<LinkedInProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE || '';
        if (!baseUrl) {
          setLoading(false);
          return;
        }
        
        const response = await fetch(`${baseUrl}/api/linkedin/profile`);
        if (!response.ok) throw new Error('Failed to fetch LinkedIn profile');
        
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch LinkedIn');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};

export interface GitHubLanguages {
  [language: string]: number;
}

export const useGitHubLanguages = () => {
  const [languages, setLanguages] = useState<GitHubLanguages>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE || '';
        if (!baseUrl) {
          setLoading(false);
          return;
        }
        
        const response = await fetch(`${baseUrl}/api/github/languages`);
        if (!response.ok) throw new Error('Failed to fetch languages');
        
        const data = await response.json();
        setLanguages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch languages');
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  return { languages, loading, error };
};

export interface TopRepo {
  repo: string;
  commits: number;
  language: string | null;
}

export const useGitHubTopRepos = (limit = 5) => {
  const [repos, setRepos] = useState<TopRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopRepos = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE || '';
        if (!baseUrl) {
          setLoading(false);
          return;
        }
        
        const response = await fetch(`${baseUrl}/api/github/top-repos?limit=${limit}`);
        if (!response.ok) throw new Error('Failed to fetch top repos');
        
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch top repos');
      } finally {
        setLoading(false);
      }
    };

    fetchTopRepos();
  }, [limit]);

  return { repos, loading, error };
};
