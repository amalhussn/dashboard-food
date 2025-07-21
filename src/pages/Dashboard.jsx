import React, { useState } from 'react';
import ChartLine from '../components/ChartLine';
import ChartBar from '../components/ChartBar';

function Dashboard() {
  const [lang, setLang] = useState('en');
  const isFr = lang === 'fr';

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 px-10 py-4">
        <div className="text-2xl font-bold text-gray-900">
          {isFr ? 'Tableau de bord des prix alimentaires au Canada' : 'Canadian Food Price Dashboard'}
        </div>

        {/* Language Toggle Only */}
        <div className="flex gap-2 items-center text-sm">
          <label htmlFor="lang-toggle" className="font-medium text-gray-600">
            {isFr ? 'Langue :' : 'Language:'}
          </label>
          <select
            id="lang-toggle"
            value={lang}
            onChange={e => setLang(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-10 py-8 max-w-5xl mx-auto space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-2">
            {isFr ? 'Tendances mensuelles des prix' : 'Monthly Price Trends'}
          </h2>
          <ChartLine lang={lang} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2">
            {isFr ? 'Catégories IPC – 10 plus inflationnistes / 10 moins inflationnistes' : 'Top 10 / Bottom 10 CPI Categories'}
          </h2>
          <ChartBar lang={lang} />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
