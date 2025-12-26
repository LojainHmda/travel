import React from 'react';
import { PlaneLanding, PlaneTakeoff, User, Calendar, Clock, MapPin, Trash } from 'lucide-react';
import { ArrivalDepartureBatch } from '../../types';
import { MOCK_LOCATIONS } from '../../constants';

interface ArrivalsDeparturesCardProps {
  items: ArrivalDepartureBatch[];
  onUpdate: (items: ArrivalDepartureBatch[]) => void;
}

const ArrivalsDeparturesCard: React.FC<ArrivalsDeparturesCardProps> = ({ items, onUpdate }) => {
  
  const addBatch = (type: 'ARRIVAL' | 'DEPARTURE') => {
      const newItem: ArrivalDepartureBatch = {
          id: Math.random().toString(36).substr(2, 9),
          type,
          batchName: `Group ${items.length + 1}`,
          paxCount: 0,
          date: '',
          location: MOCK_LOCATIONS[0],
          time: '',
          flightNumber: '',
          driverName: '',
          meetAndAssist: type === 'ARRIVAL',
          representativeName: '',
          visaStatus: type === 'ARRIVAL' ? 'VISA_FREE' : undefined,
          departureTax: type === 'DEPARTURE' ? 'INCLUDED' : undefined
      }
      onUpdate([...items, newItem]);
  }

  const updateItem = (id: string, updates: Partial<ArrivalDepartureBatch>) => {
      onUpdate(items.map(i => i.id === id ? { ...i, ...updates } : i));
  }

  const removeItem = (id: string) => {
      onUpdate(items.filter(i => i.id !== id));
  }

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <PlaneLanding className="text-sky-500" /> Arrivals & Departures
            </h2>
            <div className="flex gap-2">
                <button onClick={() => addBatch('ARRIVAL')} className="text-xs bg-sky-50 text-sky-700 px-3 py-1 rounded hover:bg-sky-100 font-medium flex items-center gap-1">
                <PlaneLanding size={12}/> Add Arrival
                </button>
                <button onClick={() => addBatch('DEPARTURE')} className="text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded hover:bg-orange-100 font-medium flex items-center gap-1">
                <PlaneTakeoff size={12}/> Add Departure
                </button>
            </div>
      </div>

      <div className="grid gap-4">
        {items.map(item => (
            <div key={item.id} className={`border rounded-lg p-4 relative ${item.type === 'ARRIVAL' ? 'bg-sky-50/50 border-sky-100' : 'bg-orange-50/50 border-orange-100'}`}>
                 <button onClick={() => removeItem(item.id)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500">
                    <Trash size={14} />
                 </button>
                 
                 <div className="flex items-center gap-2 mb-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${item.type === 'ARRIVAL' ? 'bg-sky-200 text-sky-800' : 'bg-orange-200 text-orange-800'}`}>
                        {item.type}
                    </span>
                    <input 
                        type="text"
                        value={item.batchName}
                        onChange={(e) => updateItem(item.id, { batchName: e.target.value })}
                        className="bg-transparent font-bold text-sm text-slate-700 border-none p-0 focus:ring-0"
                        placeholder="Batch Name..."
                    />
                    <div className="flex items-center gap-1 text-slate-500 text-xs border-l border-slate-300 pl-2">
                        <User size={12} />
                        <input 
                            type="number"
                            value={item.paxCount}
                            onChange={(e) => updateItem(item.id, { paxCount: parseInt(e.target.value) || 0 })}
                            className="w-8 bg-transparent border-none p-0 text-xs focus:ring-0 text-center font-bold"
                        />
                        PAX
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                    <div className="space-y-2">
                         <div className="flex items-center gap-2 text-slate-500">
                             <Calendar size={12} />
                             <input type="date" value={item.date} onChange={(e) => updateItem(item.id, { date: e.target.value })} className="bg-transparent border-none p-0 w-full focus:ring-0" />
                         </div>
                         <div className="flex items-center gap-2 text-slate-500">
                             <Clock size={12} />
                             <input type="time" value={item.time} onChange={(e) => updateItem(item.id, { time: e.target.value })} className="bg-transparent border-none p-0 w-full focus:ring-0" />
                         </div>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-500">
                             <MapPin size={12} />
                             <select value={item.location} onChange={(e) => updateItem(item.id, { location: e.target.value })} className="bg-transparent border-none p-0 w-full focus:ring-0">
                                {MOCK_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                             </select>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                             <PlaneLanding size={12} />
                             <input type="text" placeholder="Flight No." value={item.flightNumber} onChange={(e) => updateItem(item.id, { flightNumber: e.target.value })} className="bg-transparent border-none p-0 w-full focus:ring-0" />
                        </div>
                    </div>

                    <div className="space-y-2">
                         <div className="flex items-center gap-2">
                             <label className="flex items-center gap-1 cursor-pointer">
                                <input type="checkbox" checked={item.meetAndAssist} onChange={(e) => updateItem(item.id, { meetAndAssist: e.target.checked })} className="rounded text-blue-600 focus:ring-0 w-3 h-3" />
                                <span className="text-slate-600">Meet & Assist</span>
                             </label>
                         </div>
                         {item.meetAndAssist && (
                             <input type="text" placeholder="Rep Name" value={item.representativeName} onChange={(e) => updateItem(item.id, { representativeName: e.target.value })} className="w-full bg-white border border-slate-200 rounded px-2 py-1" />
                         )}
                    </div>
                    
                    <div className="space-y-2">
                        {item.type === 'ARRIVAL' ? (
                            <select value={item.visaStatus} onChange={(e) => updateItem(item.id, { visaStatus: e.target.value as any })} className="w-full bg-white border border-slate-200 rounded px-2 py-1">
                                <option value="VISA_FREE">Visa Free</option>
                                <option value="RESTRICTED">Restricted</option>
                                <option value="INCLUDED">Included</option>
                                <option value="NOT_INCLUDED">Not Included</option>
                            </select>
                        ) : (
                             <select value={item.departureTax} onChange={(e) => updateItem(item.id, { departureTax: e.target.value as any })} className="w-full bg-white border border-slate-200 rounded px-2 py-1">
                                <option value="INCLUDED">Tax Included</option>
                                <option value="NOT_INCLUDED">Tax Not Included</option>
                            </select>
                        )}
                        <input type="text" placeholder="Assigned Driver" value={item.driverName} onChange={(e) => updateItem(item.id, { driverName: e.target.value })} className="w-full bg-white border border-slate-200 rounded px-2 py-1" />
                    </div>
                 </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ArrivalsDeparturesCard;