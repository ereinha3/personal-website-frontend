import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Organizations from './components/Organizations';
import { GitHubStats } from './components/GitHub';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <Navbar />

        <main>
          <Hero />
          <Projects />
          <GitHubStats />
          <Organizations />
          <Skills />
          <Contact />
        </main>
        
        {/* Footer */}
        <footer className="py-8 px-4 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
          <div className="max-w-7xl mx-auto text-center text-[var(--text-tertiary)] text-sm">
            <p>© {new Date().getFullYear()} Ethan Reinhart. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
