import React, { useState } from 'react';
import categoryMap from '../data/category_translation_map.json';

import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend, Label
} from 'recharts';
import foodData from '../data/foodPrices.json';

function ChartLine({ lang }) {
  const isFr = lang === 'fr';
  const [selectedCategory, setSelectedCategory] = useState('Food');

  const formattedData = Object.entries(foodData.monthlyData).map(([date, values]) => ({
    date,
    value: values[selectedCategory]
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      {/* Dropdown */}
      <div className="mb-6">
        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
          {isFr ? 'Sélectionnez une catégorie d’aliments :' : 'Select Food Category:'}
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          {foodData.categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Explanation Box - Chart Purpose */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded">
        <h3 className="font-semibold text-sm mb-1 text-yellow-800">
          {isFr ? '📌 Que montre ce graphique ?' : '📌 What does this chart show?'}
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {isFr ? (
            <>
              Ce graphique montre la <strong>tendance mensuelle des prix</strong> pour la catégorie d’aliments sélectionnée,
              en utilisant l’<em>Indice des prix à la consommation (IPC)</em>.
              Une valeur de <code>100</code> signifie que le prix est égal à la période de base (par ex. <code>2013=100</code> ou <code>202404=100</code>).
              <br /><br />
              <strong>Au-dessus de 100</strong> = prix en hausse<br />
              <strong>En dessous de 100</strong> = prix en baisse
            </>
          ) : (
            <>
              This chart shows the <strong>monthly price trend</strong> for the selected food category using its <em>Consumer Price Index (CPI)</em>.
              A value of <code>100</code> means the price is equal to the base period (e.g., <code>2013=100</code> or <code>202404=100</code>).
              <br /><br />
              <strong>Above 100</strong> = price increased<br />
              <strong>Below 100</strong> = price decreased
            </>
          )}
        </p>
      </div>

      {/* Explanation Box - CPI Value */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
        <h3 className="font-semibold text-sm mb-1 text-blue-800">
          {isFr ? '📈 Que signifie la “valeur” ?' : '📈 What does the “value” mean?'}
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {isFr ? (
            <>
              La valeur sur l’axe Y représente l’<strong>Indice des prix à la consommation (IPC)</strong> mensuel.
              L’IPC est une mesure standardisée du changement des prix dans le temps, avec une base de 100.
              <br /><br />
              <code>valeur = 100</code> → prix identique à la période de base<br />
              <code>valeur = 120</code> → prix augmenté de 20 %<br />
              <code>valeur = 85</code> → prix diminué de 15 %
            </>
          ) : (
            <>
              The Y-axis value represents the monthly <strong>Consumer Price Index (CPI)</strong>.
              CPI is a standardized measure of price changes over time, with a base value of 100.
              <br /><br />
              <code>value = 100</code> → price is same as base period<br />
              <code>value = 120</code> → price increased by 20%<br />
              <code>value = 85</code> → price decreased by 15%
            </>
          )}
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={formattedData}
          margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }}>
            <Label
              value={isFr ? "Mois (AAAA-MM)" : "Month (YYYY-MM)"}
              position="bottom"
              offset={20}
              dy={15}
            />
          </XAxis>
          <YAxis tick={{ fontSize: 12 }} domain={['dataMin - 10', 'dataMax + 10']}>
            <Label
              value={isFr ? "Valeur IPC (Base = 100)" : "CPI Value (Base = 100)"}
              angle={-90}
              position="insideLeft"
              offset={-5}
              style={{ textAnchor: 'middle' }}
            />
          </YAxis>
          <Tooltip formatter={(value) => value.toLocaleString(lang, { maximumFractionDigits: 1 })} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartLine;
