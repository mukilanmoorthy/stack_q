import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardContent, CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Heart, MessageCircle, Eye, Bookmark, Share2,
  MoreHorizontal, Sparkles, Clock
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/supabase';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog.likes || 0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = async (e) => {
    e.stopPropagation();
    const newCount = isLiked ? likeCount - 1 : likeCount + 1;
    setIsLiked(!isLiked);
    setLikeCount(newCount);

    try {
      const { error } = await supabase
        .from('blog')
        .update({ likes: newCount })
        .eq('id', blog.id);

      if (error) {
        console.error('Supabase like update failed:', error.message);
      }
    } catch (err) {
      console.error('Error updating likes:', err.message);
    }
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleCardClick = () => {
    navigate(`/blog/${blog.id}`);
  };

  return (
    <Card 
      onClick={handleCardClick}
      className="card-3d hover:shadow-elevation-high transition-all duration-500 cursor-pointer group animate-slide-up"
    >
      {blog.cover_url && (
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={blog.cover_url}
            alt="cover"
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={blog.author_photo}
              alt={blog.author_name}
              className="w-8 h-8 rounded-full ring-2 ring-border"
            />
            <div>
              <p className="text-sm font-medium">{blog.author_name}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{new Date(blog.publishedat).toLocaleDateString()}</span>
                <span>•</span>
                <span>~5 min read</span>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        <h2 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {blog.title}
        </h2>
        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
          {blog.content?.slice(0, 100)}...
        </p>

        {blog.tags && (
          <div className="flex flex-wrap gap-2 mt-3">
            {blog.tags.split(',').map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                #{tag.trim()}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardFooter className="pt-0 border-t border-border/50">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm transition-all duration-300 hover:scale-110 active:scale-95 ${
                isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current animate-pulse3d' : 'hover:animate-bounce'}`} />
              <span>{likeCount}</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/blog/${blog.id}#comments`);
              }}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-500 hover:scale-110 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 hover:animate-bounce" />
              <span>{blog.comments || 0}</span>
            </button>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>{blog.views || 0}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmark}
              className={`hover:scale-110 active:scale-95 ${
                isBookmarked ? 'text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current animate-pulse3d' : 'hover:animate-bounce'}`} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary hover:scale-110 active:scale-95"
            >
              <Share2 className="w-4 h-4 hover:animate-bounce" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

const BlogFeed = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blog')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setBlogs(data);
      setLoading(false);
    };

    fetchBlogs();

    const subscription = supabase
      .channel('blog-feed')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blog' }, () => {
        fetchBlogs();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-scale">
          <Badge variant="outline" className="border-primary/20 text-primary mb-4">
            
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Explore Stories and Ideas
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover insights and thoughts from amazing creators
          </p>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-64 bg-muted/20" />
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <div
                key={blog.id}
                className="animate-slide-up"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-8xl mb-6">📝</div>
            <h3 className="text-2xl font-bold mb-4">No Stories Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Be the first to share your amazing story with our community!
            </p>
            <Button
              size="lg"
              className="btn-3d"
              onClick={() => window.location.href = '/create'}
            >
              Create Your First Post
            </Button>
          </div>
        )}

        <div className="fixed bottom-8 right-8 z-50">
          <Button
            size="lg"
            className="btn-3d rounded-full w-14 h-14 shadow-elevation-high hover:shadow-elevation-highest animate-float"
            onClick={() => window.location.href = '/create'}
          >
            <Sparkles className="w-6 h-6" />
          </Button>
        </div>
      </main>

    </div>
  );
};

export default BlogFeed;
