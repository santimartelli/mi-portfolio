import React from 'react';
import type { ReactNode } from 'react';

interface BadgeProps {
  children?: ReactNode; // Define una prop para el contenido del slot
}

const Badge: React.FC<BadgeProps> = ({ children }) => {
  return (
    <span className="text-xs md:text-sm lg:text-base px-2.5 py-1 rounded-sm flex items-center border-[.5px] border-zinc-400 text-white transition duration-75 ease-in">
      {children} {/* Usa children aquí */}
    </span>
  );
};

export default Badge;
