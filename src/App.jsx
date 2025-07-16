import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {  Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";

import Index from "./pages/Index";
import CreatePost from "./pages/CreatePost";
import BlogFeed from "./pages/BlogFeed";
import LifeTracker from "./pages/LifeTracker";
import NotFound from "./pages/NotFound";
import BlogPost from "./pages/BlogPost";
import Auth from "./pages/Auth";
import UserProfile from "./pages/UserProfile";
import { EditProfileDialog } from "@/components/EditProfileDialog";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster richColors position="top-right" />
        
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/create" element={<CreatePost />} />
             <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/blog" element={<BlogFeed />} />
            <Route path="/life-tracker" element={<LifeTracker />} />
            <Route path="*" element={<NotFound />} />
             <Route path="/auth" element={<Auth />} />
             <Route path="/profile" element={<UserProfile/>}/> 
          </Routes>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
