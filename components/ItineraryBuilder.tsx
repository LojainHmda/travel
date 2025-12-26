import React from 'react';
import { Plus, Trash2, Bed, Map, Bus, Utensils, Plane, GripVertical, Users, User, MessageSquare } from 'lucide-react';
import { ItineraryRow, ServiceFlag, CostUnit } from '../types';

interface ItineraryBuilderProps {
  rows: ItineraryRow[];
  onUpdate: (rows: ItineraryRow[]) => void;
}

const ItineraryBuilder: React.FC<ItineraryBuilderProps> = ({ rows, onUpdate }) => {

  const handleRowChange = (id: string, field: keyof ItineraryRow, value: any) => {
    const updated = rows.map(row => row.id === id ? { ...row, [field]: value } : row);
    onUpdate(updated);
  };

  const toggleFlag = (id: string, flag: ServiceFlag) => {
    const row = rows.find(r => r.id === id);
    if (!row) return;
    
    const newFlags = row.flags.includes(flag) 
      ? row.flags.filter(f => f !== flag)
      : [...row.flags, flag];
    
    handleRowChange(id, 'flags', newFlags);
  };

  const toggleCostUnit = (id: string) => {
      const row = rows.find(r => r.id === id);
      if (!row) return;
      const newUnit = row.costUnit === CostUnit.PER_PERSON ? CostUnit.PER_GROUP : CostUnit.PER_PERSON;
      handleRowChange(id, 'costUnit', newUnit);
  };

  const FlagToggle = ({ rowId, flag, icon: Icon, activeColor, label }: { rowId: string, flag: ServiceFlag, icon: any, activeColor: string, label: string }) => {
    const row = rows.find(r => r.id === rowId);
    const isActive = row?.flags.includes(flag);
    return (
      <button 
        onClick={() => toggleFlag(rowId, flag)}
        title={label}
        className={`p-1.5 rounded transition-colors ${isActive ? activeColor + ' text-white' : 'text-slate-300 hover:bg-slate-100'}`}
      >
        <Icon size={14} />
      </button>
    );
  };

  const addNewRow = () => {
    const lastDay = rows.length > 0 ? rows[rows.length - 1].day : 0;
    const newRow: ItineraryRow = {
      id: Math.random().toString(36).substr(2, 9),
      day: lastDay + 1,
      date: '',
      description: '',
      restaurant: '',
      flags: [],
      baseCost: 0,
      costUnit: CostUnit.PER_GROUP,
      comments: ''
    };
    onUpdate([...rows, newRow]);
  };

  const deleteRow = (id: string) => {
    onUpdate(rows.filter(r => r.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-700 flex items-center gap-2">
          <Map size={18} /> Itinerary Management
        </h3>
        <button 
          onClick={addNewRow}
          className="flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} /> Add Day
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
            <tr>
              <th className="px-4 py-3 w-16">Day</th>
              <th className="px-4 py-3 w-32">Date</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3 w-40">Restaurant</th>
              <th className="px-4 py-3 w-48 text-center">Services</th>
              <th className="px-4 py-3 w-28 text-right">Base Cost</th>
              <th className="px-4 py-3 w-32">Comments</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/50 group">
                <td className="px-4 py-3 font-medium text-slate-500">
                  <div className="flex items-center gap-2">
                    <GripVertical size={14} className="text-slate-300 cursor-move" />
                    Day {row.day}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <input 
                    type="date"
                    value={row.date}
                    onChange={(e) => handleRowChange(row.id, 'date', e.target.value)}
                    className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 text-slate-600"
                  />
                </td>
                <td className="px-4 py-3">
                  <input 
                    type="text"
                    value={row.description}
                    onChange={(e) => handleRowChange(row.id, 'description', e.target.value)}
                    placeholder="Enter activity description..."
                    className="w-full bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-300 rounded px-2 py-1 text-slate-800 focus:outline-none"
                  />
                </td>
                 <td className="px-4 py-3">
                  <input 
                    type="text"
                    value={row.restaurant}
                    onChange={(e) => handleRowChange(row.id, 'restaurant', e.target.value)}
                    placeholder="Venue..."
                    className="w-full bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-300 rounded px-2 py-1 text-slate-600 focus:outline-none text-xs"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1 bg-slate-50 rounded-lg p-1 border border-slate-100">
                    <FlagToggle rowId={row.id} flag={ServiceFlag.HOTEL} icon={Bed} activeColor="bg-indigo-500" label="Hotel" />
                    <FlagToggle rowId={row.id} flag={ServiceFlag.TRANSPORT} icon={Bus} activeColor="bg-blue-500" label="Transport" />
                    <FlagToggle rowId={row.id} flag={ServiceFlag.GUIDE} icon={Map} activeColor="bg-green-500" label="Guide" />
                    <FlagToggle rowId={row.id} flag={ServiceFlag.MEAL} icon={Utensils} activeColor="bg-orange-500" label="Meal" />
                    <FlagToggle rowId={row.id} flag={ServiceFlag.AIRPORT} icon={Plane} activeColor="bg-sky-500" label="Airport" />
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center gap-2 justify-end">
                      <input 
                        type="number"
                        value={row.baseCost}
                        onChange={(e) => handleRowChange(row.id, 'baseCost', parseFloat(e.target.value) || 0)}
                        className="w-16 text-right bg-transparent border-b border-slate-200 focus:border-blue-500 p-0 text-sm focus:ring-0 font-mono text-slate-600"
                      />
                      <button 
                         onClick={() => toggleCostUnit(row.id)}
                         className="text-slate-400 hover:text-slate-600 p-1 rounded"
                         title={row.costUnit === CostUnit.PER_PERSON ? "Per Person" : "Per Group"}
                      >
                          {row.costUnit === CostUnit.PER_PERSON ? <User size={14} /> : <Users size={14} />}
                      </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                     <div className="relative">
                        <MessageSquare size={14} className="absolute left-2 top-2 text-slate-300" />
                        <input 
                            type="text"
                            value={row.comments}
                            onChange={(e) => handleRowChange(row.id, 'comments', e.target.value)}
                            placeholder="Internal notes..."
                            className="w-full bg-slate-50 pl-7 text-xs p-1.5 rounded border border-transparent focus:bg-white focus:border-blue-300 outline-none transition-colors"
                        />
                     </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <button 
                    onClick={() => deleteRow(row.id)}
                    className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length === 0 && (
        <div className="p-8 text-center text-slate-400">
          No itinerary days added yet. Click "Add Day" to start.
        </div>
      )}
    </div>
  );
};

export default ItineraryBuilder;