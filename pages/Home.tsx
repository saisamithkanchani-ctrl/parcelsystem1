
import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Zap, Globe, ArrowRight, Package, Navigation, Clock, Activity, Flame } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-slate-900 min-h-screen">
      {/* Hero Section with Provided Image Background */}
      <div className="relative isolate min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=2070&auto=format&fit=crop')`, // Fallback high-quality dark dramatic background
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Use the actual provided image source if hosted locally or via data URL */}
          <img 
            src="https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=2070&auto=format&fit=crop" 
            className="hidden" // This is a placeholder for where the user-provided image would go
            alt="Cinematic Background" 
          />
          {/* Dark Gradients for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/40 to-slate-900"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-slate-900/40"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 w-full">
          <div className="mx-auto max-w-3xl lg:mx-0">
            <div className="flex mb-8">
              <div className="glass border border-white/10 rounded-full px-4 py-1.5 text-xs font-bold leading-6 text-indigo-300 uppercase tracking-widest flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse"></div>
                AI Logistics Engine Active
              </div>
            </div>
            
            <h1 className="text-6xl font-black tracking-tight text-white sm:text-8xl mb-8 leading-[1.1]">
              One Spark of Data, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Endless Logistics.</span>
            </h1>
            
            <p className="text-xl leading-8 text-slate-300 mb-12 max-w-2xl font-medium">
              We track the source of every shipment. SmartTrack Pro uses Gemini AI to analyze global transit flows, predicting delays before they ignite into disruption.
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
              <Link
                to="/track"
                className="rounded-2xl bg-white px-10 py-5 text-lg font-black text-slate-900 shadow-2xl hover:bg-slate-100 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-3"
              >
                Track Now <Navigation className="h-5 w-5" />
              </Link>
              <Link to="/predict" className="text-lg font-bold leading-6 text-white flex items-center gap-2 group glass border border-white/10 px-8 py-5 rounded-2xl hover:bg-white/5 transition-all">
                AI Predictions <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Stat Card (Glassmorphism) */}
        <div className="absolute bottom-12 right-12 hidden xl:block animate-in fade-in slide-in-from-right-10 duration-1000">
          <div className="glass border border-white/10 p-8 rounded-[2.5rem] shadow-2xl w-80">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                <Activity className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">Global Status</p>
                <p className="text-2xl font-black text-white">99.8% Sync</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[99.8%] bg-indigo-500"></div>
              </div>
              <p className="text-xs text-slate-400 font-bold">Real-time telemetry from 14,200+ nodes across the global supply network.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Features Section */}
      <div className="bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <DarkFeature 
              icon={Flame} 
              title="Disruption Detection" 
              description="Identify the source of delays. Our AI detects 'spark' events—weather shifts or port congestion—before they impact your timeline."
            />
            <DarkFeature 
              icon={Zap} 
              title="Instant Recalibration" 
              description="When the source changes, the destination adjusts. Gemini re-routes and predicts new arrival windows in milliseconds."
            />
            <DarkFeature 
              icon={ShieldCheck} 
              title="Immutable Security" 
              description="Encrypted tracking IDs ensure your data destruction is impossible, maintaining complete visibility from origin to door."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DarkFeature = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="group p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-indigo-500/30">
    <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/5">
      <Icon className="h-7 w-7" />
    </div>
    <h3 className="text-xl font-black text-white mb-4 tracking-tight">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed font-medium">
      {description}
    </p>
  </div>
);

export default Home;
