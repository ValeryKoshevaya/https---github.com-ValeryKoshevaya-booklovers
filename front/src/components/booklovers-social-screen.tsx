import { Heart, MessageCircle, BookmarkPlus, Share2, Sparkles, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function BookLoversSocialScreen() {
  const posts = [
    {
      id: 1,
      user: {
        name: "Марія Коваль",
        avatar: "https://images.unsplash.com/photo-1680587513906-d04091ab3c52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHdpdGglMjBib29rJTIwYWVzdGhldGljfGVufDF8fHx8MTc2MzU0NzA4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        username: "@maria_books",
      },
      type: "quote",
      book: "Гордість і упередження",
      author: "Джейн Остін",
      content: "\"Я оголошую після всього, що в світі немає нічого приємнішого за читання!\"",
      time: "2 години тому",
      likes: 47,
      comments: 8,
      mood: "🥰",
    },
    {
      id: 2,
      user: {
        name: "Олена Петренко",
        avatar: "https://images.unsplash.com/photo-1525451350286-a21d5aef139c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjByZWFkaW5nJTIwYm9va3xlbnwxfHx8fDE3NjM0ODA0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        username: "@olena_reads",
      },
      type: "finished",
      book: "Кобзар",
      author: "Тарас Шевченко",
      rating: 5,
      content: "Нарешті закінчила перечитування! Кожного разу відкриваю для себе щось нове 💙💛",
      time: "5 годин тому",
      likes: 89,
      comments: 12,
      cover: "https://images.unsplash.com/photo-1731423970778-0ba4f9722bf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzYzNDUzNjI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      user: {
        name: "Ірина Лисенко",
        avatar: "https://images.unsplash.com/photo-1680587513906-d04091ab3c52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHdpdGglMjBib29rJTIwYWVzdGhldGljfGVufDF8fHx8MTc2MzU0NzA4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        username: "@iryna_library",
      },
      type: "reading",
      book: "Маленький принц",
      author: "Антуан де Сент-Екзюпері",
      content: "Починаю читати цю магічну книгу вдруге. Хто зі мною? ✨",
      time: "вчора",
      likes: 34,
      comments: 6,
      cover: "https://images.unsplash.com/photo-1752243770773-b359bbc1f38f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBhZXN0aGV0aWMlMjBwYXN0ZWx8ZW58MXx8fHwxNzYzNTQ3MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const renderPostType = (post: typeof posts[0]) => {
    if (post.type === "quote") {
      return (
        <div className="bg-gradient-to-br from-accent/30 to-primary/20 rounded-2xl p-4 my-3">
          <p className="italic mb-2">{post.content}</p>
          <p className="text-sm text-muted-foreground">
            — {post.book}, {post.author}
          </p>
        </div>
      );
    }

    if (post.type === "finished") {
      return (
        <div className="my-3">
          <div className="flex gap-3 mb-3">
            {post.cover && (
              <div className="w-16 h-24 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                <ImageWithFallback
                  src={post.cover}
                  alt={post.book}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <Badge className="mb-2 bg-green-100 text-green-700 hover:bg-green-100">
                ✅ Завершено
              </Badge>
              <h4 className="font-medium mb-1">{post.book}</h4>
              <p className="text-sm text-muted-foreground mb-2">{post.author}</p>
              {post.rating && (
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < post.rating! ? "text-amber-400" : "text-gray-300"}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <p className="text-sm">{post.content}</p>
        </div>
      );
    }

    if (post.type === "reading") {
      return (
        <div className="my-3">
          <div className="flex gap-3 mb-3">
            {post.cover && (
              <div className="w-16 h-24 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                <ImageWithFallback
                  src={post.cover}
                  alt={post.book}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <Badge className="mb-2 bg-primary/20 text-primary hover:bg-primary/20">
                📖 Читає зараз
              </Badge>
              <h4 className="font-medium mb-1">{post.book}</h4>
              <p className="text-sm text-muted-foreground">{post.author}</p>
            </div>
          </div>
          <p className="text-sm">{post.content}</p>
        </div>
      );
    }
  };

  return (
    <div>
      {/* Заголовок */}
      <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <h2 className="mb-1">Спільнота BookLovers</h2>
        <p className="text-sm text-muted-foreground">Діліться своїми враженнями про книги ✨</p>
      </div>

      {/* Швидкий пост */}
      <div className="p-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                  Я
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" className="flex-1 justify-start rounded-full text-muted-foreground">
                Поділитися думками про книгу...
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Стрічка */}
      <div className="space-y-3 px-4">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden border-0 shadow-sm">
            <CardContent className="p-4">
              {/* Заголовок поста */}
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{post.user.name}</h4>
                    {post.mood && <span>{post.mood}</span>}
                  </div>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              </div>

              {/* Контент поста */}
              {renderPostType(post)}

              {/* Дії */}
              <div className="flex items-center justify-between pt-3 border-t border-border mt-3">
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-primary">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-accent-foreground">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">{post.comments}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
                  <BookmarkPlus className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Запрошення */}
      <div className="p-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-secondary/30 to-accent/20">
          <CardContent className="p-5 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="mb-2">Запроси друзів</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Ділися книжковими знахідками з друзями
            </p>
            <Button className="rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Поділитися додатком
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}