import { BookOpen, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function AppHeader() {
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 backdrop-blur supports-backdrop-blur border-b border-border">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-sm">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                BookLovers
              </h1>
              <p className="text-xs text-muted-foreground">Твоя книжкова спільнота</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Button variant="ghost" size="icon" className="rounded-2xl">
              <Bell className="h-5 w-5 text-primary" />
            </Button>
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
              5
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}