'use client';

import React, { useState, useEffect } from 'react';
import { SearchX } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface LostFoundItem {
  id: string;
  type: 'lost' | 'found';
  title: string;
  location: string;
  description: string;
  contact_info: string;
}

export default function LostFoundModule() {
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [type, setType] = useState<'lost' | 'found'>('lost');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from('lost_found').select('*').order('created_at', { ascending: false });
    if (data) setItems(data as LostFoundItem[]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('lost_found').insert([{ type, title, location, contact_info: contact, description }]);
    if (error) alert(`Error: ${error.message}`);
    else { setTitle(''); setLocation(''); setContact(''); setDescription(''); fetchItems(); }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 text-indigo-700 font-black text-sm">
          <SearchX className="w-4 h-4" /> Report Lost or Found Item
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select value={type} onChange={(e) => setType(e.target.value as 'lost' | 'found')} className="px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-bold">
            <option value="lost">LOST Item</option>
            <option value="found">FOUND Item</option>
          </select>
          <input required placeholder="Item Title" value={title} onChange={(e) => setTitle(e.target.value)} className="px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm" />
          <input required placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm" />
        </div>
        <input required placeholder="Contact Info" value={contact} onChange={(e) => setContact(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm" />
        <textarea required placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm" />
        <button type="submit" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold">Submit Report</button>
      </form>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="p-5 bg-white border rounded-2xl space-y-2">
            <span className={`text-xs font-black uppercase px-3 py-1 rounded-lg ${item.type === 'lost' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
              {item.type}
            </span>
            <h3 className="text-base font-black text-slate-900">{item.title}</h3>
            <p className="text-xs text-slate-600">{item.description}</p>
            <div className="pt-2 border-t text-xs font-bold text-indigo-600">Contact: {item.contact_info}</div>
          </div>
        ))}
      </div>
    </div>
  );
}