// src/pages/BlogPost.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/supabase';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

import {
  Heart, MessageCircle, Eye, ArrowLeft, Share2, Bookmark,
  Calendar, Clock, Send
} from 'lucide-react';

import { useToast } from '@/hooks/use-toast';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchAndUpdateBlog = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('blog')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        setBlog(null);
        setLoading(false);
        return;
      }

      setBlog(data);
      setLikeCount(data.likes || 0);

      // Increment views
      await supabase
        .from('blog')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', id);

      setLoading(false);
    };

    fetchAndUpdateBlog();
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => isLiked ? prev - 1 : prev + 1);
    toast({ description: isLiked ? 'Unliked' : 'Liked ❤️' });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({ description: isBookmarked ? 'Bookmark removed' : 'Post bookmarked' });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ description: 'Link copied to clipboard!' });
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: comments.length + 1,
      content: newComment,
      timestamp: 'Just now',
      author: {
        name: 'You',
        avatar: 'https://ui-avatars.com/api/?name=You'
      }
    };
    setComments([comment, ...comments]);
    setNewComment('');
    toast({ description: 'Comment posted' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Blog Not Found</h2>
          <Button onClick={() => navigate('/blog')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const publishedDate = new Date(blog.publishedat).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen px-4 py-8 max-w-5xl mx-auto">
      {blog.cover_url && (
        <img
          src={blog.cover_url}
          alt="cover"
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}

      <div className="flex items-center justify-between mb-4">
        <Button onClick={() => navigate('/blog')} variant="ghost" className="text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="flex gap-2">
          <Button onClick={handleLike} size="icon" variant="ghost">
            <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
          </Button>
          <Button onClick={handleBookmark} size="icon" variant="ghost">
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'text-yellow-400 fill-current' : ''}`} />
          </Button>
          <Button onClick={handleShare} size="icon" variant="ghost">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="mb-2">
        {blog.tags?.split(',').map((tag, index) => (
          <Badge key={index} variant="secondary" className="mr-2">
            #{tag.trim()}
          </Badge>
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>

      <div className="text-sm text-muted-foreground mb-4 flex gap-4">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {publishedDate}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          ~5 min read
        </span>
        <span className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          {blog.views || 0}
        </span>
      </div>

      {/* ✅ FIXED content display */}
      <div className="prose dark:prose-invert max-w-none mb-8">
        <pre className="whitespace-pre-wrap text-base leading-relaxed font-sans">
          {blog.content}
        </pre>
      </div>

      {/* Comments Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Comments ({comments.length})
          </h3>

          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-3"
          />

          <div className="flex justify-end">
            <Button onClick={handleCommentSubmit} disabled={!newComment.trim()}>
              <Send className="w-4 h-4 mr-2" />
              Comment
            </Button>
          </div>

          <div className="mt-6 space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="flex gap-3">
                <Avatar>
                  <AvatarImage src={c.author.avatar} />
                  <AvatarFallback>{c.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{c.author.name}</p>
                  <p className="text-sm text-muted-foreground">{c.timestamp}</p>
                  <p className="text-sm mt-1">{c.content}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Author Info */}
      {blog.author_name && (
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={blog.author_photo} />
              <AvatarFallback>{blog.author_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-lg font-semibold">{blog.author_name}</h4>
              <p className="text-sm text-muted-foreground">Author</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BlogPost;
