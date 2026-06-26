import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-cream selection:bg-neon selection:text-background overflow-x-hidden">

      {/* Sticky Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/5 py-4">
        <div className="max-w-[1831px] w-full mx-auto px-6 lg:px-16 flex items-center justify-between">
          <div className="font-grotesk text-xl tracking-wider select-none text-cream flex items-center gap-1.5">
            SENTINEL<span className="text-neon">.</span>AI
          </div>

          <nav className="hidden lg:block liquid-glass rounded-[28px] px-12 py-5">
            <ul className="flex items-center gap-10 font-grotesk text-[13px] tracking-widest text-cream/70 uppercase">
              <li>
                <Link href="#about" className="hover:text-neon transition-colors duration-300">
                  Mission
                </Link>
              </li>
              <li>
                <Link href="#capabilities" className="hover:text-neon transition-colors duration-300">
                  Capabilities
                </Link>
              </li>
              <li>
                <a href="https://github.com/Shyamyemuka" target="_blank" rel="noopener noreferrer" className="hover:text-neon transition-colors duration-300">
                  Github
                </a>
              </li>
            </ul>
          </nav>

          <Link href="/login" className="liquid-glass rounded-full px-6 py-2.5 font-grotesk text-[13px] tracking-wider uppercase text-neon hover:bg-neon hover:text-background transition-all duration-300">
            Launch Console
          </Link>
        </div>
      </header>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden rounded-b-[32px] border-b border-white/10 z-10">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-70 contrast-[1.6] brightness-[0.65] saturate-[1.4]"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1831px] w-full mx-auto px-6 lg:px-16 flex-1 flex flex-col justify-center pt-48 pb-24">
          <div className="relative max-w-4xl lg:ml-24">
            {/* Cursive overlay */}
            <span className="absolute -top-10 right-4 lg:right-24 font-condiment text-[32px] sm:text-[48px] text-neon -rotate-6 select-none mix-blend-exclusion">
              Intrusion detection
            </span>
            <h1 className="font-grotesk text-[40px] sm:text-[60px] md:text-[75px] lg:text-[90px] leading-[1.02] uppercase tracking-normal select-none">
              BEYOND SIGNATURES <br />
              AND <span className="text-cream/50">( ITS )</span> STATIC BOUNDARIES
            </h1>
            <p className="mt-8 font-mono text-[13px] uppercase tracking-widest text-cream/60 max-w-xl leading-relaxed">
              We are engineering high-precision intrusion detection. Bridging the gap between machine learning and active threat analysis to secure critical digital infrastructure.
            </p>
            <div className="mt-10 flex gap-4">
              <Link href="/login" className="inline-block bg-neon text-background font-grotesk uppercase tracking-wider text-sm px-10 py-4 rounded-full hover:scale-105 hover:shadow-[0_0_24px_rgba(111,255,0,0.4)] transition-all duration-300">
                Begin Journey
              </Link>
              <Link href="#about" className="inline-block liquid-glass text-cream font-grotesk uppercase tracking-wider text-sm px-10 py-4 rounded-full hover:bg-white/5 transition-all duration-300">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info (Desktop only) */}
        <div className="relative z-10 max-w-[1831px] w-full mx-auto px-6 lg:px-16 pb-8 flex items-center justify-between font-mono text-[10px] text-cream/40 uppercase tracking-widest">
          <div>CICIDS 2017 Benchmark Dataset</div>
          <div>Built by Shyam Yemuka © 2026</div>
        </div>
      </section>

      {/* SECTION 2: ABOUT / MISSION */}
      <section id="about" className="relative min-h-screen flex flex-col justify-center overflow-hidden z-10 py-24">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 contrast-[1.6] brightness-[0.65] saturate-[1.4]"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <div className="relative z-10 max-w-[1831px] w-full mx-auto px-6 lg:px-16 flex flex-col justify-between h-full gap-16">
          <div className="grid lg:grid-cols-2 items-start gap-12">
            <div className="relative">
              <span className="absolute -top-8 left-36 font-condiment text-[40px] text-neon -rotate-3 select-none mix-blend-exclusion">
                Active defense
              </span>
              <h2 className="font-grotesk text-[36px] sm:text-[60px] leading-none uppercase select-none">
                HELLO!<br />
                I'M SENTINEL
              </h2>
            </div>

            <div className="space-y-6">
              <p className="font-mono text-[15px] uppercase tracking-wider text-cream max-w-md leading-relaxed">
                A digital object fixed beyond signatures, rules, or temporary files. Utilizing an XGBoost 2.1 tree ensemble to classify malicious network packets.
              </p>
              <p className="font-mono text-[13px] uppercase tracking-widest text-cream/40 max-w-md leading-relaxed">
                SentinelAI inspects 78 packet flow metrics in real time. We replace traditional, static network defense systems with a dynamic model that learns the footprint of zero-day exploitation.
              </p>
            </div>
          </div>

          {/* Feature Specs */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="liquid-glass rounded-[24px] p-8 border border-white/5">
              <span className="text-neon font-mono text-[12px] tracking-widest block mb-2">MODEL ACCURACY</span>
              <h3 className="font-grotesk text-4xl mb-4">99.77% F1</h3>
              <p className="font-mono text-[11px] text-cream/50 uppercase leading-relaxed">
                Evaluated against the rigorous CICIDS 2017 dataset on held-out test splits. Extremely low false alarm rates.
              </p>
            </div>
            <div className="liquid-glass rounded-[24px] p-8 border border-white/5">
              <span className="text-neon font-mono text-[12px] tracking-widest block mb-2">LATENCY RATINGS</span>
              <h3 className="font-grotesk text-4xl mb-4">&lt; 50MS</h3>
              <p className="font-mono text-[11px] text-cream/50 uppercase leading-relaxed">
                Lightning fast classification times, ensuring traffic threats are intercepted before they breach the application layer.
              </p>
            </div>
            <div className="liquid-glass rounded-[24px] p-8 border border-white/5">
              <span className="text-neon font-mono text-[12px] tracking-widest block mb-2">REAL-TIME STREAMING</span>
              <h3 className="font-grotesk text-4xl mb-4">SSE DUPLEX</h3>
              <p className="font-mono text-[11px] text-cream/50 uppercase leading-relaxed">
                Events are delivered immediately to the analyst console via Server-Sent Events, creating an active, scrolling command panel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THREAT GRID */}
      <section id="capabilities" className="relative min-h-screen bg-background z-10 py-28 flex flex-col justify-center">
        <div className="max-w-[1831px] w-full mx-auto px-6 lg:px-16 flex flex-col gap-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-grotesk text-[32px] sm:text-[60px] uppercase leading-none">
                DETECTING TYPES OF <br />
                <span className="font-condiment text-[42px] sm:text-[68px] text-neon lowercase font-normal italic select-none inline-block -rotate-1 mr-4">network</span>
                ATTACKS
              </h2>
            </div>
            <div className="text-right">
              <span className="font-grotesk text-5xl sm:text-6xl tracking-tighter block uppercase">15</span>
              <span className="font-mono text-[10px] text-cream/40 tracking-widest uppercase">attack classes handled</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="liquid-glass rounded-[32px] p-5 hover:bg-white/5 transition-all duration-500 border border-white/5 flex flex-col gap-5">
              <div className="relative w-full aspect-video rounded-[24px] overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4"
                />
              </div>
              <div className="flex items-center justify-between px-2 pb-2">
                <div>
                  <h4 className="font-grotesk text-xl tracking-wider uppercase">DDoS FLOODS</h4>
                  <span className="font-mono text-[10px] text-cream/40 tracking-widest uppercase">Volumetric Attack Detection</span>
                </div>
                <div className="bg-[#6FFF00]/10 border border-neon/30 text-neon rounded-full px-4 py-1 text-[11px] font-mono tracking-widest">
                  CRITICAL
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="liquid-glass rounded-[32px] p-5 hover:bg-white/5 transition-all duration-500 border border-white/5 flex flex-col gap-5">
              <div className="relative w-full aspect-video rounded-[24px] overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4"
                />
              </div>
              <div className="flex items-center justify-between px-2 pb-2">
                <div>
                  <h4 className="font-grotesk text-xl tracking-wider uppercase">PORT SCANS</h4>
                  <span className="font-mono text-[10px] text-cream/40 tracking-widest uppercase">Reconnaissance Detection</span>
                </div>
                <div className="bg-[#6FFF00]/10 border border-neon/30 text-neon rounded-full px-4 py-1 text-[11px] font-mono tracking-widest">
                  MEDIUM
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="liquid-glass rounded-[32px] p-5 hover:bg-white/5 transition-all duration-500 border border-white/5 flex flex-col gap-5">
              <div className="relative w-full aspect-video rounded-[24px] overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4"
                />
              </div>
              <div className="flex items-center justify-between px-2 pb-2">
                <div>
                  <h4 className="font-grotesk text-xl tracking-wider uppercase">DoS HULK / LORIS</h4>
                  <span className="font-mono text-[10px] text-cream/40 tracking-widest uppercase">Connection Exhaustion</span>
                </div>
                <div className="bg-[#6FFF00]/10 border border-neon/30 text-neon rounded-full px-4 py-1 text-[11px] font-mono tracking-widest">
                  HIGH
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Threat List Grid */}
          <div className="mt-12">
            <h3 className="font-mono text-[11px] text-neon uppercase tracking-widest mb-8 text-center sm:text-left border-b border-white/5 pb-4">
              Additional Classified Attack Patterns & Signatures
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="liquid-glass p-5 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors duration-300">
                <h5 className="font-grotesk text-lg tracking-wider text-cream uppercase">DoS GoldenEye</h5>
                <p className="mt-2 font-mono text-[10px] text-cream/50 uppercase leading-relaxed">
                  HTTP flood attack targeting resource exhaustion via high-concurrency requests.
                </p>
              </div>
              <div className="liquid-glass p-5 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors duration-300">
                <h5 className="font-grotesk text-lg tracking-wider text-cream uppercase">DoS Slowloris</h5>
                <p className="mt-2 font-mono text-[10px] text-cream/50 uppercase leading-relaxed">
                  Low-and-slow attack keeping server HTTP connections open with partial request headers.
                </p>
              </div>
              <div className="liquid-glass p-5 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors duration-300">
                <h5 className="font-grotesk text-lg tracking-wider text-cream uppercase">DoS Slowhttptest</h5>
                <p className="mt-2 font-mono text-[10px] text-cream/50 uppercase leading-relaxed">
                  Slow-rate attack exhausting thread pools by delaying standard HTTP request bodies.
                </p>
              </div>
              <div className="liquid-glass p-5 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors duration-300">
                <h5 className="font-grotesk text-lg tracking-wider text-cream uppercase">FTP / SSH Patator</h5>
                <p className="mt-2 font-mono text-[10px] text-cream/50 uppercase leading-relaxed">
                  Multi-threaded network brute force attacks targeting authentication mechanisms.
                </p>
              </div>
              <div className="liquid-glass p-5 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors duration-300">
                <h5 className="font-grotesk text-lg tracking-wider text-cream uppercase">Web Brute Force</h5>
                <p className="mt-2 font-mono text-[10px] text-cream/50 uppercase leading-relaxed">
                  Application-layer credential stuffing and brute force login directory scanning.
                </p>
              </div>
              <div className="liquid-glass p-5 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors duration-300">
                <h5 className="font-grotesk text-lg tracking-wider text-cream uppercase">Web Attacks (XSS / SQLi)</h5>
                <p className="mt-2 font-mono text-[10px] text-cream/50 uppercase leading-relaxed">
                  Cross-Site Scripting injections and SQL database query manipulation threats.
                </p>
              </div>
              <div className="liquid-glass p-5 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors duration-300">
                <h5 className="font-grotesk text-lg tracking-wider text-cream uppercase">Botnet Coordination</h5>
                <p className="mt-2 font-mono text-[10px] text-cream/50 uppercase leading-relaxed">
                  Command & Control (C2) bot communication patterns and infected host actions.
                </p>
              </div>
              <div className="liquid-glass p-5 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors duration-300">
                <h5 className="font-grotesk text-lg tracking-wider text-cream uppercase">Infiltration / Heartbleed</h5>
                <p className="mt-2 font-mono text-[10px] text-cream/50 uppercase leading-relaxed">
                  Internal network pivoting, exploits, and SSL memory leakage vulnerability attacks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FINAL CTA */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden z-10">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 contrast-[1.6] brightness-[0.65] saturate-[1.4]"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <div className="relative z-10 max-w-[1831px] w-full mx-auto px-6 lg:px-[20%] flex flex-col items-end text-right">
          <div className="relative">
            <span className="absolute -top-12 left-0 font-condiment text-[48px] text-neon mix-blend-exclusion select-none">
              Go beyond
            </span>
            <h2 className="font-grotesk text-[35px] sm:text-[60px] uppercase leading-tight select-none">
              JOIN US.<br />
              REVEAL WHAT'S HIDDEN.<br />
              DEFINE WHAT'S NEXT.<br />
              DETECT THE SIGNAL.
            </h2>
            <div className="mt-12 flex justify-end">
              <Link href="/login" className="inline-block bg-neon text-background font-grotesk uppercase tracking-wider text-base px-16 py-5 rounded-full hover:scale-105 hover:shadow-[0_0_32px_rgba(111,255,0,0.6)] transition-all duration-300">
                Launch Console
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
