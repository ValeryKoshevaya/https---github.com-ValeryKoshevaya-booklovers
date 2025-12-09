import { Plus, Filter, Clock, BookOpenCheck, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function LibraryScreen() {
  const currentReading = [
    {
      id: 1,
      title: "Маленький принц",
      author: "Антуан де Сент-Екзюпері",
      cover: "https://images.unsplash.com/photo-1709744599674-6a4e37a65ca9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXJzJTIwdmludGFnZXxlbnwxfHx8fDE3NTc3ODQ1MDh8MA&ixlib=rb-4.1.0&q=80&w=300&utm_source=figma&utm_medium=referral",
      progress: 67,
      pagesRead: 89,
      totalPages: 132,
      lastRead: "2 години тому",
    },
    {
      id: 2,
      title: "1984",
      author: "Джордж Орвелл",
      cover: "https://images.unsplash.com/photo-1690179216796-74f4db8e5ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rc3RvcmV8ZW58MXx8fHwxNzU3Nzg0NTExfDA&ixlib=rb-4.1.0&q=80&w=300&utm_source=figma&utm_medium=referral",
      progress: 34,
      pagesRead: 102,
      totalPages: 298,
      lastRead: "1 день тому",
    },
  ];

  const collections = [
    { name: "Хочу прочитати", count: 23, color: "bg-blue-100 text-blue-600", icon: "📚" },
    { name: "Прочитані", count: 47, color: "bg-green-100 text-green-600", icon: "✅" },
    { name: "Улюблені цитати", count: 156, color: "bg-purple-100 text-purple-600", icon: "💭" },
    { name: "Мої нотатки", count: 89, color: "bg-orange-100 text-orange-600", icon: "📝" },
  ];

  const recentBooks = [
    {
      title: "Гаррі Поттер",
      author: "Дж.К. Роулінг",
      cover: "https://images.unsplash.com/photo-1652305489491-789257d2e95c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhib29rcyUyMGxpYnJhcnklMjByZWFkaW5nfGVufDF8fHx8MTc1Nzc3MjAxM3ww&ixlib=rb-4.1.0&q=80&w=300&utm_source=figma&utm_medium=referral",
      status: "completed",
      rating: 5,
    },
    {
      title: "Великий Гетсбі",
      author: "Френсіс Скотт Фіцджеральд",
      cover: "https://images.unsplash.com/photo-1690179216796-74f4db8e5ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rc3RvcmV8ZW58MXx8fHwxNzU3Nzg0NTExfDA&ixlib=rb-4.1.0&q=80&w=300&utm_source=figma&utm_medium=referral",
      status: "completed",
      rating: 4,
    },
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Статистика читання */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-xl font-semibold mb-3">Ваш прогрес сьогодні</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">45</div>
            <div className="text-sm text-indigo-100">хвилин читання</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">23</div>
            <div className="text-sm text-indigo-100">сторінок прочитано</div>
          </div>
        </div>
      </div>

      {/* Поточне читання */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Поточне читання</h3>
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Додати
          </Button>
        </div>
        
        <div className="space-y-4">
          {currentReading.map((book) => (
            <Card key={book.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex">
                <div className="w-20 h-28 flex-shrink-0">
                  <ImageWithFallback
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                </div>
                <CardContent className="flex-1 p-4">
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-medium">{book.title}</h4>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {book.pagesRead} з {book.totalPages} сторінок
                        </span>
                        <span className="font-medium">{book.progress}%</span>
                      </div>
                      <Progress value={book.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{book.lastRead}</span>
                      </div>
                      <Button size="sm" variant="secondary">
                        Читати
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Колекції */}
      <div>
        <h3 className="font-semibold mb-3">Мої колекції</h3>
        <div className="grid grid-cols-2 gap-3">
          {collections.map((collection, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center ${collection.color}`}>
                  <span className="text-xl">{collection.icon}</span>
                </div>
                <div className="font-medium text-sm">{collection.name}</div>
                <div className="text-xs text-muted-foreground">{collection.count}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Нещодавно прочитані */}
      <div>
        <h3 className="font-semibold mb-3">Нещодавно завершені</h3>
        <div className="space-y-3">
          {recentBooks.map((book, index) => (
            <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-center p-3">
                <div className="w-12 h-16 flex-shrink-0 mr-3">
                  <ImageWithFallback
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{book.title}</h4>
                  <p className="text-xs text-muted-foreground mb-1">{book.author}</p>
                  <div className="flex items-center gap-1">
                    <Badge variant="secondary" className="text-xs">
                      <BookOpenCheck className="h-3 w-3 mr-1" />
                      Завершено
                    </Badge>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xs ${i < book.rating ? "text-yellow-400" : "text-gray-300"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Тижнева статистика */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Статистика тижня
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">7</div>
              <div className="text-xs text-muted-foreground">днів поспіль</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">245</div>
              <div className="text-xs text-muted-foreground">хвилин читання</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">3</div>
              <div className="text-xs text-muted-foreground">нові цитати</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}