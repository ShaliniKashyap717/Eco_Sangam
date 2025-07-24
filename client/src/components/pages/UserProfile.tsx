import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';

export const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Krishna Singh',
    email: 'krishnasingh97857@gmail.com',
    location: 'Jaipur, Rajasthan',
    joinDate: 'July 2024',
    totalSaved: '2.4 tons CO₂',
    streakDays: 45,
    badgesEarned: 12,
  });

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      if (res.ok) {
        await logout(); // Clears auth context
        window.location.href = 'http://localhost:5175'; // Redirect to homepage or login
      } else {
        console.error('Logout failed:', res.status);
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const badges = [
    { name: 'Eco Warrior', icon: '🌱', description: 'Reduced footprint by 20%' },
    { name: 'Commuter Champion', icon: '🚲', description: 'Used public transport 30 days' },
    { name: 'Energy Saver', icon: '💡', description: 'Reduced home energy by 15%' },
    { name: 'Green Streak', icon: '🔥', description: 'Logged activity for 30 days' },
  ];

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen mt-[-100px] flex items-center justify-center px-4 py-8 text-[#e5e1d8]">
      <div className="w-full max-w-4xl space-y-6">
        {/* Logout Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </Button>
        </div>

        {/* Personal Info */}
        <Card className="bg-white/5 backdrop-blur-sm border border-[#e5e1d8]/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#e5e1d8] uppercase tracking-wide">
                Personal Information
              </CardTitle>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                size="sm"
                className="border-[#e5e1d8]/40 text-black hover:bg-white/10"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-green-700 text-white text-xl">
                  {profile.name.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-[#e5e1d8]">{profile.name}</h3>
                <p className="text-[#e5e1d8]/80">Eco Enthusiast</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-[#e5e1d8] uppercase font-semibold">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  className="bg-white/10 border-[#e5e1d8]/30 text-[#e5e1d8]"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-[#e5e1d8] uppercase font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                  className="bg-white/10 border-[#e5e1d8]/30 text-[#e5e1d8]"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-[#e5e1d8] uppercase font-semibold">
                  Location
                </Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  disabled={!isEditing}
                  className="bg-white/10 border-[#e5e1d8]/30 text-[#e5e1d8]"
                />
              </div>
              <div>
                <Label className="text-[#e5e1d8] uppercase font-semibold">Member Since</Label>
                <Input
                  value={profile.joinDate}
                  disabled
                  className="bg-white/10 border-[#e5e1d8]/30 text-[#e5e1d8]"
                />
              </div>
            </div>
            {isEditing && (
              <Button className="bg-green-700 hover:bg-green-800 text-white">
                Save Changes
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="bg-white/5 backdrop-blur-sm border border-[#e5e1d8]/20">
          <CardHeader>
            <CardTitle className="text-[#e5e1d8] uppercase tracking-wide">
              Achievements & Badges
            </CardTitle>
            <CardDescription className="text-[#e5e1d8]/80">
              Your eco-friendly accomplishments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-white/10 border border-[#e5e1d8]/20 rounded-lg"
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h4 className="font-semibold text-[#e5e1d8] text-sm uppercase">
                    {badge.name}
                  </h4>
                  <p className="text-xs text-[#e5e1d8]/70 mt-1">{badge.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
