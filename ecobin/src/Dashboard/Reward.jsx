import React from "react";

const leaderboardData = [
  { rank: 1, name: "John Doe", role: "Product Owner", points: 162, avatar: "https://i.pravatar.cc/50?img=1" },
  { rank: 2, name: "Greg Horovitz", role: "UX Designer", points: 154, avatar: "https://i.pravatar.cc/50?img=2" },
  { rank: 3, name: "Kate Billman", role: "Account Executive", points: 138, avatar: "https://i.pravatar.cc/50?img=3" },
  { rank: 4, name: "Leonard P. Mitchell", role: "Developer", points: 89, avatar: "https://i.pravatar.cc/50?img=4" },
];

export default function Leaderboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Leaderboard</h1>
        <nav className="mt-6 space-y-3">
          <button className="w-full text-left p-3 bg-green-600 text-white rounded-md flex items-center">
            📊 <span className="ml-2">Dashboard</span>
          </button>
          <button className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center">
            📶 <span className="ml-2">Analyze</span>
          </button>
          <button className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center ">
            🏆 <span className="ml-2">Rewards</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🏆 Top Performers</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="p-3 text-left">Rank</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => (
                <tr key={entry.rank} className="border-b hover:bg-green-50">
                  <td className="p-3 font-bold">#{entry.rank}</td>
                  <td className="p-3 flex items-center">
                    <img src={entry.avatar} alt="avatar" className="w-8 h-8 rounded-full mr-2" />
                    {entry.name}
                  </td>
                  <td className="p-3 text-gray-600">{entry.role}</td>
                  <td className="p-3 text-green-600 font-semibold">{entry.points} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
