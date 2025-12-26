import React from 'react';
import { Check, Circle, X } from 'lucide-react';
import { WorkflowStage } from '../types';
import { WORKFLOW_STEPS } from '../constants';

interface WorkflowSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentStage: WorkflowStage;
  onStageChange: (stage: WorkflowStage) => void;
}

const WorkflowSidebar: React.FC<WorkflowSidebarProps> = ({ isOpen, onClose, currentStage, onStageChange }) => {
  const currentStepIndex = WORKFLOW_STEPS.findIndex(step => step.id === currentStage);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div className={`fixed top-0 left-0 h-full w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50">
          <h2 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Workflow Status</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-1">
          {WORKFLOW_STEPS.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isActive = index === currentStepIndex;

            return (
              <div 
                key={step.id}
                onClick={() => onStageChange(step.id)}
                className={`
                  relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                  ${isActive ? 'bg-blue-50 border border-blue-100' : 'hover:bg-slate-50'}
                  ${index > currentStepIndex ? 'opacity-50' : 'opacity-100'}
                `}
              >
                <div className={`
                  flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold
                  ${isActive ? 'bg-blue-600 text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'}
                `}>
                  {isCompleted && !isActive ? <Check size={14} /> : index + 1}
                </div>
                
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isActive ? 'text-blue-900' : 'text-slate-700'}`}>
                    {step.label}
                  </p>
                </div>

                {isActive && <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />}
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-100 bg-slate-50">
          <div className="text-xs text-slate-500 text-center">
            Module Version 1.0 <br/>
            Last Updated: Dec 26, 2025
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkflowSidebar;