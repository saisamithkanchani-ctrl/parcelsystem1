
import { MOCK_PARCELS } from '../mockData';
import { Parcel, ParcelStatus } from '../types';

class ParcelService {
  private parcels: Parcel[] = [...MOCK_PARCELS];

  async getParcelById(id: string): Promise<Parcel | undefined> {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.parcels.find(p => p.id.toUpperCase() === id.toUpperCase());
  }

  async getAllParcels(): Promise<Parcel[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return this.parcels;
  }

  async getStats() {
    const parcels = await this.getAllParcels();
    return {
      total: parcels.length,
      delivered: parcels.filter(p => p.status === ParcelStatus.DELIVERED).length,
      inTransit: parcels.filter(p => p.status === ParcelStatus.IN_TRANSIT || p.status === ParcelStatus.OUT_FOR_DELIVERY).length,
      delayed: parcels.filter(p => p.status === ParcelStatus.DELAYED).length,
    };
  }
}

export const parcelService = new ParcelService();
