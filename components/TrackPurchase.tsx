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
      {/* Fallback à prova de falhas: Dispara a compra mesmo se o JS falhar ou travar */}
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }} 
          src="https://www.facebook.com/tr?id=1071800878779756&ev=Purchase&cd[value]=1.00&cd[currency]=BRL&noscript=1" 
          alt=""
        />
      </noscript>
    </>
  );
}
