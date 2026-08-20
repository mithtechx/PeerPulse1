'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Package, 
  SearchX, 
  ShieldCheck, 
  ArrowLeft, 
  Activity, 
  FileText, 
  Phone, 
  Heart,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import AcademicModule from '@/components/AcademicModule';
import EquipmentModule from '@/components/EquipmentModule';
import LostFoundModule from '@/components/LostFoundModule';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'academic' | 'equipment' | 'lostfound'>('home');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans">
      
      {/* Top Header Navigation */}
      <header className="bg-white/90 backdrop-blur-md border-b border-sky-100 px-6 py-4 sticky top-0 z-50 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-sky-200 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="font-black text-xl text-slate-900 tracking-tight leading-none flex items-center gap-1.5">
                PeerPulse <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              </div>
              <div className="text-[11px] font-bold text-sky-600 tracking-wider uppercase mt-1">
                Made for Scaler School of Technology
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {activeTab !== 'home' ? (
              <button
                onClick={() => setActiveTab('home')}
                className="px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl text-xs font-bold transition flex items-center gap-2 border border-sky-200"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
              </button>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Live Database Active
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-6xl mx-auto w-full p-4 sm:p-8 flex-1 space-y-12">
        
        {/* ================= MAIN DASHBOARD VIEW ================= */}
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fadeIn">
            
            {/* Hero Introduction Banner */}
            <div className="relative bg-gradient-to-br from-sky-500 via-sky-400 to-blue-600 rounded-3xl p-8 sm:p-14 text-white shadow-xl shadow-sky-200/60 overflow-hidden border border-sky-300">
              <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-blue-700/20 rounded-full blur-xl pointer-events-none"></div>

              <div className="relative z-10 space-y-6 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white backdrop-blur-md text-xs font-black uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-sky-100" /> Student Peer Platform
                </div>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white">
                  Collaborate, Share & Solve Together
                </h1>

                <p className="text-base sm:text-lg text-sky-50 font-medium leading-relaxed max-w-2xl">
                  PeerPulse is the central digital hub built exclusively for SST students. Clear doubt backlogs with peers or instructors, request lab devices, and trace missing campus items.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button 
                    onClick={() => setActiveTab('academic')}
                    className="px-6 py-3 bg-white text-sky-700 font-extrabold rounded-2xl text-sm shadow-md hover:bg-sky-50 transition flex items-center gap-2 group"
                  >
                    Ask a Doubt <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('equipment')}
                    className="px-6 py-3 bg-sky-600/40 hover:bg-sky-600/60 text-white border border-white/30 font-bold rounded-2xl text-sm transition backdrop-blur-md"
                  >
                    Browse Equipment
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Live Stats Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs space-y-1">
                <div className="flex items-center gap-2 text-sky-600 text-xs font-bold uppercase">
                  <MessageSquare className="w-4 h-4" /> Doubts Resolved
                </div>
                <div className="text-2xl font-black text-slate-900">120+</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs space-y-1">
                <div className="flex items-center gap-2 text-sky-600 text-xs font-bold uppercase">
                  <Package className="w-4 h-4" /> Lab Items Shared
                </div>
                <div className="text-2xl font-black text-slate-900">45+</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs space-y-1">
                <div className="flex items-center gap-2 text-sky-600 text-xs font-bold uppercase">
                  <Users className="w-4 h-4" /> Active Students
                </div>
                <div className="text-2xl font-black text-slate-900">300+</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs space-y-1">
                <div className="flex items-center gap-2 text-sky-600 text-xs font-bold uppercase">
                  <Clock className="w-4 h-4" /> Avg Response
                </div>
                <div className="text-2xl font-black text-slate-900">&lt; 15 mins</div>
              </div>
            </div>

            {/* 3 Main Action Feature Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-sky-500" /> Explore Features
                </h2>
                <span className="text-xs font-bold text-slate-600">Select a portal to view records</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Academic Card */}
                <div 
                  onClick={() => setActiveTab('academic')}
                  className="bg-white p-8 rounded-3xl border-2 border-sky-100 hover:border-sky-400 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors shadow-xs">
                      <BookOpen className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors">Academic Doubts</h3>
                      <p className="text-sm font-medium text-slate-600 mt-2 leading-relaxed">
                        Submit queries on DSA, Web Dev, or Systems. Resolve doubts with peers or transfer them to instructors.
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-extrabold text-sky-600 flex items-center gap-1 pt-2">
                    Open Academic Portal &rarr;
                  </div>
                </div>

                {/* Equipment Card */}
                <div 
                  onClick={() => setActiveTab('equipment')}
                  className="bg-white p-8 rounded-3xl border-2 border-sky-100 hover:border-sky-400 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors shadow-xs">
                      <Package className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors">Equipment Sharing</h3>
                      <p className="text-sm font-medium text-slate-600 mt-2 leading-relaxed">
                        Lend or borrow Arduino kits, adapters, lab gear, textbooks, and monitors across campus.
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-extrabold text-sky-600 flex items-center gap-1 pt-2">
                    Open Equipment Portal &rarr;
                  </div>
                </div>

                {/* Lost & Found Card */}
                <div 
                  onClick={() => setActiveTab('lostfound')}
                  className="bg-white p-8 rounded-3xl border-2 border-sky-100 hover:border-sky-400 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors shadow-xs">
                      <SearchX className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors">Lost & Found</h3>
                      <p className="text-sm font-medium text-slate-600 mt-2 leading-relaxed">
                        Report items lost or found around classrooms, hostels, and cafeteria spaces.
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-extrabold text-sky-600 flex items-center gap-1 pt-2">
                    Open Lost & Found Board &rarr;
                  </div>
                </div>

              </div>
            </div>

            {/* Platform Guidelines Section */}
            <div className="bg-white p-8 rounded-3xl border border-sky-100 shadow-xs space-y-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-sky-500" /> Platform Usage Guidelines
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-600">
                <div className="p-4 bg-sky-50/50 rounded-2xl border border-sky-100">
                  <span className="font-extrabold text-slate-900 block mb-1">1. Keep Discussions Academic</span>
                  Ensure queries posted in the Academic section are relevant to SST course modules.
                </div>
                <div className="p-4 bg-sky-50/50 rounded-2xl border border-sky-100">
                  <span className="font-extrabold text-slate-900 block mb-1">2. Treat Shared Equipment with Care</span>
                  Return borrowed hardware and lab tools promptly in original condition.
                </div>
                <div className="p-4 bg-sky-50/50 rounded-2xl border border-sky-100">
                  <span className="font-extrabold text-slate-900 block mb-1">3. Verify Contact Details</span>
                  Provide accurate phone numbers or emails when filing lost/found reports.
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= DEDICATED MODULE VIEWS ================= */}
        {activeTab === 'academic' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-slate-900">Academic Doubts Portal</h2>
                <p className="text-xs font-bold text-slate-600 mt-1">Ask questions, share code snippets, or request instructor help.</p>
              </div>
            </div>
            <AcademicModule />
          </div>
        )}

        {activeTab === 'equipment' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Campus Equipment Sharing</h2>
              <p className="text-xs font-bold text-slate-600 mt-1">Lend or borrow development hardware and accessories.</p>
            </div>
            <EquipmentModule />
          </div>
        )}

        {activeTab === 'lostfound' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Lost & Found Board</h2>
              <p className="text-xs font-bold text-slate-600 mt-1">Report or claim misplaced items on SST premises.</p>
            </div>
            <LostFoundModule />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-sky-100 py-8 px-6 mt-16 text-slate-600">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-slate-700 font-bold">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Scaler Students
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-sky-600 cursor-pointer flex items-center gap-1 transition">
              <FileText className="w-3.5 h-3.5 text-sky-500" /> Terms & Conditions
            </span>
            <span className="hover:text-sky-600 cursor-pointer flex items-center gap-1 transition">
              <Phone className="w-3.5 h-3.5 text-sky-500" /> Campus Support Contact
            </span>
          </div>

          <div className="text-slate-600">
            © 2026 Scaler School of Technology. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}