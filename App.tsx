import React, { useState, useEffect, useCallback } from 'react';
import { Menu, Cloud, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import Dashboard from './components/Dashboard';
import WorkflowSidebar from './components/WorkflowSidebar';
import { INITIAL_REQUEST } from './constants';
import { InboundRequest, WorkflowStage } from './types';
import { api } from './api';

const App: React.FC = () => {
  const [requestData, setRequestData] = useState<InboundRequest>(INITIAL_REQUEST);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Application States
  const [appState, setAppState] = useState<'LOADING' | 'READY' | 'ERROR'>('LOADING');
  const [syncState, setSyncState] = useState<'SAVED' | 'SAVING' | 'ERROR'>('SAVED');
  const [lastSaved, setLastSaved] = useState<Date>(new Date());

  // 1. Load Data on Mount
  useEffect(() => {
    const loadData = async () => {
        try {
            const data = await api.fetchRequest();
            setRequestData(data);
            setAppState('READY');
        } catch (err) {
            console.error(err);
            setAppState('ERROR');
        }
    };
    loadData();
  }, []);

  // 2. Auto-Save with Debounce
  useEffect(() => {
      if (appState !== 'READY') return;

      setSyncState('SAVING');
      const timer = setTimeout(async () => {
          const success = await api.saveRequest(requestData);
          if (success) {
              setSyncState('SAVED');
              setLastSaved(new Date());
          } else {
              setSyncState('ERROR');
          }
      }, 1000); // Wait 1 second after last change before sending to DB

      return () => clearTimeout(timer);
  }, [requestData, appState]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Loading Screen
  if (appState === 'LOADING') {
      return (
          <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-400">
              <RefreshCw className="animate-spin mb-4" size={32} />
              <p className="text-sm font-medium">Connecting to Database...</p>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-100/50">
      {/* Sticky Top Navigation */}
      <nav className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleSidebar}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex flex-col">
            <span className="font-bold text-slate-800 leading-tight">TourOps</span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Inbound Module</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           {/* Sync Status Indicator */}
           <div className="hidden md:flex flex-col items-end mr-4">
                <div className="flex items-center gap-1.5 text-xs font-medium">
                    {syncState === 'SAVING' && (
                        <>
                            <RefreshCw size={10} className="animate-spin text-blue-500" />
                            <span className="text-blue-500">Syncing changes...</span>
                        </>
                    )}
                    {syncState === 'SAVED' && (
                        <>
                            <Cloud size={12} className="text-slate-400" />
                            <span className="text-slate-400">Saved to Cloud</span>
                        </>
                    )}
                    {syncState === 'ERROR' && (
                        <>
                            <AlertCircle size={12} className="text-red-500" />
                            <span className="text-red-500">Sync Failed</span>
                        </>
                    )}
                </div>
                <span className="text-[10px] text-slate-300">
                    Last sync: {lastSaved.toLocaleTimeString()}
                </span>
           </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 border-l border-slate-200 pl-4">
             <span className="w-2 h-2 rounded-full bg-green-500"></span> System Online
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
            JD
          </div>
        </div>
      </nav>

      <main className="relative">
        <Dashboard 
          data={requestData}
          onUpdate={setRequestData}
          onWorkflowToggle={toggleSidebar}
        />
      </main>

      <WorkflowSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        currentStage={requestData.status}
        onStageChange={(stage: WorkflowStage) => {
          setRequestData(prev => ({ ...prev, status: stage }));
        }}
      />
    </div>
  );
};

export default App;