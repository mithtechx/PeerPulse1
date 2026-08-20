'use client';

import React, { useState, useEffect } from 'react';
import { Package, Tag, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Equipment {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url?: string;
}

export default function EquipmentModule() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => { fetchEquipments(); }, []);

  const fetchEquipments = async () => {
    const { data } = await supabase.from('equipment').select('*').order('created_at', { ascending: false });
    if (data) setEquipments(data as Equipment[]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('equipment').insert([
      { title, category, description, image_url: imageUrl || null }
    ]);
    if (error) alert(`Error: ${error.message}`);
    else { setTitle(''); setDescription(''); setImageUrl(''); fetchEquipments(); }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-base">
          <Package className="w-5 h-5" /> List Equipment to Share
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input required placeholder="Equipment Title (e.g. Arduino Kit)" value={title} onChange={(e) => setTitle(e.target.value)} className="px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800">
            <option value="Electronics">Electronics</option>
            <option value="Lab Equipment">Lab Equipment</option>
            <option value="Books">Books</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
        <textarea required placeholder="Item condition & borrowing rules..." value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400" />
        
        <div className="relative">
          <ImageIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input placeholder="Optional Image URL (e.g. https://...)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400" />
        </div>

        <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-sm transition">
          List Equipment
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {equipments.map((eq) => (
          <div key={eq.id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 flex items-center gap-1">
                <Tag className="w-3 h-3 text-indigo-600" /> {eq.category}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Available</span>
            </div>
            <h3 className="text-base font-black text-slate-900">{eq.title}</h3>
            <p className="text-sm font-medium text-slate-700">{eq.description}</p>
            {eq.image_url && (
              <img src={eq.image_url} alt={eq.title} className="h-40 w-full rounded-xl object-cover border border-slate-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}