import { Search, TrendingUp, Heart, BookOpen, Sparkles, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function BookLoversDiscoverScreen() {
  const trending = [
    {
      title: "Кобзар",
      author: "Тарас Шевченко",
      cover: "https://images.unsplash.com/photo-1731423970778-0ba4f9722bf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzYzNDUzNjI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      readers: 245,
      rating: 4.9,
      genre: "Поезія",
    },
    {
      title: "Земля Марії",
      author: "Володимир Лис",
      cover: "https://images.unsplash.com/photo-1755696923054-df9b046619df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc2hlbGYlMjBjb3p5JTIwYWVzdGhldGljfGVufDF8fHx8MTc2MzU0NzA0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      readers: 189,
      rating: 4.7,
      genre: "Роман",
    },
    {
      title: "Музей покинутих секретів",
      author: "Оксана Забужко",
      cover: "https://images.unsplash.com/photo-1755401106338-fb095e1e3399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFjayUyMGJvb2tzJTIwcGFzdGVsfGVufDF8fHx8MTc2MzU0NzA0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      readers: 156,
      rating: 4.8,
      genre: "Історичний",
    },
  ];

  const categories = [
    { name: "Романтика", icon: "💕", color: "from-primary to-primary/70" },
    { name: "Фентезі", icon: "⚔️", color: "from-chart-2 to-chart-2/70" },
    { name: "Класика", icon: "📜", color: "from-chart-3 to-chart-3/70" },
    { name: "Детектив", icon: "🔍", color: "from-chart-4 to-chart-4/70" },
    { name: "Наукпоп", icon: "🔬", color: "from-chart-1 to-chart-1/70" },
    { name: "Пригоди", icon: "🗺️", color: "from-accent to-accent/70" },
  ];

  const recommended = [
    {
      title: "Гаррі Поттер",
      author: "Дж. К. Роулінг",
      cover: "https://images.unsplash.com/photo-1699102321802-278a612ae72e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFkaW5nJTIwYm9vayUyMGNvenl8ZW58MXx8fHwxNzYzNTQ3MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      match: 95,
    },
    {
      title: "Великий Гетсбі",
      author: "Ф. С. Фіцджеральд",
      cover: "https://images.unsplash.com/photo-1582121788242-7715e324b494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYm9vayUyMHJvbWFuY2V8ZW58MXx8fHwxNzYzNTQ3MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      match: 92,
    },
    {
      title: "Маленький принц",
      author: "А. де Сент-Екзюпері",
      cover: "https://images.unsplash.com/photo-1615976909545-a2d402c7dac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwYm9vayUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NjM1NDcwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      match: 88,
    },
  ];

  return (
    <div className="p-4 space-y-5">
      {/* Пошук */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Шукай книги, авторів, жанри..."
          className="pl-12 pr-4 h-12 rounded-full border-0 bg-card shadow-sm"
        />
      </div>

      {/* Популярне зараз */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Популярне зараз
          </h3>
          <Button variant="ghost" size="sm" className="text-primary">
            Всі
          </Button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {trending.map((book, index) => (
            <Card
              key={index}
              className="flex-shrink-0 w-40 overflow-hidden cursor-pointer hover:shadow-lg transition-all border-0 shadow-md"
            >
              <div className="aspect-[3/4] relative">
                <ImageWithFallback
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/95 backdrop-blur rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
                  <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-medium">{book.rating}</span>
                </div>
              </div>
              <CardContent className="p-3">
                <h4 className="font-medium text-sm line-clamp-1 mb-0.5">{book.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{book.author}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">{book.genre}</Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <BookOpen className="h-3 w-3" />
                    {book.readers}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Категорії */}
      <div>
        <h3 className="mb-3">Категорії для тебе</h3>
        <div className="grid grid-cols-3 gap-2">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-md transition-all border-0 shadow-sm overflow-hidden group"
            >
              <div className={`h-1.5 bg-gradient-to-r ${category.color}`} />
              <CardContent className="p-3 text-center">
                <div className="text-2xl mb-1">{category.icon}</div>
                <div className="text-xs font-medium">{category.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Рекомендовані */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent-foreground" />
            Спеціально для тебе
          </h3>
        </div>

        <div className="space-y-3">
          {recommended.map((book, index) => (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-all border-0 shadow-sm"
            >
              <div className="flex gap-3 p-3">
                <div className="w-16 h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
                  <ImageWithFallback
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-medium text-sm mb-0.5">{book.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5 text-primary" />
                        <span className="text-xs font-medium text-primary">{book.match}% збіг</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-full h-7">
                      Додати
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Випадкова книга */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20">
        <CardContent className="p-5 text-center">
          <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
          <h3 className="mb-2">Відчуваєш себе пригодницею?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Дозволь нам обрати книгу для тебе
          </p>
          <Button className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            Випадкова книга 🎲
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}