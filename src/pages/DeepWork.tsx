import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Play, Pause, Square, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { clsx } from "clsx";

export function DeepWork() {
  const [searchParams] = useSearchParams();
  const initialContext = searchParams.get("context") || "study";
  
  const [context, setContext] = useState(initialContext);
  const [workspace, setWorkspace] = useState<any>(null);
  const [loadingWorkspace, setLoadingWorkspace] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);

  useEffect(() => {
    if (context) {
      generateWorkspace(context);
    }
  }, [context]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
        setSessionDuration((dur) => dur + 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      handleSessionEnd();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const generateWorkspace = async (ctx: string) => {
    setLoadingWorkspace(true);
    try {
      const res = await fetch("/api/ai/generate-workspace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context: ctx }),
      });
      if (res.ok) {
        const text = await res.text();
        if (text) {
          const data = JSON.parse(text);
          setWorkspace(data);
        }
      } else {
        console.error("Generate workspace failed:", res.status, await res.text());
      }
    } catch (error) {
      console.error("Failed to generate workspace", error);
    } finally {
      setLoadingWorkspace(false);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
    setSessionDuration(0);
  };

  const handleSessionEnd = async () => {
    const durationMinutes = Math.floor(sessionDuration / 60);
    if (durationMinutes < 1) return; // Don't save very short sessions

    try {
      await fetch("/api/ai/deep-work/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context,
          duration_minutes: durationMinutes,
          focus_score: Math.floor(Math.random() * 20) + 80, // Mock score 80-100
        }),
      });
      alert("Session saved successfully!");
    } catch (error) {
      console.error("Failed to save session", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Deep Work Mode</h1>
          <p className="mt-1 text-sm text-zinc-500">Focus on what matters.</p>
        </div>
        <select
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="rounded-xl border-0 py-2 pl-3 pr-10 text-zinc-900 ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="study">Study</option>
          <option value="coding">Coding</option>
          <option value="research">Research</option>
          <option value="project">Project</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Timer Section */}
        <div className="md:col-span-2 rounded-3xl bg-white p-8 shadow-sm border border-zinc-200 flex flex-col items-center justify-center min-h-[400px]">
          <div className="relative">
            <svg className="w-64 h-64 transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                className="stroke-zinc-100"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                className="stroke-indigo-600 transition-all duration-1000 ease-linear"
                strokeWidth="8"
                fill="none"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - timeLeft / (25 * 60))}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-mono font-light text-zinc-900 tracking-tight">
                {formatTime(timeLeft)}
              </span>
              <span className="text-sm font-medium text-zinc-500 mt-2 uppercase tracking-widest">
                {isActive ? "Focusing" : "Paused"}
              </span>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <button
              onClick={toggleTimer}
              className={clsx(
                "flex h-14 w-14 items-center justify-center rounded-full shadow-sm transition-all hover:scale-105",
                isActive ? "bg-amber-100 text-amber-700 hover:bg-amber-200" : "bg-indigo-600 text-white hover:bg-indigo-500"
              )}
            >
              {isActive ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current ml-1" />}
            </button>
            <button
              onClick={resetTimer}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 shadow-sm hover:bg-zinc-200 transition-all"
            >
              <Square className="h-5 w-5 fill-current" />
            </button>
          </div>
        </div>

        {/* AI Workspace Section */}
        <div className="rounded-3xl bg-zinc-900 p-6 text-white shadow-xl flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-semibold">Smart Workspace</h2>
          </div>

          {loadingWorkspace ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
            </div>
          ) : workspace ? (
            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div>
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Suggested Tasks</h3>
                <ul className="space-y-3">
                  {workspace.tasks?.map((task: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                      <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Recommended Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {workspace.tools?.map((tool: string, i: number) => (
                    <span key={i} className="inline-flex items-center rounded-md bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-300 ring-1 ring-inset ring-zinc-700">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-zinc-800">
                <p className="text-sm italic text-zinc-400">"{workspace.message}"</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-zinc-500 text-center">
              Select a context to generate your workspace.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
