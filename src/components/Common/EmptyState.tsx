import React from 'react';
import { SamuraiMascot } from '../Mascot/SamuraiMascot';
import { MascotState } from '../../types';

interface EmptyStateProps {
  title: string;
  subtitle: string;
  mascotState?: MascotState;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  mascotState = 'thinking',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center my-6 shadow-xl">
      <SamuraiMascot state={mascotState} size="lg" className="mb-4" />
      <h3 className="text-xl font-black text-[#F5F5F5]">{title}</h3>
      <p className="text-xs text-[#A1A1AA] mt-1 max-w-sm mx-auto leading-relaxed">{subtitle}</p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 py-2.5 px-6 bg-[#E3262E] hover:bg-[#f4333b] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-[#E3262E]/25 transition active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
