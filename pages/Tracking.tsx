
import React, { useState } from 'react';
import { parcelService } from '../services/parcelService';
import { Parcel, ParcelStatus } from '../types';
// Fixed: Added 'Zap' to the imports from lucide-react
import { Search, Package, MapPin, Calendar, Clock, ChevronRight, AlertCircle, CheckCircle2, User, Weight, Hash, MapPinned, Zap } from 'lucide-react';

const Tracking: React.FC = () => {
  const [parcelId, setParcelId] = useState('');
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parcelId.trim()) return;
    
    setLoading(true);
    setError('');
    setParcel(null);

    try {
      const found = await parcelService.getParcelById(parcelId);
      if (found) {
        setParcel(found);
      } else {
        setError('No record found for this tracking ID. Please verify and try again.');
      }
    } catch (err) {
      setError('An error occurred while connecting to the database.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status: ParcelStatus) => {
    switch (status) {
      case ParcelStatus.DELIVERED: 
        return { 
          color: 'text-emerald-600', 
          bg: 'bg-emerald-50', 
          border: 'border-emerald-200',
          icon: <CheckCircle2 className="h-5 w-5" />
        };
      case ParcelStatus.DELAYED: 
        return { 
          color: 'text-amber-600', 
          bg: 'bg-amber-50', 
          border: 'border-amber-200',
          icon: <AlertCircle className="h-5 w-5" />
        };
      case ParcelStatus.OUT_FOR_DELIVERY: 
        return { 
          color: 'text-blue-600', 
          bg: 'bg-blue-50', 
          border: 'border-blue-200',
          icon: <Truck className="h-5 w-5" />
        };
      default: 
        return { 
          color: 'text-indigo-600', 
          bg: 'bg-indigo-50', 
          border: 'border-indigo-200',
          icon: <Clock className="h-5 w-5" />
        };
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Track Your Shipments</h1>
        <p className="text-slate-500 mt-3 text-lg">Enter your tracking number for 24/7 real-time updates.</p>
      </div>

      <div className="max-w-2xl mx-auto mb-16">
        <form onSubmit={handleSearch} className="group">
          <div className="relative flex items-center p-2 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
            <div className="pl-4">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <input
              type="text"
              value={parcelId}
              onChange={(e) => setParcelId(e.target.value)}
              placeholder="e.g. PKG-1001"
              className="flex-1 px-4 py-4 text-lg font-medium text-slate-900 bg-transparent border-none outline-none placeholder:text-slate-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50 active:scale-95"
            >
              {loading ? 'Searching...' : 'Track'}
            </button>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 justify-center">
            {['PKG-1001', 'PKG-1002', 'PKG-1003', 'PKG-1004'].map(id => (
              <button 
                key={id}
                onClick={() => setParcelId(id)}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-500 transition-colors"
              >
                {id}
              </button>
            ))}
          </div>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-center gap-4 text-red-800 animate-in fade-in zoom-in duration-300">
          <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="font-bold">Tracking Error</p>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        </div>
      )}

      {parcel && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
          {/* Main Status Card */}
          <div className="bg-white border border-slate-200 rounded-[2rem] shadow-2xl shadow-slate-200/50 overflow-hidden">
            <div className="bg-slate-900 p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="flex items-center gap-2 text-indigo-400 mb-1">
                  <Hash className="h-4 w-4" />
                  <span className="text-xs font-black uppercase tracking-widest">Tracking Number</span>
                </div>
                <h2 className="text-3xl font-black">{parcel.id}</h2>
              </div>
              
              <div className="flex flex-col items-start md:items-end">
                <div className={`px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center gap-3 border shadow-lg ${getStatusInfo(parcel.status).bg} ${getStatusInfo(parcel.status).color} ${getStatusInfo(parcel.status).border}`}>
                  {getStatusInfo(parcel.status).icon}
                  {parcel.status}
                </div>
                <p className="text-slate-400 text-xs mt-3">Last updated: {new Date(parcel.lastUpdated).toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8 md:p-12">
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <InfoItem icon={User} label="Sender" value={parcel.sender} />
                  <InfoItem icon={User} label="Recipient" value={parcel.recipient} />
                  <InfoItem icon={Weight} label="Weight" value={parcel.weight} />
                  <InfoItem icon={Package} label="Package Type" value={parcel.type} />
                </div>
                
                <div className="pt-8 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                      <MapPinned className="h-5 w-5 text-indigo-600" />
                      Shipment Route
                    </h3>
                  </div>
                  <div className="relative flex items-center justify-between px-4">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 -z-10 rounded-full"></div>
                    <div className="flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-indigo-600 ring-4 ring-indigo-50 shadow-md"></div>
                      <span className="mt-2 text-sm font-bold text-slate-900">{parcel.origin}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Origin</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-white border-2 border-slate-200 ring-4 ring-slate-50 shadow-sm"></div>
                      <span className="mt-2 text-sm font-bold text-slate-900">{parcel.destination}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Destination</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center border border-slate-100">
                <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center shadow-lg mb-4 text-indigo-600">
                  <Calendar className="h-8 w-8" />
                </div>
                <h4 className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">Estimated Delivery</h4>
                <p className="text-4xl font-black text-slate-900 mb-2">
                  {new Date(parcel.estimatedDelivery).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
                <p className="text-indigo-600 font-extrabold text-lg">
                  by {new Date(parcel.estimatedDelivery).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <button 
                  onClick={() => window.location.hash = '/predict'}
                  className="mt-8 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 hover:shadow-md transition-all flex items-center gap-2"
                >
                  <Zap className="h-4 w-4 text-indigo-600" />
                  Get AI Prediction
                </button>
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="bg-white border border-slate-200 rounded-[2rem] shadow-xl shadow-slate-200/50 p-8 md:p-12">
            <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-3">
              <Clock className="h-6 w-6 text-indigo-600" />
              Transit Progress
            </h3>
            
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-slate-100 md:left-1/2 md:-translate-x-1/2"></div>
              
              <div className="space-y-12">
                {parcel.history.slice().reverse().map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-6 md:gap-0 md:justify-between group">
                    <div className="hidden md:block w-[45%] text-right pt-1 pr-8 opacity-40 group-first:opacity-100 transition-opacity">
                      <p className="text-sm font-black text-slate-900">{step.location}</p>
                      <p className="text-xs font-bold text-indigo-600">{new Date(step.timestamp).toLocaleDateString()}</p>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform group-first:scale-125 ${idx === 0 ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-white text-slate-300 border border-slate-100'}`}>
                        {idx === 0 ? <Package className="h-6 w-6" /> : <div className="h-3 w-3 rounded-full bg-slate-200"></div>}
                      </div>
                    </div>

                    <div className="flex-1 md:w-[45%] md:flex-initial pt-1 md:pl-8 text-left group-first:font-bold">
                      <div className="md:hidden mb-2">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{new Date(step.timestamp).toLocaleString()}</span>
                      </div>
                      <h4 className={`text-lg mb-1 ${idx === 0 ? 'text-slate-900' : 'text-slate-500'}`}>{step.status}</h4>
                      <p className={`text-sm ${idx === 0 ? 'text-slate-600' : 'text-slate-400'}`}>{step.description}</p>
                      <p className="md:hidden mt-2 text-xs font-bold text-indigo-600">{step.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex flex-col gap-1 p-4 rounded-2xl bg-slate-50 border border-slate-100">
    <div className="flex items-center gap-2 text-slate-400">
      <Icon className="h-3.5 w-3.5" />
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <span className="text-sm font-bold text-slate-900 truncate">{value}</span>
  </div>
);

const Truck = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 17h4V5H2v12h3m10 0h3l4-4v-3h-7v7Z"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
  </svg>
);

export default Tracking;
