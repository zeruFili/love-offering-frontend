export interface Video {
  id: string;
  title: string;
  creatorId: string;
  creatorName: string;
  creatorRole: string;
  thumbnail: string;
  duration: string;
  status: 'AVAILABLE' | 'NOT_AVAILABLE';
  uploadDate: string;
  description: string;
}

export interface Donation {
  id: string;
  donorId: string;
  donorName: string;
  videoId: string;
  amount: number;
  recipients: Record<string, number>;
  comment: string;
  timestamp: string;
  status: 'completed' | 'pending';
}

export interface Comment {
  id: string;
  donationId: string;
  videoId?: string;
  authorId: string;
  authorName: string;
  text: string;
  timestamp: string;
  replies: Reply[];
}

export interface Reply {
  id: string;
  authorId: string;
  authorName: string;
  text: string;
  timestamp: string;
}

export interface Contributor {
  id: string;
  creatorId?: string;
  userId: string;
  videoId: string;
  userName: string;
  displayName: string;
  profilePhoto?: string;
  role: string;
  bankAccountLinked: boolean;
  acceptedAt?: string;
}

export interface ContributorRequest {
  id: string;
  creatorId: string;
  creatorName: string;
  videoId: string;
  videoTitle: string;
  contributorUserId: string;
  contributorUsername: string;
  contributorDisplayName: string;
  contributorProfilePhoto?: string;
  role: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt?: string;
  note?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  userName: string;
  selectedRole: string;
  documentUrl: string;
  submissionDate: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  rejectionReason?: string;
}

export interface AdminActionLog {
  id: string;
  adminId: string;
  action: string;
  targetUserId?: string;
  targetVideoId?: string;
  details: Record<string, any>;
  timestamp: string;
}

const MOCK_VIDEOS: Video[] = [
  {
    id: 'vid-1',
    title: 'ናብይደ (ወሓሳዋት) - Zenebe Girma',
    creatorId: '5',
    creatorName: 'Zenebe Girma',
    creatorRole: 'singer',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop',
    duration: '4:32',
    status: 'AVAILABLE',
    uploadDate: '2024-04-01',
    description: 'Inspiring worship song celebrating faith and spiritual growth.',
  },
  {
    id: 'vid-2',
    title: 'Hallelujah | ሃለልዩያ - ASTER ABEBE',
    creatorId: '5',
    creatorName: 'ASTER ABEBE',
    creatorRole: 'singer',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    duration: '5:15',
    status: 'AVAILABLE',
    uploadDate: '2024-04-02',
    description: 'A powerful rendition of the classic hymn Hallelujah.',
  },
  {
    id: 'vid-3',
    title: 'በእናንተ ፈር ሙሩ - Gospel Message',
    creatorId: '4',
    creatorName: 'Rev. John Mensah',
    creatorRole: 'preacher',
    thumbnail: 'https://images.unsplash.com/photo-1514633134272-532bfa6b3d62?w=400&h=300&fit=crop',
    duration: '22:45',
    status: 'AVAILABLE',
    uploadDate: '2024-03-30',
    description: 'A powerful sermon on faith and transformation.',
  },
  {
    id: 'vid-4',
    title: 'Sunday Service - Grace Community Church',
    creatorId: '2',
    creatorName: 'Grace Community Church',
    creatorRole: 'church',
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=300&fit=crop',
    duration: '1:15:30',
    status: 'AVAILABLE',
    uploadDate: '2024-04-03',
    description: 'Complete Sunday worship service with sermon and music.',
  },
  {
    id: 'vid-5',
    title: 'Worship Night - Hope Ministry',
    creatorId: '3',
    creatorName: 'Hope Ministry International',
    creatorRole: 'ministry',
    thumbnail: 'https://images.unsplash.com/photo-1478737270454-541f25b4b3ff?w=400&h=300&fit=crop',
    duration: '1:45:00',
    status: 'AVAILABLE',
    uploadDate: '2024-04-04',
    description: 'Night of worship and prayer with international ministry leaders.',
  },
  {
    id: 'vid-6',
    title: 'Sunday Revival Service - New Life Church',
    creatorId: '2',
    creatorName: 'New Life Church',
    creatorRole: 'church',
    thumbnail: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&h=300&fit=crop',
    duration: '58:20',
    status: 'AVAILABLE',
    uploadDate: '2024-04-05',
    description: 'Sunday revival service with worship and prayer.',
  },
  {
    id: 'vid-7',
    title: 'Youth Night Worship Session',
    creatorId: '5',
    creatorName: 'Aster Abebe',
    creatorRole: 'singer',
    thumbnail: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=400&h=300&fit=crop',
    duration: '6:10',
    status: 'AVAILABLE',
    uploadDate: '2024-04-05',
    description: 'High-energy worship set from youth night.',
  },
  {
    id: 'vid-8',
    title: 'Leadership Vision 2024',
    creatorId: '1',
    creatorName: 'Admin Team',
    creatorRole: 'admin',
    thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300&fit=crop',
    duration: '14:25',
    status: 'AVAILABLE',
    uploadDate: '2024-04-05',
    description: 'Platform vision and leadership direction for creators.',
  },
  {
    id: 'vid-9',
    title: 'Faith for Difficult Seasons',
    creatorId: '4',
    creatorName: 'Rev. John Mensah',
    creatorRole: 'preacher',
    thumbnail: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&h=300&fit=crop',
    duration: '31:40',
    status: 'AVAILABLE',
    uploadDate: '2024-04-06',
    description: 'A sermon about endurance and hope in hard times.',
  },
  {
    id: 'vid-10',
    title: 'Prayer and Healing Night',
    creatorId: '3',
    creatorName: 'Hope Ministry International',
    creatorRole: 'ministry',
    thumbnail: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=300&fit=crop',
    duration: '1:08:55',
    status: 'AVAILABLE',
    uploadDate: '2024-04-06',
    description: 'Live ministry session focused on prayer and healing.',
  },
  {
    id: 'vid-11',
    title: 'Morning Worship Service',
    creatorId: '2',
    creatorName: 'Grace Community Church',
    creatorRole: 'church',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    duration: '49:12',
    status: 'AVAILABLE',
    uploadDate: '2024-04-06',
    description: 'Church worship service with scripture reading and prayer.',
  },
  {
    id: 'vid-12',
    title: 'Acoustic Praise Session',
    creatorId: '5',
    creatorName: 'Zenebe Girma',
    creatorRole: 'singer',
    thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop',
    duration: '7:42',
    status: 'AVAILABLE',
    uploadDate: '2024-04-07',
    description: 'Acoustic praise with a reflective worship atmosphere.',
  },
  {
    id: 'vid-13',
    title: 'Community Impact Update',
    creatorId: '1',
    creatorName: 'Admin Team',
    creatorRole: 'admin',
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop',
    duration: '10:05',
    status: 'AVAILABLE',
    uploadDate: '2024-04-07',
    description: 'Administrative update on transparency and outreach impact.',
  },
  {
    id: 'vid-14',
    title: 'Walking in Wisdom',
    creatorId: '4',
    creatorName: 'Rev. John Mensah',
    creatorRole: 'preacher',
    thumbnail: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=400&h=300&fit=crop',
    duration: '27:33',
    status: 'AVAILABLE',
    uploadDate: '2024-04-07',
    description: 'Practical teaching on living wisely with faith.',
  },
  {
    id: 'vid-15',
    title: 'Night of Intercession',
    creatorId: '3',
    creatorName: 'Hope Ministry International',
    creatorRole: 'ministry',
    thumbnail: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop',
    duration: '1:20:11',
    status: 'AVAILABLE',
    uploadDate: '2024-04-08',
    description: 'Corporate prayer and intercession for communities.',
  },
  {
    id: 'vid-16',
    title: 'Church Testimony Sunday',
    creatorId: '2',
    creatorName: 'Grace Community Church',
    creatorRole: 'church',
    thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop',
    duration: '43:26',
    status: 'AVAILABLE',
    uploadDate: '2024-04-08',
    description: 'Members share testimony and thanksgiving reports.',
  },
  {
    id: 'vid-17',
    title: 'Live Gospel Concert',
    creatorId: '5',
    creatorName: 'Aster Abebe',
    creatorRole: 'singer',
    thumbnail: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=300&fit=crop',
    duration: '12:18',
    status: 'AVAILABLE',
    uploadDate: '2024-04-08',
    description: 'Live concert featuring gospel classics and originals.',
  },
  {
    id: 'vid-18',
    title: 'Monthly Operations Brief',
    creatorId: '1',
    creatorName: 'Admin Team',
    creatorRole: 'admin',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    duration: '11:02',
    status: 'AVAILABLE',
    uploadDate: '2024-04-09',
    description: 'Operational briefing for creator onboarding and support.',
  },
  {
    id: 'vid-19',
    title: 'Hope Beyond Fear',
    creatorId: '4',
    creatorName: 'Rev. John Mensah',
    creatorRole: 'preacher',
    thumbnail: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&h=300&fit=crop',
    duration: '29:58',
    status: 'AVAILABLE',
    uploadDate: '2024-04-09',
    description: 'Sermon encouraging believers to overcome fear.',
  },
  {
    id: 'vid-20',
    title: 'Ministry Q and A Session',
    creatorId: '3',
    creatorName: 'Hope Ministry International',
    creatorRole: 'ministry',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop',
    duration: '52:47',
    status: 'AVAILABLE',
    uploadDate: '2024-04-09',
    description: 'Interactive session answering ministry questions.',
  },
  {
    id: 'vid-21',
    title: 'Evening Service Highlights',
    creatorId: '2',
    creatorName: 'New Life Church',
    creatorRole: 'church',
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=300&fit=crop',
    duration: '36:29',
    status: 'AVAILABLE',
    uploadDate: '2024-04-10',
    description: 'Highlights from evening service and worship.',
  },
  {
    id: 'vid-22',
    title: 'Psalm Medley',
    creatorId: '5',
    creatorName: 'Zenebe Girma',
    creatorRole: 'singer',
    thumbnail: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=300&fit=crop',
    duration: '8:01',
    status: 'AVAILABLE',
    uploadDate: '2024-04-10',
    description: 'A medley of psalms arranged for congregational worship.',
  },
  {
    id: 'vid-23',
    title: 'Creator Policy Update',
    creatorId: '1',
    creatorName: 'Admin Team',
    creatorRole: 'admin',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    duration: '9:36',
    status: 'AVAILABLE',
    uploadDate: '2024-04-10',
    description: 'New guidelines for creator content and payouts.',
  },
  {
    id: 'vid-24',
    title: 'Grace and Truth Teaching',
    creatorId: '4',
    creatorName: 'Rev. John Mensah',
    creatorRole: 'preacher',
    thumbnail: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=400&h=300&fit=crop',
    duration: '33:12',
    status: 'AVAILABLE',
    uploadDate: '2024-04-11',
    description: 'Deep teaching on balancing grace and truth.',
  },
  {
    id: 'vid-25',
    title: 'Healing and Deliverance Service',
    creatorId: '3',
    creatorName: 'Hope Ministry International',
    creatorRole: 'ministry',
    thumbnail: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=300&fit=crop',
    duration: '1:03:44',
    status: 'AVAILABLE',
    uploadDate: '2024-04-11',
    description: 'Special service focused on healing and deliverance.',
  },
  {
    id: 'vid-26',
    title: 'Family Blessing Service',
    creatorId: '2',
    creatorName: 'Grace Community Church',
    creatorRole: 'church',
    thumbnail: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=300&fit=crop',
    duration: '46:35',
    status: 'AVAILABLE',
    uploadDate: '2024-04-11',
    description: 'Family-focused worship and pastoral encouragement.',
  },
  {
    id: 'vid-27',
    title: 'Worship and Prayer Acoustic Live',
    creatorId: '5',
    creatorName: 'Aster Abebe',
    creatorRole: 'singer',
    thumbnail: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=300&fit=crop',
    duration: '9:20',
    status: 'AVAILABLE',
    uploadDate: '2024-04-12',
    description: 'Acoustic live set with prayer moments between songs.',
  },
  {
    id: 'vid-28',
    title: 'Transparency and Reports Overview',
    creatorId: '1',
    creatorName: 'Admin Team',
    creatorRole: 'admin',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    duration: '12:54',
    status: 'AVAILABLE',
    uploadDate: '2024-04-12',
    description: 'Administrative transparency dashboard overview.',
  },
  {
    id: 'vid-29',
    title: 'Prayer that Changes Things',
    creatorId: '4',
    creatorName: 'Rev. John Mensah',
    creatorRole: 'preacher',
    thumbnail: 'https://images.unsplash.com/photo-1529078155058-5d716f45d604?w=400&h=300&fit=crop',
    duration: '25:49',
    status: 'AVAILABLE',
    uploadDate: '2024-04-12',
    description: 'Teaching on persistent prayer and faith.',
  },
  {
    id: 'vid-30',
    title: 'Discipleship Workshop Session',
    creatorId: '3',
    creatorName: 'Hope Ministry International',
    creatorRole: 'ministry',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    duration: '54:09',
    status: 'AVAILABLE',
    uploadDate: '2024-04-13',
    description: 'Workshop on discipleship and small group growth.',
  },
  {
    id: 'vid-31',
    title: 'Midweek Bible Service',
    creatorId: '2',
    creatorName: 'New Life Church',
    creatorRole: 'church',
    thumbnail: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=400&h=300&fit=crop',
    duration: '41:18',
    status: 'AVAILABLE',
    uploadDate: '2024-04-13',
    description: 'Midweek bible study and worship gathering.',
  },
  {
    id: 'vid-32',
    title: 'Praise Break Live',
    creatorId: '5',
    creatorName: 'Zenebe Girma',
    creatorRole: 'singer',
    thumbnail: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=300&fit=crop',
    duration: '5:58',
    status: 'AVAILABLE',
    uploadDate: '2024-04-13',
    description: 'Short praise break for encouragement and joy.',
  },
  {
    id: 'vid-33',
    title: 'Platform Safety and Trust',
    creatorId: '1',
    creatorName: 'Admin Team',
    creatorRole: 'admin',
    thumbnail: 'https://images.unsplash.com/photo-1521790797524-b2497295b8a0?w=400&h=300&fit=crop',
    duration: '13:07',
    status: 'AVAILABLE',
    uploadDate: '2024-04-14',
    description: 'Safety practices and trust measures for all users.',
  },
  {
    id: 'vid-34',
    title: 'The Heart of Generosity',
    creatorId: '4',
    creatorName: 'Rev. John Mensah',
    creatorRole: 'preacher',
    thumbnail: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop',
    duration: '30:23',
    status: 'AVAILABLE',
    uploadDate: '2024-04-14',
    description: 'Sermon on biblical generosity and cheerful giving.',
  },
  {
    id: 'vid-35',
    title: 'Global Prayer Gathering',
    creatorId: '3',
    creatorName: 'Hope Ministry International',
    creatorRole: 'ministry',
    thumbnail: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=400&h=300&fit=crop',
    duration: '1:11:40',
    status: 'AVAILABLE',
    uploadDate: '2024-04-14',
    description: 'Global online prayer gathering with ministry leaders.',
  },
];

const MOCK_DONATIONS: Donation[] = [
  {
    id: 'don-1',
    donorId: '6',
    donorName: 'Regular Donor',
    videoId: 'vid-1',
    amount: 50,
    recipients: { '5': 50 },
    comment: 'Amazing performance! Blessed by this song.',
    timestamp: '2024-04-05T10:30:00',
    status: 'completed',
  },
  {
    id: 'don-2',
    donorId: '6',
    donorName: 'Regular Donor',
    videoId: 'vid-3',
    amount: 100,
    recipients: { '4': 100 },
    comment: 'This sermon transformed my perspective on faith.',
    timestamp: '2024-04-04T14:20:00',
    status: 'completed',
  },
  {
    id: 'don-3',
    donorId: '6',
    donorName: 'Regular Donor',
    videoId: 'vid-4',
    amount: 150,
    recipients: { '2': 100, '4': 50 },
    comment: 'Supporting both the church and the amazing sermon.',
    timestamp: '2024-04-03T18:45:00',
    status: 'completed',
  },
];

const MOCK_COMMENTS: Comment[] = [
  {
    id: 'com-1',
    donationId: 'don-1',
    videoId: 'vid-1',
    authorId: '5',
    authorName: 'Zenebe Girma',
    text: 'Thank you so much for supporting this ministry!',
    timestamp: '2024-04-05T11:00:00',
    replies: [
      {
        id: 'reply-1',
        authorId: '6',
        authorName: 'Regular Donor',
        text: 'You are so welcome! Keep blessing us with your music.',
        timestamp: '2024-04-05T11:30:00',
      },
    ],
  },
  {
    id: 'com-3',
    donationId: 'don-1',
    videoId: 'vid-1',
    authorId: '7',
    authorName: 'Marta Tesfaye',
    text: 'This worship moment was powerful. Thank you for sharing it.',
    timestamp: '2024-04-05T11:45:00',
    replies: [],
  },
  {
    id: 'com-2',
    donationId: 'don-2',
    videoId: 'vid-3',
    authorId: '4',
    authorName: 'Rev. John Mensah',
    text: 'I am grateful for your generous support. God bless you!',
    timestamp: '2024-04-04T15:00:00',
    replies: [],
  },
  {
    id: 'com-4',
    donationId: 'don-2',
    videoId: 'vid-3',
    authorId: '8',
    authorName: 'Elias Bekele',
    text: 'This sermon helped me a lot today. Great work.',
    timestamp: '2024-04-04T15:20:00',
    replies: [
      {
        id: 'reply-2',
        authorId: '4',
        authorName: 'Rev. John Mensah',
        text: 'Praise God. I am glad it spoke to you.',
        timestamp: '2024-04-04T15:35:00',
      },
    ],
  },
  {
    id: 'com-5',
    donationId: 'don-3',
    videoId: 'vid-4',
    authorId: '9',
    authorName: 'Selamawit A.',
    text: 'Beautiful service. The message was very encouraging.',
    timestamp: '2024-04-03T19:05:00',
    replies: [],
  },
  {
    id: 'com-6',
    donationId: 'don-3',
    videoId: 'vid-4',
    authorId: '10',
    authorName: 'Daniel K.',
    text: 'The worship was uplifting from start to finish.',
    timestamp: '2024-04-03T19:20:00',
    replies: [],
  },
];

const MOCK_VERIFICATION_REQUESTS: VerificationRequest[] = [
  {
    id: 'ver-1',
    userId: 'user-new-1',
    userName: 'newpreacher@example.com',
    selectedRole: 'preacher',
    documentUrl: '/docs/pending-cert.pdf',
    submissionDate: '2024-04-03',
    status: 'pending',
  },
  {
    id: 'ver-2',
    userId: 'user-new-2',
    userName: 'newchoir@example.com',
    selectedRole: 'worship_group',
    documentUrl: '/docs/pending-choir.pdf',
    submissionDate: '2024-04-02',
    status: 'under_review',
  },
];

const MOCK_ADMIN_LOGS: AdminActionLog[] = [];

export {
  MOCK_VIDEOS,
  MOCK_DONATIONS,
  MOCK_COMMENTS,
  MOCK_VERIFICATION_REQUESTS,
  MOCK_ADMIN_LOGS,
};