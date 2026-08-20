'use client';

import React, { useState } from 'react';
import { BookOpen, Package, SearchX, ArrowRight, ShieldCheck } from 'lucide-react';
import AcademicModule from '@/components/AcademicModule';
import EquipmentModule from '@/components/EquipmentModule';
import LostFoundModule from '@/components/LostFoundModule';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'academic' | 'equipment' | 'lostfound'>('academic');

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* PeerPulse Hero Section */}
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 p-8 rounded-3xl text-white shadow-xl space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Campus Community Hub
            </span>
            <span className="text-xs font-semibold text-slate-300">Live Database Sync</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Welcome to PeerPulse
          </h1>
          <p className="text-sm sm:text-base text-indigo-100 max-w-2xl font-medium leading-relaxed">
            Your all-in-one student workspace. Post academic doubts, resolve homework queries, share campus lab equipment, and report lost or found items instantly.
          </p>

          {/* Interactive Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <button
              onClick={() => setActiveTab('academic')}
              className={`p-4 rounded-2xl text-left border transition-all ${
                activeTab === 'academic'
                  ? 'bg-white text-slate-900 border-white shadow-lg scale-[1.02]'
                  : 'bg-white/10 text-white border-white/10 hover:bg-white/20'
              }`}
            >
              <BookOpen className={`w-6 h-6 mb-2 ${activeTab === 'academic' ? 'text-indigo-600' : 'text-indigo-300'}`} />
              <div className="font-extrabold text-sm">Academic Doubts</div>
              <div className={`text-xs mt-1 ${activeTab === 'academic' ? 'text-slate-600' : 'text-slate-300'}`}>Ask questions & transfer to teachers</div>
            </button>

            <button
              onClick={() => setActiveTab('equipment')}
              className={`p-4 rounded-2xl text-left border transition-all ${
                activeTab === 'equipment'
                  ? 'bg-white text-slate-900 border-white shadow-lg scale-[1.02]'
                  : 'bg-white/10 text-white border-white/10 hover:bg-white/20'
              }`}
            >
              <Package className={`w-6 h-6 mb-2 ${activeTab === 'equipment' ? 'text-indigo-600' : 'text-indigo-300'}`} />
              <div className="font-extrabold text-sm">Equipment Sharing</div>
              <div className={`text-xs mt-1 ${activeTab === 'equipment' ? 'text-slate-600' : 'text-slate-300'}`}>Borrow lab kits & electronics</div>
            </button>

            <button
              onClick={() => setActiveTab('lostfound')}
              className={`p-4 rounded-2xl text-left border transition-all ${
                activeTab === 'lostfound'
                  ? 'bg-white text-slate-900 border-white shadow-lg scale-[1.02]'
                  : 'bg-white/10 text-white border-white/10 hover:bg-white/20'
              }`}
            >
              <SearchX className={`w-6 h-6 mb-2 ${activeTab === 'lostfound' ? 'text-indigo-600' : 'text-indigo-300'}`} />
              <div className="font-extrabold text-sm">Lost & Found</div>
              <div className={`text-xs mt-1 ${activeTab === 'lostfound' ? 'text-slate-600' : 'text-slate-300'}`}>Locate missing campus items</div>
            </button>
          </div>
        </div>

        {/* Selected Feature Workspace */}
        {activeTab === 'academic' && <AcademicModule />}
        {activeTab === 'equipment' && <EquipmentModule />}
        {activeTab === 'lostfound' && <LostFoundModule />}

      </div>
    </main>
  );
}