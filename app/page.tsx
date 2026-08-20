'use client';

import React, { useState } from 'react';
import { BookOpen, Package, SearchX } from 'lucide-react';
import AcademicModule from '@/components/AcademicModule';
import EquipmentModule from '@/components/EquipmentModule';
import LostFoundModule from '@/components/LostFoundModule';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'academic' | 'equipment' | 'lostfound'>('academic');

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black text-indigo-600 flex items-center gap-2">
              PeerPulse Campus Portal
            </h1>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              ● Supabase Connected
            </span>
          </div>

          <div className="flex border-b border-slate-200 gap-2 sm:gap-6 pt-2">
            <button
              onClick={() => setActiveTab('academic')}
              className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
                activeTab === 'academic' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Academic Doubts
            </button>
            <button
              onClick={() => setActiveTab('equipment')}
              className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
                activeTab === 'equipment' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Package className="w-4 h-4" /> Equipment Sharing
            </button>
            <button
              onClick={() => setActiveTab('lostfound')}
              className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
                activeTab === 'lostfound' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <SearchX className="w-4 h-4" /> Lost & Found
            </button>
          </div>
        </div>

        {activeTab === 'academic' && <AcademicModule />}
        {activeTab === 'equipment' && <EquipmentModule />}
        {activeTab === 'lostfound' && <LostFoundModule />}

      </div>
    </main>
  );
}