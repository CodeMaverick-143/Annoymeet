import React from 'react';
import { Users, MessageSquare, Shield, Zap, ArrowRight, Sparkles, History } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const LandingPage = ({ onCreateRoom, onJoinRoom, onViewHistory, onAuthRequired }) => {
  const { user, signOut } = useAuth();

  const features = [
    {
      icon: Shield,
      title: "Anonymous by Design",
      description: "Chat freely without revealing your identity. Perfect for honest discussions.",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: Zap,
      title: "Instant Connection", 
      description: "Join rooms with a simple code. No lengthy setup or profile creation required.",
      gradient: "from-amber-500 to-orange-600"
    },
    {
      icon: Users,
      title: "Real-time Collaboration",
      description: "Live polls, message reactions, and threaded conversations for better teamwork.",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: MessageSquare,
      title: "Pressure-free Communication",
      description: "Express ideas openly without social anxiety or judgment from others.",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  const handleCreateRoom = () => {
    if (user) {
      onCreateRoom();
    } else {
      onAuthRequired('signup');
    }
  };

  const handleJoinRoom = () => {
    if (user) {
      onJoinRoom();
    } else {
      onAuthRequired('signin');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 rounded-2xl px-6 py-4 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AnonyMeet</span>
          </div>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="flex items-center space-x-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {user.email}
                </span>
              </div>
              <button
                onClick={onViewHistory}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
              >
                <History className="w-4 h-4" />
                <span>History</span>
              </button>
              <button
                onClick={signOut}
                className="px-4 py-2 text-slate-600 hover:text-red-600 dark:text-slate-300 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => onAuthRequired('signin')}
                className="px-6 py-2 text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 font-medium"
              >
                Sign In
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 pt-20 pb-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200/50 dark:border-indigo-700/50 text-indigo-700 dark:text-indigo-300 px-6 py-3 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Anonymous collaboration reimagined</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
            Meet without the
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              pressure
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-16 max-w-3xl mx-auto leading-relaxed">
            Create anonymous chatrooms for honest discussions, team brainstorms, and group decisions. 
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold"> No profiles, no judgment</span> — just pure collaboration.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <button
              onClick={handleCreateRoom}
              className="group flex items-center space-x-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/25 transform hover:-translate-y-1 transition-all duration-300 min-w-[200px]"
            >
              <Users className="w-6 h-6" />
              <span>Create Room</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={handleJoinRoom}
              className="flex items-center space-x-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 px-10 py-5 rounded-2xl font-bold text-lg hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 min-w-[200px]"
            >
              <MessageSquare className="w-6 h-6" />
              <span>Join with Code</span>
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;