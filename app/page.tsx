'use client';

import React, { useState } from 'react';
import { BookOpen, Package, SearchX, ShieldCheck, ArrowLeft, Activity, FileText, Phone, Heart } from 'lucide-react';
import AcademicModule from '@/components/AcademicModule';
import EquipmentModule from '@/components/EquipmentModule';
import LostFoundModule from '@/components/LostFoundModule';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'academic' | 'equipment' | 'lostfound'>('home');

  return (
    <main className="min-h-screen bg-sky-50/50 text-slate-800 flex flex-col justify-between">
      
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-sky-100 px-6 py-4 sticky top-0 z-50 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-200 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="font-black text-xl text-slate-900 tracking-tight leading-none flex items-center gap-1">
                PeerPulse <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              </div>
              <div className="text-[11px] font-bold text-sky-600 tracking-wide uppercase mt-0.5">
                Made for Scaler School of Technology
              </div>
            </div>
          </div>

          {activeTab !== 'home' && (
            <button
              onClick={() => setActiveTab('home')}
              className="px-4 py-2 bg-sky-100 hover:bg-sky-200 text-sky-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto w-full p-4 sm:p-8 flex-1 space-y-8">
        
        {/* DASHBOARD FRONT VIEW */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Big Introduction Header */}
            <div className="bg-gradient-to-r from-sky-500 via-sky-400 to-blue-500 rounded-3xl p-8 sm:p-12 text-white shadow-xl shadow-sky-200/50 relative overflow-hidden">
              <div className="relative z-10 space-y-4 max-w-2xl">
                <span className="text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-white backdrop-blur-xs inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sky-100" /> Student Portal Dashboard
                </span>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  Welcome to PeerPulse
                </h1>
                <p className="text-base sm:text-lg text-sky-50 font-medium leading-relaxed">
                  The official collaborative platform built exclusively for SST students. Ask academic queries, lend or borrow lab gear, and trace lost campus items easily.
                </p>
              </div>
            </div>

            {/* 3 Main Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div 
                onClick={() => setActiveTab('academic')}
                className="bg-white p-8 rounded-3xl border-2 border-sky-100 hover:border-sky-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors">Academic Doubts</h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">Get solutions, discuss homework, or forward unresolved issues to course instructors.</p>
                </div>
                <div className="text-xs font-bold text-sky-600 flex items-center gap-1 pt-2">
                  Open Portal &rarr;
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('equipment')}
                className="bg-white p-8 rounded-3xl border-2 border-sky-100 hover:border-sky-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors">
                  <Package className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors">Equipment Sharing</h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">Share or request microcontroller kits, lab coats, hardware accessories, and textbooks.</p>
                </div>
                <div className="text-xs font-bold text-sky-600 flex items-center gap-1 pt-2">
                  Open Portal &rarr;
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('lostfound')}
                className="bg-white p-8 rounded-3xl border-2 border-sky-100 hover:border-sky-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors">
                  <SearchX className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors">Lost & Found</h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">Post about misplaced items on campus grounds and contact finders quickly.</p>
                </div>
                <div className="text-xs font-bold text-sky-600 flex items-center gap-1 pt-2">
                  Open Portal &rarr;
                </div>
              </div>

            </div>

          </div>
        )}

        {/* DEEP MODULE VIEWS (Opened when clicked) */}
        {activeTab === 'academic' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-2xl font-black text-slate-900">
              <BookOpen className="w-7 h-7 text-sky-500" /> Academic Doubts Portal
            </div>
            <AcademicModule />
          </div>
        )}

        {activeTab === 'equipment' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-2xl font-black text-slate-900">
              <Package className="w-7 h-7 text-sky-500" /> Campus Equipment Hub
            </div>
            <EquipmentModule />
          </div>
        )}

        {activeTab === 'lostfound' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-2xl font-black text-slate-900">
              <SearchX className="w-7 h-7 text-sky-500" /> Lost & Found Board
            </div>
            <LostFoundModule />
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-sky-100 py-8 px-6 mt-12 text-slate-600">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-slate-700 font-bold">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Scaler Students
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-sky-600 cursor-pointer flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-sky-500" /> Terms & Conditions
            </span>
            <span className="hover:text-sky-600 cursor-pointer flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-sky-500" /> Campus Support Contact
            </span>
          </div>

          <div>
            © 2026 Scaler School of Technology. All rights reserved.
          </div>
        </div>
      </footer>

    </main>
  );
}