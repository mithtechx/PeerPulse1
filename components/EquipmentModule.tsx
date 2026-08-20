'use client';

import React, { useState, useEffect } from 'react';
import { Package, Tag } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Equipment {
  id: string;
  title: string;
  category: string;
  description: string;
}

export default function EquipmentModule() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [description, setDescription] = useState('');

  useEffect(() => { fetchEquipments(); }, []);

  const fetchEquipments = async () => {
    const { data } = await supabase.from('equipment').select('*').order('created_at', { ascending: false });
    if (data) setEquipments(data as Equipment[]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('equipment').insert([{ title, category, description }]);
    if (error) alert(`Error: ${error.message}`);
    else { setTitle(''); setDescription(''); fetchEquipments(); }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 text-indigo-700 font-black text-sm">
          <Package className="w-4 h-4" /> List Equipment to Share
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input required placeholder="Equipment Title" value={title} onChange={(e) => setTitle(e.target.value)} className="px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-bold">
            <option value="Electronics">Electronics</option>
            <option value="Lab Equipment">Lab Equipment</option>
            <option value="Books">Books</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
        <textarea required placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm" />
        <button type="submit" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold">List Equipment</button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {equipments.map((eq) => (
          <div key={eq.id} className="p-5 bg-white border rounded-2xl space-y-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 flex items-center gap-1 w-fit">
              <Tag className="w-3 h-3 text-indigo-600" /> {eq.category}
            </span>
            <h3 className="text-base font-black text-slate-900">{eq.title}</h3>
            <p className="text-xs text-slate-600">{eq.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}