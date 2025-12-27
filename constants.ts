
import { Circuit } from './types';

export const CIRCUITS: Circuit[] = [
  { 
    id: 'monaco', 
    name: 'Monaco Grand Prix', 
    location: 'Monte Carlo', 
    country: 'Monaco', 
    lengthKm: 3.337, 
    corners: 19, 
    image: 'https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Monaco.jpg' 
  },
  { 
    id: 'spa', 
    name: 'Circuit de Spa-Francorchamps', 
    location: 'Stavelot', 
    country: 'Belgium', 
    lengthKm: 7.004, 
    corners: 20, 
    image: 'https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Belgium.jpg' 
  },
  { 
    id: 'silverstone', 
    name: 'Silverstone Circuit', 
    location: 'Silverstone', 
    country: 'UK', 
    lengthKm: 5.891, 
    corners: 18, 
    image: 'https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Great%20Britain.jpg' 
  },
  { 
    id: 'monza', 
    name: 'Autodromo Nazionale di Monza', 
    location: 'Monza', 
    country: 'Italy', 
    lengthKm: 5.793, 
    corners: 11, 
    image: 'https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Italy.jpg' 
  },
  { 
    id: 'interlagos', 
    name: 'Autódromo José Carlos Pace', 
    location: 'São Paulo', 
    country: 'Brazil', 
    lengthKm: 4.309, 
    corners: 15, 
    image: 'https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Brazil.jpg' 
  },
  { 
    id: 'baku', 
    name: 'Baku City Circuit', 
    location: 'Baku', 
    country: 'Azerbaijan', 
    lengthKm: 6.003, 
    corners: 20, 
    image: 'https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Azerbaijan.jpg' 
  },
  { 
    id: 'singapore', 
    name: 'Marina Bay Street Circuit', 
    location: 'Marina Bay', 
    country: 'Singapore', 
    lengthKm: 5.063, 
    corners: 23, 
    image: 'https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Singapore.jpg' 
  },
  { 
    id: 'suzuka', 
    name: 'Suzuka International Racing Course', 
    location: 'Suzuka', 
    country: 'Japan', 
    lengthKm: 5.807, 
    corners: 18, 
    image: 'https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Japan.jpg' 
  },
  { 
    id: 'jeddah', 
    name: 'Jeddah Corniche Circuit', 
    location: 'Jeddah', 
    country: 'Saudi Arabia', 
    lengthKm: 6.174, 
    corners: 27, 
    image: 'https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Saudi%20Arabia.jpg' 
  },
  { 
    id: 'las_vegas', 
    name: 'Las Vegas Strip Circuit', 
    location: 'Las Vegas', 
    country: 'USA', 
    lengthKm: 6.201, 
    corners: 17, 
    image: 'https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Las%20Vegas.jpg' 
  },
];

export const COLORS = {
  f1Red: '#e10600',
  f1Yellow: '#ffeb00',
  f1Dark: '#0a0a0a',
  f1Grey: '#1f1f1f',
  f1LightGrey: '#3a3a3a',
  f1White: '#f3f4f6',
};
