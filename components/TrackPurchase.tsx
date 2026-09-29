'use client';
import Script from 'next/script';

export default function TrackPurchase() {
  return (
    <>
      <Script id="purchase-event" strategy="lazyOnload">
        {`
          setTimeout(function() {
            if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
              console.log("Disparando Purchase via JS");
              window.fbq('track', 'Purchase', { currency: 'BRL', value: 1.00 });
            }
          }, 1500); // Aguarda 1.5s para ter certeza absoluta que o Pixel Base inicializou
        `}
      </Script>
    </>
  );
}
