
import React from 'react';
import { Calendar, Users, Globe, Building2, User, FileText, Hash } from 'lucide-react';
import { InboundRequest, CustomerType, PricingMode, WorkflowStage } from '../types';
import { NATIONALITIES, WORKFLOW_STEPS } from '../constants';

interface RequestHeaderProps {
  data: InboundRequest;
  onChange: (updates: Partial<InboundRequest>) => void;
  onWorkflowClick: () => void;
}

const RequestHeader: React.FC<RequestHeaderProps> = ({ data, onChange, onWorkflowClick }) => {
  const currentWorkflowStep = WORKFLOW_STEPS.find(s => s.id === data.status);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800">Request {data.requestNumber}</h1>
            <span 
              onClick={onWorkflowClick}
              className={`px-3 py-1 rounded-full text-xs font-semibold text-white cursor-pointer hover:opacity-90 transition-opacity ${currentWorkflowStep?.color || 'bg-gray-500'}`}
            >
              {currentWorkflowStep?.label}
            </span>
          </div>
          <div className="flex gap-4 mt-1">
             <p className="text-slate-500 text-sm flex items-center gap-2">
                <Calendar size={14} /> 
                Trip Month: {data.tripMonth}
             </p>
             <p className="text-slate-400 text-sm flex items-center gap-2 border-l pl-4 border-slate-200">
                Ref: {data.documentSequence}
             </p>
          </div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-center">
             <span className="block text-xs font-bold uppercase opacity-70">Total Days</span>
             <span className="font-bold text-lg">
               {Math.max(0, (new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) / (1000 * 3600 * 24) + 1)}
             </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase mb-1">
              <Calendar size={14} /> Travel Dates
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="date" 
                value={data.startDate}
                onChange={(e) => onChange({ startDate: e.target.value })}
                className="w-full p-2 bg-white border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
              />
              <span className="text-slate-400">→</span>
              <input 
                type="date" 
                value={data.endDate}
                onChange={(e) => onChange({ endDate: e.target.value })}
                className="w-full p-2 bg-white border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
              />
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase mb-1">
              <Building2 size={14} /> Customer Type
            </label>
            <select 
              value={data.customerType}
              onChange={(e) => onChange({ customerType: e.target.value as CustomerType })}
              className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              {Object.values(CustomerType).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase mb-1">
              <User size={14} /> Contact Name
            </label>
            <input 
              type="text" 
              value={data.contactName}
              onChange={(e) => onChange({ contactName: e.target.value })}
              className="w-full p-2 bg-white border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Primary Contact"
            />
          </div>
           <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase mb-1">
              <Hash size={14} /> Agent Reference
            </label>
            <input 
              type="text" 
              value={data.agentReference}
              onChange={(e) => onChange({ agentReference: e.target.value })}
              className="w-full p-2 bg-white border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ext. Ref No."
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
             <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase mb-1">
              <Users size={14} /> PAX Count
            </label>
            <input 
              type="number" 
              value={data.paxCount}
              onChange={(e) => onChange({ paxCount: parseInt(e.target.value) || 0 })}
              className="w-full p-2 bg-white border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase mb-1">
              <Globe size={14} /> Nationality
            </label>
            <select 
              value={data.nationality}
              onChange={(e) => onChange({ nationality: e.target.value })}
              className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              {NATIONALITIES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
             <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase mb-1">
              <FileText size={14} /> Pricing Mode
            </label>
            <div className="flex bg-slate-100 p-1 rounded">
              {Object.values(PricingMode).map(mode => (
                <button
                  key={mode}
                  onClick={() => onChange({ pricingMode: mode })}
                  className={`flex-1 text-xs py-1.5 rounded font-medium transition-colors ${data.pricingMode === mode ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
          <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase mb-1">
             Special Notes
          </label>
          <textarea 
            value={data.specialNotes}
            onChange={(e) => onChange({ specialNotes: e.target.value })}
            className="w-full h-[40px] p-2 bg-white border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="Special requirements..."
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default RequestHeader;
