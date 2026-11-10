/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BenefitsSection } from './components/BenefitsSection';
import { LifeServiceSection } from './components/LifeServiceSection';
import { ProductLineupSection } from './components/ProductLineupSection';
import { ApplicationFormSection } from './components/ApplicationFormSection';
import { ReviewSection } from './components/ReviewSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { CheckStatusModal } from './components/CheckStatusModal';
import { SuccessModal } from './components/SuccessModal';
import { TermsModal } from './components/TermsModal';
import { AdminDrawer } from './components/AdminDrawer';
import { PasswordAuthModal } from './components/PasswordAuthModal';
import { PRODUCTS_DATA } from './data/products';
import { INITIAL_TICKER, INITIAL_SUBMISSIONS } from './data/mockData';
import { Product, ApplicationSubmission, TickerItem } from './types';

const STORAGE_KEY = 'theribbon_submissions_v1';

export default function App() {
  // Dual selected appliances: starts at 0/2 selected matching reference
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const [submissions, setSubmissions] = useState<ApplicationSubmission[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return INITIAL_SUBMISSIONS;
  });

  const [tickerItems, setTickerItems] = useState<TickerItem[]>(INITIAL_TICKER);
  const [isCheckStatusOpen, setIsCheckStatusOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [successSubmission, setSuccessSubmission] = useState<ApplicationSubmission | null>(null);

  // Password Protection (Code: 3927) for both Admin & Status check
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTarget, setAuthTarget] = useState<'admin' | 'status'>('admin');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('theribbon_admin_authed_v1') === 'true';
    } catch {
      return false;
    }
  });

  const handleOpenAdmin = () => {
    if (isAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setAuthTarget('admin');
      setIsAuthModalOpen(true);
    }
  };

  const handleOpenCheckStatus = () => {
    if (isAuthenticated) {
      setIsCheckStatusOpen(true);
    } else {
      setAuthTarget('status');
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = (target: 'admin' | 'status') => {
    setIsAuthenticated(true);
    try {
      sessionStorage.setItem('theribbon_admin_authed_v1', 'true');
    } catch {
      // ignore
    }
    setIsAuthModalOpen(false);
    if (target === 'admin') {
      setIsAdminOpen(true);
    } else {
      setIsCheckStatusOpen(true);
    }
  };

  const handleLockSession = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('theribbon_admin_authed_v1');
    } catch {
      // ignore
    }
    setIsAdminOpen(false);
    setIsCheckStatusOpen(false);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch {
      // ignore
    }
  }, [submissions]);

  // Dual Product Selection Handlers
  const handleToggleProduct = (product: Product, targetSlot?: 0 | 1) => {
    setSelectedProducts((prev) => {
      // If already selected, deselect it
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (targetSlot === 0) {
        return [product, ...(prev[1] ? [prev[1]] : [])];
      }
      if (targetSlot === 1) {
        return [...(prev[0] ? [prev[0]] : []), product];
      }
      if (prev.length === 0) {
        return [product];
      }
      if (prev.length === 1) {
        const next = [prev[0], product];
        // 2 items chosen: smoothly navigate to application form
        setTimeout(() => {
          handleApplyShortcut();
        }, 600);
        return next;
      }
      // If already 2 items selected, replace the 2nd item
      const next = [prev[0], product];
      setTimeout(() => {
        handleApplyShortcut();
      }, 600);
      return next;
    });
  };

  const handleSelectProductSlot = (product: Product, slotIndex: 0 | 1) => {
    setSelectedProducts((prev) => {
      const copy = [...prev];
      copy[slotIndex] = product;
      return copy;
    });
  };

  const handleRemoveProduct = (slotIndex: 0 | 1) => {
    setSelectedProducts((prev) => {
      const copy = [...prev];
      copy.splice(slotIndex, 1);
      return copy;
    });
  };

  const handleApplyShortcut = () => {
    const formElement = document.getElementById('apply-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProductShortcut = () => {
    const lineupElement = document.getElementById('lineup');
    if (lineupElement) {
      lineupElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitSuccess = (newSubmission: ApplicationSubmission) => {
    setSubmissions((prev) => [newSubmission, ...prev]);

    // Also inject new applicant into live rolling ticker for real-time gratification
    const productSummary = newSubmission.product2Name
      ? `${newSubmission.productName} + ${newSubmission.product2Name}`
      : newSubmission.productName;

    const newTicker: TickerItem = {
      id: `tick-${Date.now()}`,
      name: `${newSubmission.userName.charAt(0)}*${newSubmission.userName.slice(2) || '님'}`,
      region: newSubmission.region,
      product: productSummary,
      timeAgo: '방금 전',
      status: '접수완료',
    };
    setTickerItems((prev) => [newTicker, ...prev.slice(0, 8)]);

    setSuccessSubmission(newSubmission);
  };

  const handleUpdateStatus = (id: string, status: ApplicationSubmission['status']) => {
    setSubmissions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleDeleteSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetToDefault = () => {
    setSubmissions(INITIAL_SUBMISSIONS);
    setTickerItems(INITIAL_TICKER);
  };

  const handleGoToLifeService = () => {
    const lifeServiceEl = document.getElementById('life-service');
    if (lifeServiceEl) {
      lifeServiceEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-rose-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        onOpenCheckStatus={handleOpenCheckStatus}
        onOpenAdmin={handleOpenAdmin}
        applicationCount={submissions.length}
      />

      {/* Main Content Sections - pb-28 on mobile ensures sticky bottom bar never obscures content */}
      <main className="flex-1 pb-28 md:pb-0">
        {/* Hero Section with urgency & live ticker & mini eligibility test */}
        <HeroSection
          onSelectProductShortcut={handleSelectProductShortcut}
          onApplyShortcut={handleApplyShortcut}
          tickerItems={tickerItems}
        />

        {/* 4 Pillars of benefits */}
        <BenefitsSection />

        {/* Life Services (Cruise, Wedding, Funeral, Language study) */}
        <LifeServiceSection
          onSelectServiceInquiry={() => {
            handleApplyShortcut();
          }}
        />

        {/* Product Lineup Catalog with Dual Selection and filters */}
        <ProductLineupSection
          selectedProducts={selectedProducts}
          onToggleProduct={handleToggleProduct}
          onRemoveProduct={handleRemoveProduct}
          onGoToForm={handleApplyShortcut}
        />

        {/* High-converting intuitive application form for 2 appliances */}
        <ApplicationFormSection
          selectedProducts={selectedProducts}
          onSelectProduct={handleSelectProductSlot}
          onSubmitSuccess={handleSubmitSuccess}
          onOpenTerms={() => setIsTermsOpen(true)}
          onGoToLineup={handleSelectProductShortcut}
        />

        {/* Customer Reviews & Real Social Proof */}
        <ReviewSection />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenCheckStatus={handleOpenCheckStatus}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Mobile Bottom Thumb Navigation & Quick Apply Bar */}
      <MobileStickyBar
        selectedProducts={selectedProducts}
        onApplyClick={handleApplyShortcut}
        onGoToLineup={handleSelectProductShortcut}
        onGoToLifeService={handleGoToLifeService}
        onOpenCheckStatus={handleOpenCheckStatus}
      />

      {/* Check Status Modal (Lookup by phone number - Protected by 3927) */}
      <CheckStatusModal
        isOpen={isCheckStatusOpen}
        onClose={() => setIsCheckStatusOpen(false)}
        submissions={submissions}
        onLock={handleLockSession}
      />

      {/* Submission Success Modal with Confetti & Next steps */}
      <SuccessModal
        submission={successSubmission}
        onClose={() => setSuccessSubmission(null)}
        onViewStatus={() => {
          setSuccessSubmission(null);
          handleOpenCheckStatus();
        }}
      />

      {/* Terms & Privacy Policy Modal */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      {/* Admin Management Drawer - Protected by 3927 */}
      <AdminDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        submissions={submissions}
        onUpdateStatus={handleUpdateStatus}
        onDeleteSubmission={handleDeleteSubmission}
        onResetToDefault={handleResetToDefault}
        onLock={handleLockSession}
      />

      {/* Password Authentication Modal (PIN: 3927) */}
      <PasswordAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        target={authTarget}
      />
    </div>
  );
}
