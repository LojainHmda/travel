import { WorkflowStage } from './types';

export const WORKFLOW_STEPS = [
  { id: WorkflowStage.REQUEST, label: 'Request', color: 'bg-gray-500' },
  { id: WorkflowStage.QUOTED, label: 'Quoted', color: 'bg-blue-500' },
  { id: WorkflowStage.SUPPLIER_CONFIRMED, label: 'Supp. Confirmed', color: 'bg-indigo-500' },
  { id: WorkflowStage.CONFIRMED, label: 'Confirmed', color: 'bg-green-500' },
  { id: WorkflowStage.INVOICE, label: 'Invoice', color: 'bg-yellow-500' },
  { id: WorkflowStage.PROCESSING, label: 'Processing', color: 'bg-orange-500' },
  { id: WorkflowStage.COMPLETED, label: 'Completed', color: 'bg-emerald-600' },
];

export const NATIONALITIES = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 
  'China', 'Japan', 'India', 'Brazil', 'Canada', 'Australia'
];

export const MOCK_HOTEL_SUPPLIERS = ['Marriott Amman', 'Kempinski Dead Sea', 'Petra Moon', 'Wadi Rum Lux Camp'];
export const MOCK_VEHICLES = ['Sedan', 'Minivan', 'Bus (50 PAX)', 'SUV'];
export const MOCK_GUIDE_LANGUAGES = ['English', 'French', 'German', 'Spanish', 'Italian', 'Chinese'];
export const MOCK_MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'];
export const MOCK_LOCATIONS = ['Queen Alia Airport', 'Sheikh Hussein Border', 'Allenby Bridge', 'Amman Hotel'];

// Initial mock data
import { InboundRequest, CustomerType, PricingMode, ServiceFlag, WorkflowStage as WS, CostUnit } from './types';

export const INITIAL_REQUEST: InboundRequest = {
  requestNumber: 'IN-12-0042',
  documentSequence: 'INB-12-0042',
  status: WS.REQUEST,
  tripMonth: '2025-12',
  startDate: '2025-12-26',
  endDate: '2025-12-30',
  customerType: CustomerType.AGENCY,
  contactName: 'John Doe',
  agentReference: 'AGT-REF-9988',
  paxCount: 12,
  nationality: 'Germany',
  pricingMode: PricingMode.ITEMIZED,
  specialNotes: 'VIP Group, Vegetarian meals required.',
  itinerary: [
    { id: '1', day: 1, date: '2025-12-26', description: 'Arrival at QAIA, Transfer to Amman', restaurant: '', flags: [ServiceFlag.AIRPORT, ServiceFlag.TRANSPORT, ServiceFlag.HOTEL], baseCost: 0, costUnit: CostUnit.PER_GROUP, comments: '' },
    { id: '2', day: 2, date: '2025-12-27', description: 'Amman City Tour & Jerash', restaurant: 'Um Khalil', flags: [ServiceFlag.GUIDE, ServiceFlag.TRANSPORT, ServiceFlag.MEAL, ServiceFlag.HOTEL], baseCost: 150, costUnit: CostUnit.PER_PERSON, comments: '' },
    { id: '3', day: 3, date: '2025-12-28', description: 'Petra Full Day', restaurant: 'Basin Restaurant', flags: [ServiceFlag.GUIDE, ServiceFlag.TRANSPORT, ServiceFlag.MEAL, ServiceFlag.HOTEL], baseCost: 200, costUnit: CostUnit.PER_PERSON, comments: '' },
  ],
  hotels: [
    {
      id: 'h1',
      hotelName: 'W Amman',
      location: 'Amman',
      category: '5 Star',
      mealPlan: 'BB',
      checkIn: '2025-12-26',
      checkOut: '2025-12-28',
      status: 'REQUEST',
      rooms: [
        { id: 'r1', type: 'Double', count: 6, cost: 180, supplier: 'W Amman', status: 'REQUEST' }
      ]
    }
  ],
  transport: [
    {
      id: 't1',
      date: '2025-12-26',
      pax: 12,
      vehicleType: 'Bus (50 PAX)',
      supplier: 'Jett Transport',
      driverName: 'Mahmoud',
      driverPhone: '+962 79 000 0000',
      pickupLocation: 'Airport',
      pickupTime: '14:00',
      dropoffLocation: 'W Amman',
      notes: 'Meet with sign board',
      status: 'CONFIRMED'
    }
  ],
  guides: [
     {
        id: 'g1',
        date: '2025-12-27',
        name: 'Ahmed Khalil',
        phone: '+962 79 111 2222',
        language: 'German',
        nationalId: '9981010101',
        serviceType: 'Tour Guide',
        meetingTime: '08:30',
        cost: 150,
        status: 'CONFIRMED'
     }
  ],
  meals: [
    {
        id: 'm1',
        date: '2025-12-27',
        mealType: 'Lunch',
        mealTime: '13:00',
        restaurant: 'Artemis Jerash',
        costPerPerson: 25,
        status: 'REQUESTED'
    }
  ],
  arrivalsDepartures: [
      {
          id: 'ad1',
          type: 'ARRIVAL',
          batchName: 'Group A - Main',
          paxCount: 10,
          date: '2025-12-26',
          location: 'Queen Alia Airport',
          time: '14:30',
          flightNumber: 'RJ 123',
          driverName: 'Mahmoud',
          meetAndAssist: true,
          representativeName: 'Sami',
          visaStatus: 'INCLUDED'
      }
  ],
  optionalExtras: [],
  cashExpenses: []
};