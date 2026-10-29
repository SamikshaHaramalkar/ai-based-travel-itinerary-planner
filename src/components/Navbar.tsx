import React, { useState } from 'react';
import { Globe, Moon, Sun, User, Settings, LogOut, Map, Home, Info, MessageCircle, Phone } from 'lucide-react';
import { User as UserType } from '../types/User';
import { translations } from '../utils/translations';

interface NavbarProps {
  user: UserType;
  onLogout: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  language: 'en' | 'hi' | 'mr';
  changeLanguage: (lang: 'en' | 'hi' | 'mr') => void;
}

const Navbar: React.FC<NavbarProps> = ({
  user,
  onLogout,
  currentPage,
  setCurrentPage,
  isDarkMode,
  toggleDarkMode,
  language,
  changeLanguage
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const t = translations[language];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              TravelAI Pro
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === 'home'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Home className="h-4 w-4 mr-2" />
              {t.nav.home}
            </button>
            
            <button
              onClick={() => setCurrentPage('planner')}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === 'planner'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Map className="h-4 w-4 mr-2" />
              {t.nav.planner}
            </button>

            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === 'dashboard'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Settings className="h-4 w-4 mr-2" />
              {t.nav.dashboard}
            </button>

            {/* ✅ फक्त Admin साठी */}
  {user.role === 'admin' && (
    <button
      onClick={() => setCurrentPage('adminUsers')}
      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        currentPage === 'adminUsers'
          ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
          : 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700'
      }`}
    >
      <User className="h-4 w-4 mr-2" />
      {t.nav.adminUsers ?? 'Admin Users'}
    </button>
  )}
</div>


          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors"
              >
                <Globe className="h-4 w-4 mr-2" />
                {language.toUpperCase()}
              </button>
              
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600">
                  <button
                    onClick={() => { changeLanguage('en'); setShowLanguageMenu(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-600 ${language === 'en' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => { changeLanguage('hi'); setShowLanguageMenu(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-600 ${language === 'hi' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
                  >
                    हिंदी
                  </button>
                  <button
                    onClick={() => { changeLanguage('mr'); setShowLanguageMenu(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-600 ${language === 'mr' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
                  >
                    मराठी
                  </button>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:block">{user.name}</span>
                {user.isPremium && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    PRO
                  </span>
                )}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t.nav.logout}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;