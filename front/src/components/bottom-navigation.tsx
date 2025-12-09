import { Library, Compass, Users, User } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "library", icon: Library, label: "Бібліотека" },
    { id: "discover", icon: Compass, label: "Відкрити" },
    { id: "social", icon: Users, label: "Спільнота" },
    { id: "profile", icon: User, label: "Профіль" },
  ];

  return (
    <div className="bg-card/95 backdrop-blur supports-backdrop-blur border-t border-border shadow-lg">
      <div className="flex items-center justify-around py-2 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-3 min-w-16 rounded-2xl transition-all ${
                isActive 
                  ? "bg-gradient-to-br from-primary/20 to-accent/20 text-primary scale-105" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "fill-current" : ""}`} />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}