
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AvatarDropdownProps {
  onSettingsClick?: () => void;
}

export const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ onSettingsClick }) => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSwitchAccount = () => {
    // Clear current user and redirect to login
    localStorage.removeItem('demo-user');
    window.location.reload();
  };

  const handleSettings = () => {
    if (onSettingsClick) {
      onSettingsClick();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#171212]">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
            <AvatarFallback className="bg-[#362B2B] text-white">
              {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#362B2B] border-[#362B2B] text-white" align="end">
        <DropdownMenuLabel className="text-gray-300">
          ✅ Signed in as
        </DropdownMenuLabel>
        <DropdownMenuLabel className="font-normal text-sm text-white">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600" />
        <DropdownMenuItem 
          className="text-white hover:bg-[#4A3F3F] cursor-pointer"
          onClick={handleSwitchAccount}
        >
          🔁 Switch Account
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-white hover:bg-[#4A3F3F] cursor-pointer"
          onClick={handleSignOut}
        >
          🔓 Sign Out
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-white hover:bg-[#4A3F3F] cursor-pointer"
          onClick={handleSettings}
        >
          ⚙️ Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
