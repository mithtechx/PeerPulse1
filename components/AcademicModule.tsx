'use client';

import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, Loader2, CheckCircle2, AlertCircle, Send, Image as ImageIcon } from 'lucide-react';
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
  forwarded_to_instructor: boolean;
  image_url?: string;
  created_at?: string;
}

export default function AcademicModule() {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  
  const [title, setTitle] = useState('');
  const [subjectCode, setSubjectCode] = useState(SUBJECTS[0]);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
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
    const { error } = await supabase.from('doubts').insert([
      { title, subject_code: subjectCode, description, image_url: imageUrl || null, is_resolved: false, forwarded_to_instructor: false }
    ]);
    if (error) alert(`Error: ${error.message}`);
    else { setTitle(''); setDescription(''); setImageUrl(''); fetchDoubts(); }
    setSubmitting(false);
  };

  const toggleResolved = async (doubt: Doubt) => {
    await supabase.from('doubts').update({ is_resolved: !doubt.is_resolved }).eq('id', doubt.id);
    fetchDoubts();
  };

  const toggleForwarded = async (doubt: Doubt) => {
    await supabase.from('doubts').update({ forwarded_to_instructor: !doubt.forwarded_to_instructor }).eq('id', doubt.id);
    fetchDoubts();
  };

  const filteredDoubts = doubts.filter(
    (d) => d.title.toLowerCase().includes(search.toLowerCase()) && (subjectFilter === '' || d.subject_code === subjectFilter)
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
          <input
            placeholder="Search academic doubts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="sm:w-64 py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Subject Codes</option>
          {SUBJECTS.map((sub) => (<option key={sub} value={sub}>{sub}</option>))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-base">
          <PlusCircle className="w-5 h-5" /> Ask an Academic Doubt
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input required placeholder="Doubt Title" value={title} onChange={(e) => setTitle(e.target.value)} className="px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400" />
          <select value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} className="px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800">
            {SUBJECTS.map((sub) => (<option key={sub} value={sub}>{sub}</option>))}
          </select>
        </div>
        <textarea required placeholder="Explain your doubt in detail..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400" />
        
        <div className="relative">
          <ImageIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input placeholder="Optional Image URL (e.g. https://...)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400" />
        </div>

        <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm transition">
          {submitting && <Loader2 className="w-4 h-4 animate-spin" />} Submit Doubt
        </button>
      </form>

      {loading ? (
        <div className="animate-pulse h-28 bg-slate-200 rounded-2xl"></div>
      ) : filteredDoubts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 font-bold text-sm">
          No doubts found.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDoubts.map((doubt) => (
            <div key={doubt.id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <span className="text-xs font-black px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {doubt.subject_code}
                </span>
                <div className="flex items-center gap-2">
                  {doubt.forwarded_to_instructor && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 flex items-center gap-1">
                      <Send className="w-3 h-3" /> Sent to Teacher
                    </span>
                  )}
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    doubt.is_resolved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {doubt.is_resolved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    {doubt.is_resolved ? 'Resolved' : 'Open'}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900">{doubt.title}</h3>
                <p className="text-sm font-medium text-slate-700 mt-1 leading-relaxed">{doubt.description}</p>
              </div>

              {doubt.image_url && (
                <img src={doubt.image_url} alt="Doubt attachment" className="max-h-48 rounded-xl object-cover border border-slate-200" />
              )}

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button onClick={() => toggleForwarded(doubt)} className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition flex items-center gap-1">
                  <Send className="w-3 h-3" /> {doubt.forwarded_to_instructor ? 'Cancel Transfer' : 'Transfer to Teacher'}
                </button>
                <button onClick={() => toggleResolved(doubt)} className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition">
                  {doubt.is_resolved ? 'Mark Unresolved' : 'Mark Resolved'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}