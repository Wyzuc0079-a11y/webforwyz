import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-12 md:p-24 selection:bg-red-500 selection:text-white">
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-12 py-8 flex justify-between text-[10px] font-bold tracking-[0.3em]">
        <Link href="/" className="opacity-40 hover:opacity-100 transition-opacity">[ EXIT TO MAIN ]</Link>
        <Link href="/letter-e" className="opacity-40 hover:opacity-100 transition-opacity text-red-500">[ BACK TO MORE_E ]</Link>
      </nav>

      <div className="max-w-5xl mx-auto pt-20">
        <header className="border-b border-white/10 pb-8 mb-12">
          <p className="text-red-500 text-[9px] tracking-[0.4em] uppercase mb-2">// Spatial Scenario SPEC</p>
          <h2 className="text-4xl font-bold tracking-tighter uppercase">{id.replace(/-/g, ' ')}</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="w-full aspect-square bg-neutral-900 border border-white/5 flex items-center justify-center">
            <span className="text-white/10 text-xs tracking-widest">[ SPATIAL_PHOTO_A ]</span>
          </div>
          <div className="w-full aspect-square bg-neutral-900 border border-white/5 flex items-center justify-center">
            <span className="text-white/10 text-xs tracking-widest">[ SPATIAL_PHOTO_B ]</span>
          </div>
        </div>
      </div>
    </main>
  );
}