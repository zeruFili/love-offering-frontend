'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MOCK_VIDEOS,
  MOCK_DONATIONS,
  MOCK_COMMENTS,
  MOCK_VERIFICATION_REQUESTS,
  MOCK_ADMIN_LOGS,
  type Video,
  type Donation,
  type Comment,
  type Reply,
  type VerificationRequest,
  type AdminActionLog,
  type Contributor,
  type ContributorRequest,
} from './mock-data';

interface DataContextType {
  videos: Video[];
  donations: Donation[];
  comments: Comment[];
  verificationRequests: VerificationRequest[];
  adminLogs: AdminActionLog[];
  contributors: Contributor[];
  contributorRequests: ContributorRequest[];
  
  // Video methods
  getVideoById: (id: string) => Video | undefined;
  getVideosByCreator: (creatorId: string) => Video[];
  toggleVideoStatus: (videoId: string) => void;
  
  // Donation methods
  getDonationsByDonor: (donorId: string) => Donation[];
  getDonationsByCreator: (creatorId: string) => Donation[];
  addDonation: (donation: Donation) => void;
  
  // Comment methods
  getCommentsByDonation: (donationId: string) => Comment[];
  addComment: (donationId: string, comment: Comment) => void;
  addReply: (donationId: string, commentId: string, reply: Reply) => void;
  
  // Verification methods
  getPendingVerifications: () => VerificationRequest[];
  updateVerificationRequest: (id: string, updates: Partial<VerificationRequest>) => void;
  
  // Contributor methods
  addContributor: (contributor: Contributor) => void;
  getVideoContributors: (videoId: string) => Contributor[];
  createContributorRequest: (request: Omit<ContributorRequest, 'id' | 'status' | 'createdAt'>) => ContributorRequest;
  getContributorRequestsByCreator: (creatorId: string, videoId?: string) => ContributorRequest[];
  getContributorRequestsForUser: (userId: string) => ContributorRequest[];
  acceptContributorRequest: (requestId: string) => void;
  rejectContributorRequest: (requestId: string, note?: string) => void;
  updateContributorRole: (contributorId: string, role: string) => void;
  removeContributor: (contributorId: string) => void;
  getContributionsForUser: (userId: string) => Contributor[];
  
  // Admin log methods
  addAdminLog: (log: AdminActionLog) => void;
  getAdminLogs: (adminId?: string) => AdminActionLog[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>([]);
  const [adminLogs, setAdminLogs] = useState<AdminActionLog[]>([]);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [contributorRequests, setContributorRequests] = useState<ContributorRequest[]>([]);

  useEffect(() => {
    // Load initial mock data
    setVideos(MOCK_VIDEOS);
    setDonations(MOCK_DONATIONS);
    setComments(MOCK_COMMENTS);
    setVerificationRequests(MOCK_VERIFICATION_REQUESTS);
    setAdminLogs(MOCK_ADMIN_LOGS);
  }, []);

  const getVideoById = (id: string) => videos.find(v => v.id === id);

  const getVideosByCreator = (creatorId: string) => 
    videos.filter(v => v.creatorId === creatorId);

  const toggleVideoStatus = (videoId: string) => {
    setVideos(videos.map(v =>
      v.id === videoId
        ? { ...v, status: v.status === 'AVAILABLE' ? 'NOT_AVAILABLE' : 'AVAILABLE' }
        : v
    ));
  };

  const getDonationsByDonor = (donorId: string) =>
    donations.filter(d => d.donorId === donorId);

  const getDonationsByCreator = (creatorId: string) =>
    donations.filter(d => Object.keys(d.recipients).includes(creatorId));

  const addDonation = (donation: Donation) => {
    setDonations([...donations, donation]);
  };

  const getCommentsByDonation = (donationId: string) =>
    comments.filter(c => c.donationId === donationId);

  const addComment = (donationId: string, comment: Comment) => {
    const donation = donations.find((entry) => entry.id === donationId);
    setComments([
      ...comments,
      {
        ...comment,
        donationId,
        videoId: comment.videoId ?? donation?.videoId,
      },
    ]);
  };

  const addReply = (donationId: string, commentId: string, reply: Reply) => {
    setComments(comments.map(c =>
      c.id === commentId
        ? { ...c, replies: [...c.replies, reply] }
        : c
    ));
  };

  const getPendingVerifications = () =>
    verificationRequests.filter(v => v.status === 'pending' || v.status === 'under_review');

  const updateVerificationRequest = (id: string, updates: Partial<VerificationRequest>) => {
    setVerificationRequests(verificationRequests.map(v =>
      v.id === id ? { ...v, ...updates } : v
    ));
  };

  const addContributor = (contributor: Contributor) => {
    setContributors([...contributors, contributor]);
  };

  const getVideoContributors = (videoId: string) =>
    contributors.filter(c => c.videoId === videoId);

  const createContributorRequest = (request: Omit<ContributorRequest, 'id' | 'status' | 'createdAt'>) => {
    const newRequest: ContributorRequest = {
      ...request,
      id: `contrib-req-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setContributorRequests((previous) => [newRequest, ...previous]);
    return newRequest;
  };

  const getContributorRequestsByCreator = (creatorId: string, videoId?: string) =>
    contributorRequests.filter((request) =>
      request.creatorId === creatorId && (videoId ? request.videoId === videoId : true)
    );

  const getContributorRequestsForUser = (userId: string) =>
    contributorRequests.filter((request) => request.contributorUserId === userId);

  const acceptContributorRequest = (requestId: string) => {
    const request = contributorRequests.find((item) => item.id === requestId);
    if (!request || request.status !== 'pending') return;

    const newContributor: Contributor = {
      id: `contrib-${Date.now()}`,
      creatorId: request.creatorId,
      userId: request.contributorUserId,
      videoId: request.videoId,
      userName: request.contributorUsername,
      displayName: request.contributorDisplayName,
      profilePhoto: request.contributorProfilePhoto,
      role: request.role,
      bankAccountLinked: true,
      acceptedAt: new Date().toISOString(),
    };

    setContributors((previous) => [newContributor, ...previous]);
    setContributorRequests((previous) =>
      previous.map((item) =>
        item.id === requestId
          ? { ...item, status: 'accepted', updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const rejectContributorRequest = (requestId: string, note?: string) => {
    setContributorRequests((previous) =>
      previous.map((item) =>
        item.id === requestId
          ? {
              ...item,
              status: 'rejected',
              updatedAt: new Date().toISOString(),
              note: note ?? item.note,
            }
          : item
      )
    );
  };

  const updateContributorRole = (contributorId: string, role: string) => {
    setContributors((previous) =>
      previous.map((item) => (item.id === contributorId ? { ...item, role } : item))
    );
  };

  const removeContributor = (contributorId: string) => {
    setContributors((previous) => previous.filter((item) => item.id !== contributorId));
  };

  const getContributionsForUser = (userId: string) =>
    contributors.filter((item) => item.userId === userId);

  const addAdminLog = (log: AdminActionLog) => {
    setAdminLogs([...adminLogs, log]);
  };

  const getAdminLogs = (adminId?: string) =>
    adminId ? adminLogs.filter(l => l.adminId === adminId) : adminLogs;

  return (
    <DataContext.Provider
      value={{
        videos,
        donations,
        comments,
        verificationRequests,
        adminLogs,
        contributors,
        contributorRequests,
        getVideoById,
        getVideosByCreator,
        toggleVideoStatus,
        getDonationsByDonor,
        getDonationsByCreator,
        addDonation,
        getCommentsByDonation,
        addComment,
        addReply,
        getPendingVerifications,
        updateVerificationRequest,
        addContributor,
        getVideoContributors,
        createContributorRequest,
        getContributorRequestsByCreator,
        getContributorRequestsForUser,
        acceptContributorRequest,
        rejectContributorRequest,
        updateContributorRole,
        removeContributor,
        getContributionsForUser,
        addAdminLog,
        getAdminLogs,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
