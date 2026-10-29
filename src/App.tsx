import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TripPlannerPage from './pages/TripPlannerPage';
import DashboardPage from './pages/DashboardPage';
import EditProfilePage from './pages/EditProfilePage';
import AdminUsersPage from './pages/AdminUsersPage';
import { User } from './types/User';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('login');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi' | 'mr'>('en');

  // ✅ Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // ✅ Load user from storage
  useEffect(() => {
    const savedUser = localStorage.getItem('travelPlannerUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser({
        ...parsedUser,
        role: parsedUser.role || 'user'
      });
      setCurrentPage('home');
    }
  }, []);

  // ✅ Prevent non-admin from opening admin page
  useEffect(() => {
    if (currentPage === 'adminUsers' && user?.role !== 'admin') {
      setCurrentPage('home');
    }
  }, [currentPage, user]);

  // ✅ Login handler
  const handleLogin = (userData: User) => {
    const finalUser = {
      ...userData,
      role: userData.role || 'user'
    };
    setUser(finalUser);
    localStorage.setItem('travelPlannerUser', JSON.stringify(finalUser));
    setCurrentPage('home');
  };

  // ✅ Logout handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('travelPlannerUser');
    setCurrentPage('login');
  };

  // ✅ Language change
  const changeLanguage = (lang: 'en' | 'hi' | 'mr') => setLanguage(lang);

  // ✅ Not logged in → show login page
  if (!user) {
    return (
      <div className={isDarkMode ? 'dark' : ''}>
        <LoginPage
          onLogin={handleLogin}
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          language={language}
        />
      </div>
    );
  }

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      <Navbar
        user={user}
        onLogout={handleLogout}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        language={language}
        changeLanguage={changeLanguage}
      />

      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} language={language} />}
      {currentPage === 'planner' && <TripPlannerPage user={user} language={language} />}
      {currentPage === 'dashboard' && <DashboardPage user={user} language={language} setCurrentPage={setCurrentPage} />}
      {currentPage === 'editProfile' && <EditProfilePage user={user} setUser={setUser} goBack={() => setCurrentPage('dashboard')} />}

      {/* ✅ Admin only */}
      {currentPage === 'adminUsers' && user.role === 'admin' && <AdminUsersPage />}
    </div>
  );
}

export default App;
