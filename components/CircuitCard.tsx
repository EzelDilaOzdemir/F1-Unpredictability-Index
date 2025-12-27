
import React from 'react';
import { Circuit, CircuitAnalysis } from '../types';
import { MapPin } from 'lucide-react';

interface CircuitCardProps {
  circuit: Circuit;
  analysis?: CircuitAnalysis;
  isSelected: boolean;
  onClick: () => void;
}

const CircuitCard: React.FC<CircuitCardProps> = ({ circuit, analysis, isSelected, onClick }) => {
  const score = analysis?.metrics.score || 0;
  
  return (
    <div 
      onClick={onClick}
      className={`relative group cursor-pointer transition-all duration-300 rounded-lg overflow-hidden border-2 ${
        isSelected ? 'border-[#e10600] scale-[1.02]' : 'border-zinc-800 hover:border-zinc-600'
      } bg-[#141414] shadow-xl`}
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={circuit.image} 
          alt={circuit.name} 
          className="w-full h-full object-cover grayscale-[30%] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
        <div className="absolute bottom-3 left-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#e10600]">{circuit.country}</p>
          <h3 className="text-lg font-black italic drop-shadow-md">{circuit.name}</h3>
        </div>
        {isSelected && (
          <div className="absolute top-2 right-2 bg-[#e10600] text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">
            SELECTED
          </div>
        )}
      </div>

      <div className="p-4 flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-zinc-500 text-[10px] uppercase font-bold">
            <MapPin size={10} />
            <span>{circuit.location}</span>
          </div>
          <div className="text-zinc-400 text-xs font-medium">
            {circuit.lengthKm} KM • {circuit.corners} CORNERS
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-[10px] font-bold text-zinc-500 uppercase">Index</p>
          <p className={`text-2xl font-black italic ${score > 70 ? 'text-[#ffeb00]' : 'text-white'}`}>
            {score > 0 ? score.toFixed(0) : '--'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CircuitCard;
