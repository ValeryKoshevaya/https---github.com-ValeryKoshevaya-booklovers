import { useState, useEffect } from "react";
import { ArrowLeft, Camera, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { apiClient } from "../api/client";

interface EditProfileScreenProps {
  onBack: () => void;
  onSave: (data: ProfileData) => void;
}

interface ProfileData {
  name: string;
  username: string;
  bio: string;
  favoriteGenres: string[];
  readingGoal: number;
}

export function EditProfileScreen({ onBack, onSave }: EditProfileScreenProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    username: "",
    bio: "",
    favoriteGenres: [],
    readingGoal: 60,
  });

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const user = await apiClient.getMe();
      setProfileData({
        name: user.name || "",
        username: user.username || "",
        bio: user.bio || "",
        favoriteGenres: user.favoriteGenres || [],
        readingGoal: user.readingGoal || 60,
      });
      setSelectedGenres(user.favoriteGenres || []);
      if (user.avatarUrl) {
        setAvatarPreview(user.avatarUrl);
      }
    } catch (err: any) {
      setError(err.message || 'Не вдалося завантажити дані профілю');
      console.error('Failed to load user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Перевірка типу файлу
      if (!file.type.startsWith('image/')) {
        setError('Будь ласка, виберіть зображення');
        return;
      }
      // Перевірка розміру (макс 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Розмір файлу не повинен перевищувати 5MB');
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const availableGenres = [
    "Романтика",
    "Класика",
    "Фентезі",
    "Детектив",
    "Науково-популярне",
    "Поезія",
    "Драма",
    "Історичне",
    "Біографія",
    "Трилер",
    "Пригоди",
    "Наукова фантастика",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      // Спочатку завантажуємо аватарку, якщо вона вибрана
      if (avatarFile) {
        try {
          await apiClient.uploadAvatar(avatarFile);
        } catch (err: any) {
          console.error('Failed to upload avatar:', err);
          // Продовжуємо, навіть якщо аватарка не завантажилася
        }
      }

      // Зберігаємо дані через API
      await apiClient.updateMe({
        name: profileData.name,
        username: profileData.username,
        bio: profileData.bio,
        favoriteGenres: selectedGenres,
        readingGoal: profileData.readingGoal,
      });

      // Викликаємо callback для оновлення UI
      onSave({
        ...profileData,
        favoriteGenres: selectedGenres,
      });
      
      onBack();
    } catch (err: any) {
      setError(err.message || 'Не вдалося зберегти профіль');
      console.error('Failed to save profile:', err);
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Завантаження...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Хедер */}
      <div className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2>Редагувати профіль</h2>
          <Button
            type="submit"
            form="edit-profile-form"
            disabled={saving}
            className="rounded-full bg-primary hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? 'Збереження...' : 'Зберегти'}
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pt-6">
        {error && (
          <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}
        <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Фото профілю */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                    {avatarPreview ? (
                      <AvatarImage src={avatarPreview} alt={profileData.name} className="object-cover" />
                    ) : null}
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-3xl">
                      {getInitials(profileData.name)}
                    </AvatarFallback>
                  </Avatar>
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <div className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-primary hover:bg-primary/90 shadow-md flex items-center justify-center">
                      <Camera className="h-4 w-4 text-white" />
                    </div>
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Натисніть, щоб змінити фото
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Основна інформація */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ім'я</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={profileData.name}
                  onChange={handleChange}
                  className="bg-input-background border-border rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Нікнейм</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    @
                  </span>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={profileData.username}
                    onChange={handleChange}
                    className="pl-8 bg-input-background border-border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Про себе</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  className="bg-input-background border-border rounded-xl resize-none min-h-[100px]"
                  placeholder="Розкажіть про себе та свої літературні вподобання..."
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {profileData.bio.length}/200
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Річна ціль */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="space-y-2">
                <Label htmlFor="readingGoal">Річна ціль читання</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="readingGoal"
                    name="readingGoal"
                    type="number"
                    min="1"
                    max="365"
                    value={profileData.readingGoal}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 60;
                      setProfileData({
                        ...profileData,
                        readingGoal: value,
                      });
                    }}
                    className="bg-input-background border-border rounded-xl"
                    required
                  />
                  <span className="text-muted-foreground whitespace-nowrap">
                    книг на рік
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Встановіть скільки книг ви плануєте прочитати цього року
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Улюблені жанри */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="space-y-3">
                <Label>Улюблені жанри</Label>
                <p className="text-sm text-muted-foreground">
                  Виберіть до 5 жанрів, які вам подобаються
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableGenres.map((genre) => {
                    const isSelected = selectedGenres.includes(genre);
                    return (
                      <Badge
                        key={genre}
                        variant={isSelected ? "default" : "outline"}
                        className={`cursor-pointer transition-all rounded-full ${
                          isSelected
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                        onClick={() => {
                          if (!isSelected && selectedGenres.length >= 5) {
                            return;
                          }
                          toggleGenre(genre);
                        }}
                      >
                        {genre}
                      </Badge>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground">
                  Вибрано: {selectedGenres.length}/5
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Небезпечна зона */}
          <Card className="border-0 shadow-sm border-l-4 border-l-destructive">
            <CardContent className="p-4">
              <h3 className="text-destructive mb-2">Небезпечна зона</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ці дії незворотні. Будьте обережні!
              </p>
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl border-destructive text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Очистити історію читання
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl border-destructive text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Видалити акаунт
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
