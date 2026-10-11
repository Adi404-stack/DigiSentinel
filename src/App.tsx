import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { LandingPage } from './components/landing/LandingPage';
import { SkillDiscoveryPage } from './components/discovery/SkillDiscoveryPage';
import { SkillRadarPage } from './components/radar/SkillRadarPage';
import { RadarResultsPage } from './components/results/RadarResultsPage';
import { MissionLibraryPage } from './components/missions/MissionLibraryPage';
import { MissionWorkspace } from './components/missions/MissionWorkspace';
import { PracticeCentrePage } from './components/practice/PracticeCentrePage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { SkillPortfolioPage } from './components/portfolio/SkillPortfolioPage';
import { ProfileSettingsPage } from './components/profile/ProfileSettingsPage';

export const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'discovery':
        return <SkillDiscoveryPage />;
      case 'radar':
        return <SkillRadarPage />;
      case 'radar_results':
        return <RadarResultsPage />;
      case 'missions':
        return <MissionLibraryPage />;
      case 'mission_workspace':
        return <MissionWorkspace />;
      case 'practice':
        return <PracticeCentrePage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'portfolio':
        return <SkillPortfolioPage />;
      case 'profile':
        return <ProfileSettingsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-sentinel-950 text-slate-100 font-sans selection:bg-electric-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
};
