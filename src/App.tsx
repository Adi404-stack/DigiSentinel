import React from 'react';
import { useApp } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { PersonalizedOnboardingModal } from './components/onboarding/PersonalizedOnboardingModal';
import { AssessmentRunnerModal } from './components/assessments/AssessmentRunnerModal';

// Pages
import { LandingPage } from './components/landing/LandingPage';
import { ExploreAssessmentsPage } from './components/discovery/ExploreAssessmentsPage';
import { SkillDiscoveryPage } from './components/discovery/SkillDiscoveryPage';
import { SkillRadarPage } from './components/radar/SkillRadarPage';
import { RadarResultsPage } from './components/results/RadarResultsPage';
import { MissionLibraryPage } from './components/missions/MissionLibraryPage';
import { MissionWorkspace } from './components/missions/MissionWorkspace';
import { PracticeCentrePage } from './components/practice/PracticeCentrePage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { SkillPortfolioPage } from './components/portfolio/SkillPortfolioPage';
import { ProfileSettingsPage } from './components/profile/ProfileSettingsPage';
import { DailyChallengeArena } from './components/challenges/DailyChallengeArena';
import { TopicMasteryPage } from './components/topics/TopicMasteryPage';
import { DigitalSafetyLabPage } from './components/lab/DigitalSafetyLabPage';

// 404 Fallback Component
const NotFoundPage: React.FC<{ onHome: () => void }> = ({ onHome }) => (
  <div className="max-w-md mx-auto py-24 px-4 text-center space-y-6">
    <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400 mx-auto font-mono text-2xl font-bold">
      404
    </div>
    <div className="space-y-2">
      <h1 className="text-2xl font-bold text-white font-display">Page Not Found</h1>
      <p className="text-xs text-slate-400 leading-relaxed">
        The requested security drill or navigation route could not be found. Return to the platform home to continue your session.
      </p>
    </div>
    <button
      onClick={onHome}
      className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs transition shadow-lg shadow-sky-500/20"
    >
      Return to DigiSentinel Home
    </button>
  </div>
);

export const AppContent: React.FC = () => {
  const { currentPage, navigateTo } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'explore':
        return <ExploreAssessmentsPage />;
      case 'discovery':
        return <SkillDiscoveryPage />;
      case 'radar':
        return <SkillRadarPage />;
      case 'radar_results':
        return <RadarResultsPage />;
      case 'challenges':
        return <DailyChallengeArena />;
      case 'topics':
        return <TopicMasteryPage />;
      case 'lab':
        return <DigitalSafetyLabPage />;
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
        return <NotFoundPage onHome={() => navigateTo('landing')} />;
    }
  };

  return (
    <AppLayout>
      {renderCurrentPage()}
      <PersonalizedOnboardingModal />
      <AssessmentRunnerModal />
    </AppLayout>
  );
};
