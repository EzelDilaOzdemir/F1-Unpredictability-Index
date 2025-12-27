
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, Legend, AreaChart, Area
} from 'recharts';
import { UnpredictabilityMetrics } from '../types';

interface MetricRadarProps {
  metrics: UnpredictabilityMetrics;
}

export const MetricRadar: React.FC<MetricRadarProps> = ({ metrics }) => {
  const data = [
    { subject: 'Weather', A: metrics.weatherVolatility, fullMark: 100 },
    { subject: 'Safety Car', A: metrics.safetyCarFrequency * 50, fullMark: 100 },
    { subject: 'Overtaking', A: metrics.overtakesPerRace, fullMark: 100 },
    { subject: 'DNF Risk', A: metrics.dnfRate * 2, fullMark: 100 },
    { subject: 'Strategy', A: metrics.strategyVariance, fullMark: 100 },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#3a3a3a" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10 }} />
          <Radar
            name="Metrics"
            dataKey="A"
            stroke="#e10600"
            fill="#e10600"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

interface HistoricalTrendLineChartProps {
  data: { season: number; score: number }[];
}

export const HistoricalTrendLineChart: React.FC<HistoricalTrendLineChartProps> = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e10600" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#e10600" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
          <XAxis 
            dataKey="season" 
            tick={{ fill: '#666', fontSize: 10 }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            domain={[0, 100]} 
            tick={{ fill: '#666', fontSize: 10 }} 
            axisLine={false}
            tickLine={false}
            width={30}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#141414', border: '1px solid #333', borderRadius: '4px', fontSize: '12px' }}
            itemStyle={{ color: '#e10600' }}
            cursor={{ stroke: '#333' }}
          />
          <Area 
            type="monotone" 
            dataKey="score" 
            stroke="#e10600" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorScore)" 
            name="Index Score"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

interface SafetyCarBarChartProps {
  data: { season: number; deployments: number }[];
}

export const SafetyCarBarChart: React.FC<SafetyCarBarChartProps> = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
          <XAxis 
            dataKey="season" 
            tick={{ fill: '#666', fontSize: 10 }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: '#666', fontSize: 10 }} 
            axisLine={false}
            tickLine={false}
            width={30}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#141414', border: '1px solid #333', borderRadius: '4px', fontSize: '12px' }}
            itemStyle={{ color: '#ffeb00' }}
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
          />
          <Bar 
            dataKey="deployments" 
            fill="#ffeb00" 
            radius={[4, 4, 0, 0]}
            name="SC/VSC Deployments"
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

interface MultiCircuitCompareProps {
  data: { name: string; score: number; weather: number; sc: number }[];
}

export const MultiCircuitCompare: React.FC<MultiCircuitCompareProps> = ({ data }) => {
  return (
    <div className="h-80 w-full mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
          <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 12 }} />
          <YAxis tick={{ fill: '#888', fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f1f1f', border: '1px solid #3a3a3a', borderRadius: '4px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Bar dataKey="score" fill="#e10600" name="Unpredictability Index" />
          <Bar dataKey="weather" fill="#ffeb00" name="Weather Risk" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
