'use client';

import { useState } from 'react';

interface Change {
  id: string;
  date: string;
  title: string;
  description: string;
  changedFrom: string;
  changedTo: string;
  source: string;
}

export default function AnnouncementBar() {
  const [showAllChanges, setShowAllChanges] = useState(false);

  // Sample changes - replace with your actual data
  const changes: Change[] = [
    {
      id: '1',
      date: '2025-12-18',
      title: 'Policy Update',
      description: 'Updated privacy policy',
      changedFrom: 'Data retention: 90 days',
      changedTo: 'Data retention: 180 days',
      source: 'Announcement #2025-12',
    },
  ];

  const latestChange = changes[0];

  return (
    <div className="w-full bg-gradient-to-r from-pink-600/20 to-purple-600/20 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-500/30 text-pink-200">
                Latest Update
              </span>
              <span className="text-sm text-gray-300">{latestChange.date}</span>
            </div>
            <p className="mt-1 text-sm text-white">
              <span className="font-semibold">{latestChange.title}</span> - {latestChange.description}
            </p>
            <p className="mt-1 text-xs text-gray-300">
              Changed from: <span className="text-red-300">{latestChange.changedFrom}</span> → 
              <span className="text-green-300"> {latestChange.changedTo}</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">Source: {latestChange.source}</p>
          </div>
          <button
            onClick={() => setShowAllChanges(!showAllChanges)}
            className="ml-4 px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            {showAllChanges ? 'Hide' : 'View All Changes'}
          </button>
        </div>

        {showAllChanges && (
          <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
            {changes.map((change) => (
              <div
                key={change.id}
                className="bg-white/5 rounded-lg p-4 border border-white/10"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-400">{change.date}</span>
                  <span className="text-sm font-semibold text-white">{change.title}</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{change.description}</p>
                <div className="text-xs space-y-1">
                  <p className="text-gray-300">
                    From: <span className="text-red-300">{change.changedFrom}</span>
                  </p>
                  <p className="text-gray-300">
                    To: <span className="text-green-300">{change.changedTo}</span>
                  </p>
                  <p className="text-gray-400">Source: {change.source}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
