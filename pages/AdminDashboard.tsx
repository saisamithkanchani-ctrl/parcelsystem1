
import React, { useState, useEffect } from 'react';
import { parcelService } from '../services/parcelService';
import { Parcel, ParcelStatus } from '../types';
import { 
  Package, Truck, CheckCircle, AlertTriangle, 
  ArrowUpRight, ArrowDownRight, MoreVertical, Filter, Download,
  Loader2, Activity, Box, Database
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend 
} from 'recharts';

const AdminDashboard: React.FC = () => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const p = await parcelService.getAllParcels();
      const s = await parcelService.getStats();
      setParcels(p);
      setStats(s);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-indigo-400 animate-spin mx-auto mb-4" />
          <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs">Accessing Logistics Mainframe...</p>
        </div>
      </div>
    );
  }

  const chartData = [
    { name: 'Delivered', value: stats.delivered, color: '#10b981' },
    { name: 'In Transit', value: stats.inTransit, color: '#6366f1' },
    { name: 'Delayed', value: stats.delayed, color: '#f43f5e' },
  ];

  const statusColors: Record<string, string> = {
    'Delivered': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'In Transit': 'bg-blue-100 text-blue-800 border-blue-200',
    'Delayed': 'bg-rose-100 text-rose-800 border-rose-200',
    'Out for Delivery': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Shipped': 'bg-slate-100 text-slate-800 border-slate-200',
    'Ordered': 'bg-slate-100 text-slate-800 border-slate-200'
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest mb-1">
              <Activity className="h-4 w-4" />
              Operations Center
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Performance</h1>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-2xl text-sm font-bold bg-white hover:bg-slate-50 shadow-sm transition-all">
              <Download className="h-4 w-4" /> Data Export
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 shadow-xl transition-all">
              <Database className="h-4 w-4" /> Reports
            </button>
          </div>
        </div>

        {/* High-Level Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <StatCard icon={Box} label="Total Assets" value={stats.total} trend="+12.5%" trendUp={true} color="indigo" />
          <StatCard icon={Truck} label="Moving Cargo" value={stats.inTransit} trend="+8.2%" trendUp={true} color="blue" />
          <StatCard icon={CheckCircle} label="Success Rate" value={`${Math.round((stats.delivered/stats.total)*100)}%`} trend="+15%" trendUp={true} color="emerald" />
          <StatCard icon={AlertTriangle} label="Incident Rate" value={stats.delayed} trend="-2.4%" trendUp={false} color="rose" />
        </div>

        {/* Data Visualization Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Activity className="h-5 w-5" />
              </div>
              Portfolio Integrity
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={105}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {chartData.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{d.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Database className="h-5 w-5" />
              </div>
              Volume Analytics
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={40}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Global Asset Table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                <Box className="h-4 w-4" />
              </div>
              Real-time Asset Registry
            </h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                Refresh Node
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset Index</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Route Vector</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Operational Status</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Chronology</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {parcels.map((parcel) => (
                  <tr key={parcel.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                          <Package className="h-5 w-5" />
                        </div>
                        <span className="font-extrabold text-slate-900">{parcel.id}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-900">{parcel.origin}</span>
                        <ArrowUpRight className="h-3 w-3 text-slate-300" />
                        <span className="text-sm font-bold text-slate-900">{parcel.destination}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${statusColors[parcel.status]}`}>
                        {parcel.status}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-sm text-slate-500 font-medium">
                      {new Date(parcel.lastUpdated).toLocaleDateString([], { day: '2-digit', month: 'short' })}
                      <span className="mx-2 opacity-30">•</span>
                      {new Date(parcel.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-10 py-6 text-right">
                      <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                        <MoreVertical className="h-4 w-4 text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, trend, trendUp, color }: any) => {
  const colorMap: any = {
    indigo: 'bg-indigo-50 text-indigo-600',
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    rose: 'bg-rose-50 text-rose-600'
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 rounded-2xl ${colorMap[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black px-3 py-1.5 rounded-xl ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {trend}
        </div>
      </div>
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</h3>
      <p className="text-3xl font-black text-slate-900">{value}</p>
    </div>
  );
};

export default AdminDashboard;
