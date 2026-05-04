'use client';

import { useAuth } from '@/lib/auth-context';
import { useData } from '@/lib/data-context';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Plus, AlertCircle, CheckCircle, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ROLE_SUGGESTIONS = [
  'Lead Guitarist',
  'Guest Preacher',
  'Worship Leader',
  'Backing Vocalist',
  'Co-Host',
  'Guest Speaker',
  'Choir Director',
];

const PARTICIPANTS = [
  {
    id: '2',
    username: 'church',
    displayName: 'Grace Community Church',
    profilePhoto: 'https://ui-avatars.com/api/?name=Grace+Community+Church&background=e2f6f6&color=1b5e5e',
    bankAccountLinked: true,
  },
  {
    id: '3',
    username: 'ministry',
    displayName: 'Hope Ministry International',
    profilePhoto: 'https://ui-avatars.com/api/?name=Hope+Ministry+International&background=e2f6f6&color=1b5e5e',
    bankAccountLinked: true,
  },
  {
    id: '4',
    username: 'preacher',
    displayName: 'Rev. John Mensah',
    profilePhoto: 'https://ui-avatars.com/api/?name=Rev+John+Mensah&background=e2f6f6&color=1b5e5e',
    bankAccountLinked: true,
  },
  {
    id: '5',
    username: 'singer',
    displayName: 'Aster Abebe',
    profilePhoto: 'https://ui-avatars.com/api/?name=Aster+Abebe&background=e2f6f6&color=1b5e5e',
    bankAccountLinked: true,
  },
  {
    id: '6',
    username: 'donor',
    displayName: 'Regular Donor',
    profilePhoto: 'https://ui-avatars.com/api/?name=Regular+Donor&background=fff3cd&color=7a5d00',
    bankAccountLinked: false,
  },
];

export default function ContributorsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthLoaded } = useAuth();
  const {
    getVideosByCreator,
    createContributorRequest,
    getContributorRequestsByCreator,
    getVideoContributors,
    updateContributorRole,
    removeContributor,
  } = useData();

  const [mounted, setMounted] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [searchUsername, setSearchUsername] = useState('');
  const [roleByUserId, setRoleByUserId] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [isVideoScoped, setIsVideoScoped] = useState(false);

  const isCreator = ['church', 'ministry', 'preacher', 'singer', 'worship_group'].includes(user?.role ?? '');
  const creatorVideos = user ? getVideosByCreator(user.id) : [];
  const videoIdFromQuery = searchParams.get('videoId');
  const scopedVideos = videoIdFromQuery
    ? creatorVideos.filter((video) => video.id === videoIdFromQuery)
    : creatorVideos;

  useEffect(() => {
    setMounted(true);
    if (!isAuthLoaded) return;
    if (!user) {
      router.push('/login');
      return;
    }

    if (!isCreator) {
      router.push('/dashboard');
    }
  }, [user, router, isCreator, isAuthLoaded]);

  useEffect(() => {
    if (!videoIdFromQuery) {
      setIsVideoScoped(false);
      return;
    }

    const scopedVideo = creatorVideos.find((video) => video.id === videoIdFromQuery);
    if (scopedVideo) {
      setSelectedVideo(scopedVideo.id);
      setIsVideoScoped(true);
    }
  }, [videoIdFromQuery, creatorVideos]);

  if (!mounted || !user) return null;
  if (!isCreator) return null;

  const selectedVideoRequests = selectedVideo ? getContributorRequestsByCreator(user.id, selectedVideo) : [];
  const selectedVideoContributors = selectedVideo ? getVideoContributors(selectedVideo) : [];

  const searchResults = PARTICIPANTS.filter((participant) => {
    const query = searchUsername.trim().toLowerCase();
    if (!query) return false;
    return (
      participant.username.toLowerCase().includes(query) ||
      participant.displayName.toLowerCase().includes(query)
    );
  }).filter((participant) => participant.id !== user.id);

  const handleSendRequest = (participant: (typeof PARTICIPANTS)[number]) => {
    if (!selectedVideo) {
      setMessage('error-no-video');
      return;
    }

    if (!participant.bankAccountLinked) {
      setMessage('error-no-bank');
      return;
    }

    const role = roleByUserId[participant.id]?.trim();
    if (!role) {
      setMessage('error-no-role');
      return;
    }

    const alreadyPending = selectedVideoRequests.some(
      (request) => request.contributorUserId === participant.id && request.status === 'pending'
    );
    const alreadyAccepted = selectedVideoContributors.some((contributor) => contributor.userId === participant.id);

    if (alreadyPending || alreadyAccepted) {
      setMessage('error-duplicate');
      return;
    }

    const video = creatorVideos.find((item) => item.id === selectedVideo);
    if (!video) return;

    createContributorRequest({
      creatorId: user.id,
      creatorName: user.name,
      videoId: video.id,
      videoTitle: video.title,
      contributorUserId: participant.id,
      contributorUsername: participant.username,
      contributorDisplayName: participant.displayName,
      contributorProfilePhoto: participant.profilePhoto,
      role,
    });

    setMessage('request-sent');
    setSearchUsername('');
    setRoleByUserId((previous) => ({ ...previous, [participant.id]: '' }));
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <Users className="w-5 h-5 text-primary" />
        <h1 className="font-semibold text-slate-900">Manage Contributors</h1>
      </div>

      <div className="px-4 py-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-semibold mb-1">Contributor Workflow</p>
            <p className="text-xs">
              Search by username, verify identity, assign a role, and send request. Contributor must have a linked bank account and accept request.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            {isVideoScoped ? 'Selected Video' : 'Select Video'}
          </label>
          {scopedVideos.length > 0 ? (
            <div className="space-y-2">
              {scopedVideos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => {
                    if (!isVideoScoped) setSelectedVideo(video.id);
                  }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition flex gap-3 ${
                    selectedVideo === video.id
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 hover:border-primary hover:bg-slate-50'
                  } ${isVideoScoped ? 'cursor-default' : ''}`}
                >
                  <img src={video.thumbnail} alt={video.title} className="w-16 h-16 rounded object-cover shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 line-clamp-1">{video.title}</h3>
                    <p className="text-xs text-slate-600 mt-1">{video.duration}</p>
                    {selectedVideo === video.id && <CheckCircle className="w-4 h-4 text-primary mt-2" />}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-600 text-sm">No videos yet. Upload a video first.</p>
            </div>
          )}
        </div>

        {selectedVideo && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-900 mb-3">Search Contributor</label>
              <Input
                type="text"
                placeholder="Search by username or display name..."
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
                className="mb-3"
              />

              {message === 'request-sent' && (
                <div className="mb-3 flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Request sent successfully.
                </div>
              )}
              {message === 'error-no-video' && (
                <div className="mb-3 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  Please select a video first.
                </div>
              )}
              {message === 'error-no-bank' && (
                <div className="mb-3 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  This user must add a bank account first.
                </div>
              )}
              {message === 'error-no-role' && (
                <div className="mb-3 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  Assign a role before sending request.
                </div>
              )}
              {message === 'error-duplicate' && (
                <div className="mb-3 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  This user already has a pending or accepted entry for this video.
                </div>
              )}

              {searchUsername && (
                <div className="space-y-2">
                  {searchResults.length > 0 ? (
                    searchResults.map((participant) => (
                      <div
                        key={participant.id}
                        className={`p-4 rounded-lg border flex items-start justify-between gap-3 ${
                          participant.bankAccountLinked
                            ? 'bg-white border-slate-200'
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={participant.profilePhoto}
                            alt={participant.displayName}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <h3 className="font-semibold text-slate-900">{participant.displayName}</h3>
                            <p className="text-xs text-slate-600 mt-1">@{participant.username}</p>
                            <p className={`text-xs mt-1 ${participant.bankAccountLinked ? 'text-green-600' : 'text-red-600'}`}>
                              {participant.bankAccountLinked ? 'Bank account verified' : 'No bank account linked'}
                            </p>
                            <Input
                              list="contributor-role-suggestions"
                              placeholder="Assign role (e.g., Guest Preacher)"
                              value={roleByUserId[participant.id] ?? ''}
                              onChange={(event) =>
                                setRoleByUserId((previous) => ({
                                  ...previous,
                                  [participant.id]: event.target.value,
                                }))
                              }
                              className="mt-2 h-9"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => handleSendRequest(participant)}
                          disabled={!participant.bankAccountLinked}
                          className={`p-2 rounded-lg transition ${
                            participant.bankAccountLinked
                              ? 'bg-primary/10 text-primary hover:bg-primary/20'
                              : 'text-slate-400 cursor-not-allowed'
                          }`}
                          title="Send request"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 bg-slate-50 rounded-lg">
                      <p className="text-slate-600 text-sm">No participants found.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <datalist id="contributor-role-suggestions">
              {ROLE_SUGGESTIONS.map((role) => (
                <option key={role} value={role} />
              ))}
            </datalist>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-900 mb-3">Pending Requests</label>
              {selectedVideoRequests.filter((request) => request.status === 'pending').length > 0 ? (
                <div className="space-y-2">
                  {selectedVideoRequests
                    .filter((request) => request.status === 'pending')
                    .map((request) => (
                      <div key={request.id} className="p-3 rounded-lg border border-amber-200 bg-amber-50">
                        <p className="font-semibold text-slate-900">{request.contributorDisplayName}</p>
                        <p className="text-xs text-slate-600 mt-1">@{request.contributorUsername}</p>
                        <p className="text-xs text-slate-600 mt-1">Role: {request.role}</p>
                        <p className="text-xs text-amber-700 mt-2 font-medium">Awaiting acceptance</p>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-slate-600 text-sm">No pending requests for this video.</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">Accepted Contributors</label>
              {selectedVideoContributors.length > 0 ? (
                <div className="space-y-2">
                  {selectedVideoContributors.map((contributor) => (
                    <div key={contributor.id} className="p-3 rounded-lg border border-slate-200 bg-white">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">{contributor.displayName}</p>
                          <p className="text-xs text-slate-600 mt-1">@{contributor.userName}</p>
                          <Input
                            list="contributor-role-suggestions"
                            value={contributor.role}
                            onChange={(event) => updateContributorRole(contributor.id, event.target.value)}
                            className="mt-2 h-9"
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeContributor(contributor.id)}
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-slate-600 text-sm">No accepted contributors for this video yet.</p>
                </div>
              )}
            </div>
          </>
        )}

        <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-600 space-y-2">
            <div className="font-semibold">Important Notes:</div>
            <ul className="list-disc list-inside space-y-1">
              <li>Contributors must have a bank account before requests can be sent</li>
              <li>Contributor must accept request before being linked to the video</li>
              <li>You can update roles and remove contributors any time</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
