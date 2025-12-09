import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Clock, MapPin, Star, Users } from "lucide-react";

export function HomeScreen() {
  const quickActions = [
    { title: "Workout", icon: "💪", color: "bg-orange-100 text-orange-600" },
    { title: "Recipe", icon: "🍳", color: "bg-green-100 text-green-600" },
    { title: "Tasks", icon: "✓", color: "bg-blue-100 text-blue-600" },
    { title: "Events", icon: "📅", color: "bg-purple-100 text-purple-600" },
  ];

  const activities = [
    {
      id: 1,
      title: "Morning Yoga Session",
      description: "Start your day with mindfulness",
      time: "30 min",
      image: "https://images.unsplash.com/photo-1756115484694-009466dbaa67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrb3V0JTIwZml0bmVzcyUyMGd5bXxlbnwxfHx8fDE3NTc3MTI2NTl8MA&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral",
      category: "Fitness",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Healthy Breakfast Bowl",
      description: "Nutritious acai bowl recipe",
      time: "15 min",
      image: "https://images.unsplash.com/photo-1572171579626-e79450374587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8Zm9vZCUyMGNvb2tpbmclMjByZWNpcGV8ZW58MXx8fHwxNzU3Nzg0MDcyfDA&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral",
      category: "Cooking",
      rating: 4.9,
    },
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Good Morning, Alex!</h2>
        <p className="text-blue-100 mb-4">Ready to make today amazing?</p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>San Francisco</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>8:30 AM</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-semibold mb-3">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto flex-col gap-2 p-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
                <span className="text-xl">{action.icon}</span>
              </div>
              <span className="text-xs">{action.title}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Today's Activities */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Today's Activities</h3>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {activities.map((activity) => (
            <Card key={activity.id} className="overflow-hidden">
              <div className="flex">
                <div className="w-20 h-20 flex-shrink-0">
                  <ImageWithFallback
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {activity.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{activity.rating}</span>
                        </div>
                      </div>
                      <h4 className="font-medium text-sm mb-1">{activity.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{activity.description}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div>
        <h3 className="font-semibold mb-3">Today's Progress</h3>
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-xs text-muted-foreground">Tasks Done</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">45</div>
            <div className="text-xs text-muted-foreground">Minutes Active</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-purple-600">3</div>
            <div className="text-xs text-muted-foreground">Goals Met</div>
          </Card>
        </div>
      </div>
    </div>
  );
}