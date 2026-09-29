'use client';
import { useEffect } from 'react';

export default function TrackPurchase() {
  useEffect(() => {
    // Garante que só roda no navegador e que o Pixel foi carregado
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', { currency: 'BRL', value: 1.00 });
    }
  }, []);
  
  return null;
}
