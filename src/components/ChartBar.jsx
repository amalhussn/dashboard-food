import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Cell
} from 'recharts';
import foodData from '../data/foodPrices.json';

function ChartBar({ lang }) {
  const isFr = lang === 'fr';
  const [view, setView] = useState('top');

  const months = Object.keys(foodData.monthlyData);
  const latestMonth = months[months.length - 1];
  const latestData = foodData.monthlyData[latestMonth];

  const cleanLabel = (label) => label.replace(/\s*\(.*?=100\)/g, '');

  // inline translation for common categories
  const translateCategory = (label) => {
    const cleaned = cleanLabel(label);
    if (!isFr) return cleaned;
   const translations = {
  'Fresh or frozen beef': 'Bœuf frais ou congelé',
  'Margarine': 'Margarine',
  'Fresh or frozen meat (excluding poultry)': 'Viande fraîche ou congelée (sauf volaille)',
  'Edible fats and oils': 'Graisses et huiles comestibles',
  'Eggs': 'Œufs',
  'Meat': 'Viande',
  'Pasta products': 'Produits à base de pâtes',
  'Other edible fats and oils': 'Autres graisses et huiles comestibles',
  'Bread, rolls and buns': 'Pain, petits pains et brioches',
  'Apples': 'Pommes',
  // bottom 10:
  'Berries': 'Baies',
  'Cucumber': 'Concombre',
  'Peppers': 'Poivrons',
  'Mushrooms': 'Champignons',
  'Fresh or frozen chicken thighs': 'Hauts de cuisse de poulet frais ou congelé',
  'Fresh or frozen chicken drumsticks': 'Pilons de poulet frais ou congelé',
  'Other fresh or frozen chicken': 'Autres morceaux de poulet frais ou congelé',
  'Fresh or frozen chicken breasts': 'Poitrines de poulet frais ou congelé',
  'Citrus': 'Agrumes',
  'Frozen fruit': 'Fruits surgelés'
};

    return translations[cleaned] || cleaned;
  };

  const sortedCategories = foodData.categories
    .filter(cat => latestData[cat] !== undefined)
    .map(cat => ({
      category: translateCategory(cat),
      value: parseFloat(latestData[cat])
    }))
    .sort((a, b) => view === 'top' ? b.value - a.value : a.value - b.value)
    .slice(0, 10);

  const barColor = view === 'top' ? '#ef4444' : '#10b981';

  return (
    <div className="bg-white p-4 rounded shadow">
      {/* Chart Purpose */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
        <h3 className="font-semibold text-sm mb-1 text-blue-800">
          {isFr ? '📊 Que montre ce graphique ?' : '📊 What does this chart show?'}
        </h3>
        <p className="text-sm text-gray-700">
          {isFr ? (
            <>
              Ce graphique en barres compare l’<strong>Indice des prix à la consommation (IPC)</strong> des catégories d’aliments
              pour <strong>{latestMonth}</strong>. Utilisez le bouton pour explorer les articles les plus ou les moins inflationnistes.
            </>
          ) : (
            <>
              This bar chart compares the <strong>Consumer Price Index (CPI)</strong> of food categories
              in <strong>{latestMonth}</strong>. Toggle to explore the most and least inflated items.
            </>
          )}
        </p>
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-4 mb-4">
        <label className="font-medium text-sm text-gray-700">
          {isFr ? 'Vue :' : 'View:'}
        </label>
        <label className="flex items-center gap-1 text-sm">
          <input
            type="radio"
            name="view"
            value="top"
            checked={view === 'top'}
            onChange={() => setView('top')}
          />
          {isFr ? '10 plus élevés (plus inflationnistes)' : 'Top 10 (Most Inflated)'}
        </label>
        <label className="flex items-center gap-1 text-sm">
          <input
            type="radio"
            name="view"
            value="bottom"
            checked={view === 'bottom'}
            onChange={() => setView('bottom')}
          />
          {isFr ? '10 plus bas (moins inflationnistes)' : 'Bottom 10 (Least Inflated)'}
        </label>
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={430}>
        <BarChart
          data={sortedCategories}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 200, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            domain={['dataMin - 10', 'dataMax + 10']}
            tickFormatter={(val) => val.toFixed(1)}
            tick={{ fontSize: 12 }}
          >
            <Label
              value={isFr ? 'IPC (Base = 100)' : 'CPI (Base = 100)'}
              position="insideBottom"
              offset={-5}
            />
          </XAxis>
          <YAxis
            dataKey="category"
            type="category"
            tick={{
              fontSize: 14,
              width: 190,
              style: { wordBreak: 'break-word', whiteSpace: 'normal', lineHeight: '1.2em' }
            }}
            interval={0}
          />
          <Tooltip
            formatter={(value) => [
              value.toLocaleString(lang, { maximumFractionDigits: 1 }),
              isFr ? 'Valeur IPC' : 'CPI Value'
            ]}
            labelFormatter={(label) => `${isFr ? 'Catégorie' : 'Category'}: ${label}`}
          />
          <Bar dataKey="value">
            {sortedCategories.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartBar;
