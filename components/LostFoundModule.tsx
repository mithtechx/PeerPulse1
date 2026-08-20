'use client';

import React, { useState, useEffect } from 'react';
import { SearchX, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface LostFoundItem {
  id: string;
  type: 'lost' | 'found';
  title: string;
  location: string;
  description: string;
  contact_info: string;
  image_url?: string;
}

export default function LostFoundModule() {
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [type, setType] = useState<'lost' | 'found'>('lost');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from('lost_found').select('*').order('created_at', { ascending: false });
    if (data) setItems(data as LostFoundItem[]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('lost_found').insert([
      { type, title, location, contact_info: contact, description, image_url: imageUrl || null }
    ]);
    if (error) alert(`Error: ${error.message}`);
    else { setTitle(''); setLocation(''); setContact(''); setDescription(''); setImageUrl(''); fetchItems(); }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-base">
          <SearchX className="w-5 h-5" /> Report Lost or Found Item
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select value={type} onChange={(e) => setType(e.target.value as 'lost' | 'found')} className="px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800">
            <option value="lost">LOST Item</option>
            <option value="found">FOUND Item</option>
          </select>
          <input required placeholder="Item Title" value={title} onChange={(e) => setTitle(e.target.value)} className="px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400" />
          <input required placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400" />
        </div>
        <input required placeholder="Contact Info (Email/Phone)" value={contact} onChange={(e) => setContact(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400" />
        <textarea required placeholder="Item details & identifying marks..." value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400" />
        
        <div className="relative">
          <ImageIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input placeholder="Optional Image URL (e.g. https://...)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400" />
        </div>

        <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-sm transition">
          Submit Report
        </button>
      </form>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <span className={`text-xs font-black uppercase px-3 py-1 rounded-lg ${
                item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {item.type}
              </span>
              <span className="text-xs font-bold text-slate-600">Location: {item.location}</span>
            </div>
            <h3 className="text-base font-black text-slate-900">{item.title}</h3>
            <p className="text-sm font-medium text-slate-700">{item.description}</p>
            {item.image_url && (
              <img src={item.image_url} alt={item.title} className="h-44 w-full rounded-xl object-cover border border-slate-200" />
            )}
            <div className="pt-2 border-t border-slate-100 text-xs font-bold text-indigo-600">
              Contact: {item.contact_info}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}