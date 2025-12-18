
export enum ParcelStatus {
  ORDERED = 'Ordered',
  SHIPPED = 'Shipped',
  IN_TRANSIT = 'In Transit',
  OUT_FOR_DELIVERY = 'Out for Delivery',
  DELIVERED = 'Delivered',
  DELAYED = 'Delayed'
}

export interface Parcel {
  id: string;
  sender: string;
  recipient: string;
  origin: string;
  destination: string;
  status: ParcelStatus;
  lastUpdated: string;
  estimatedDelivery: string;
  history: {
    status: ParcelStatus;
    location: string;
    timestamp: string;
    description: string;
  }[];
  weight: string;
  type: string;
}

export interface PredictionResult {
  delayRisk: number; // 0-100
  adjustedDeliveryTime: string;
  reasoning: string;
  factors: {
    weather: 'Good' | 'Fair' | 'Poor';
    traffic: 'Low' | 'Moderate' | 'High';
    logistics: 'Efficient' | 'Backlogged';
  };
}
