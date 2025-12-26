export enum WorkflowStage {
  REQUEST = 'REQUEST',
  QUOTED = 'QUOTED',
  SUPPLIER_CONFIRMED = 'SUPPLIER_CONFIRMED',
  CONFIRMED = 'CONFIRMED',
  INVOICE = 'INVOICE',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
}

export enum CustomerType {
  AGENCY = 'AGENCY',
  GROUP = 'GROUP',
  COMPANY = 'COMPANY',
  CORPORATE = 'CORPORATE',
}

export enum PricingMode {
  ITEMIZED = 'ITEMIZED',
  LUMPSUM = 'LUMPSUM',
}

export enum CostUnit {
  PER_PERSON = 'PER_PERSON',
  PER_GROUP = 'PER_GROUP',
}

export enum ServiceFlag {
  HOTEL = 'HOTEL',
  GUIDE = 'GUIDE',
  TRANSPORT = 'TRANSPORT',
  MEAL = 'MEAL',
  AIRPORT = 'AIRPORT',
  DRIVE = 'DRIVE',
}

export interface ItineraryRow {
  id: string;
  day: number;
  date: string; // YYYY-MM-DD
  description: string;
  restaurant: string;
  flags: ServiceFlag[];
  baseCost: number;
  costUnit: CostUnit;
  comments: string;
}

export interface HotelRoom {
  id: string;
  type: 'Single' | 'Double' | 'Triple' | 'Other';
  count: number;
  cost: number;
  supplier: string;
  status: 'REQUEST' | 'CONFIRMED' | 'CANCELLED';
}

export interface HotelBooking {
  id: string;
  hotelName: string;
  location: string;
  category: string;
  mealPlan: 'BB' | 'HB' | 'FB' | 'AI' | 'RO';
  checkIn: string;
  checkOut: string;
  rooms: HotelRoom[];
  status: 'REQUEST' | 'CONFIRMED' | 'CANCELLED';
}

export interface TransportService {
  id: string;
  date: string;
  pax: number;
  vehicleType: string;
  supplier: string;
  driverName: string;
  driverPhone: string;
  pickupLocation: string;
  pickupTime: string;
  dropoffLocation: string;
  notes: string;
  status: 'REQUESTED' | 'CONFIRMED' | 'CANCELLED';
}

export interface GuideService {
  id: string;
  date: string;
  name: string;
  phone: string;
  language: string;
  nationalId: string;
  serviceType: 'Meet & Greet' | 'Tour Guide' | 'Driver Guide';
  meetingTime: string;
  cost: number;
  status: 'REQUESTED' | 'CONFIRMED' | 'CANCELLED';
}

export interface MealService {
  id: string;
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner';
  mealTime: string;
  restaurant: string;
  costPerPerson: number;
  status: 'REQUESTED' | 'CONFIRMED' | 'CANCELLED';
}

export interface ArrivalDepartureBatch {
  id: string;
  type: 'ARRIVAL' | 'DEPARTURE';
  batchName: string;
  paxCount: number;
  date: string;
  location: string;
  time: string;
  flightNumber: string;
  driverName: string;
  meetAndAssist: boolean;
  representativeName: string;
  visaStatus?: 'VISA_FREE' | 'RESTRICTED' | 'INCLUDED' | 'NOT_INCLUDED';
  departureTax?: 'INCLUDED' | 'NOT_INCLUDED';
}

export interface OptionalExtra {
  id: string;
  name: string;
  description: string;
  date: string;
  supplier: string;
  costPerPerson: number;
  totalCost: number;
}

export interface CashExpense {
  id: string;
  date: string;
  category: 'Tips' | 'Entrance Fees' | 'Parking' | 'Misc';
  description: string;
  amount: number;
  perPerson: boolean;
  driverName: string;
}

export interface InboundRequest {
  requestNumber: string;
  documentSequence: string;
  status: WorkflowStage;
  tripMonth: string;
  startDate: string;
  endDate: string;
  customerType: CustomerType;
  contactName: string;
  agentReference: string;
  paxCount: number;
  nationality: string;
  pricingMode: PricingMode;
  specialNotes: string;
  itinerary: ItineraryRow[];
  hotels: HotelBooking[];
  transport: TransportService[];
  guides: GuideService[];
  meals: MealService[];
  arrivalsDepartures: ArrivalDepartureBatch[];
  optionalExtras: OptionalExtra[];
  cashExpenses: CashExpense[];
}