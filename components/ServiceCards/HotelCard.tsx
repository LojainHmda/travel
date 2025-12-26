import React from 'react';
import { BedDouble, Trash, Plus } from 'lucide-react';
import { HotelBooking } from '../../types';
import { MOCK_HOTEL_SUPPLIERS } from '../../constants';

interface HotelCardProps {
  hotels: HotelBooking[];
  onUpdate: (hotels: HotelBooking[]) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotels, onUpdate }) => {
  const addHotel = () => {
    const newHotel: HotelBooking = {
      id: Math.random().toString(36).substr(2, 9),
      hotelName: '',
      location: 'Amman',
      category: '4 Star',
      mealPlan: 'BB',
      checkIn: '',
      checkOut: '',
      status: 'REQUEST',
      rooms: []
    };
    onUpdate([...hotels, newHotel]);
  };

  const updateHotel = (id: string, updates: Partial<HotelBooking>) => {
    onUpdate(hotels.map(h => h.id === id ? { ...h, ...updates } : h));
  };

  const removeHotel = (id: string) => {
      onUpdate(hotels.filter(h => h.id !== id));
  }

  const addRoom = (hotelId: string) => {
    const hotel = hotels.find(h => h.id === hotelId);
    if (!hotel) return;
    const newRoom = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'Double' as const,
      count: 1,
      cost: 0,
      supplier: hotel.hotelName,
      status: 'REQUEST' as const
    };
    updateHotel(hotelId, { rooms: [...hotel.rooms, newRoom] });
  };

  const calculateNights = (start: string, end: string) => {
      if(!start || !end) return 0;
      const diff = new Date(end).getTime() - new Date(start).getTime();
      return Math.max(0, diff / (1000 * 3600 * 24));
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <BedDouble className="text-indigo-600" /> Accommodation (Card 2)
        </h2>
        <button onClick={addHotel} className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-100 font-medium">
          + Add Hotel
        </button>
      </div>

      <div className="grid gap-4">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow relative">
            <button onClick={() => removeHotel(hotel.id)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500">
                <Trash size={14} />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
              <div className="md:col-span-3">
                <label className="text-xs text-slate-500 uppercase font-bold">Hotel Name</label>
                <select 
                  className="w-full mt-1 border-slate-300 rounded text-sm p-1 border"
                  value={hotel.hotelName}
                  onChange={(e) => updateHotel(hotel.id, { hotelName: e.target.value })}
                >
                    <option value="">Select Hotel</option>
                    {MOCK_HOTEL_SUPPLIERS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-slate-500 uppercase font-bold">Category</label>
                <select
                  className="w-full mt-1 border-slate-300 rounded text-sm p-1 border"
                  value={hotel.category}
                  onChange={(e) => updateHotel(hotel.id, { category: e.target.value })}
                >
                    <option value="3 Star">3 Star</option>
                    <option value="4 Star">4 Star</option>
                    <option value="5 Star">5 Star</option>
                    <option value="Camp">Camp</option>
                </select>
              </div>
              <div className="md:col-span-2">
                  <label className="text-xs text-slate-500 uppercase font-bold">Meal Plan</label>
                   <select
                    className="w-full mt-1 border-slate-300 rounded text-sm p-1 border"
                    value={hotel.mealPlan}
                    onChange={(e) => updateHotel(hotel.id, { mealPlan: e.target.value as any })}
                    >
                        <option value="BB">BB</option>
                        <option value="HB">HB</option>
                        <option value="FB">FB</option>
                        <option value="AI">AI</option>
                        <option value="RO">RO</option>
                    </select>
              </div>
              <div className="md:col-span-3 flex gap-2">
                 <div className="flex-1">
                    <label className="text-xs text-slate-500 uppercase font-bold">Check In</label>
                    <input 
                        type="date"
                        className="w-full mt-1 border border-slate-300 rounded text-sm p-1"
                        value={hotel.checkIn}
                        onChange={(e) => updateHotel(hotel.id, { checkIn: e.target.value })}
                    />
                 </div>
                 <div className="flex-1">
                    <label className="text-xs text-slate-500 uppercase font-bold">Check Out</label>
                    <input 
                        type="date"
                        className="w-full mt-1 border border-slate-300 rounded text-sm p-1"
                        value={hotel.checkOut}
                        onChange={(e) => updateHotel(hotel.id, { checkOut: e.target.value })}
                    />
                 </div>
              </div>
              <div className="md:col-span-1 text-center">
                  <label className="text-xs text-slate-500 uppercase font-bold">Nights</label>
                  <div className="mt-1 font-bold text-slate-700">{calculateNights(hotel.checkIn, hotel.checkOut)}</div>
              </div>
               <div className="md:col-span-1">
                    <label className="text-xs text-slate-500 uppercase font-bold">Status</label>
                    <span className={`block mt-2 text-xs font-bold ${hotel.status === 'CONFIRMED' ? 'text-green-600' : 'text-orange-500'}`}>
                        {hotel.status}
                    </span>
               </div>
            </div>

            {/* Rooms Sub-table */}
            <div className="bg-slate-50 rounded p-3 border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-slate-600 uppercase">Room Allocation</h4>
                    <button onClick={() => addRoom(hotel.id)} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                        <Plus size={12}/> Add Room Type
                    </button>
                </div>
                <table className="w-full text-xs">
                    <thead>
                        <tr className="text-left text-slate-400">
                            <th className="pb-2">Type</th>
                            <th className="pb-2 w-16">Qty</th>
                            <th className="pb-2 w-24">Cost</th>
                            <th className="pb-2">Supplier</th>
                            <th className="pb-2">Status</th>
                            <th className="pb-2"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {hotel.rooms.map((room) => (
                            <tr key={room.id}>
                                <td className="py-2">
                                    <select className="bg-transparent font-medium text-slate-700 border-none p-0">
                                        <option>Single</option>
                                        <option>Double</option>
                                        <option>Triple</option>
                                        <option>Other</option>
                                    </select>
                                </td>
                                <td className="py-2">
                                    <input type="number" className="w-12 border border-slate-300 rounded px-1" value={room.count} readOnly />
                                </td>
                                <td className="py-2">
                                    <input type="number" className="w-20 border border-slate-300 rounded px-1" value={room.cost} readOnly />
                                </td>
                                 <td className="py-2 text-slate-500">
                                    {room.supplier}
                                </td>
                                <td className="py-2">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${room.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {room.status}
                                    </span>
                                </td>
                                <td className="py-2 text-right">
                                    <button className="text-slate-400 hover:text-red-500"><Trash size={12} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelCard;