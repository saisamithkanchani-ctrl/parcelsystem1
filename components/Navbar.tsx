
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Search, BarChart3, TrendingUp, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/track', label: 'Track', icon: Search },
    { path: '/predict', label: 'Predictions', icon: TrendingUp },
    { path: '/admin', label: 'Dashboard', icon: BarChart3 },
  ];

  return (
    <nav className={`${isHome ? 'bg-slate-900/80 border-white/10' : 'bg-white border-slate-200'} border-b sticky top-0 z-50 backdrop-blur-md transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
                <Box className="h-6 w-6 text-white" />
              </div>
              <span className={`text-xl font-black tracking-tight ${isHome ? 'text-white' : 'text-slate-900'} hidden sm:block`}>
                SmartTrack<span className="text-indigo-500">Pro</span>
              </span>
            </Link>
          </div>
          <div className="flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    isActive
                      ? 'text-white bg-indigo-600'
                      : isHome 
                        ? 'text-slate-300 hover:text-white hover:bg-white/10'
                        : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
