import { Link } from "react-router-dom";
import { Brain, Zap, Shield, Sparkles } from "lucide-react";

export function Landing() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold tracking-tight text-zinc-900">WorkWeaver AI</span>
            </Link>
          </div>
          <div className="flex flex-1 justify-end gap-x-6">
            <Link to="/login" className="text-sm font-semibold leading-6 text-zinc-900 hover:text-indigo-600 transition-colors">
              Log in
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </nav>
      </header>

      <main className="isolate">
        {/* Hero section */}
        <div className="relative pt-14">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>
          
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
                  Deep work, <span className="text-indigo-600">woven together</span> by AI.
                </h1>
                <p className="mt-6 text-lg leading-8 text-zinc-600">
                  WorkWeaver AI automatically detects your context, generates smart workspaces, and helps you achieve flow state faster. Built for students and researchers.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    to="/signup"
                    className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:scale-105"
                  >
                    Get started
                  </Link>
                  <Link to="/login" className="text-sm font-semibold leading-6 text-zinc-900 flex items-center gap-1 group">
                    Learn more <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Work Smarter</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Everything you need for deep focus
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {[
                {
                  name: 'Context Detection',
                  description: 'Automatically detects if you are studying, coding, or researching, and adapts the workspace.',
                  icon: Brain,
                },
                {
                  name: 'Smart Workspace',
                  description: 'Generates tailored tasks, tools, and motivation based on your current context.',
                  icon: Sparkles,
                },
                {
                  name: 'Deep Work Mode',
                  description: 'Built-in Pomodoro timer with focus scoring to track and improve your productivity.',
                  icon: Zap,
                },
                {
                  name: 'Knowledge Hub',
                  description: 'A secure, searchable repository for all your notes, summaries, and project reflections.',
                  icon: Shield,
                },
              ].map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-zinc-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-zinc-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Video section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Learn the Concept</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Mastering Deep Work
            </p>
          </div>
          <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-xl border border-zinc-200 bg-zinc-900">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/oulVKbk0umo"
              title="Deep Work Summary"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 mt-auto">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-zinc-500">
              &copy; 2026 WorkWeaver AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
