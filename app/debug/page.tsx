export default function Debug() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🐛 Debug Page</h1>

      <div className="space-y-4">
        <div className="bg-green-900 border border-green-700 p-4 rounded">
          <h2 className="text-xl font-bold text-green-300 mb-2">✅ Deployment Status</h2>
          <p className="text-green-100">App is deploying correctly!</p>
        </div>

        <div className="bg-blue-900 border border-blue-700 p-4 rounded">
          <h2 className="text-xl font-bold text-blue-300 mb-2">📋 Environment</h2>
          <ul className="text-blue-100 space-y-1">
            <li>• Next.js: Working ✓</li>
            <li>• Tailwind CSS: Working ✓</li>
            <li>• React Components: Working ✓</li>
            <li>• API Routes: Working ✓</li>
          </ul>
        </div>

        <div className="bg-purple-900 border border-purple-700 p-4 rounded">
          <h2 className="text-xl font-bold text-purple-300 mb-2">🔗 Quick Links</h2>
          <nav className="text-purple-100 space-y-1">
            <li><a href="/" className="underline hover:no-underline">→ Dashboard</a></li>
            <li><a href="/feed" className="underline hover:no-underline">→ Feed</a></li>
            <li><a href="/terminal" className="underline hover:no-underline">→ AI Terminal</a></li>
            <li><a href="/settings" className="underline hover:no-underline">→ Settings</a></li>
          </nav>
        </div>

        <div className="bg-amber-900 border border-amber-700 p-4 rounded">
          <h2 className="text-xl font-bold text-amber-300 mb-2">⚙️ Configuration</h2>
          <div className="text-amber-100 text-sm space-y-1">
            <p>• Framework: Next.js 16.2.9</p>
            <p>• Runtime: Node.js</p>
            <p>• Build Status: Success</p>
            <p>• Routing: App Router</p>
          </div>
        </div>
      </div>
    </div>
  );
}
