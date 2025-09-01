// No "use client" directive here - this is now a Server Component.

import KnapsackGame from '@/components/games/KnapsackGame';
import TSPGame from '@/components/games/TSPGame';

// This function runs on the server at build time.
export async function generateStaticParams() {
  // IMPORTANT: The slugs here must match the games you want to build.
  const games = [{ slug: 'knapsack' }, { slug: 'tsp' }];

  return games.map((game) => ({
    gameType: game.slug,
  }));
}

// The component now receives params as a prop.
export default function GamePage({ params }: { params: { gameType: string } }) {
  // We get gameType directly from the props, no hook needed.
  const { gameType } = params;

  if (gameType === 'knapsack') {
    return <KnapsackGame />;
  } else if (gameType === 'tsp') {
    return <TSPGame />;
  }

  // This is a fallback for any other route that might be accessed.
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
        <p className="text-gray-400">The requested game type does not exist.</p>
      </div>
    </div>
  );
}