import { Settings, Edit, Award, Calendar, Target, TrendingUp, Quote, BookOpen, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";

export function BookLensProfileScreen() {
  const readingAchievements = [
    { title: "Книжковий хробак", icon: "📚", description: "Прочитати 50 книг", progress: 84, current: 42, target: 50 },
    { title: "Швидкочитач", icon: "⚡", description: "Читати 30+ хвилин щодня", progress: 90, current: 27, target: 30 },
    { title: "Цитатолюб", icon: "💭", description: "Створити 100 цитат", progress: 67, current: 67, target: 100 },
    { title: "Соціальний читач", icon: "👥", description: "Додати 20 друзів", progress: 75, current: 15, target: 20 },
  ];

  const readingStats = [
    { label: "Книг прочитано", value: "42", change: "+3 цього місяця", trend: "up" },
    { label: "Поточна серія", value: "12 днів", change: "Особистий рекорд!", trend: "up" },
    { label: "Середня швидкість", value: "45 стор/год", change: "+5 стор/год", trend: "up" },
    { label: "Час читання", value: "127 год", change: "За весь час", trend: "neutral" },
  ];

  const favoriteQuotes = [
    {
      text: "Зорі прекрасні тому, що десь серед них росте квітка...",
      book: "Маленький принц",
      author: "Антуан де Сент-Екзюпері",
      likes: 24,
      isPublic: true,
    },
    {
      text: "Найкращий час для посадки дерева був 20 років тому. Другий найкращий час - зараз.",
      book: "Китайська мудрість",
      author: "Народна мудрість",
      likes: 18,
      isPublic: true,
    },
    {
      text: "Ви не піднімаєтесь до рівня своїх цілей. Ви опускаєтесь до рівня своїх систем.",
      book: "Atomic Habits",
      author: "James Clear",
      likes: 31,
      isPublic: false,
    },
  ];

  const recentActivity = [
    { action: "Завершив читання", book: "1984", time: "2 години тому", icon: "✅" },
    { action: "Додав цитату з", book: "Маленький принц", time: "1 день тому", icon: "💭" },
    { action: "Почав читати", book: "Atomic Habits", time: "2 дні тому", icon: "📖" },
    { action: "Додав у друзі", book: "Анну Петренко", time: "3 дні тому", icon: "👥" },
  ];

  const genreStats = [
    { genre: "Фантастика", books: 12, percentage: 28 },
    { genre: "Класика", books: 8, percentage: 19 },
    { genre: "Саморозвиток", books: 7, percentage: 17 },
    { genre: "Детектив", books: 6, percentage: 14 },
    { genre: "Інше", books: 9, percentage: 22 },
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Профіль користувача */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback>ОП</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-semibold">Олексій Петренко</h2>
                <Badge variant="secondary" className="text-xs">Книголюб</Badge>
              </div>
              <p className="text-muted-foreground mb-2">📍 Київ, Україна • 📚 42 книги прочитано</p>
              <div className="flex items-center gap-4 text-sm">
                <span>👥 156 друзів</span>
                <span>💭 89 цитат</span>
                <span>🏆 12 досягнень</span>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Статистика читання */}
      <div className="grid grid-cols-2 gap-3">
        {readingStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{stat.value}</div>
                <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                  {stat.trend === "up" && <TrendingUp className="h-3 w-3" />}
                  <span>{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Досягнення */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Досягнення
          </h3>
          <Button variant="ghost" size="sm">Всі</Button>
        </div>
        
        <div className="space-y-3">
          {readingAchievements.map((achievement, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{achievement.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {achievement.current}/{achievement.target}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Улюблені цитати */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Quote className="h-5 w-5 text-purple-500" />
            Мої цитати
          </h3>
          <Button variant="ghost" size="sm">Всі цитати</Button>
        </div>
        
        <div className="space-y-3">
          {favoriteQuotes.map((quote, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm italic mb-2">"{quote.text}"</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">{quote.book}</span> — {quote.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={quote.isPublic ? "default" : "secondary"} className="text-xs">
                          {quote.isPublic ? "Публічна" : "Приватна"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">❤️ {quote.likes} вподобань</span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-6 text-xs">
                        Поділитися
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 text-xs">
                        Редагувати
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Аналітика жанрів */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            Аналітика читання
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {genreStats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{stat.genre}</span>
                    <span className="text-xs text-muted-foreground">{stat.books} книг</span>
                  </div>
                  <Progress value={stat.percentage} className="h-2" />
                </div>
                <span className="text-sm font-medium text-blue-600 min-w-12 text-right">
                  {stat.percentage}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Нещодавня активність */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Нещодавня активність
        </h3>
        
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="text-lg">{activity.icon}</div>
              <div className="flex-1">
                <div className="text-sm">
                  <span>{activity.action} </span>
                  <span className="font-medium">{activity.book}</span>
                </div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Налаштування */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-auto py-4 flex-col gap-2">
          <Settings className="h-5 w-5" />
          <span>Налаштування</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2">
          <Target className="h-5 w-5" />
          <span>Цілі на рік</span>
        </Button>
      </div>
    </div>
  );
}