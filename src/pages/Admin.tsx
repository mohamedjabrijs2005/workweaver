import { useState, useEffect } from "react";
import { Users, Activity, ShieldAlert, Loader2 } from "lucide-react";

export function Admin() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch users here.
    // For this demo, we'll just simulate it.
    setTimeout(() => {
      setUsers([
        { id: "1", name: "Admin User", email: "admin@example.com", role: "admin", created_at: new Date().toISOString() },
        { id: "2", name: "Test User", email: "test@example.com", role: "user", created_at: new Date().toISOString() },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

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
        <h1 className="text-2xl font-bold text-zinc-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">Manage users and system settings.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-zinc-200">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-indigo-50 p-3">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Total Users</p>
              <p className="text-2xl font-semibold text-zinc-900">{users.length}</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-zinc-200">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-50 p-3">
              <Activity className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Active Sessions</p>
              <p className="text-2xl font-semibold text-zinc-900">12</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-zinc-200">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-rose-50 p-3">
              <ShieldAlert className="h-6 w-6 text-rose-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">System Alerts</p>
              <p className="text-2xl font-semibold text-zinc-900">0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white shadow-sm border border-zinc-200 overflow-hidden">
        <div className="p-6 border-b border-zinc-200 bg-zinc-50/50">
          <h2 className="text-lg font-semibold text-zinc-900">User Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200">
            <thead className="bg-zinc-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-zinc-900 sm:pl-6">Name</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">Email</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">Role</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">Joined</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-900 sm:pl-6">
                    {user.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{user.email}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      user.role === 'admin' 
                        ? 'bg-indigo-50 text-indigo-700 ring-indigo-600/20' 
                        : 'bg-zinc-50 text-zinc-600 ring-zinc-500/10'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
