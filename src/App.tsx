
import React from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import StrategyTools from './components/StrategyTools';
import MarketingTools from './components/MarketingTools';
import Copilot from './components/Copilot';
import BusinessProfile from './components/BusinessProfile';
import { BusinessProfile as BusinessProfileType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [profile, setProfile] = React.useState<BusinessProfileType>({
    name: 'Visionary Startup',
    industry: 'Technology',
    stage: 'Startup',
    targetAudience: 'Early adopters and innovators',
    description: 'A cutting-edge tech company building AI-first productivity tools.'
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard profile={profile} setActiveTab={setActiveTab} />;
      case 'strategy':
        return <StrategyTools profile={profile} />;
      case 'marketing':
        return <MarketingTools profile={profile} />;
      case 'copilot':
        return <Copilot profile={profile} />;
      case 'profile':
        return <BusinessProfile profile={profile} setProfile={setProfile} />;
      default:
        return <Dashboard profile={profile} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
