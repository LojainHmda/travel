import { InboundRequest } from './types';
import { INITIAL_REQUEST } from './constants';

const DB_KEY = 'tourops_inbound_data_v1';
const NETWORK_DELAY = 600; // Simulated latency in ms

// This service mimics a real database connection. 
// Later, you can replace the LocalStorage calls with fetch() requests to your real backend.

export const api = {
  // Simulate GET /api/request
  fetchRequest: async (): Promise<InboundRequest> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
            const saved = localStorage.getItem(DB_KEY);
            resolve(saved ? JSON.parse(saved) : INITIAL_REQUEST);
        } catch (e) {
            console.error("DB Error", e);
            resolve(INITIAL_REQUEST);
        }
      }, NETWORK_DELAY);
    });
  },

  // Simulate POST /api/request
  saveRequest: async (data: InboundRequest): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            try {
                localStorage.setItem(DB_KEY, JSON.stringify(data));
                resolve(true);
            } catch (e) {
                console.error("DB Write Error", e);
                resolve(false);
            }
        }, 300); // Shorter delay for writes for better UX
    });
  }
};