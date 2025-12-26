import React from 'react';
import { Map, Phone, Trash, Languages, UserCheck, Clock, CreditCard } from 'lucide-react';
import { GuideService } from '../../types';
import { MOCK_GUIDE_LANGUAGES } from '../../constants';

interface GuideCardProps {
  guides: GuideService[];
  onUpdate: (services: GuideService[]) => void;
}

const GuideCard: React.FC<GuideCardProps> = ({ guides, onUpdate }) => {
  
  const addService = () => {
      const newService: GuideService = {
          id: Math.random().toString(36).substr(2, 9),
          date: '',
          name: '',
          phone: '',
          language: 'English',
          nationalId: '',
          serviceType: 'Tour Guide',
          meetingTime: '',
          cost: 0,
          status: 'REQUESTED'
      }
      onUpdate([...guides, newService]);
  }

  const updateService = (id: string, updates: Partial<GuideService>) => {
      onUpdate(guides.map(g => g.id === id ? { ...g, ...updates } : g));
  }

  const removeService = (id: string) => {
      onUpdate(guides.filter(g => g.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Map className="text-green-600" /> Guides & Assistance (Card 4)
        </h2>
        <button onClick={addService} className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded hover:bg-green-100 font-medium">
          + Add Guide
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase text-left border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 w-32">Date</th>
              <th className="px-4 py-3">Guide Name</th>
              <th className="px-4 py-3">Details</th>
              <th className="px-4 py-3 w-32">Type & Time</th>
              <th className="px-4 py-3 w-24 text-right">Cost</th>
              <th className="px-4 py-3 w-24">Status</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {guides.map((item) => (
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
                    <div className="flex items-center gap-2 mb-1">
                        <UserCheck size={14} className="text-slate-400" />
                        <input 
                            placeholder="Full Name"
                            value={item.name}
                            onChange={(e) => updateService(item.id, { name: e.target.value })}
                            className="bg-transparent border-b border-transparent hover:border-slate-200 focus:border-green-300 w-full text-sm font-medium focus:ring-0 p-0"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <CreditCard size={12} className="text-slate-400" />
                        <input 
                            placeholder="National ID"
                            value={item.nationalId}
                            onChange={(e) => updateService(item.id, { nationalId: e.target.value })}
                            className="bg-transparent border-none p-0 text-xs w-full focus:ring-0 text-slate-400"
                        />
                    </div>
                </td>
                <td className="px-4 py-3 align-top">
                     <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Phone size={12} className="text-slate-400" />
                            <input 
                                placeholder="Phone"
                                value={item.phone}
                                onChange={(e) => updateService(item.id, { phone: e.target.value })}
                                className="bg-transparent border-none p-0 text-xs w-full focus:ring-0 text-slate-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Languages size={12} className="text-slate-400" />
                            <select
                                value={item.language}
                                onChange={(e) => updateService(item.id, { language: e.target.value })}
                                className="bg-transparent border-none p-0 text-xs w-full focus:ring-0 text-slate-500"
                            >
                                {MOCK_GUIDE_LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                     </div>
                </td>
                 <td className="px-4 py-3 align-top">
                    <select
                        value={item.serviceType}
                        onChange={(e) => updateService(item.id, { serviceType: e.target.value as any })}
                        className="w-full bg-white border border-slate-200 rounded text-xs p-1 mb-1"
                    >
                        <option value="Tour Guide">Tour Guide</option>
                        <option value="Meet & Greet">Meet & Greet</option>
                        <option value="Driver Guide">Driver Guide</option>
                    </select>
                    <div className="flex items-center gap-1 text-slate-500">
                        <Clock size={12}/>
                        <input 
                            type="time"
                            value={item.meetingTime}
                            onChange={(e) => updateService(item.id, { meetingTime: e.target.value })}
                            className="bg-transparent text-xs border-none p-0 focus:ring-0 w-16"
                        />
                    </div>
                </td>
                <td className="px-4 py-3 align-top text-right">
                    <input 
                        type="number"
                        value={item.cost}
                        onChange={(e) => updateService(item.id, { cost: parseFloat(e.target.value) || 0 })}
                        className="w-20 text-right bg-transparent border-b border-transparent hover:border-slate-200 focus:border-green-300 p-0 text-sm focus:ring-0"
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

export default GuideCard;