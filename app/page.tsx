import TicketSearch from '@/components/TicketSearch';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">

        <div className="flex justify-end mb-6">
          <ThemeToggle />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          🎟️ Find Events in the UK
        </h1>

        <TicketSearch />
      </div>
    </main>
  );
}