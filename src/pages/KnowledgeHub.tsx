import React, { useState, useEffect } from "react";
import { Search, Plus, FileText, Tag, Loader2, BookOpen } from "lucide-react";

export function KnowledgeHub() {
  const [knowledge, setKnowledge] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("");

  const fetchKnowledge = async (query = "") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/knowledge/search?q=${query}`);
      if (res.ok) {
        const text = await res.text();
        if (text) {
          const data = JSON.parse(text);
          setKnowledge(data.results);
        }
      } else {
        console.error("Search failed:", res.status);
      }
    } catch (error) {
      console.error("Failed to fetch knowledge", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKnowledge();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchKnowledge(searchQuery);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    try {
      const tagsArray = newTags.split(",").map(t => t.trim()).filter(Boolean);
      const res = await fetch("/api/knowledge/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, content: newContent, tags: tagsArray }),
      });

      const text = await res.text();
      if (!text) {
        console.error("Save knowledge: Empty response", res.status);
        return;
      }

      let responseData;
      try {
        responseData = JSON.parse(text);
      } catch (e) {
        console.error("Failed to parse save response:", text);
        return;
      }

      if (res.ok) {
        setIsAdding(false);
        setNewTitle("");
        setNewContent("");
        setNewTags("");
        fetchKnowledge();
      } else {
        console.error("Failed to save knowledge:", responseData?.error || text);
      }
    } catch (error) {
      console.error("Failed to save knowledge", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Knowledge Hub</h1>
          <p className="mt-1 text-sm text-zinc-500">Your personal repository of insights.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Note
        </button>
      </div>

      <div className="flex items-center gap-4">
        <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search notes, tags, content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-xl border-0 py-2.5 pl-10 pr-4 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </form>
      </div>

      {isAdding && (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-zinc-200">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">New Note</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-zinc-900">Title</label>
              <input
                type="text"
                id="title"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="block w-full rounded-xl border-0 py-2.5 px-3 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium leading-6 text-zinc-900">Content</label>
              <textarea
                id="content"
                required
                rows={4}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="block w-full rounded-xl border-0 py-2.5 px-3 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-none"
              />
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-medium leading-6 text-zinc-900">Tags (comma separated)</label>
              <input
                type="text"
                id="tags"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                placeholder="e.g., react, study, project"
                className="block w-full rounded-xl border-0 py-2.5 px-3 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Save Note
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {knowledge.map((item) => (
            <div key={item.id} className="rounded-2xl bg-white p-6 shadow-sm border border-zinc-200 hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="flex items-start gap-3 mb-4">
                <div className="rounded-xl bg-indigo-50 p-2 shrink-0">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 line-clamp-1">{item.title}</h3>
              </div>
              <p className="text-sm text-zinc-600 line-clamp-4 flex-1 mb-4">{item.content}</p>
              
              {item.tags && (
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-zinc-100">
                  {JSON.parse(item.tags).map((tag: string, i: number) => (
                    <span key={i} className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
          {knowledge.length === 0 && !isAdding && (
            <div className="col-span-full flex flex-col items-center justify-center h-64 text-zinc-500">
              <BookOpen className="h-12 w-12 mb-4 text-zinc-300" />
              <p>No knowledge items found.</p>
              <p className="text-sm mt-1">Add a note to get started.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
