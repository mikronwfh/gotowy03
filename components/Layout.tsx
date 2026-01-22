
import React from 'react';
import { 
  LayoutDashboard, 
  Target, 
  Megaphone, 
  MessageSquare, 
  Settings, 
  Building2, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'strategy', label: 'Strategy Vault', icon: Target },
    { id: 'marketing', label: 'Marketing Hub', icon: Megaphone },
    { id: 'copilot', label: 'AI Copilot', icon: MessageSquare },
    { id: 'profile', label: 'Business Profile', icon: Building2 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 bg-white border-r border-slate-200 flex flex-col z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen ? (
            <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">BizNexus</h1>
          ) : (
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">B</div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-colors ${
                activeTab === item.id 
                  ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-6 h-6 shrink-0" />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
           <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-4 p-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            {isSidebarOpen && <span className="font-medium">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-slate-900 capitalize">{activeTab}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-slate-200 animate-pulse" />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold leading-none">Founder Mode</p>
              <p className="text-xs text-slate-500 mt-1">Free Tier</p>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
