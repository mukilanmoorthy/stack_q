import { useState } from 'react';
import {
  Camera, MapPin, Link as LinkIcon, Save, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

// Props: profileData = { name, username, bio, location, website, avatar, coverImage }
// onSave = callback function to save updated data
// children = trigger element
export function EditProfileDialog({ profileData, onSave, children }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: profileData.name || '',
    username: profileData.username || '',
    bio: profileData.bio || '',
    location: profileData.location || '',
    website: profileData.website || '',
    avatar: profileData.avatar || '',
    coverImage: profileData.coverImage || '',
  });

  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleSave = () => {
    onSave(formData);
    setOpen(false);
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    });
  };

  const EditForm = () => (
    <div className="space-y-6 p-4">
      {/* Avatar Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Avatar className="w-24 h-24 shadow-3d">
            <AvatarImage src={formData.avatar} alt={formData.name} />
            <AvatarFallback className="text-xl bg-gradient-primary text-primary-foreground">
              {formData.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            variant="secondary"
            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full shadow-3d"
          >
            <Camera className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Click the camera icon to change your profile picture
        </p>
      </div>

      {/* Cover Image */}
      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image URL</Label>
        <Input
          id="coverImage"
          value={formData.coverImage}
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          placeholder="https://example.com/cover.jpg"
          className="shadow-card"
        />
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="shadow-card"
        />
      </div>

      {/* Username */}
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="shadow-card"
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={4}
          className="shadow-card resize-none"
          placeholder="Tell people a bit about yourself..."
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="pl-10 shadow-card"
            placeholder="City, Country"
          />
        </div>
      </div>

      {/* Website */}
      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <div className="relative">
          <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="pl-10 shadow-card"
            placeholder="yourwebsite.com"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          onClick={handleSave}
          className="flex-1 bg-gradient-primary shadow-3d hover:shadow-3d-hover transition-all duration-300"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
        <Button
          variant="outline"
          onClick={() => setOpen(false)}
          className="shadow-card"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  );

  return isMobile ? (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh] bg-gradient-card">
        <DrawerHeader>
          <DrawerTitle className="text-center">Edit Profile</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto">
          <EditForm />
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto bg-gradient-card">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <EditForm />
      </DialogContent>
    </Dialog>
  );
}
