import { videos } from '../../data/videos';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import TrackPurchase from '../../components/TrackPurchase';

// Gera os meta dados para o WhatsApp!
export async function generateMetadata({ params }: { params: { cliente: string } }): Promise<Metadata> {
  const clienteData = videos[params.cliente.toLowerCase()];
  
  if (!clienteData) {
    return { title: 'Página não encontrada' };
  }

  return {
    title: `Homenagem para ${clienteData.nome}`,
    description: 'Um vídeo muito especial feito com carinho pela Memória Viva.',
    openGraph: {
      title: `Homenagem para ${clienteData.nome} 🤍`,
      description: 'Um vídeo muito especial feito com carinho pela Memória Viva. Clique para assistir!',
      // Você pode adicionar a logo aqui no futuro para aparecer no preview
      // images: ['https://homenagensmemoriaviva.site/logo.jpg']
    }
  }
}

export default function ClientePage({ params }: { params: { cliente: string } }) {
  const clienteData = videos[params.cliente.toLowerCase()];

  if (!clienteData) {
    return notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-24 bg-zinc-950 text-white">
      {/* Componente invisível que dispara o Pixel de Purchase assim que a página carrega */}
      <TrackPurchase />
      
      <div className="max-w-3xl w-full text-center space-y-8 mt-10">
        {/* Logo / Título */}
        <div className="flex flex-col items-center justify-center space-y-4 mb-8">
          <h1 className="text-3xl sm:text-5xl font-serif text-amber-500">
            Memória Viva
          </h1>
          <h2 className="text-xl sm:text-2xl text-zinc-300">
            Uma homenagem especial para <br className="sm:hidden" />
            <span className="font-bold text-white text-2xl sm:text-3xl">{clienteData.nome}</span>
          </h2>
        </div>

        {/* Vídeo Player (Oculta o Supabase) */}
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
          <video 
            src={clienteData.url} 
            controls 
            autoPlay 
            playsInline
            className="w-full h-full object-contain"
          >
            Seu navegador não suporta a tag de vídeo.
          </video>
        </div>

        <p className="text-zinc-500 text-sm mt-8">
          Para assistir em tela cheia, clique no ícone no canto do vídeo.
        </p>
      </div>
    </main>
  );
}
