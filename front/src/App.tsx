import { useState, useEffect } from "react";
import { AppHeader } from "./components/app-header";
import { BottomNavigation } from "./components/bottom-navigation";
import { BookLoversLibraryScreen } from "./components/booklovers-library-screen";
import { BookLoversDiscoverScreen } from "./components/booklovers-discover-screen";
import { BookLoversSocialScreen } from "./components/booklovers-social-screen";
import { BookLoversProfileScreen } from "./components/booklovers-profile-screen";
import { AuthScreen } from "./components/auth-screen";
import { EditProfileScreen } from "./components/edit-profile-screen";

type Screen = "library" | "discover" | "social" | "profile" | "edit-profile";

export default function App() {
  const [activeTab, setActiveTab] = useState<Screen>("library");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileRefreshKey, setProfileRefreshKey] = useState(0);

  // Перевіряємо токен при завантаженні
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  const handleEditProfile = () => {
    setActiveTab("edit-profile");
  };

  const handleSaveProfile = async (data: any) => {
    // Профіль вже збережено через API в EditProfileScreen
    // Оновлюємо ключ для перезавантаження профілю
    setProfileRefreshKey(prev => prev + 1);
  };

  const handleBackToProfile = () => {
    setActiveTab("profile");
  };

  // Якщо не авторизований, показуємо екран входу
  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  // Якщо відкрито редагування профілю
  if (activeTab === "edit-profile") {
    return (
      <EditProfileScreen 
        onBack={handleBackToProfile} 
        onSave={handleSaveProfile}
      />
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case "library":
        return <BookLoversLibraryScreen />;
      case "discover":
        return <BookLoversDiscoverScreen />;
      case "social":
        return <BookLoversSocialScreen />;
      case "profile":
        return <BookLoversProfileScreen key={profileRefreshKey} refreshKey={profileRefreshKey} onEditProfile={handleEditProfile} />;
      default:
        return <BookLoversLibraryScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto flex flex-col h-screen">
      <AppHeader />
      <main className="flex-1 overflow-y-auto">
        {renderScreen()}
      </main>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}