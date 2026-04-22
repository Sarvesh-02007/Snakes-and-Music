import { Track } from './types';

export const TRACKS: Track[] = [
  {
    id: '1',
    title: 'Synthetic Dreams',
    artist: 'AI Core v2',
    duration: '2:45',
    cover: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400&q=80',
    color: '#06b6d4', // cyan-500
  },
  {
    id: '2',
    title: 'Neon Pulse',
    artist: 'Bit-Crusher',
    duration: '3:12',
    cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80',
    color: '#d946ef', // fuchsia-500
  },
  {
    id: '3',
    title: 'Cyber Drift',
    artist: 'Neural Network',
    duration: '2:58',
    cover: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&q=80',
    color: '#10b981', // emerald-500
  },
];

export const GRID_SIZE = 20;
export const INITIAL_SPEED = 150;
export const SPEED_INCREMENT = 2;
export const MIN_SPEED = 50;
