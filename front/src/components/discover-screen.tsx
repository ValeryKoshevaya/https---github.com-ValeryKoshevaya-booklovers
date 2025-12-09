import { Search, Filter, Star, BookOpen, TrendingUp, Award } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function DiscoverScreen() {
  const genres = [
    { name: "Фантастика", color: "bg-blue-100 text-blue-600", count: "234 книги" },
    { name: "Роман", color: "bg-pink-100 text-pink-600", count: "189 книг" },
    { name: "Детектив", color: "bg-gray-100 text-gray-600", count: "156 книг" },
    { name: "Психологія", color: "bg-green-100 text-green-600", count: "98 книг" },
    { name: "Історія", color: "bg-orange-100 text-orange-600", count: "87 книг" },
    { name: "Філософія", color: "bg-purple-100 text-purple-600", count: "76 книг" },
  ];

  const trending = [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://images.unsplash.com/photo-1652305489491-789257d2e95c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhib29rcyUyMGxpYnJhcnklMjByZWFkaW5nfGVufDF8fHx8MTc1Nzc3MjAxM3ww&ixlib=rb-4.1.0&q=80&w=300&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      readers: "2.3к",
      genre: "Саморозвиток",
      description: "Революційна система формування звичок",
      isHot: true,
    },
    {
      id: 2,
      title: "Кобзар",
      author: "Тарас Шевченко",
      cover: "https://images.unsplash.com/photo-1709744599674-6a4e37a65ca9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhib29rJTIwY292ZXJzJTIwdmludGFnZXxlbnwxfHx8fDE3NTc3ODQ1MDh8MA&ixlib=rb-4.1.0&q=80&w=300&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      readers: "1.8к",
      genre: "Поезія",
      description: "Класика української літератури",
      isHot: false,
    },
    {
      id: 3,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      cover: "https://images.unsplash.com/photo-1690179216796-74f4db8e5ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rc3RvcmV8ZW58MXx8fHwxNzU3Nzg0NTExfDA&ixlib=rb-4.1.0&q=80&w=300&utm_source=figma&utm_medium=referral",
      rating: 4.7,
      readers: "1.5к",
      genre: "Історія",
      description: "Коротка історія людства",
      isHot: true,
    },
  ];

  const recommendations = [
    {
      title: "Дюна",
      author: "Френк Герберт",
      reason: "На основі ваших улюблених жанрів",
      similarity: 95,
    },
    {
      title: "Гра престолів",
      author: "Джордж Мартін",
      reason: "Читають ваші друзі",
      similarity: 87,
    },
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Пошук */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Пошук книг, авторів, жанрів..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Жанри */}
      <div>
        <h3 className="font-semibold mb-3">Популярні жанри</h3>
        <div className="grid grid-cols-2 gap-3">
          {genres.map((genre, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center ${genre.color}`}>
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="font-medium text-sm">{genre.name}</div>
                <div className="text-xs text-muted-foreground">{genre.count}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Трендові книги */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-5 w-5 text-orange-500" />
          <h3 className="font-semibold">Трендові книги</h3>
        </div>
        
        <div className="space-y-3">
          {trending.map((book) => (
            <Card key={book.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex">
                <div className="w-24 h-32 flex-shrink-0 relative">
                  <ImageWithFallback
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                  {book.isHot && (
                    <Badge className="absolute top-1 left-1 text-xs bg-orange-500">
                      🔥 Тренд
                    </Badge>
                  )}
                </div>
                <CardContent className="flex-1 p-4">
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-medium">{book.title}</h4>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">{book.description}</p>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {book.genre}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{book.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {book.readers} читачів
                      </span>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="default" className="flex-1">
                        Додати в бібліотеку
                      </Button>
                      <Button size="sm" variant="outline">
                        Детальніше
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Рекомендації */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Award className="h-5 w-5 text-purple-500" />
          <h3 className="font-semibold">Рекомендації для вас</h3>
        </div>
        
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{rec.title}</h4>
                    <p className="text-xs text-muted-foreground mb-1">{rec.author}</p>
                    <p className="text-xs text-purple-600">{rec.reason}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-600">{rec.similarity}%</div>
                    <div className="text-xs text-muted-foreground">схожість</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Популярні теги */}
      <div>
        <h3 className="font-semibold mb-3">Популярні теги</h3>
        <div className="flex flex-wrap gap-2">
          {["#українська_література", "#фантастика", "#детектив", "#саморозвиток", "#психологія", "#класика", "#сучасність", "#пригоди"].map((tag, index) => (
            <Badge key={index} variant="outline" className="cursor-pointer hover:bg-accent">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Книга дня */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            Книга дня
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="w-16 h-20 flex-shrink-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1652305489491-789257d2e95c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhib29rcyUyMGxpYnJhcnklMjByZWFkaW5nfGVufDF8fHx8MTc1Nzc3MjAxM3ww&ixlib=rb-4.1.0&q=80&w=200&utm_source=figma&utm_medium=referral"
                alt="Книга дня"
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">Маленький принц</h4>
              <p className="text-xs text-muted-foreground mb-2">Антуан де Сент-Екзюпері</p>
              <p className="text-xs text-amber-700">
                "Зорі прекрасні тому, що десь серед них росте квітка..."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}