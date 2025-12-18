
import { Parcel, ParcelStatus } from './types';

export const MOCK_PARCELS: Parcel[] = [
  {
    id: "PKG-1001",
    sender: "TechMart Inc.",
    recipient: "Alice Johnson",
    origin: "San Francisco, CA",
    destination: "Austin, TX",
    status: ParcelStatus.IN_TRANSIT,
    lastUpdated: "2024-05-20T10:30:00Z",
    estimatedDelivery: "2024-05-22T18:00:00Z",
    weight: "2.5 kg",
    type: "Electronics",
    history: [
      { status: ParcelStatus.ORDERED, location: "San Francisco, CA", timestamp: "2024-05-18T09:00:00Z", description: "Order processed and package prepared." },
      { status: ParcelStatus.SHIPPED, location: "San Francisco Sorting Facility", timestamp: "2024-05-19T14:20:00Z", description: "Package left the warehouse." },
      { status: ParcelStatus.IN_TRANSIT, location: "Phoenix, AZ Hub", timestamp: "2024-05-20T10:30:00Z", description: "Package arrived at regional hub." }
    ]
  },
  {
    id: "PKG-1002",
    sender: "Green Garden Co.",
    recipient: "Bob Smith",
    origin: "Portland, OR",
    destination: "Seattle, WA",
    status: ParcelStatus.DELIVERED,
    lastUpdated: "2024-05-19T15:45:00Z",
    estimatedDelivery: "2024-05-19T16:00:00Z",
    weight: "5.0 kg",
    type: "Garden Supplies",
    history: [
      { status: ParcelStatus.ORDERED, location: "Portland, OR", timestamp: "2024-05-17T11:00:00Z", description: "Order received." },
      { status: ParcelStatus.SHIPPED, location: "Portland Warehouse", timestamp: "2024-05-18T08:00:00Z", description: "Package dispatched." },
      { status: ParcelStatus.OUT_FOR_DELIVERY, location: "Seattle, WA", timestamp: "2024-05-19T09:00:00Z", description: "Package is with the local courier." },
      { status: ParcelStatus.DELIVERED, location: "Seattle, WA", timestamp: "2024-05-19T15:45:00Z", description: "Delivered to front porch." }
    ]
  },
  {
    id: "PKG-1003",
    sender: "Fashion Hub",
    recipient: "Charlie Davis",
    origin: "New York, NY",
    destination: "Miami, FL",
    status: ParcelStatus.DELAYED,
    lastUpdated: "2024-05-20T12:00:00Z",
    estimatedDelivery: "2024-05-21T17:00:00Z",
    weight: "1.2 kg",
    type: "Apparel",
    history: [
      { status: ParcelStatus.ORDERED, location: "New York, NY", timestamp: "2024-05-18T14:00:00Z", description: "Order placed." },
      { status: ParcelStatus.SHIPPED, location: "NY Logistics Center", timestamp: "2024-05-19T10:00:00Z", description: "In transit to destination." },
      { status: ParcelStatus.DELAYED, location: "Atlanta, GA", timestamp: "2024-05-20T12:00:00Z", description: "Weather delay at major hub." }
    ]
  },
  {
    id: "PKG-1004",
    sender: "Book Worms",
    recipient: "Diana Prince",
    origin: "Chicago, IL",
    destination: "Denver, CO",
    status: ParcelStatus.OUT_FOR_DELIVERY,
    lastUpdated: "2024-05-20T08:15:00Z",
    estimatedDelivery: "2024-05-20T18:00:00Z",
    weight: "0.8 kg",
    type: "Books",
    history: [
      { status: ParcelStatus.ORDERED, location: "Chicago, IL", timestamp: "2024-05-17T16:00:00Z", description: "Processing order." },
      { status: ParcelStatus.SHIPPED, location: "Chicago Hub", timestamp: "2024-05-18T09:00:00Z", description: "Departed sorting center." },
      { status: ParcelStatus.IN_TRANSIT, location: "Denver, CO Hub", timestamp: "2024-05-19T20:00:00Z", description: "Arrived at destination city." },
      { status: ParcelStatus.OUT_FOR_DELIVERY, location: "Denver, CO", timestamp: "2024-05-20T08:15:00Z", description: "Courier is on the way." }
    ]
  }
];
