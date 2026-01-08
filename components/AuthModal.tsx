
import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        // Set the display name if signing up
        if (formData.name) {
          await updateProfile(userCredential.user, {
            displayName: formData.name
          });
        }
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }
      
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error("Auth error:", err);
      // Friendly error mapping
      let message = "An error occurred during authentication.";
      if (err.code === 'auth/email-already-in-use') message = "Email already registered.";
      if (err.code === 'auth/invalid-credential') message = "Invalid email or password.";
      if (err.code === 'auth/weak-password') message = "Password should be at least 6 characters.";
      if (err.code === 'auth/user-not-found') message = "No account found with this email.";
      
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError(null);
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors z-10"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <div className="p-8">
          {isSuccess ? (
            <div className="text-center py-12 animate-in zoom-in">
              <div className="w-20 h-20 bg-indigo-500/20 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-circle-check text-4xl"></i>
              </div>
              <h2 className="text-2xl font-bold mb-2">{mode === 'signup' ? 'Account Created!' : 'Welcome Back!'}</h2>
              <p className="text-slate-400">Loading your dashboard...</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">{mode === 'login' ? 'Login' : 'Create Account'}</h2>
                <p className="text-slate-400 text-sm">
                  {mode === 'login' 
                    ? 'Secure access to your PayloadX instance.' 
                    : 'Start your journey with PayloadX.'}
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg flex items-center gap-2 animate-in shake duration-300">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div className="animate-in slide-in-from-top-2 duration-300">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                    <input 
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white transition-all"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@company.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Password</label>
                  <input 
                    required
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white transition-all"
                  />
                </div>
                
                {mode === 'login' && (
                  <div className="flex justify-end">
                    <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">Forgot password?</button>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 mt-4 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <i className="fa-solid fa-circle-notch animate-spin"></i>
                  ) : (
                    mode === 'login' ? 'Sign In' : 'Create Account'
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                <p className="text-sm text-slate-400">
                  {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                  <button 
                    onClick={toggleMode}
                    className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
                  >
                    {mode === 'login' ? 'Sign Up' : 'Login'}
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
