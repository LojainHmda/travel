import React from 'react';
import { Banknote, Trash } from 'lucide-react';
import { CashExpense } from '../../types';

interface CashExpensesCardProps {
  items: CashExpense[];
  onUpdate: (items: CashExpense[]) => void;
}

const CashExpensesCard: React.FC<CashExpensesCardProps> = ({ items, onUpdate }) => {
    
  const addExpense = () => {
      const newItem: CashExpense = {
          id: Math.random().toString(36).substr(2, 9),
          date: '',
          category: 'Misc',
          description: '',
          amount: 0,
          perPerson: false,
          driverName: ''
      }
      onUpdate([...items, newItem]);
  }

  const updateItem = (id: string, updates: Partial<CashExpense>) => {
      onUpdate(items.map(i => i.id === id ? { ...i, ...updates } : i));
  }

  const removeItem = (id: string) => {
      onUpdate(items.filter(i => i.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Banknote className="text-emerald-600" /> Cash Expenses
        </h2>
        <button onClick={addExpense} className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded hover:bg-emerald-100 font-medium">
          + Add Expense
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase text-left border-b border-slate-200">
                <tr>
                    <th className="px-4 py-3 w-32">Date</th>
                    <th className="px-4 py-3 w-32">Category</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3 w-32">Driver</th>
                    <th className="px-4 py-3 w-24 text-right">Amount</th>
                    <th className="px-4 py-3 w-10"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {items.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                             <input type="date" value={item.date} onChange={(e) => updateItem(item.id, { date: e.target.value })} className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 text-slate-500" />
                        </td>
                        <td className="px-4 py-3">
                             <select value={item.category} onChange={(e) => updateItem(item.id, { category: e.target.value as any })} className="w-full bg-transparent border-none p-0 text-sm focus:ring-0">
                                <option value="Tips">Tips</option>
                                <option value="Entrance Fees">Entrance Fees</option>
                                <option value="Parking">Parking</option>
                                <option value="Misc">Misc</option>
                             </select>
                        </td>
                        <td className="px-4 py-3">
                             <input type="text" value={item.description} onChange={(e) => updateItem(item.id, { description: e.target.value })} placeholder="Details..." className="w-full bg-transparent border-none p-0 text-sm focus:ring-0" />
                        </td>
                        <td className="px-4 py-3">
                             <input type="text" value={item.driverName} onChange={(e) => updateItem(item.id, { driverName: e.target.value })} placeholder="Holding Driver" className="w-full bg-transparent border-none p-0 text-sm focus:ring-0" />
                        </td>
                        <td className="px-4 py-3 text-right">
                             <input type="number" value={item.amount} onChange={(e) => updateItem(item.id, { amount: parseFloat(e.target.value) || 0 })} className="w-20 text-right bg-transparent border-none p-0 text-sm focus:ring-0" />
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

export default CashExpensesCard;