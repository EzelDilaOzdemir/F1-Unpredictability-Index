
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import { CIRCUITS, COLORS } from './constants';
import { Circuit, CircuitAnalysis, ComparisonData } from './types';
import CircuitCard from './components/CircuitCard';
import { getCircuitAnalysis, compareCircuits } from './services/geminiService';
import { MetricRadar, MultiCircuitCompare, HistoricalTrendLineChart, SafetyCarBarChart } from './components/Charts';
import { 
  Trophy, AlertTriangle, CloudRain, ShieldAlert, 
  ArrowRightLeft, Gauge, Loader2, Info, Search, ListFilter, Activity, TrendingUp, Car
} from 'lucide-react';

const App: React.FC = () => {
  const [selectedCircuitId, setSelectedCircuitId] = useState<string>(CIRCUITS[0].id);
  const [analysis, setAnalysis] = useState<CircuitAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [comparing, setComparing] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<ComparisonData | null>(null);

  const fetchAnalysis = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const circuit = CIRCUITS.find(c => c.id === id);
      if (circuit) {
        const result = await getCircuitAnalysis(id, circuit.name);
        setAnalysis(result);
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch circuit analysis. Please check your API key.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalysis(selectedCircuitId);
  }, [selectedCircuitId, fetchAnalysis]);

  const handleCircuitSelect = (id: string) => {
    setSelectedCircuitId(id);
    setComparing(false);
  };

  const handleCompareAll = async () => {
    setLoading(true);
    setComparing(true);
    try {
      const names = CIRCUITS.slice(0, 6).map(c => c.name); // Limit for performance
      const result = await compareCircuits(names);
      setComparisonResult(result);
    } catch (err) {
      setError("Comparison failed.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCircuits = CIRCUITS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCircuit = CIRCUITS.find(c => c.id === selectedCircuitId);

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 p-8 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
             <div className="w-full h-full rotate-45 translate-x-1/2 translate-y-1/2 bg-[#e10600] blur-3xl rounded-full"></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#e10600]/10 border border-[#e10600]/30 px-3 py-1 rounded-full text-[#e10600] text-xs font-bold uppercase tracking-wider">
                <Gauge size={14} />
                Real-time Analysis Engine
              </div>
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tight">
                IDENTIFY THE <span className="text-[#e10600]">CHAOS</span>.
              </h2>
              <p className="text-zinc-400 max-w-xl text-lg">
                Formula 1 is a game of millimeters and split-second decisions. We rank every circuit by its sheer unpredictability—from weather tantrums to safety car lockdowns.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={handleCompareAll}
                  className="bg-[#e10600] hover:bg-[#c10500] text-white px-6 py-3 rounded-lg font-bold text-sm uppercase transition-all flex items-center gap-2 shadow-lg shadow-[#e10600]/20"
                >
                  <Trophy size={18} />
                  View Ranking
                </button>
              </div>
            </div>

            {analysis && !comparing && (
              <div className="w-full md:w-1/3 bg-[#141414] border border-zinc-800 p-6 rounded-xl shadow-inner">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Selected Score</h4>
                  <div className="text-xs text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded">v2024.1</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black italic text-white leading-none">
                    {analysis.metrics.score}
                  </span>
                  <span className="text-[#e10600] font-black italic text-xl">/ 100</span>
                </div>
                <div className="mt-4 w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#e10600] transition-all duration-1000" 
                    style={{ width: `${analysis.metrics.score}%` }}
                  ></div>
                </div>
                <p className="mt-3 text-xs text-zinc-400 font-medium leading-relaxed">
                  Historical unpredictability trend for {selectedCircuit?.name}.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Search & Selector */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h3 className="text-xl font-bold uppercase tracking-tighter italic flex items-center gap-2">
              <ListFilter className="text-[#e10600]" />
              Select Circuit
            </h3>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="text" 
                placeholder="Search circuits..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#e10600] transition-colors"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCircuits.map(circuit => (
              <CircuitCard 
                key={circuit.id} 
                circuit={circuit} 
                isSelected={selectedCircuitId === circuit.id}
                onClick={() => handleCircuitSelect(circuit.id)}
              />
            ))}
          </div>
        </section>

        {/* Main Analysis Section */}
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-4 text-zinc-400">
            <Loader2 className="animate-spin text-[#e10600]" size={48} />
            <p className="font-bold uppercase tracking-widest text-sm animate-pulse">Calculating High-Frequency Data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-lg text-red-500 flex items-center gap-4">
            <AlertTriangle size={24} />
            <p className="font-bold">{error}</p>
          </div>
        ) : comparing && comparisonResult ? (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-8 shadow-2xl">
            <div className="mb-8">
              <h3 className="text-3xl font-black italic uppercase text-white mb-2">Unpredictability Ranking</h3>
              <p className="text-zinc-400">{comparisonResult.insight}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {comparisonResult.ranking.map((id, index) => {
                const c = CIRCUITS.find(circ => circ.name === id || circ.id === id);
                return (
                  <div key={id} className={`p-4 rounded-xl border flex items-center gap-4 ${index === 0 ? 'bg-[#e10600]/10 border-[#e10600]' : 'bg-zinc-900/50 border-zinc-800'}`}>
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full font-black ${index === 0 ? 'bg-[#e10600] text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-black italic text-sm">{id}</p>
                      <p className="text-[10px] text-zinc-500 uppercase font-bold">Unpredictability Power: {comparisonResult.circuits[index]?.metrics.score}%</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <MultiCircuitCompare 
              data={comparisonResult.circuits.map(c => ({
                name: CIRCUITS.find(cir => cir.name === c.circuitId || cir.id === c.circuitId)?.name.split(' ')[0] || c.circuitId,
                score: c.metrics.score,
                weather: c.metrics.weatherVolatility,
                sc: c.metrics.safetyCarFrequency * 50
              }))} 
            />
          </section>
        ) : analysis && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Left: Deep Analysis */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="text-[#e10600]" />
                  <h3 className="text-2xl font-black italic uppercase">Circuit Dynamics</h3>
                </div>
                <p className="text-zinc-300 leading-relaxed text-lg mb-8 italic">
                  "{analysis.historicalContext}"
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-black p-4 rounded-lg border border-zinc-800">
                    <CloudRain className="text-[#ffeb00] mb-2" size={20} />
                    <p className="text-zinc-500 text-[10px] uppercase font-bold">Weather Risk</p>
                    <p className="text-xl font-black text-white">{analysis.metrics.weatherVolatility}%</p>
                  </div>
                  <div className="bg-black p-4 rounded-lg border border-zinc-800">
                    <ShieldAlert className="text-[#e10600] mb-2" size={20} />
                    <p className="text-zinc-500 text-[10px] uppercase font-bold">SC Frequency</p>
                    <p className="text-xl font-black text-white">{analysis.metrics.safetyCarFrequency}</p>
                  </div>
                  <div className="bg-black p-4 rounded-lg border border-zinc-800">
                    <ArrowRightLeft className="text-blue-400 mb-2" size={20} />
                    <p className="text-zinc-500 text-[10px] uppercase font-bold">Avg Overtakes</p>
                    <p className="text-xl font-black text-white">{analysis.metrics.overtakesPerRace}</p>
                  </div>
                  <div className="bg-black p-4 rounded-lg border border-zinc-800">
                    <AlertTriangle className="text-orange-400 mb-2" size={20} />
                    <p className="text-zinc-500 text-[10px] uppercase font-bold">DNF Rate</p>
                    <p className="text-xl font-black text-white">{analysis.metrics.dnfRate}%</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-zinc-400 font-bold uppercase text-xs mb-4 flex items-center gap-2">
                    <Info size={14} className="text-[#e10600]" />
                    Top Contributing Factors
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {analysis.topContributingFactors.map((factor, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-zinc-300 bg-black/50 p-3 rounded-lg border border-zinc-800/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#e10600]"></div>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Historical Trend Chart */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="text-[#e10600]" size={20} />
                    <h3 className="text-lg font-black italic uppercase">Volatility Trend</h3>
                  </div>
                  <div className="flex-1 bg-black/30 p-2 rounded-xl border border-zinc-800/50">
                    <HistoricalTrendLineChart data={analysis.historicalTrend} />
                  </div>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <Car className="text-[#ffeb00]" size={20} />
                    <h3 className="text-lg font-black italic uppercase">Safety Car Volume</h3>
                  </div>
                  <div className="flex-1 bg-black/30 p-2 rounded-xl border border-zinc-800/50">
                    <SafetyCarBarChart data={analysis.safetyCarTrend} />
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldAlert className="text-[#ffeb00]" />
                  <h3 className="text-xl font-black italic uppercase">Recent Critical Events</h3>
                </div>
                <div className="space-y-4">
                  {analysis.recentTriggers.map((trigger, i) => (
                    <div key={i} className="border-l-2 border-[#e10600] pl-4 py-1">
                      <h5 className="text-[#e10600] font-black text-sm uppercase">{trigger.event}</h5>
                      <p className="text-zinc-400 text-sm mt-1">{trigger.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Visualization Dashboard */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
                <h4 className="text-zinc-400 font-bold uppercase text-xs mb-4 text-center">Metric Distribution</h4>
                <MetricRadar metrics={analysis.metrics} />
                <div className="mt-4 p-4 bg-black rounded-lg text-[10px] text-zinc-500 leading-tight">
                  <p className="mb-1 uppercase font-bold tracking-widest text-[#e10600]">Data Note:</p>
                  Radar chart normalized to historical extremes. Higher values indicate higher unpredictability risk in that specific category.
                </div>
              </div>

              <div className="bg-[#e10600] p-8 rounded-2xl text-white relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] opacity-20">
                  <Trophy size={160} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black italic uppercase mb-2">Pro Analysis Tip</h3>
                  <p className="text-sm font-medium leading-relaxed opacity-90 mb-4">
                    Track temperatures at {selectedCircuit?.name} fluctuate heavily during sessions. Monitor Sector 3 particularly for high degradation.
                  </p>
                  <button className="bg-white text-black font-black uppercase text-[10px] px-4 py-2 rounded-full hover:bg-zinc-100 transition-colors">
                    Download Full PDF Report
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default App;
