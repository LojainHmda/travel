import React from 'react';
import { Bus, User, Phone, Clock, FileText, Trash, Users } from 'lucide-react';
import { TransportService } from '../../types';
import { MOCK_VEHICLES } from '../../constants';

interface TransportCardProps {
  transport: TransportService[];
  onUpdate: (services: TransportService[]) => void;
}

const TransportCard: React.FC<TransportCardProps> = ({ transport, onUpdate }) => {
  
  const addService = () => {
      const newService: TransportService = {
          id: Math.random().toString(36).substr(2, 9),
          date: '',
          pax: 0,
          vehicleType: MOCK_VEHICLES[0],
          supplier: '',
          driverName: '',
          driverPhone: '',
          pickupLocation: '',
          pickupTime: '',
          dropoffLocation: '',
          notes: '',
          status: 'REQUESTED'
      }
      onUpdate([...transport, newService]);
  }

  const updateService = (id: string, updates: Partial<TransportService>) => {
      onUpdate(transport.map(t => t.id === id ? { ...t, ...updates } : t));
  }

  const removeService = (id: string) => {
      onUpdate(transport.filter(t => t.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Bus className="text-blue-600" /> Transport Fleet (Card 3)
        </h2>
        <button onClick={addService} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded hover:bg-blue-100 font-medium">
          + Add Movement
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase text-left border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 w-32">Date/Time</th>
              <th className="px-4 py-3 w-16">PAX</th>
              <th className="px-4 py-3 w-40">Vehicle/Supplier</th>
              <th className="px-4 py-3 w-48">Route</th>
              <th className="px-4 py-3 w-48">Driver Details</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3 w-24">Status</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transport.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 align-top">
                    <input 
                        type="date" 
                        value={item.date} 
                        onChange={(e) => updateService(item.id, { date: e.target.value })}
                        className="w-full bg-transparent border-slate-200 rounded text-xs mb-1"
                    />
                    <div className="flex items-center text-xs text-slate-500">
                        <Clock size={10} className="mr-1"/>
                        <input 
                            type="time" 
                            value={item.pickupTime}
                            onChange={(e) => updateService(item.id, { pickupTime: e.target.value })}
                            className="bg-transparent border-none p-0 text-xs focus:ring-0 w-16"
                        />
                    </div>
                </td>
                <td className="px-4 py-3 align-top">
                    <div className="flex items-center gap-1">
                        <Users size={10} className="text-slate-400" />
                        <input 
                            type="number" 
                            value={item.pax}
                            onChange={(e) => updateService(item.id, { pax: parseInt(e.target.value) || 0 })}
                            className="w-8 bg-transparent border-b border-slate-200 text-xs text-center focus:ring-0 p-0"
                        />
                    </div>
                </td>
                <td className="px-4 py-3 align-top">
                  <select 
                    className="w-full bg-white border border-slate-200 rounded text-xs p-1 mb-1"
                    value={item.vehicleType}
                    onChange={(e) => updateService(item.id, { vehicleType: e.target.value })}
                  >
                    {MOCK_VEHICLES.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                  <input 
                    type="text" 
                    placeholder="Supplier..."
                    value={item.supplier}
                    onChange={(e) => updateService(item.id, { supplier: e.target.value })}
                    className="w-full bg-transparent border-none p-0 text-xs text-slate-500 focus:ring-0 placeholder:text-slate-300"
                  />
                </td>
                <td className="px-4 py-3 align-top">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> 
                      <input 
                        className="bg-transparent border-b border-slate-100 focus:border-blue-300 w-full text-xs"
                        placeholder="Pickup"
                        value={item.pickupLocation}
                        onChange={(e) => updateService(item.id, { pickupLocation: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> 
                      <input 
                        className="bg-transparent border-b border-slate-100 focus:border-blue-300 w-full text-xs"
                        placeholder="Dropoff"
                        value={item.dropoffLocation}
                        onChange={(e) => updateService(item.id, { dropoffLocation: e.target.value })}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 align-top">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <User size={12} className="text-slate-400"/>
                        <input 
                            className="bg-transparent border-none p-0 text-xs w-full focus:ring-0"
                            placeholder="Driver Name"
                            value={item.driverName}
                            onChange={(e) => updateService(item.id, { driverName: e.target.value })}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone size={12} className="text-slate-300"/>
                        <input 
                            className="bg-transparent border-none p-0 text-xs w-full focus:ring-0 text-slate-500"
                            placeholder="Phone..."
                            value={item.driverPhone}
                            onChange={(e) => updateService(item.id, { driverPhone: e.target.value })}
                        />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 align-top">
                     <div className="relative">
                        <FileText size={12} className="absolute left-0 top-1 text-slate-300"/>
                        <textarea 
                            className="w-full bg-transparent border-none p-0 pl-4 text-xs focus:ring-0 resize-none h-12 text-slate-600"
                            placeholder="Instructions..."
                            value={item.notes}
                            onChange={(e) => updateService(item.id, { notes: e.target.value })}
                        />
                     </div>
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

export default TransportCard;