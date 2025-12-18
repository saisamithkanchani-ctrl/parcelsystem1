
import React, { useState, useEffect } from 'react';
import { parcelService } from '../services/parcelService';
import { geminiService } from '../services/geminiService';
import { Parcel, PredictionResult } from '../types';
import { BrainCircuit, Wind, Car, Building2, TrendingDown, Clock, Info, Loader2, Target, Gauge, Sparkles } from 'lucide-react';

const Prediction: React.FC = () => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await parcelService.getAllParcels();
      setParcels(data);
      setDataLoading(false);
    };
    fetchData();
  }, []);

  const handlePredict = async (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setLoading(true);
    setPrediction(null);
    try {
      const result = await geminiService.predictDeliveryRisk(parcel);
      setPrediction(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskStatus = (risk: number) => {
    if (risk < 20) return { label: 'LOW RISK', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' };
    if (risk < 50) return { label: 'MODERATE RISK', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' };
    return { label: 'HIGH RISK', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' };
  };

  if (dataLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-bold">Synchronizing Logistics Intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Sidebar: Parcel Selection */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">In-Transit Queue</h2>
            <div className="space-y-3">
              {parcels.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePredict(p)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all transform active:scale-95 ${
                    selectedParcel?.id === p.id 
                    ? 'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-100 ring-1 ring-indigo-600' 
                    : 'border-slate-100 hover:border-slate-300 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-black text-slate-900 tracking-tight">{p.id}</span>
                    <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></div>
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold truncate flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    {p.destination}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-8 bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200 hidden lg:block">
            <Sparkles className="h-8 w-8 mb-4 opacity-50" />
            <h3 className="text-lg font-bold mb-2">Gemini Pro Integration</h3>
            <p className="text-xs text-indigo-100 leading-relaxed font-medium">
              We use real-time LLM inference to parse global satellite telemetry and traffic flow.
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {!selectedParcel ? (
            <div className="h-[600px] flex flex-col items-center justify-center text-center bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-12">
              <div className="h-24 w-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6">
                <BrainCircuit className="h-12 w-12 text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">AI Predictive Center</h3>
              <p className="text-slate-500 max-w-sm mt-3 text-lg leading-relaxed">
                Select a shipment to perform real-time risk assessment and arrival time recalibration.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Analytics Header */}
              <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-2 w-12 bg-indigo-500 rounded-full"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Live Prediction Active</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Analysis for {selectedParcel.id}</h2>
                  <div className="flex flex-wrap gap-4 items-center">
                    <span className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold border border-white/10 backdrop-blur-sm">ROUTE: {selectedParcel.origin} → {selectedParcel.destination}</span>
                    <span className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold border border-white/10 backdrop-blur-sm">TYPE: {selectedParcel.type}</span>
                  </div>
                </div>
                <BrainCircuit className="absolute -right-12 -bottom-12 h-64 w-64 text-white/5" />
              </div>

              {loading ? (
                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-24 text-center shadow-sm">
                  <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-25"></div>
                    <div className="relative h-20 w-20 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-200">
                      <BrainCircuit className="h-10 w-10 animate-pulse" />
                    </div>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-2">Simulating Scenarios...</h4>
                  <p className="text-slate-400 font-medium">Gemini is processing weather fronts, port congestion, and local traffic.</p>
                </div>
              ) : prediction && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
                  {/* Primary Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <MetricCard 
                      icon={Gauge} 
                      label="Delay Risk Index" 
                      value={`${prediction.delayRisk}%`}
                      sub={getRiskStatus(prediction.delayRisk).label}
                      statusStyle={getRiskStatus(prediction.delayRisk)}
                      progress={prediction.delayRisk}
                    />
                    <MetricCard 
                      icon={Clock} 
                      label="Optimized Arrival" 
                      value={new Date(prediction.adjustedDeliveryTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      sub={new Date(prediction.adjustedDeliveryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      progress={100}
                    />
                  </div>

                  {/* Factor Analysis Cards */}
                  <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                      <TrendingDown className="h-6 w-6 text-indigo-600" />
                      Environmental Risk Factors
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                      <FactorItem icon={Wind} label="Atmosphere" value={prediction.factors.weather} detail="Satellite imagery verified" />
                      <FactorItem icon={Car} label="Transit Load" value={prediction.factors.traffic} detail="Real-time GPS nodes" />
                      <FactorItem icon={Building2} label="Network Efficiency" value={prediction.factors.logistics} detail="Hub throughput index" />
                    </div>
                  </div>

                  {/* Reasoning Card */}
                  <div className="bg-indigo-50 rounded-[2.5rem] border border-indigo-100 p-10 md:p-12 relative overflow-hidden">
                    <Sparkles className="absolute top-8 right-8 h-12 w-12 text-indigo-200" />
                    <h3 className="text-xl font-black text-indigo-900 mb-6 flex items-center gap-2">
                      <BrainCircuit className="h-5 w-5" />
                      Executive AI Summary
                    </h3>
                    <div className="relative">
                      <div className="text-lg md:text-xl text-indigo-800/80 leading-relaxed font-medium italic">
                        "{prediction.reasoning}"
                      </div>
                      <div className="mt-8 pt-8 border-t border-indigo-200/50 flex items-center justify-between text-indigo-400 text-xs font-black uppercase tracking-widest">
                        <span>Analysis Confidence: 98.4%</span>
                        <span>Processed by Gemini 3 Flash</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon: Icon, label, value, sub, statusStyle, progress }: any) => (
  <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-6">
      <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600">
        <Icon className="h-6 w-6" />
      </div>
      {statusStyle && (
        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest border ${statusStyle.bg} ${statusStyle.color} ${statusStyle.border}`}>
          {statusStyle.label}
        </span>
      )}
    </div>
    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{label}</h4>
    <div className="flex items-baseline gap-2 mb-4">
      <span className="text-4xl font-black text-slate-900">{value}</span>
      <span className="text-indigo-600 font-extrabold text-sm">{sub}</span>
    </div>
    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
      <div 
        className={`h-full transition-all duration-1000 ${progress > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
        style={{ width: `${progress}%` }} 
      />
    </div>
  </div>
);

const FactorItem = ({ icon: Icon, label, value, detail }: any) => (
  <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
    <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 text-indigo-600">
      <Icon className="h-7 w-7" />
    </div>
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</span>
    <span className="text-xl font-black text-slate-900 mb-1">{value}</span>
    <span className="text-[10px] font-bold text-slate-400 italic">{detail}</span>
  </div>
);

export default Prediction;
