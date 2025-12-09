import { Search, Filter, TrendingUp } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ExploreScreen() {
  const categories = [
    { name: "Fitness", color: "bg-orange-100 text-orange-600", count: 120 },
    { name: "Cooking", color: "bg-green-100 text-green-600", count: 89 },
    { name: "Wellness", color: "bg-blue-100 text-blue-600", count: 67 },
    { name: "Travel", color: "bg-purple-100 text-purple-600", count: 45 },
    { name: "Learning", color: "bg-yellow-100 text-yellow-600", count: 78 },
  ];

  const trending = [
    {
      id: 1,
      title: "10-Minute HIIT Workout",
      category: "Fitness",
      image: "https://images.unsplash.com/photo-1756115484694-009466dbaa67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrb3V0JTIwZml0bmVzcyUyMGd5bXxlbnwxfHx8fDE3NTc3MTI2NTl8MA&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral",
      views: "2.3k",
      trending: true,
    },
    {
      id: 2,
      title: "Mediterranean Diet Basics",
      category: "Cooking",
      image: "https://images.unsplash.com/photo-1572171579626-e79450374587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8Zm9vZCUyMGNvb2tpbmclMjByZWNpcGV8ZW58MXx8fHwxNzU3Nzg0MDcyfDA&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral",
      views: "1.8k",
      trending: true,
    },
    {
      id: 3,
      title: "Mindfulness Meditation",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1685708525394-8824dc35c671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjB0ZWNobm9sb2d5JTIwbGlmZXN0eWxlfGVufDF8fHx8MTc1Nzc4NDA2OHww&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral",
      views: "1.5k",
      trending: false,
    },
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Search Section */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search activities, recipes, workouts..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <Card key={index} className="flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center min-w-20">
                <div className={`w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center ${category.color}`}>
                  <span className="text-xl">
                    {category.name === "Fitness" && "💪"}
                    {category.name === "Cooking" && "🍳"}
                    {category.name === "Wellness" && "🧘"}
                    {category.name === "Travel" && "✈️"}
                    {category.name === "Learning" && "📚"}
                  </span>
                </div>
                <div className="font-medium text-sm">{category.name}</div>
                <div className="text-xs text-muted-foreground">{category.count} items</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-5 w-5 text-orange-500" />
          <h3 className="font-semibold">Trending Now</h3>
        </div>
        
        <div className="space-y-3">
          {trending.map((item) => (
            <Card key={item.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex">
                <div className="w-24 h-24 flex-shrink-0 relative">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {item.trending && (
                    <Badge className="absolute top-1 left-1 text-xs bg-orange-500">
                      🔥 Hot
                    </Badge>
                  )}
                </div>
                <CardContent className="flex-1 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <Badge variant="secondary" className="text-xs mb-2">
                        {item.category}
                      </Badge>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{item.views} views</span>
                        <Button variant="ghost" size="sm">
                          Try Now
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

      {/* Popular Tags */}
      <div>
        <h3 className="font-semibold mb-3">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {["#morning-routine", "#healthy-eating", "#home-workout", "#mindfulness", "#productivity", "#self-care"].map((tag, index) => (
            <Badge key={index} variant="outline" className="cursor-pointer hover:bg-accent">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}