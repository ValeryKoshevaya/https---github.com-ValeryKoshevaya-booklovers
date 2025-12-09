import { Settings, Edit, Award, Calendar, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";

export function ProfileScreen() {
  const achievements = [
    { title: "Early Bird", icon: "🌅", description: "Complete 5 morning routines", progress: 80 },
    { title: "Healthy Eater", icon: "🥗", description: "Try 10 healthy recipes", progress: 60 },
    { title: "Fitness Enthusiast", icon: "💪", description: "Complete 20 workouts", progress: 45 },
    { title: "Mindful Soul", icon: "🧘", description: "Meditate for 7 days straight", progress: 100 },
  ];

  const stats = [
    { label: "Activities Completed", value: "127", change: "+12 this week", trend: "up" },
    { label: "Current Streak", value: "8 days", change: "Personal best!", trend: "up" },
    { label: "Goals Achieved", value: "15/20", change: "75% complete", trend: "up" },
  ];

  const recentActivity = [
    { action: "Completed Morning Yoga", time: "2 hours ago", icon: "🧘" },
    { action: "Saved Protein Bowl Recipe", time: "1 day ago", icon: "❤️" },
    { action: "Finished HIIT Workout", time: "2 days ago", icon: "💪" },
    { action: "Started Meditation Challenge", time: "3 days ago", icon: "🎯" },
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-semibold">Alex Kim</h2>
                <Badge variant="secondary" className="text-xs">Pro</Badge>
              </div>
              <p className="text-muted-foreground mb-2">Health & Wellness Enthusiast</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>📍 San Francisco</span>
                <span>📅 Joined Jan 2024</span>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    <span>{stat.change}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Achievements
          </h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <span className="text-sm text-muted-foreground">{achievement.progress}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Recent Activity
        </h3>
        
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="text-xl">{activity.icon}</div>
              <div className="flex-1">
                <div className="font-medium text-sm">{activity.action}</div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings & Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-auto py-4 flex-col gap-2">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2">
          <Target className="h-5 w-5" />
          <span>Goals</span>
        </Button>
      </div>
    </div>
  );
}