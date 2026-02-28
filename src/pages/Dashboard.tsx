import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Brain, Clock, BookOpen, Sparkles, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export function Dashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [contextInput, setContextInput] = useState("");
  const [detectedContext, setDetectedContext] = useState<any>(null);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/knowledge/dashboard/summary");
        if (res.ok) {
          const data = await res.json();
          setSummary(data);
        }
      } catch (error) {
        console.error("Failed to fetch summary", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const handleDetectContext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contextInput.trim()) return;

    setIsDetecting(true);
    try {
      const res = await fetch("/api/ai/detect-context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: contextInput }),
      });
      if (res.ok) {
        const data = await res.json();
        setDetectedContext(data);
      }
    } catch (error) {
      console.error("Failed to detect context", error);
    } finally {
      setIsDetecting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Welcome back, {user?.name}</h1>
        <p className="mt-1 text-sm text-zinc-500">Here's an overview of your productivity.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-zinc-200">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-indigo-50 p-3">
              <Clock className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Total Focus Time</p>
              <p className="text-2xl font-semibold text-zinc-900">{summary?.totalFocusTime || 0} min</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-zinc-200">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-50 p-3">
              <BookOpen className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Knowledge Items</p>
              <p className="text-2xl font-semibold text-zinc-900">{summary?.recentKnowledge?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-zinc-200">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-amber-50 p-3">
              <Brain className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Recent Sessions</p>
              <p className="text-2xl font-semibold text-zinc-900">{summary?.recentSessions?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl bg-white shadow-sm border border-zinc-200 overflow-hidden">
          <div className="p-6 border-b border-zinc-200 bg-zinc-50/50">
            <h2 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              AI Context Detection
            </h2>
            <p className="mt-1 text-sm text-zinc-500">Tell me what you're working on, and I'll set up your workspace.</p>
          </div>
          <div className="p-6">
            <form onSubmit={handleDetectContext} className="space-y-4">
              <textarea
                rows={3}
                className="block w-full rounded-xl border-0 py-3 px-4 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-none"
                placeholder="e.g., I need to study for my biology exam on cell structures..."
                value={contextInput}
                onChange={(e) => setContextInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={isDetecting || !contextInput.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 transition-colors"
              >
                {isDetecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
                Detect Context
              </button>
            </form>

            {detectedContext && (
              <div className="mt-6 rounded-xl bg-indigo-50 p-4 border border-indigo-100">
                <h3 className="text-sm font-medium text-indigo-900">Detected Context:</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 capitalize">
                    {detectedContext.context}
                  </span>
                  <span className="text-xs font-medium text-indigo-700">
                    Confidence: {detectedContext.confidenceScore}%
                  </span>
                </div>
                <div className="mt-4">
                  <Link
                    to={`/deep-work?context=${detectedContext.context}`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50 transition-colors"
                  >
                    Start Deep Work
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-sm border border-zinc-200 overflow-hidden">
          <div className="p-6 border-b border-zinc-200 bg-zinc-50/50">
            <h2 className="text-lg font-semibold text-zinc-900">Recent Knowledge</h2>
          </div>
          <div className="divide-y divide-zinc-200">
            {summary?.recentKnowledge?.length > 0 ? (
              summary.recentKnowledge.map((item: any) => (
                <div key={item.id} className="p-6 hover:bg-zinc-50 transition-colors">
                  <h3 className="text-sm font-medium text-zinc-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500 line-clamp-2">{item.content}</p>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-sm text-zinc-500">
                No knowledge items saved yet.
              </div>
            )}
            <div className="p-4 bg-zinc-50 text-center">
              <Link to="/knowledge-hub" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View all knowledge →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
