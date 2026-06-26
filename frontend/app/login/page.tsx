'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        // Redirect to protected dashboard console
        router.push('/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Authentication failed');
        setLoading(false);
      }
    } catch (err) {
      setError('Connection failed. Server may be offline.');
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background flex flex-col justify-between overflow-hidden text-cream selection:bg-neon selection:text-background font-sans">
      
      {/* Background Mesh (Absolute) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(111,255,0,0.05)_0%,transparent_70%)]"></div>

      {/* Header logo */}
      <header className="relative z-10 max-w-[1831px] w-full mx-auto px-6 lg:px-16 py-6 flex items-center justify-between">
        <Link href="/" className="font-grotesk text-xl tracking-wider select-none text-cream flex items-center gap-1.5">
          SENTINEL<span className="text-neon">.</span>AI
        </Link>
        <Link href="/" className="font-mono text-[11px] uppercase tracking-widest text-cream/50 hover:text-neon transition-colors duration-300">
          ← Back to Site
        </Link>
      </header>

      {/* Main Form container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="max-w-md w-full liquid-glass rounded-[32px] p-8 border border-white/5 shadow-2xl shadow-neon/5">
          
          <div className="mb-8 text-center">
            <h1 className="font-grotesk text-[32px] leading-none uppercase tracking-wide">
              ADMIN ACCESS
            </h1>
            <p className="font-mono text-[10px] text-cream/40 uppercase tracking-widest mt-2">
              FastAPI JWT Security Context Gate
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Username Input */}
            <div className="space-y-2">
              <label className="block font-mono text-[10px] uppercase tracking-widest text-cream/50">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full bg-black/40 border border-white/10 rounded-full px-5 py-3.5 text-sm outline-none focus:border-neon focus:shadow-[0_0_12px_rgba(111,255,0,0.15)] transition-all duration-300 placeholder:text-white/20 text-cream"
                disabled={loading}
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block font-mono text-[10px] uppercase tracking-widest text-cream/50">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-black/40 border border-white/10 rounded-full px-5 py-3.5 text-sm outline-none focus:border-neon focus:shadow-[0_0_12px_rgba(111,255,0,0.15)] transition-all duration-300 placeholder:text-white/20 text-cream"
                disabled={loading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-[#ef4444]/10 border border-red-500/20 text-red-400 rounded-2xl p-4 text-xs font-mono leading-relaxed select-none">
                <span className="font-bold text-red-500 uppercase tracking-widest block mb-1">Error:</span>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-neon text-background font-grotesk uppercase tracking-wider text-sm py-4 rounded-full hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(111,255,0,0.3)] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:shadow-none transition-all duration-300 cursor-pointer"
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>

          </form>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-[1831px] w-full mx-auto px-6 lg:px-16 py-6 text-center font-mono text-[10px] text-cream/20 uppercase tracking-widest">
        Secured Connection · Restricted Systems Area
      </footer>

    </div>
  );
}
