import React from 'react';

interface NavigationItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  icon,
  label,
  isActive = false,
  onClick
}) => {
  return (
    <button
      className={`flex items-center gap-3 px-3 py-2 rounded-xl w-full text-left transition-colors ${
        isActive ? 'bg-[#362B2B]' : 'hover:bg-[#362B2B]/50'
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col">
        <div dangerouslySetInnerHTML={{ __html: icon }} />
      </div>
      <div className="text-white text-sm font-medium leading-[21px]">
        {label}
      </div>
    </button>
  );
};
