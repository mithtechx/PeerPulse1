'use client';

import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const SUBJECTS = [
  'Mathematics for Programming',
  'Introduction to Computer Programming',
  'Web Development',
  'Data Structures & Algorithms',
  'System Design'
];

interface Doubt {
  id: string;
  title: string;
  subject_code: string;
  description: string;
  is_resolved: boolean;
}

export default function AcademicModule() {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [title, setTitle] = useState('');
  const [subjectCode, setSubjectCode] = useState(SUBJECTS[0]);
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchDoubts(); }, []);

  const fetchDoubts = async () => {
    setLoading(true);
    const { data } = await supabase.from('doubts').select('*').order('created_at', { ascending: false });
    if (data) setDoubts(data as Doubt[]);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from('doubts').insert([{ title, subject_code: subjectCode, description }]);
    if (error) alert(`Error: ${error.message}`);
    else { setTitle(''); setDescription(''); fetchDoubts(); }
    setSubmitting(false);
  };

  const filteredDoubts = doubts.filter(
    (d) => d.title.toLowerCase().includes(search.toLowerCase()) && (subjectFilter === '' || d.subject_code === subjectFilter)
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            placeholder="Search academic doubts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
          />
        </div>
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="sm:w-64 py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
        >
          <option value="">All Subject Codes</option>
          {SUBJECTS.map((sub) => (<option key={sub} value={sub}>{sub}</option>))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 text-indigo-700 font-black text-sm">
          <PlusCircle className="w-4 h-4" /> Post an Academic Doubt
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input required placeholder="Doubt Title" value={title} onChange={(e) => setTitle(e.target.value)} className="px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm" />
          <select value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} className="px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-bold">
            {SUBJECTS.map((sub) => (<option key={sub} value={sub}>{sub}</option>))}
          </select>
        </div>
        <textarea required placeholder="Explain doubt..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm" />
        <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold flex items-center gap-2">
          {submitting && <Loader2 className="w-4 h-4 animate-spin" />} Submit Doubt
        </button>
      </form>

      {loading ? (
        <div className="animate-pulse h-28 bg-slate-200 rounded-2xl"></div>
      ) : (
        <div className="space-y-4">
          {filteredDoubts.map((doubt) => (
            <div key={doubt.id} className="p-5 bg-white border rounded-2xl space-y-2">
              <span className="text-xs font-extrabold px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700">{doubt.subject_code}</span>
              <h3 className="text-base font-black text-slate-900">{doubt.title}</h3>
              <p className="text-xs text-slate-700">{doubt.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}