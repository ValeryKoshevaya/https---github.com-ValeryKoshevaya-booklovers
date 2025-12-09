import { Plus, Flame, BookOpen, Star, Quote } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function BookLoversLibraryScreen() {
  const currentReading = [
    {
      id: 1,
      title: "Гордість і упередження",
      author: "Джейн Остін",
      cover: "https://images.unsplash.com/photo-1615976909545-a2d402c7dac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwYm9vayUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NjM1NDcwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      progress: 73,
      pagesRead: 256,
      totalPages: 352,
      mood: "📖",
    },
    {
      id: 2,
      title: "Маленький принц",
      author: "Антуан де Сент-Екзюпері",
      cover: "https://images.unsplash.com/photo-1752243770773-b359bbc1f38f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBhZXN0aGV0aWMlMjBwYXN0ZWx8ZW58MXx8fHwxNzYzNTQ3MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      progress: 45,
      pagesRead: 54,
      totalPages: 120,
      mood: "✨",
    },
  ];

  const collections = [
    { name: "Улюблені", count: 34, gradient: "from-primary to-primary/70", icon: "⭐" },
    { name: "Хочу прочитати", count: 18, gradient: "from-accent to-accent/70", icon: "📚" },
    { name: "Мої цитати", count: 127, gradient: "from-chart-3 to-chart-3/70", icon: "💭" },
    { name: "Рекомендації", count: 5, gradient: "from-chart-4 to-chart-4/70", icon: "💡" },
  ];

  const readingStreak = 12;
  const todayPages = 32;

  return (
    <div className="p-4 space-y-5">
      {/* Персональна картка читання */}
      <Card className="overflow-hidden border-0 shadow-sm">
        <div className="bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="mb-1">Твій прогрес сьогодні</h2>
              <p className="text-sm text-muted-foreground">Продовжуй у тому ж дусі! 🌟</p>
            </div>
            <div className="bg-white/90 backdrop-blur rounded-2xl px-4 py-2 text-center shadow-sm">
              <div className="flex items-center gap-1">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="font-semibold">{readingStreak}</span>
              </div>
              <p className="text-xs text-muted-foreground">днів</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/90 backdrop-blur rounded-2xl p-4 text-center shadow-sm">
              <div className="text-3xl mb-1">{todayPages}</div>
              <p className="text-xs text-muted-foreground">сторінок</p>
            </div>
            <div className="bg-white/90 backdrop-blur rounded-2xl p-4 text-center shadow-sm">
              <div className="text-3xl mb-1">2</div>
              <p className="text-xs text-muted-foreground">книги зараз</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Поточне читання */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Зараз читаю
          </h3>
          <Button variant="ghost" size="sm" className="text-primary rounded-full">
            <Plus className="h-4 w-4 mr-1" />
            Додати
          </Button>
        </div>
        
        <div className="space-y-3">
          {currentReading.map((book) => (
            <Card key={book.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-all border-0 shadow-sm">
              <div className="flex gap-3 p-4">
                <div className="w-20 h-28 flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                  <ImageWithFallback
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium leading-tight">{book.title}</h4>
                      <span className="text-xl">{book.mood}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground text-xs">
                        {book.pagesRead} / {book.totalPages}
                      </span>
                      <span className="font-medium text-primary">{book.progress}%</span>
                    </div>
                    <Progress value={book.progress} className="h-1.5" />
                  </div>
                  
                  <Button size="sm" className="w-full rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    Продовжити читати
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Колекції */}
      <div>
        <h3 className="mb-3">Мої колекції</h3>
        <div className="grid grid-cols-2 gap-3">
          {collections.map((collection, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-md transition-all border-0 shadow-sm overflow-hidden group"
            >
              <div className={`h-2 bg-gradient-to-r ${collection.gradient}`} />
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">{collection.icon}</div>
                <div className="font-medium text-sm mb-0.5">{collection.name}</div>
                <div className="text-xs text-muted-foreground">{collection.count} книг</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Швидкі дії */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <h3 className="mb-3">Швидкі дії</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start rounded-full">
              <Quote className="h-4 w-4 mr-2 text-accent-foreground" />
              Додати цитату з книги
            </Button>
            <Button variant="outline" className="w-full justify-start rounded-full">
              <Star className="h-4 w-4 mr-2 text-amber-500" />
              Оцінити прочитане
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Натхнення */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-accent/30 to-secondary/20">
        <CardContent className="p-5 text-center">
          <p className="text-sm italic text-foreground/80 mb-2">
            "Читання - це подорож, яка ніколи не закінчується"
          </p>
          <p className="text-xs text-muted-foreground">— Твоя BookLovers спільнота ✨</p>
        </CardContent>
      </Card>
    </div>
  );
}