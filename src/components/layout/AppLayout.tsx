import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AppSidebar } from './AppSidebar';
import { AppTopBar } from './AppTopBar';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { CommandPalette } from '../common/CommandPalette';
import { ConceptAssistantModal } from '../common/ConceptAssistantModal';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { currentPage, isSidebarCollapsed, isAssistantOpen, closeAssistant } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keyboard shortcut for search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isLanding = currentPage === 'landing';

  if (isLanding) {
    return (
      <div className="min-h-screen flex flex-col bg-sentinel-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-electric-500 selection:text-white transition-colors duration-200">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ConceptAssistantModal isOpen={isAssistantOpen} onClose={closeAssistant} />
        <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sentinel-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-electric-500 selection:text-white flex flex-col transition-colors duration-200">
      {/* Collapsible Sidebar */}
      <AppSidebar
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area Offset for Desktop Sidebar */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* App TopBar */}
        <AppTopBar
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Global Modals */}
      <ConceptAssistantModal isOpen={isAssistantOpen} onClose={closeAssistant} />
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};
