// File: src/pages/UserProfile.jsx

import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Edit,
  Link as LinkIcon,
  MapPin,
  Calendar,
  Sparkles,
  Eye,
  MessageCircle,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { supabase } from '@/supabase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const { data, error } = await supabase
          .from('blog')
          .select('*')
          .eq('author_id', currentUser.uid)
          .order('created_at', { ascending: false });
        if (!error) setPosts(data);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading profile...</p>;
  if (!user) return <p className="p-6 text-center">User not signed in.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1c1c2b] via-[#23263a] to-[#141624] animate-gradient-x">
      {isMobile && (
        <div className="sticky top-0 z-10 bg-card/90 backdrop-blur-md border-b border-border/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="icon" className="shadow-card">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="font-semibold text-foreground">Profile</h1>
            <div></div>
          </div>
        </div>
      )}

      <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-40 sm:h-56 animate-pulse-slow">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      <div className="relative -mt-16 sm:-mt-24 px-4 sm:px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
          <div className="relative mb-4 sm:mb-0 flex justify-center sm:justify-start">
            <div className="relative group">
              <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-card shadow-3xl transition-all duration-500 group-hover:scale-105">
                <AvatarImage src={user.photoURL} alt={user.displayName} />
                <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg animate-glow">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-card/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl border border-border/50 animate-fade-in">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-bounce" />
                {user.displayName}
              </h1>
              <p className="text-muted-foreground mb-2">{user.email}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" /> Unknown Location
                </div>
                <div className="flex items-center">
                  <LinkIcon className="w-4 h-4 mr-1" />
                  <a href="#" className="text-primary hover:underline">example.com</a>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" /> Joined 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-8">
        <Tabs value="posts" className="w-full">
          <TabsList className="w-full mb-6 bg-card/50 backdrop-blur-md shadow-3d">
            <TabsTrigger value="posts" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Posts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            {posts.length === 0 ? (
              <p className="text-muted-foreground text-center">No posts published yet.</p>
            ) : (
              posts.map((post) => (
                <Card key={post.id} className="bg-gradient-to-br from-[#2a2b45] to-[#1f202f] shadow-md border border-border/50 hover:scale-[1.01] transition-transform duration-300">
                  <CardContent className="p-4 animate-fade-in">
                    <h3 className="font-semibold text-lg text-foreground mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-400 animate-heartbeat" />
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm whitespace-pre-line line-clamp-4">
                      {post.content}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                      <Eye className="w-4 h-4" /> {new Date(post.created_at).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
