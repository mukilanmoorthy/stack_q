// src/pages/CreatePost.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Send,
  Eye,
  MessageCircle,
  Heart,
  Sparkles,
  CheckCircle2,
  Rocket,
  ImageIcon,
} from 'lucide-react';
import { toast } from 'sonner';

import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/firebase';
import { supabase } from '@/supabase';

export default function CreatePost() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', content: '', tags: '' });
  const [coverFile, setCoverFile] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        toast.success(`Welcome, ${result.user.displayName}`);
        navigate("/create");
      }
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        toast.error("Login failed: " + error.message);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const uploadCover = async () => {
    if (!coverFile) return null;
    const ext = coverFile.name.split(".").pop();
    const filename = `${Date.now()}.${ext}`;
    const path = `blog-covers/${filename}`;

    const { error: uploadError } = await supabase.storage.from("blog-covers").upload(path, coverFile);
    if (uploadError) {
      toast.error("Image upload failed: " + uploadError.message);
      return null;
    }

    const { data: urlData, error: urlError } = supabase.storage.from("blog-covers").getPublicUrl(path);
    if (urlError) {
      toast.error("Image URL retrieval failed: " + urlError.message);
      return null;
    }

    return urlData.publicUrl;
  };

  const handlePublish = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!user) {
      toast.error("You must be signed in to publish.");
      return;
    }

    setIsPublishing(true);
    const toastId = toast.loading("Publishing blog...");

    try {
      const coverUrl = await uploadCover();
      const { error } = await supabase.from("blog").insert([
        {
          title: formData.title.trim(),
          content: formData.content.trim(),
          tags: formData.tags,
          cover_url: coverUrl,
          author_id: user.uid,
          author_name: user.displayName || "Anonymous",
          author_photo: user.photoURL || "https://via.placeholder.com/40",
          created_at: new Date().toISOString(),
          publishedat: new Date().toISOString(),
        },
      ]);

      if (error) throw new Error(error.message);
      toast.success("Blog published successfully!", { id: toastId });
      setShowSuccessAnimation(true);
      setTimeout(() => navigate('/blog'), 3000);
    } catch (err) {
      toast.error("Failed to publish: " + err.message, { id: toastId });
    } finally {
      setIsPublishing(false);
    }
  };

  if (authLoading) return <p className="p-6 text-center">Loading user info...</p>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <Badge variant="outline" className="border-primary/20 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">Share Your Story</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create engaging content that inspires and connects with your audience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-primary"></div>
                  Write Your Post
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title *</label>
                  <Input
                    placeholder="Enter an engaging title..."
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="text-lg h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content *</label>
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    className="min-h-[300px] resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <Input
                    placeholder="react, life, coding"
                    value={formData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <ImageIcon className="h-4 w-4 mr-2" /> Cover Image
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverFile(e.target.files[0])}
                  />
                </div>
                <Button
                  size="lg"
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className={`px-8 py-4 text-lg font-semibold ${
                    isPublishing ? 'animate-pulse' : 'hover:scale-105 hover:shadow-lg'
                  } ${showSuccessAnimation ? 'bg-green-500' : 'bg-gradient-primary'}`}
                >
                  {isPublishing ? (
                    <>
                      <div className="animate-spin mr-2">
                        <Rocket className="w-5 h-5" />
                      </div>
                      Publishing...
                    </>
                  ) : showSuccessAnimation ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Published!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Publish Post
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-gradient-primary/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary/50" />
                </div>
                <h3 className="font-semibold text-lg">
                  {formData.title || 'Your amazing title will appear here'}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line line-clamp-6">
                  {formData.content || 'Your content preview will appear here...'}
                </p>
                {formData.tags && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.split(',').map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        #{tag.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {showSuccessAnimation && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">🎉 Success!</h2>
              <p className="text-green-200">Your blog post has been published</p>
            </div>
            <div className="flex justify-center space-x-8 text-white/80">
              <div className="text-center">
                <Heart className="w-6 h-6 mx-auto mb-1 text-red-400" />
                <div className="text-sm">Ready for likes</div>
              </div>
              <div className="text-center">
                <MessageCircle className="w-6 h-6 mx-auto mb-1 text-blue-400" />
                <div className="text-sm">Awaiting comments</div>
              </div>
              <div className="text-center">
                <Eye className="w-6 h-6 mx-auto mb-1 text-green-400" />
                <div className="text-sm">Tracking views</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
