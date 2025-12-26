import React from 'react';
import { Utensils, MapPin, Trash, Clock } from 'lucide-react';
import { MealService } from '../../types';
import { MOCK_MEAL_TYPES } from '../../constants';

interface MealCardProps {
  meals: MealService[];
  onUpdate: (services: MealService[]) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meals, onUpdate }) => {
  
  const addService = () => {
      const newService: MealService = {
          id: Math.random().toString(36).substr(2, 9),
          date: '',
          mealType: 'Lunch',
          mealTime: '',
          restaurant: '',
          costPerPerson: 0,
          status: 'REQUESTED'
      }
      onUpdate([...meals, newService]);
  }

  const updateService = (id: string, updates: Partial<MealService>) => {
      onUpdate(meals.map(m => m.id === id ? { ...m, ...updates } : m));
  }

  const removeService = (id: string) => {
      onUpdate(meals.filter(m => m.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Utensils className="text-orange-500" /> Restaurants & Meals (Card 5)
        </h2>
        <button onClick={addService} className="text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded hover:bg-orange-100 font-medium">
          + Add Meal
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase text-left border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 w-32">Date</th>
              <th className="px-4 py-3 w-40">Meal Type/Time</th>
              <th className="px-4 py-3">Restaurant / Venue</th>
              <th className="px-4 py-3 w-32 text-right">Cost/PP</th>
              <th className="px-4 py-3 w-24">Status</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {meals.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 align-top">
                    <input 
                        type="date" 
                        value={item.date} 
                        onChange={(e) => updateService(item.id, { date: e.target.value })}
                        className="w-full bg-transparent border-slate-200 rounded text-xs"
                    />
                </td>
                <td className="px-4 py-3 align-top">
                    <select
                        value={item.mealType}
                        onChange={(e) => updateService(item.id, { mealType: e.target.value as any })}
                        className="w-full bg-white border border-slate-200 rounded text-xs p-1 mb-1"
                    >
                        {MOCK_MEAL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <div className="flex items-center gap-1 text-slate-500">
                        <Clock size={12} />
                        <input 
                            type="time"
                            value={item.mealTime}
                            onChange={(e) => updateService(item.id, { mealTime: e.target.value })}
                            className="bg-transparent text-xs border-none p-0 focus:ring-0 w-16"
                        />
                    </div>
                </td>
                <td className="px-4 py-3 align-top">
                    <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-slate-400" />
                        <input 
                            placeholder="Restaurant Name & Location"
                            value={item.restaurant}
                            onChange={(e) => updateService(item.id, { restaurant: e.target.value })}
                            className="bg-transparent border-b border-transparent hover:border-slate-200 focus:border-orange-300 w-full text-sm focus:ring-0 p-0"
                        />
                    </div>
                </td>
                <td className="px-4 py-3 align-top text-right">
                    <input 
                        type="number"
                        value={item.costPerPerson}
                        onChange={(e) => updateService(item.id, { costPerPerson: parseFloat(e.target.value) || 0 })}
                        className="w-20 text-right bg-transparent border-b border-transparent hover:border-slate-200 focus:border-orange-300 p-0 text-sm focus:ring-0"
                    />
                </td>
                <td className="px-4 py-3 align-top">
                     <select 
                        value={item.status}
                        onChange={(e) => updateService(item.id, { status: e.target.value as any })}
                        className={`text-[10px] font-bold uppercase rounded px-2 py-1 border-none ${
                            item.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}
                     >
                        <option value="REQUESTED">REQUESTED</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="CANCELLED">CANCELLED</option>
                     </select>
                </td>
                <td className="px-4 py-3 text-right align-top">
                    <button onClick={() => removeService(item.id)} className="text-slate-300 hover:text-red-500">
                        <Trash size={14} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default MealCard;