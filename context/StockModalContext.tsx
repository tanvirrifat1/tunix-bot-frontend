'use client';

import React, { createContext, useContext, useState } from 'react';
import { RobotProduct } from '@/lib/types';
import StockOutModal from '@/components/StockOutModal';

interface StockModalContextType {
  openStockModal: (product?: RobotProduct | null) => void;
  closeStockModal: () => void;
  isStockModalOpen: boolean;
  stockProduct: RobotProduct | null;
}

const StockModalContext = createContext<StockModalContextType | undefined>(undefined);

export function StockModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<RobotProduct | null>(null);

  const openStockModal = (prod?: RobotProduct | null) => {
    setProduct(prod || null);
    setIsOpen(true);
  };

  const closeStockModal = () => {
    setIsOpen(false);
  };

  return (
    <StockModalContext.Provider
      value={{
        openStockModal,
        closeStockModal,
        isStockModalOpen: isOpen,
        stockProduct: product,
      }}
    >
      {children}
      <StockOutModal
        isOpen={isOpen}
        product={product}
        onClose={closeStockModal}
      />
    </StockModalContext.Provider>
  );
}

export function useStockModal() {
  const context = useContext(StockModalContext);
  if (!context) {
    throw new Error('useStockModal must be used within a StockModalProvider');
  }
  return context;
}
