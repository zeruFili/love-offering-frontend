'use client';

import { useAuth } from '@/lib/auth-context';
import { useData } from '@/lib/data-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Mail, LogOut, Settings, BarChart3, Heart, FileText, Shield, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { videos } = useData();
  const [mounted, setMounted] = useState(false);
  const [showMyVideos, setShowMyVideos] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!mounted) return null;
  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const getNavItems = () => {
    const baseItems = [
      { icon: Heart, label: 'Give', href: '/', active: true },
      { icon: BarChart3, label: 'Dashboard', href: '/dashboard', active: false },
      { icon: Settings, label: 'Settings', href: '/settings', active: false },
    ];

    if (user.role === 'admin') {
      baseItems.splice(2, 0, { icon: Shield, label: 'Admin', href: '/admin', active: false });
    }

    return baseItems;
  };

  const getAvailableVideos = () => {
    const availableVideos = videos.filter(v => v.status === 'AVAILABLE');

    if (user.role !== 'donor' && showMyVideos) {
      return availableVideos.filter((video) => video.creatorId === user.id);
    }

    return availableVideos;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-primary text-lg">Love Offering</span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-slate-100 rounded-lg transition"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-slate-600" />
          </button>
        </div>
        <div className="mt-3 text-sm">
          <p className="text-slate-600">Welcome back, <span className="font-semibold text-slate-900">{user.name}</span></p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Support the creators and ministries you love</h2>

          {user.role !== 'donor' && (
            <div className="mt-4">
              <button
                onClick={() => setShowMyVideos((previous) => !previous)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                  showMyVideos
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-primary hover:text-primary'
                }`}
              >
                {showMyVideos ? 'All Videos' : 'My Videos'}
              </button>
            </div>
          )}
        </div>

        <div className="max-w-md md:max-w-3xl lg:max-w-6xl mx-auto w-full">
          {/* Videos Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {getAvailableVideos().map((video) => (
              <div
                key={video.id}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-primary hover:shadow-lg transition"
              >
                <Link href={`/video/${video.id}`}>
                  <div className="aspect-video bg-slate-200 overflow-hidden relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <Heart className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/video/${video.id}`} className="block">
                    <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-primary transition">
                      {video.title}
                    </h3>
                  </Link>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <Link href={`/video/${video.id}`} className="min-w-0">
                      <p className="text-sm text-slate-600 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {video.creatorRole.charAt(0).toUpperCase()}
                        </span>
                        <span className="truncate">{video.creatorName}</span>
                      </p>
                    </Link>

                    <Link href={`/donate/${video.id}`} className="inline-flex items-center gap-2 shrink-0">
                      <Button
                        size="icon"
                        className="h-10 w-10 rounded-full bg-amber-500 hover:bg-amber-600 text-amber-950 shadow-sm"
                        aria-label={`Gift ${video.title}`}
                        title={`Gift ${video.title}`}
                      >
                        <Gift className="w-4 h-4" />
                      </Button>
                      <span className="text-sm font-semibold text-amber-700">Gift</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {getAvailableVideos().length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No videos available</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3">
        <div className="flex items-center justify-around max-w-4xl mx-auto">
          {getNavItems().map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition ${
                  item.active
                    ? 'text-primary'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
