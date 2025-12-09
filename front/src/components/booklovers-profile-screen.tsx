import { useState, useEffect } from "react";
import { Settings, Calendar, BookOpen, Heart, Award, TrendingUp, Edit3 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { apiClient } from "../api/client";

interface BookLoversProfileScreenProps {
  onEditProfile?: () => void;
  refreshKey?: number;
}

export function BookLoversProfileScreen({ onEditProfile, refreshKey }: BookLoversProfileScreenProps) {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
    loadReadingStats();
  }, [refreshKey]);

  const loadUserData = async () => {
    try {
      const userData = await apiClient.getMe();
      setUser(userData);
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadReadingStats = async () => {
    try {
      const readingStats = await apiClient.getReadingStats();
      setStats(readingStats);
    } catch (error) {
      console.error('Failed to load reading stats:', error);
    }
  };

  // Отримуємо ініціали для аватара
  const getInitials = (name: string) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };
  const displayStats = [
    { label: "Прочитано", value: stats?.readBooks || 0, icon: BookOpen, color: "text-primary" },
    { label: "Улюблених", value: 0, icon: Heart, color: "text-rose-500" },
    { label: "Днів поспіль", value: 0, icon: TrendingUp, color: "text-orange-500" },
  ];

  const achievements = [
    { title: "Книжковий черв'ячок", emoji: "🐛", description: "10 книг прочитано", unlocked: true },
    { title: "Ранкова пташка", emoji: "🌅", description: "7 днів поспіль", unlocked: true },
    { title: "Ніч з книгою", emoji: "🌙", description: "Читання після півночі", unlocked: true },
    { title: "Бібліофіл", emoji: "📚", description: "50 книг прочитано", unlocked: false },
    { title: "Соціальна душа", emoji: "💬", description: "50 коментарів", unlocked: false },
    { title: "Натхнення", emoji: "✨", description: "100 цитат", unlocked: false },
  ];

  // Отримуємо ціль читання з даних користувача
  const readBooksCount = stats?.readBooks || 0;
  const readingGoal = {
    current: readBooksCount,
    target: user?.readingGoal || 60,
    percentage: user?.readingGoal ? Math.round((readBooksCount / user.readingGoal) * 100) : 0,
  };

  // Отримуємо жанри з даних користувача
  const userGenres = user?.favoriteGenres || [];
  const genreColors = [
    "from-pink-400 to-rose-400",
    "from-blue-400 to-cyan-400",
    "from-purple-400 to-pink-400",
    "from-amber-400 to-orange-400",
    "from-green-400 to-emerald-400",
  ];
  
  const favoriteGenres = userGenres.map((genre: string, index: number) => ({
    name: genre,
    percentage: Math.round(100 / userGenres.length) || 0,
    color: genreColors[index % genreColors.length],
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Завантаження...</p>
      </div>
    );
  }

  const displayName = user?.name || 'Користувач';
  const displayUsername = user?.username ? `@${user.username}` : '';
  const displayBio = user?.bio || '';

  return (
    <div>
      {/* Профіль хедер */}
      <div className="bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 px-4 pt-6 pb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
              {user?.avatarUrl ? (
                <AvatarImage src={user.avatarUrl} alt={displayName} className="object-cover" />
              ) : null}
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="mb-1">{displayName}</h2>
              {displayUsername && (
                <p className="text-sm text-muted-foreground">{displayUsername}</p>
              )}
              <div className="flex gap-1 mt-2">
                <Badge variant="secondary" className="text-xs">🌟 Активний читач</Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {displayBio && (
          <p className="text-sm mb-4">
            {displayBio}
          </p>
        )}

        <Button variant="outline" className="w-full rounded-full bg-white/80 backdrop-blur" onClick={onEditProfile}>
          <Edit3 className="h-4 w-4 mr-2" />
          Редагувати профіль
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {/* Статистика */}
        <div className="grid grid-cols-3 gap-3">
          {displayStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <Icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-semibold mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Річна ціль */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-primary via-accent-foreground to-secondary" />
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <h3>Річна ціль 2025</h3>
              </div>
              <div className="text-right">
                <div className="font-semibold">{readingGoal.current}/{readingGoal.target}</div>
                <div className="text-xs text-muted-foreground">книг</div>
              </div>
            </div>
            <Progress value={Math.min(readingGoal.percentage, 100)} className="h-2 mb-2" />
            <p className="text-sm text-muted-foreground">
              {readingGoal.current >= readingGoal.target 
                ? `Мета досягнута! 🎉` 
                : `Ще ${readingGoal.target - readingGoal.current} книг до мети! 🎯`}
            </p>
          </CardContent>
        </Card>

        {/* Улюблені жанри */}
        {favoriteGenres.length > 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <h3 className="mb-3">Мої жанри</h3>
              <div className="space-y-3">
                {favoriteGenres.map((genre, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span>{genre.name}</span>
                    <span className="text-muted-foreground">{genre.percentage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${genre.color} rounded-full transition-all`}
                      style={{ width: `${genre.percentage}%` }}
                    />
                  </div>
                </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Досягнення */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                Досягнення
              </h3>
              <Badge variant="secondary">3/6</Badge>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`text-center p-3 rounded-2xl ${
                    achievement.unlocked
                      ? "bg-gradient-to-br from-primary/20 to-secondary/20"
                      : "bg-muted/50 opacity-50"
                  }`}
                >
                  <div className="text-3xl mb-1">{achievement.emoji}</div>
                  <div className="text-xs font-medium mb-1">{achievement.title}</div>
                  <div className="text-xs text-muted-foreground">{achievement.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Активність */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h3 className="mb-3">Активність читання</h3>
            <div className="flex gap-1 justify-between mb-2">
              {[...Array(52)].map((_, i) => {
                // Генеруємо активність на основі кількості прочитаних книг
                const baseIntensity = stats?.readBooks ? Math.min(stats.readBooks / 10, 1) : 0;
                const intensity = baseIntensity * 0.5 + Math.random() * 0.5;
                let bgColor = "bg-muted";
                if (intensity > 0.7) bgColor = "bg-primary";
                else if (intensity > 0.5) bgColor = "bg-primary/60";
                else if (intensity > 0.3) bgColor = "bg-primary/30";
                
                return (
                  <div
                    key={i}
                    className={`h-8 flex-1 rounded transition-colors ${bgColor}`}
                    style={{ minWidth: "4px" }}
                    title={`Тиждень ${i + 1}`}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Січень</span>
              <span>Сьогодні</span>
            </div>
            {stats?.readBooks > 0 && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Прочитано {stats.readBooks} {stats.readBooks === 1 ? 'книгу' : stats.readBooks < 5 ? 'книги' : 'книг'} цього року
              </p>
            )}
          </CardContent>
        </Card>

        {/* Цитата дня */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-accent/30 to-secondary/20">
          <CardContent className="p-5 text-center">
            <p className="text-sm italic mb-2">
              "Книги - це унікальна портативна магія"
            </p>
            <p className="text-xs text-muted-foreground">— Стівен Кінг</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
