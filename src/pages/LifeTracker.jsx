import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Target,
  Heart,
  Brain,
  Briefcase,
  Users,
  Book,
  Dumbbell,
  Coffee,
  Moon,
  Smile,
  Plus,
  Circle,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

// Category definitions
const CATEGORIES = [
  { id: 'health', name: 'Health & Fitness', icon: Heart, color: 'from-red-400 to-red-600' },
  { id: 'work', name: 'Work & Career', icon: Briefcase, color: 'from-blue-400 to-blue-600' },
  { id: 'learning', name: 'Learning & Growth', icon: Book, color: 'from-purple-400 to-purple-600' },
  { id: 'social', name: 'Social & Family', icon: Users, color: 'from-green-400 to-green-600' },
  { id: 'personal', name: 'Personal Care', icon: Smile, color: 'from-yellow-400 to-yellow-600' },
  { id: 'habits', name: 'Daily Habits', icon: Target, color: 'from-pink-400 to-pink-600' },
];

export default function LifeTracker() {
  const [currentDate, setCurrentDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [dayData, setDayData] = useState({
    date: currentDate,
    planning: [],
    reflection: [],
    mood: 5,
    notes: ''
  });
  const [newItemText, setNewItemText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('personal');
  const [selectedPriority, setSelectedPriority] = useState('medium');
  const [activeTab, setActiveTab] = useState('planning');

  // Load saved data when date changes
  useEffect(() => {
    const saved = localStorage.getItem(`life-tracker-${currentDate}`);
    if (saved) {
      setDayData(JSON.parse(saved));
    } else {
      setDayData({
        date: currentDate,
        planning: [],
        reflection: [],
        mood: 5,
        notes: ''
      });
    }
  }, [currentDate]);

  const saveDayData = updated => {
    localStorage.setItem(`life-tracker-${updated.date}`, JSON.stringify(updated));
    setDayData(updated);
  };

  const addItem = type => {
    if (!newItemText.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      text: newItemText.trim(),
      category: selectedCategory,
      completed: false,
      priority: selectedPriority
    };

    const updated = {
      ...dayData,
      [type]: [...dayData[type], newItem]
    };
    saveDayData(updated);
    setNewItemText('');
    toast.success(`Added to ${type}!`, { className: 'animate-bounce-in' });
  };

  const toggleItem = (type, id) => {
    const updated = {
      ...dayData,
      [type]: dayData[type].map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    };
    saveDayData(updated);
  };

  const deleteItem = (type, id) => {
    const updated = {
      ...dayData,
      [type]: dayData[type].filter(item => item.id !== id)
    };
    saveDayData(updated);
    toast.success('Item removed');
  };

  const getCompletionRate = items => {
    if (!items.length) return 0;
    return (items.filter(item => item.completed).length / items.length) * 100;
  };

  const getCategoryIcon = id => {
    const cat = CATEGORIES.find(c => c.id === id);
    return cat ? cat.icon : Circle;
  };

  const getCategoryColor = id => {
    const cat = CATEGORIES.find(c => c.id === id);
    return cat ? cat.color : 'from-gray-400 to-gray-600';
  };

  const getPriorityColor = p => {
    if (p === 'high')
      return 'border-l-red-500 bg-red-50 dark:bg-red-950/20';
    if (p === 'medium')
      return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
    return 'border-l-green-500 bg-green-50 dark:bg-green-950/20';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 animate-float">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Life Tracker
          </h1>
          <p className="text-muted-foreground text-lg">
            Plan your day, track your progress, reflect on your journey
          </p>
          <div className="flex items-center justify-center gap-4">
            <Input
              type="date"
              value={currentDate}
              onChange={e => setCurrentDate(e.target.value)}
              className="w-auto glass-effect"
            />
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {new Date(currentDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Badge>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-effect animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-500">
                {Math.round(getCompletionRate(dayData.planning))}%
              </div>
              <p className="text-muted-foreground">Planning Progress</p>
              <Progress value={getCompletionRate(dayData.planning)} className="mt-2" />
            </CardContent>
          </Card>
          <Card className="glass-effect animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-500">
                {Math.round(getCompletionRate(dayData.reflection))}%
              </div>
              <p className="text-muted-foreground">Reflection Progress</p>
              <Progress value={getCompletionRate(dayData.reflection)} className="mt-2" />
            </CardContent>
          </Card>
          <Card className="glass-effect animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-500">
                {dayData.mood}/10
              </div>
              <p className="text-muted-foreground">All progress</p>
              <div className="flex justify-center mt-2">
                {[...Array(10)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => saveDayData({ ...dayData, mood: i + 1 })}
                    className={`w-3 h-3 mx-1 rounded-full transition-all ${
                      i < dayData.mood
                        ? 'bg-purple-500 scale-110'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 glass-effect">
            <TabsTrigger value="planning" className="text-lg">
              🌅 Daily Planning
            </TabsTrigger>
            <TabsTrigger value="reflection" className="text-lg">
              🌙 Daily Reflection
            </TabsTrigger>
          </TabsList>

          {/* Add Item */}
          <Card className="glass-effect animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" /> Add New Item
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">What do you want to track?</label>
                  <Input
                    value={newItemText}
                    onChange={e => setNewItemText(e.target.value)}
                    placeholder="e.g., Exercise for 30 minutes..."
                    className="glass-effect"
                    onKeyPress={e => e.key === 'Enter' && addItem(activeTab)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="w-full p-2 rounded-md border bg-background glass-effect"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <select
                    value={selectedPriority}
                    onChange={e => setSelectedPriority(e.target.value)}
                    className="w-full p-2 rounded-md border bg-background glass-effect"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <Button
                onClick={() => addItem(activeTab)}
                className="w-full gradient-glow"
                disabled={!newItemText.trim()}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to {activeTab === 'planning' ? 'Planning' : 'Reflection'}
              </Button>
            </CardContent>
          </Card>

          {/* Planning List */}
          <TabsContent value="planning" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  🎯 Today I Want To...
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dayData.planning.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="text-6xl">🌱</div>
                    <p className="text-muted-foreground">
                      Start planning your amazing day!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {dayData.planning.map((item, idx) => {
                      const Icon = getCategoryIcon(item.category);
                      return (
                        <div
                          key={item.id}
                          className={`p-4 rounded-lg border-l-4 ${getPriorityColor(
                            item.priority
                          )} transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-slide-in-right`}
                          style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <Checkbox
                                checked={item.completed}
                                onCheckedChange={() => toggleItem('planning', item.id)}
                                className="animate-bounce-check"
                              />
                              <div
                                className={`w-8 h-8 rounded-full bg-gradient-to-r ${getCategoryColor(
                                  item.category
                                )} flex items-center justify-center animate-rotate-slow`}
                              >
                                <Icon className="h-4 w-4 text-white" />
                              </div>
                              <span
                                className={`flex-1 ${
                                  item.completed ? 'line-through text-muted-foreground' : ''
                                }`}
                              >
                                {item.text}
                              </span>
                              <Badge
                                variant={
                                  item.priority === 'high'
                                    ? 'destructive'
                                    : item.priority === 'medium'
                                    ? 'default'
                                    : 'secondary'
                                }
                              >
                                {item.priority}
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteItem('planning', item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reflection List */}
          <TabsContent value="reflection" className="space-y-4">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  ✨ Today I Actually Did...
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dayData.reflection.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="text-6xl">🌟</div>
                    <p className="text-muted-foreground">
                      Reflect on your accomplishments!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {dayData.reflection.map((item, idx) => {
                      const Icon = getCategoryIcon(item.category);
                      return (
                        <div
                          key={item.id}
                          className={`p-4 rounded-lg border-l-4 ${getPriorityColor(
                            item.priority
                          )} transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-slide-in-left`}
                          style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <Checkbox
                                checked={item.completed}
                                onCheckedChange={() => toggleItem('reflection', item.id)}
                                className="animate-bounce-check"
                              />
                              <div
                                className={`w-8 h-8 rounded-full bg-gradient-to-r ${getCategoryColor(
                                  item.category
                                )} flex items-center justify-center animate-rotate-slow`}
                              >
                                <Icon className="h-4 w-4 text-white" />
                              </div>
                              <span
                                className={`flex-1 ${
                                  item.completed ? 'line-through text-muted-foreground' : ''
                                }`}
                              >
                                {item.text}
                              </span>
                              <Badge
                                variant={
                                  item.priority === 'high'
                                    ? 'destructive'
                                    : item.priority === 'medium'
                                    ? 'default'
                                    : 'secondary'
                                }
                              >
                                {item.priority}
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteItem('reflection', item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Notes */}
        <Card className="glass-effect animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📝 Daily Notes & Thoughts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={dayData.notes}
              onChange={e =>
                saveDayData({ ...dayData, notes: e.target.value })
              }
              placeholder="How was your day? What did you learn? Any thoughts or feelings to remember..."
              className="min-h-[120px] glass-effect"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
