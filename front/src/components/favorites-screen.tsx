import { Heart, Clock, Star, Share } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FavoritesScreen() {
  const favorites = [
    {
      id: 1,
      title: "Morning Yoga Flow",
      category: "Fitness",
      duration: "20 min",
      image: "https://images.unsplash.com/photo-1756115484694-009466dbaa67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrb3V0JTIwZml0bmVzcyUyMGd5bXxlbnwxfHx8fDE3NTc3MTI2NTl8MA&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      saved: "2 days ago",
      description: "Start your day with gentle stretches and mindful breathing",
    },
    {
      id: 2,
      title: "Quinoa Buddha Bowl",
      category: "Recipe",
      duration: "25 min",
      image: "https://images.unsplash.com/photo-1572171579626-e79450374587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8Zm9vZCUyMGNvb2tpbmclMjByZWNpcGV8ZW58MXx8fHwxNzU3Nzg0MDcyfDA&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      saved: "1 week ago",
      description: "Nutritious and colorful bowl packed with protein and vitamins",
    },
    {
      id: 3,
      title: "Evening Meditation",
      category: "Wellness",
      duration: "15 min",
      image: "https://images.unsplash.com/photo-1685708525394-8824dc35c671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjB0ZWNobm9sb2d5JTIwbGlmZXN0eWxlfGVufDF8fHx8MTc1Nzc4NDA2OHww&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral",
      rating: 4.7,
      saved: "3 days ago",
      description: "Wind down with guided meditation for better sleep",
    },
  ];

  const collections = [
    { name: "Morning Routines", count: 8, color: "bg-orange-100 text-orange-600" },
    { name: "Healthy Recipes", count: 12, color: "bg-green-100 text-green-600" },
    { name: "Quick Workouts", count: 6, color: "bg-blue-100 text-blue-600" },
    { name: "Mindfulness", count: 4, color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mx-auto mb-3 flex items-center justify-center">
          <Heart className="h-8 w-8 text-white fill-current" />
        </div>
        <h2 className="text-xl font-semibold mb-1">Your Favorites</h2>
        <p className="text-muted-foreground">Items you've saved for later</p>
      </div>

      {/* Collections */}
      <div>
        <h3 className="font-semibold mb-3">Collections</h3>
        <div className="grid grid-cols-2 gap-3">
          {collections.map((collection, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center ${collection.color}`}>
                  <span className="text-xl">
                    {collection.name === "Morning Routines" && "🌅"}
                    {collection.name === "Healthy Recipes" && "🥗"}
                    {collection.name === "Quick Workouts" && "⚡"}
                    {collection.name === "Mindfulness" && "🧘"}
                  </span>
                </div>
                <div className="font-medium text-sm">{collection.name}</div>
                <div className="text-xs text-muted-foreground">{collection.count} items</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Favorites */}
      <div>
        <h3 className="font-semibold mb-3">Recently Saved</h3>
        <div className="space-y-3">
          {favorites.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex">
                <div className="w-24 h-24 flex-shrink-0 relative">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 bg-background/80 hover:bg-background"
                  >
                    <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                  </Button>
                </div>
                <CardContent className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{item.rating}</span>
                        </div>
                      </div>
                      <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{item.duration}</span>
                          </div>
                          <span>Saved {item.saved}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Share className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats */}
      <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
        <CardContent className="p-4 text-center">
          <h4 className="font-semibold mb-2">Your Favorites Stats</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-lg font-bold text-pink-600">30</div>
              <div className="text-muted-foreground">Total Saved</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">4</div>
              <div className="text-muted-foreground">Collections</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">85%</div>
              <div className="text-muted-foreground">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}