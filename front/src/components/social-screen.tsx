import { Heart, MessageCircle, Share, UserPlus, Quote, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function SocialScreen() {
  const feedItems = [
    {
      id: 1,
      type: "quote",
      user: {
        name: "Анна Петренко",
        username: "anna_reads",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      },
      book: {
        title: "Маленький принц",
        author: "Антуан де Сент-Екзюпері",
        cover: "https://images.unsplash.com/photo-1709744599674-6a4e37a65ca9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhib29rJTIwY292ZXJzJTIwdmludGFnZXxlbnwxfHx8fDE3NTc3ODQ1MDh8MA&ixlib=rb-4.1.0&q=80&w=200&utm_source=figma&utm_medium=referral",
      },
      quote: "Зорі прекрасні тому, що десь серед них росте квітка, яку не видно...",
      tags: ["#мудрість", "#краса"],
      likes: 24,
      comments: 8,
      time: "2 години тому",
      isLiked: false,
    },
    {
      id: 2,
      type: "reading_start",
      user: {
        name: "Марко Іваненко",
        username: "marko_bookworm",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      },
      book: {
        title: "1984",
        author: "Джордж Орвелл",
        cover: "https://images.unsplash.com/photo-1690179216796-74f4db8e5ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rc3RvcmV8ZW58MXx8fHwxNTc3Nzg0NTExfDA&ixlib=rb-4.1.0&q=80&w=200&utm_source=figma&utm_medium=referral",
      },
      likes: 12,
      comments: 3,
      time: "5 годин тому",
      isLiked: true,
    },
    {
      id: 3,
      type: "quote",
      user: {
        name: "Софія Коваленко",
        username: "sofia_literature",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      },
      book: {
        title: "Atomic Habits",
        author: "James Clear",
        cover: "https://images.unsplash.com/photo-1652305489491-789257d2e95c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhib29rcyUyMGxpYnJhcnklMjByZWFkaW5nfGVufDF8fHx8MTc1Nzc3MjAxM3ww&ixlib=rb-4.1.0&q=80&w=200&utm_source=figma&utm_medium=referral",
      },
      quote: "Ви не піднімаєтесь до рівня своїх цілей. Ви опускаєтесь до рівня своїх систем.",
      tags: ["#мотивація", "#саморозвиток"],
      likes: 45,
      comments: 12,
      time: "1 день тому",
      isLiked: true,
    },
  ];

  const suggestedFriends = [
    {
      name: "Олександр Семенко",
      username: "alex_fantasy",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      mutualBooks: 12,
      currentReading: "Дюна",
    },
    {
      name: "Катерина Мельник",
      username: "kate_classics",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face",
      mutualBooks: 8,
      currentReading: "Війна і мир",
    },
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Заголовок */}
      <div className="text-center py-4">
        <h2 className="text-xl font-semibold mb-1">Соціальна стрічка</h2>
        <p className="text-muted-foreground">Дізнавайтесь, що читають ваші друзі</p>
      </div>

      {/* Запропоновані друзі */}
      <div>
        <h3 className="font-semibold mb-3">Нові читачі</h3>
        <div className="space-y-3">
          {suggestedFriends.map((friend, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{friend.name}</h4>
                    <p className="text-xs text-muted-foreground">@{friend.username}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {friend.mutualBooks} спільних книг
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Читає: {friend.currentReading}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <UserPlus className="h-3 w-3 mr-1" />
                    Додати
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Стрічка активності */}
      <div>
        <h3 className="font-semibold mb-3">Стрічка друзів</h3>
        <div className="space-y-4">
          {feedItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={item.user.avatar} />
                    <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">{item.user.name}</h4>
                      <span className="text-xs text-muted-foreground">@{item.user.username}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {item.type === "quote" ? (
                        <>
                          <Quote className="h-3 w-3" />
                          <span>поділився цитатою з</span>
                        </>
                      ) : (
                        <>
                          <BookOpen className="h-3 w-3" />
                          <span>почав читати</span>
                        </>
                      )}
                      <span className="font-medium">{item.book.title}</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex gap-3">
                  <div className="w-16 h-20 flex-shrink-0">
                    <ImageWithFallback
                      src={item.book.cover}
                      alt={item.book.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-sm mb-1">{item.book.title}</h5>
                    <p className="text-xs text-muted-foreground mb-2">{item.book.author}</p>
                    
                    {item.type === "quote" && item.quote && (
                      <div className="bg-muted/50 p-3 rounded-lg mb-3">
                        <p className="text-sm italic">"{item.quote}"</p>
                        {item.tags && (
                          <div className="flex gap-1 mt-2">
                            {item.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 px-2 ${item.isLiked ? "text-red-500" : "text-muted-foreground"}`}
                      >
                        <Heart className={`h-4 w-4 mr-1 ${item.isLiked ? "fill-current" : ""}`} />
                        <span className="text-xs">{item.likes}</span>
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span className="text-xs">{item.comments}</span>
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Статистика спільноти */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <h4 className="font-semibold">Статистика спільноти</h4>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">156</div>
              <div className="text-xs text-muted-foreground">друзів</div>
            </div>
            <div>
              <div className="text-lg font-bold text-indigo-600">89</div>
              <div className="text-xs text-muted-foreground">цитат поділено</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">23</div>
              <div className="text-xs text-muted-foreground">обговорень</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}