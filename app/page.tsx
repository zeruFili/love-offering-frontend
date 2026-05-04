'use client';

import { useAuth } from '@/lib/auth-context';
import { useData } from '@/lib/data-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Mail, LogOut, Settings, BarChart3, Heart, Shield, Gift, Menu, Search, Compass, Radio, History, User, Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { user, logout, isAuthLoaded } = useAuth();
  const { videos } = useData();
  const [mounted, setMounted] = useState(false);
  const [showMyVideos, setShowMyVideos] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setMounted(true);
    if (!isAuthLoaded) return;
    if (!user) {
      router.push('/login');
    }
  }, [user, router, isAuthLoaded]);

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

    if (user?.role === 'admin') {
      baseItems.splice(2, 0, { icon: Shield, label: 'Admin', href: '/admin', active: false });
    }

    return baseItems;
  };

  const getAvailableVideos = () => {
    const availableVideos = videos.filter(v => v.status === 'AVAILABLE');

    if (user?.role !== 'donor' && showMyVideos) {
      return availableVideos.filter((video) => video.creatorId === user?.id);
    }

    return availableVideos;
  };

  const desktopCategories = ['All', 'Music', 'Preaching', 'Church', 'Ministry'];

  const filteredVideos = (() => {
    const availableVideos = getAvailableVideos();
    const keyword = searchQuery.trim().toLowerCase();
    const filteredBySearch = keyword
      ? availableVideos.filter((video) =>
          video.title.toLowerCase().includes(keyword) ||
          video.creatorName.toLowerCase().includes(keyword) ||
          video.creatorRole.toLowerCase().includes(keyword)
        )
      : availableVideos;

    if (activeCategory === 'All') return filteredBySearch;

    const roleByCategory: Record<string, string> = {
      Music: 'singer',
      Preaching: 'preacher',
      Church: 'church',
      Ministry: 'ministry',
      Admin: 'admin',
    };

    return filteredBySearch.filter((video) => video.creatorRole === roleByCategory[activeCategory]);
  })();
  const featuredVideoId = filteredVideos[0]?.id ?? videos[0]?.id;

  if (!mounted) return null;
  if (!user) return null;
  const canManageCreatorVideos = user.role !== 'donor' && ['church', 'ministry', 'preacher', 'singer', 'worship_group'].includes(user.role);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white px-4 py-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="hidden lg:inline-flex p-2 hover:bg-slate-100 rounded-full transition" aria-label="Open menu">
              <Menu className="w-5 h-5 text-slate-700" />
            </button>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-primary text-lg">Love Offering</span>
          </div>

          <div className="hidden lg:flex items-center w-full max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos, creators, ministries"
                className="pl-10 rounded-full bg-slate-50 border-slate-200"
              />
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 hover:bg-slate-100 rounded-lg transition hidden lg:inline-flex"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-slate-600" />
          </button>

          <div className="lg:hidden">
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          <button className="hidden lg:inline-flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-full hover:bg-slate-50 transition">
            <User className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">{user.name}</span>
          </button>
        </div>

        <div className="mt-3 text-sm lg:hidden">
          <p className="text-slate-600">Welcome back, <span className="font-semibold text-slate-900">{user.name}</span></p>
        </div>
      </header>

      {/* Mobile Content */}
      <main className="px-4 py-6 max-w-4xl mx-auto lg:hidden">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Support the creators and ministries you love</h2>

          <div className="mt-4">
            {user.role !== 'donor' ? (
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
            ) : (
              <Link
                href="/verify/role-selection"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 transition"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Get Verified</span>
              </Link>
            )}
          </div>
        </div>

        <div className="max-w-md md:max-w-3xl lg:max-w-6xl mx-auto w-full">
          {/* Videos Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-primary hover:shadow-lg transition flex flex-col"
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

                <div className="p-4 flex flex-1 flex-col">
                  <Link href={`/video/${video.id}`} className="block">
                    <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-primary transition">
                      {video.title}
                    </h3>
                  </Link>

                  <div className="mt-auto pt-4 flex items-center justify-between gap-3">
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

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No videos available</p>
          </div>
        )}
      </main>

      {/* Desktop Content */}
      <section className="hidden lg:block px-6 py-5">
        <div className="grid grid-cols-[220px_1fr] gap-6">
          <aside className="sticky top-24 h-fit border-r border-slate-200 pr-4">
            <div className="space-y-1">
              <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-100 text-slate-900 font-medium">
                <Heart className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 transition">
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link href="/contributors" className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 transition">
                <Compass className="w-5 h-5" />
                <span>Explore</span>
              </Link>
              <Link href={featuredVideoId ? `/video/${featuredVideoId}` : '/'} className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 transition">
                <Radio className="w-5 h-5" />
                <span>Live</span>
              </Link>
              <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 transition">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Link>
              {canManageCreatorVideos && (
                <>
                  <button
                    onClick={() => setShowMyVideos((previous) => !previous)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
                  >
                    <History className="w-5 h-5" />
                    <span>{showMyVideos ? 'All Videos' : 'My Videos'}</span>
                  </button>
                  <Link href="/upload" className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 transition">
                    <Upload className="w-5 h-5" />
                    <span>Upload Video</span>
                  </Link>
                </>
              )}
              {user.role === 'donor' && (
                <Link href="/verify/role-selection" className="flex items-center gap-3 px-3 py-2 rounded-xl text-amber-700 bg-amber-50 hover:bg-amber-100 transition">
                  <FileText className="w-5 h-5" />
                  <span>Get Verified</span>
                </Link>
              )}
            </div>
          </aside>

          <div>
            <div className="flex gap-2 overflow-x-auto pb-4">
              {desktopCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    activeCategory === category
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-5">
              {filteredVideos.map((video) => (
                <article key={video.id} className="group flex h-full flex-col">
                  <Link href={`/video/${video.id}`}>
                    <div className="aspect-video rounded-2xl overflow-hidden bg-slate-200">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>
                  </Link>

                  <div className="mt-3 flex flex-1 items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                      {video.creatorRole.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1 flex flex-col">
                      <Link href={`/video/${video.id}`} className="block">
                        <h3 className="font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-primary transition">
                          {video.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-slate-600 mt-1 truncate">{video.creatorName}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-slate-500">{video.duration}</span>
                      </div>
                    </div>

                    <Link href={`/donate/${video.id}`} className="shrink-0 self-start pt-1">
                      <Button
                        size="icon"
                        className="h-9 w-9 rounded-full bg-amber-500 hover:bg-amber-600 text-amber-950 shadow-sm"
                        aria-label={`Gift ${video.title}`}
                        title={`Gift ${video.title}`}
                      >
                        <Gift className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="text-center py-14">
                <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No videos match this filter.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 lg:hidden">
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
