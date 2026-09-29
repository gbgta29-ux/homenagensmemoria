'use client';
import { useEffect, useRef } from 'react';

export default function TrackPurchase() {
  const hasFired = useRef(false);

  useEffect(() => {
    // O Next.js carrega o Pixel Base de forma "preguiçosa" para não travar o site.
    // Por isso, nosso gatilho tenta disparar a cada 500ms até achar o Pixel pronto.
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function' && !hasFired.current) {
        (window as any).fbq('track', 'Purchase', { currency: 'BRL', value: 1.00 });
        hasFired.current = true;
        clearInterval(interval);
        console.log("✅ Evento de Purchase disparado com sucesso!");
      }
    }, 500);

    // Desiste após 10 segundos (ex: se o usuário estiver usando um AdBlock forte que bloqueou o Pixel)
    const timeout = setTimeout(() => clearInterval(interval), 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);
  
  return null;
}
