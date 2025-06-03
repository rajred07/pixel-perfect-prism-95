
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleDemoLogin = () => {
    // Create a mock user object for demo purposes
    const mockUser = {
      uid: 'demo-user-123',
      email: 'demo@example.com',
      displayName: 'Demo User',
      photoURL: 'https://via.placeholder.com/150',
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => 'demo-token',
      getIdTokenResult: async () => ({} as any),
      reload: async () => {},
      toJSON: () => ({}),
    };

    // Manually set the user in localStorage for demo
    localStorage.setItem('demo-user', JSON.stringify(mockUser));
    window.location.reload();
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#171212] dark:bg-[#171212]">
        <div className="text-white dark:text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#171212]">
        <div className="text-center max-w-md w-full p-6">
          <h1 className="text-black dark:text-white text-2xl mb-6">Welcome to Movie Chatbot</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Sign in to start chatting about movies</p>
          
          <form onSubmit={handleEmailAuth} className="space-y-4 mb-4">
            <div>
              <Label htmlFor="email" className="text-black dark:text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-black dark:text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>

          <div className="space-y-4">
            <Button 
              onClick={() => setIsSignUp(!isSignUp)} 
              variant="outline" 
              className="w-full border-gray-300 dark:border-gray-600 text-black dark:text-white"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </Button>
            
            <Button onClick={signInWithGoogle} className="bg-blue-600 hover:bg-blue-700 w-full">
              Sign in with Google
            </Button>
            
            <Button 
              onClick={handleDemoLogin} 
              className="bg-green-600 hover:bg-green-700 w-full"
            >
              🎬 Demo Login (No Setup Required)
            </Button>
          </div>
          
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
            <p className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Demo Login Details:</p>
            <p className="text-gray-600 dark:text-gray-400 text-xs">Email: demo@example.com</p>
            <p className="text-gray-600 dark:text-gray-400 text-xs">Name: Demo User</p>
            <p className="text-yellow-600 dark:text-yellow-400 text-xs mt-2">⚠️ This is for testing only - no real authentication</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
