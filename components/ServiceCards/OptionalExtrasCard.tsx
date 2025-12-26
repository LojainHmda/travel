import React from 'react';
import { Star, Trash } from 'lucide-react';
import { OptionalExtra } from '../../types';

interface OptionalExtrasCardProps {
  items: OptionalExtra[];
  onUpdate: (items: OptionalExtra[]) => void;
}

const OptionalExtrasCard: React.FC<OptionalExtrasCardProps> = ({ items, onUpdate }) => {
    
  const addExtra = () => {
      const newItem: OptionalExtra = {
          id: Math.random().toString(36).substr(2, 9),
          name: '',
          description: '',
          date: '',
          supplier: '',
          costPerPerson: 0,
          totalCost: 0
      }
      onUpdate([...items, newItem]);
  }

  const updateItem = (id: string, updates: Partial<OptionalExtra>) => {
      onUpdate(items.map(i => i.id === id ? { ...i, ...updates } : i));
  }

  const removeItem = (id: string) => {
      onUpdate(items.filter(i => i.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Star className="text-yellow-500" /> Optional Extras (Card 6)
        </h2>
        <button onClick={addExtra} className="text-xs bg-yellow-50 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-100 font-medium">
          + Add Extra
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase text-left border-b border-slate-200">
                <tr>
                    <th className="px-4 py-3 w-48">Service Name</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3 w-32">Date</th>
                    <th className="px-4 py-3 w-32 text-right">Cost/PP</th>
                    <th className="px-4 py-3 w-10"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {items.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                             <input type="text" value={item.name} onChange={(e) => updateItem(item.id, { name: e.target.value })} placeholder="Service Name" className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 font-medium" />
                        </td>
                        <td className="px-4 py-3">
                             <input type="text" value={item.description} onChange={(e) => updateItem(item.id, { description: e.target.value })} placeholder="Details..." className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 text-slate-500" />
                        </td>
                        <td className="px-4 py-3">
                             <input type="date" value={item.date} onChange={(e) => updateItem(item.id, { date: e.target.value })} className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 text-slate-500" />
                        </td>
                        <td className="px-4 py-3 text-right">
                             <input type="number" value={item.costPerPerson} onChange={(e) => updateItem(item.id, { costPerPerson: parseFloat(e.target.value) || 0 })} className="w-20 text-right bg-transparent border-none p-0 text-sm focus:ring-0" />
                        </td>
                        <td className="px-4 py-3 text-right">
                            <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-red-500"><Trash size={14}/></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default OptionalExtrasCard;