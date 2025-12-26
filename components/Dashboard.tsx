import React, { useState, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Map, BedDouble, Bus, Utensils, Banknote, Plane, Download, Upload, FileJson, Save } from 'lucide-react';
import ItineraryBuilder from './ItineraryBuilder';
import HotelCard from './ServiceCards/HotelCard';
import TransportCard from './ServiceCards/TransportCard';
import GuideCard from './ServiceCards/GuideCard';
import MealCard from './ServiceCards/MealCard';
import ArrivalsDeparturesCard from './ServiceCards/ArrivalsDeparturesCard';
import OptionalExtrasCard from './ServiceCards/OptionalExtrasCard';
import CashExpensesCard from './ServiceCards/CashExpensesCard';
import RequestHeader from './RequestHeader';
import { InboundRequest } from '../types';

interface DashboardProps {
  data: InboundRequest;
  onUpdate: (data: InboundRequest) => void;
  onWorkflowToggle: () => void;
}

type TabId = 'ITINERARY' | 'ACCOMMODATION' | 'LOGISTICS' | 'SERVICES' | 'FINANCIALS';

const Dashboard: React.FC<DashboardProps> = ({ data, onUpdate, onWorkflowToggle }) => {
  const [activeTab, setActiveTab] = useState<TabId>('ITINERARY');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Calculate cost breakdown
  const hotelCost = data.hotels.reduce((acc, h) => acc + h.rooms.reduce((rAcc, r) => rAcc + (r.cost * r.count), 0), 0);
  const itineraryCost = data.itinerary.reduce((acc, i) => acc + i.baseCost, 0);
  const guideCost = data.guides ? data.guides.reduce((acc, g) => acc + g.cost, 0) : 0;
  const mealCost = data.meals ? data.meals.reduce((acc, m) => acc + (m.costPerPerson * data.paxCount), 0) : 0;
  const transportCost = 450; 
  const extrasCost = data.optionalExtras ? data.optionalExtras.reduce((acc, e) => acc + (e.costPerPerson * data.paxCount), 0) : 0;
  const cashCost = data.cashExpenses ? data.cashExpenses.reduce((acc, c) => acc + c.amount, 0) : 0;

  const totalCost = hotelCost + itineraryCost + guideCost + mealCost + transportCost + extrasCost + cashCost;

  const chartData = [
    { name: 'Hotels', value: hotelCost },
    { name: 'Services', value: itineraryCost },
    { name: 'Transport', value: transportCost }, 
    { name: 'Guides', value: guideCost },
    { name: 'Meals', value: mealCost },
    { name: 'Extras', value: extrasCost + cashCost },
  ].filter(d => d.value > 0);

  const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#22c55e', '#f97316', '#eab308'];

  const tabs = [
    { id: 'ITINERARY', label: 'Itinerary', icon: Map },
    { id: 'ACCOMMODATION', label: 'Hotels', icon: BedDouble },
    { id: 'LOGISTICS', label: 'Logistics', icon: Plane },
    { id: 'SERVICES', label: 'Services', icon: Utensils },
    { id: 'FINANCIALS', label: 'Financials', icon: Banknote },
  ];

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `tour_request_${data.requestNumber || 'draft'}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        // Simple validation check
        if (parsed.itinerary && parsed.hotels) {
            onUpdate(parsed);
        } else {
            alert('Invalid file structure.');
        }
      } catch (err) {
        console.error("Failed to parse JSON", err);
        alert("Invalid file format");
      }
    };
    reader.readAsText(file);
    // Reset inputs
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerImport = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 max-w-7xl mx-auto pb-20">
      <RequestHeader 
        data={data} 
        onChange={(updates) => onUpdate({ ...data, ...updates })}
        onWorkflowClick={onWorkflowToggle}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col">
           {/* Tab Navigation */}
           <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-2 scrollbar-hide">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabId)}
                    className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                      ${isActive 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}
                    `}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                )
              })}
           </div>

           {/* Tab Content */}
           <div className="space-y-6">
              {activeTab === 'ITINERARY' && (
                <ItineraryBuilder 
                  rows={data.itinerary} 
                  onUpdate={(rows) => onUpdate({ ...data, itinerary: rows })}
                />
              )}

              {activeTab === 'ACCOMMODATION' && (
                <HotelCard 
                  hotels={data.hotels}
                  onUpdate={(hotels) => onUpdate({ ...data, hotels })}
                />
              )}

              {activeTab === 'LOGISTICS' && (
                <div className="space-y-6">
                   <ArrivalsDeparturesCard 
                      items={data.arrivalsDepartures || []}
                      onUpdate={(items) => onUpdate({ ...data, arrivalsDepartures: items })}
                   />
                   <TransportCard 
                      transport={data.transport}
                      onUpdate={(transport) => onUpdate({ ...data, transport })}
                   />
                </div>
              )}

              {activeTab === 'SERVICES' && (
                <div className="space-y-6">
                   <GuideCard 
                      guides={data.guides || []}
                      onUpdate={(guides) => onUpdate({ ...data, guides })}
                   />
                   <MealCard 
                      meals={data.meals || []}
                      onUpdate={(meals) => onUpdate({ ...data, meals })}
                   />
                </div>
              )}

              {activeTab === 'FINANCIALS' && (
                 <div className="space-y-6">
                    <OptionalExtrasCard 
                       items={data.optionalExtras || []}
                       onUpdate={(items) => onUpdate({ ...data, optionalExtras: items })}
                    />
                    <CashExpensesCard 
                       items={data.cashExpenses || []}
                       onUpdate={(items) => onUpdate({ ...data, cashExpenses: items })}
                    />
                 </div>
              )}
           </div>
        </div>

        <div className="space-y-6">
           {/* Cost Summary Widget */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
              <h3 className="font-bold text-slate-800 mb-4">Cost Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-end">
                  <span className="text-slate-500 text-sm">Total Estimated</span>
                  <span className="text-2xl font-bold text-slate-800">${totalCost}</span>
              </div>
              
               {/* Quick Actions & Data Management */}
               <div className="mt-8 space-y-6">
                   <div>
                       <h3 className="font-bold text-slate-800 mb-2 text-xs uppercase tracking-wider text-slate-500">Data Management</h3>
                       <div className="grid grid-cols-2 gap-2">
                           <button 
                                onClick={handleExport}
                                className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200 transition-colors"
                            >
                                <Download size={14}/> Save JSON
                           </button>
                           <button 
                                onClick={triggerImport}
                                className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                            >
                                <Upload size={14}/> Load JSON
                           </button>
                           <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleImport} 
                                className="hidden" 
                                accept=".json"
                            />
                       </div>
                       <p className="text-[10px] text-slate-400 mt-2 text-center">
                           <Save size={10} className="inline mr-1"/> Auto-save enabled via LocalStorage
                       </p>
                   </div>

                   <div className="pt-4 border-t border-slate-100">
                        <h3 className="font-bold text-slate-800 mb-2 text-xs uppercase tracking-wider text-slate-500">Quick Actions</h3>
                        <div className="space-y-1">
                            <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded border border-transparent hover:border-slate-200 transition-colors">
                                📄 Generate Quotation PDF
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded border border-transparent hover:border-slate-200 transition-colors">
                                📧 Email Supplier Requests
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded border border-transparent hover:border-slate-200 transition-colors">
                                🎫 Issue Vouchers
                            </button>
                        </div>
                   </div>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;