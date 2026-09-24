import { getYouTubeThumbnailUrl } from './utils';

export interface Video {
  id: string;
  title: string;
  creatorId: string;
  creatorName: string;
  creatorRole: string;
  youtubeUrl: string;
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
  amount: number;
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
    id: '686bef6b8ab08422e3475ed1',
    title: 'Engedaye',
    creatorId: '686becac8ab08422e3475ec7',
    creatorName: 'Eyerusalem',
    creatorRole: 'singer',
    youtubeUrl: 'https://youtu.be/XnT7vXxBcQE?si=2QcWbapIvpmaUSa8',
    thumbnail: getYouTubeThumbnailUrl('https://youtu.be/XnT7vXxBcQE?si=2QcWbapIvpmaUSa8'),
    duration: 'YouTube',
    status: 'NOT_AVAILABLE',
    uploadDate: '2025-07-07',
    description: 'YouTube ministry video.',
  },
  {
    id: '686bf06e8ab08422e3475ed6',
    title: 'እጣዬ',
    creatorId: '686becac8ab08422e3475ec7',
    creatorName: 'Agegnehu Yideg',
    creatorRole: 'singer',
    youtubeUrl: 'https://youtu.be/iOFGJPb-zks?si=ZT-bh_SrvWdkuuXj',
    thumbnail: getYouTubeThumbnailUrl('https://youtu.be/iOFGJPb-zks?si=ZT-bh_SrvWdkuuXj'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2025-07-07',
    description: 'እግዚአብሔር የርስት ድርሻዬና ጽዋዬ ነው፤ ዕጣዬም በእጅህ ናት።',
  },
  {
    id: '686c312673d8a04b9ce7ca06',
    title: 'ልመንህ?',
    creatorId: '686becac8ab08422e3475ec7',
    creatorName: 'Eyerusalem',
    creatorRole: 'singer',
    youtubeUrl: 'https://youtu.be/enPdjRxeGNk?si=AAD5UAflBmfSGF5m',
    thumbnail: getYouTubeThumbnailUrl('https://youtu.be/enPdjRxeGNk?si=AAD5UAflBmfSGF5m'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2025-07-07',
    description: 'YouTube ministry video.',
  },
  {
    id: '686c3b10494e30647ec1afb1',
    title: 'መልካም ነህ',
    creatorId: '686becac8ab08422e3475ec7',
    creatorName: 'Fenan',
    creatorRole: 'singer',
    youtubeUrl: 'https://youtu.be/lbHADJSPWGU?si=8BVKEEB_AwWWld5y',
    thumbnail: getYouTubeThumbnailUrl('https://youtu.be/lbHADJSPWGU?si=8BVKEEB_AwWWld5y'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2025-07-07',
    description: 'YouTube ministry video.',
  },
  {
    id: '686c97a7494e30647ec1afcf',
    title: 'የእግዚአብሔር መንገድ2',
    creatorId: '686becac8ab08422e3475ec7',
    creatorName: 'Phrophet Tilahun Tesgaye',
    creatorRole: 'preacher ',
    youtubeUrl: 'https://youtu.be/c_2Adht7v08?si=_aViqplKyihT4lL0',
    thumbnail: getYouTubeThumbnailUrl('https://youtu.be/c_2Adht7v08?si=_aViqplKyihT4lL0'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2025-07-08',
    description: 'YouTube ministry video.',
  },
  {
    id: '686d5a0978f844ec90120105',
    title: 'ሁሉን ያውቃል // ዕብራውያን ተከታታይ ትምህርት ክፍል 32',
    creatorId: '686d59a578f844ec901200ff',
    creatorName: 'Phrophet Zenebe Girma',
    creatorRole: 'preacher',
    youtubeUrl: 'https://youtu.be/_Yc_qdsbwtk?si=8Rpe4NJb1YpwKN1g',
    thumbnail: getYouTubeThumbnailUrl('https://youtu.be/_Yc_qdsbwtk?si=8Rpe4NJb1YpwKN1g'),
    duration: 'YouTube',
    status: 'NOT_AVAILABLE',
    uploadDate: '2025-07-08',
    description: 'YouTube ministry video.',
  },
  {
    id: '686d5a3478f844ec90120108',
    title: 'የጳውሎስ ሰንሰለት',
    creatorId: '686d59a578f844ec901200ff',
    creatorName: 'Phrophet Tilahun Tesgaye',
    creatorRole: 'preacher',
    youtubeUrl: 'https://youtu.be/J7jVTwbuesU?si=r1DdnmirjqBBS2bS',
    thumbnail: getYouTubeThumbnailUrl('https://youtu.be/J7jVTwbuesU?si=r1DdnmirjqBBS2bS'),
    duration: 'YouTube',
    status: 'NOT_AVAILABLE',
    uploadDate: '2025-07-08',
    description: 'YouTube ministry video.',
  },
  {
    id: '686d5a9878f844ec9012010f',
    title: 'ካቅማችን በላይ',
    creatorId: '686d5a7f78f844ec9012010b',
    creatorName: 'Phrophet Zenebe Girma',
    creatorRole: 'ministry',
    youtubeUrl: 'https://youtu.be/bBu4k9ybxVc?si=YZ3TAld_lGqcFnYG',
    thumbnail: getYouTubeThumbnailUrl('https://youtu.be/bBu4k9ybxVc?si=YZ3TAld_lGqcFnYG'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2025-07-08',
    description: 'YouTube ministry video.',
  },
  {
    id: '686d5aa978f844ec90120112',
    title: 'ትንቢታዊ መልዕክት',
    creatorId: '686d5a7f78f844ec9012010b',
    creatorName: 'Phrophet Zenebe Girma',
    creatorRole: 'ministry',
    youtubeUrl: 'https://youtu.be/9vppCuFWXcg?si=Fzq-dZDKuEQTJNEX',
    thumbnail: getYouTubeThumbnailUrl('https://youtu.be/9vppCuFWXcg?si=Fzq-dZDKuEQTJNEX'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2025-07-08',
    description: 'YouTube ministry video.',
  },
  {
    id: '686d5b9a78f844ec9012011b',
    title: 'LIBEN LAFESILH',
    creatorId: '686d5b5678f844ec90120115',
    creatorName: 'Phrophet Zenebe Girma',
    creatorRole: 'singer',
    youtubeUrl: 'https://youtu.be/0-dS5D0HMkw?si=RjmLk7bX-_vsJciR',
    thumbnail: getYouTubeThumbnailUrl('https://youtu.be/0-dS5D0HMkw?si=RjmLk7bX-_vsJciR'),
    duration: 'YouTube',
    status: 'NOT_AVAILABLE',
    uploadDate: '2025-07-08',
    description: 'YouTube ministry video.',
  },
  {
    id: '686d5ba778f844ec9012011e',
    title: 'Hallelujah | ሃሌሉያ',
    creatorId: '686d5b5678f844ec90120115',
    creatorName: 'Aster Abebe',
    creatorRole: 'singer',
    youtubeUrl: 'https://youtu.be/0AVT8Vp6Jxs?si=tcS3fllR6kko5qBD',
    thumbnail: getYouTubeThumbnailUrl('https://youtu.be/0AVT8Vp6Jxs?si=tcS3fllR6kko5qBD'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2025-07-08',
    description: 'YouTube ministry video.',
  },
  {
    id: '686d5c3578f844ec90120127',
    title: 'Efeligihalehu እፈልግሃለሁ',
    creatorId: '686d5bf478f844ec90120121',
    creatorName: 'Dawit Getachew',
    creatorRole: 'worship_group',
    youtubeUrl: 'https://youtu.be/V6SluCpm1PM?si=joHmohAUQAYGIfc-',
    thumbnail: getYouTubeThumbnailUrl('https://youtu.be/V6SluCpm1PM?si=joHmohAUQAYGIfc-'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2025-07-08',
    description: 'YouTube ministry video.',
  },
  {
    id: '686d5c3e78f844ec9012012a',
    title: 'At your Feet "በእግሮችህ ስር"',
    creatorId: '686d5bf478f844ec90120121',
    creatorName: 'Dawit Getachew',
    creatorRole: 'worship_group',
    youtubeUrl: 'https://youtu.be/YUePBV2puQg?si=76bBKNEuZv8F6A4V',
    thumbnail: getYouTubeThumbnailUrl('https://youtu.be/YUePBV2puQg?si=76bBKNEuZv8F6A4V'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2025-07-08',
    description: 'YouTube ministry video.',
  },
  {
    id: '686d94c271cae18f108f90de',
    title: '(ፍለጋ) Filega',
    creatorId: '686d935c71cae18f108f90d1',
    creatorName: 'Eyerusalem',
    creatorRole: 'singer',
    youtubeUrl: 'https://youtu.be/xFsYw8pLH30?si=HvnuJOu99UvAOtC3',
    thumbnail: getYouTubeThumbnailUrl('https://youtu.be/xFsYw8pLH30?si=HvnuJOu99UvAOtC3'),
    duration: 'YouTube',
    status: 'NOT_AVAILABLE',
    uploadDate: '2025-07-08',
    description: 'YouTube ministry video.',
  },
];

const DEMO_MUSIC_VIDEOS: Video[] = [
  {
    id: 'demo-video-ephrem-lesew',
    title: 'Lesew Alaweram (ለሰው አላወራም)',
    creatorId: '7',
    creatorName: 'Ephrem Alemu',
    creatorRole: 'singer',
    youtubeUrl: 'http://www.youtube.com/watch?v=S7TsZI0RQhc',
    thumbnail: getYouTubeThumbnailUrl('http://www.youtube.com/watch?v=S7TsZI0RQhc'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2026-09-22',
    description: 'Demo worship music video for contributor workflow testing.',
  },
  {
    id: 'demo-video-kalkidan-mirkuze',
    title: 'Mirkuze Shembeko (ምርኩዜ ሸንበቆ)',
    creatorId: '8',
    creatorName: 'Kalkidan Lilly Tilahun',
    creatorRole: 'singer',
    youtubeUrl: 'http://www.youtube.com/watch?v=rcC5YaQJZEo',
    thumbnail: getYouTubeThumbnailUrl('http://www.youtube.com/watch?v=rcC5YaQJZEo'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2026-09-22',
    description: 'Demo worship music video for contributor workflow testing.',
  },
  {
    id: 'demo-video-minase-ante',
    title: 'Ante Malet Lene (አንተ ማለት ለኔ)',
    creatorId: '9',
    creatorName: 'Minase Firdawek & Habtamu Taye',
    creatorRole: 'musician',
    youtubeUrl: 'http://www.youtube.com/watch?v=kkJI-z2OmwE',
    thumbnail: getYouTubeThumbnailUrl('http://www.youtube.com/watch?v=kkJI-z2OmwE'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2026-09-22',
    description: 'Demo collaboration video for contributor workflow testing.',
  },
  {
    id: 'demo-video-yosef-yihenen',
    title: 'Yihe Nen Yegebagn (ይሄ ነው የገባኝ)',
    creatorId: '10',
    creatorName: 'Yosef Kassa',
    creatorRole: 'singer',
    youtubeUrl: 'http://www.youtube.com/watch?v=XCgX48mpjJc',
    thumbnail: getYouTubeThumbnailUrl('http://www.youtube.com/watch?v=XCgX48mpjJc'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2026-09-22',
    description: 'Demo worship music video for contributor workflow testing.',
  },
  {
    id: 'demo-video-tesfaye-amlake',
    title: 'Amlake Bertatun (አምላኬ በርታቱን)',
    creatorId: '11',
    creatorName: 'Tesfaye Gabisso',
    creatorRole: 'singer',
    youtubeUrl: 'http://www.youtube.com/watch?v=zDmG-vk-yck',
    thumbnail: getYouTubeThumbnailUrl('http://www.youtube.com/watch?v=zDmG-vk-yck'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2026-09-22',
    description: 'Demo worship music video for contributor workflow testing.',
  },
  {
    id: 'demo-video-sofia-leyu',
    title: 'Leyu Neh (ልዩ ነህ)',
    creatorId: '12',
    creatorName: 'Sofia Shibabaw',
    creatorRole: 'singer',
    youtubeUrl: 'http://www.youtube.com/watch?v=a1BL0wAIgU8',
    thumbnail: getYouTubeThumbnailUrl('http://www.youtube.com/watch?v=a1BL0wAIgU8'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2026-09-22',
    description: 'Demo worship music video for contributor workflow testing.',
  },
  {
    id: 'demo-video-samuel-endegena',
    title: 'Endegena (እንደገና)',
    creatorId: '13',
    creatorName: 'Samuel Negussie',
    creatorRole: 'musician',
    youtubeUrl: 'http://www.youtube.com/watch?v=rZx7ApwnkyA',
    thumbnail: getYouTubeThumbnailUrl('http://www.youtube.com/watch?v=rZx7ApwnkyA'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2026-09-22',
    description: 'Demo worship music video for contributor workflow testing.',
  },
  {
    id: 'demo-video-bereket-yedesitaye',
    title: 'Yedesitaye Elilita (የደስታዬ እልልታ)',
    creatorId: '14',
    creatorName: 'Bereket Tesfaye',
    creatorRole: 'singer',
    youtubeUrl: 'http://www.youtube.com/watch?v=V7rK-0FW5s8',
    thumbnail: getYouTubeThumbnailUrl('http://www.youtube.com/watch?v=V7rK-0FW5s8'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2026-09-22',
    description: 'Demo worship music video for contributor workflow testing.',
  },
  {
    id: 'demo-video-azeb-kahine',
    title: 'Kahine (ካህኔ)',
    creatorId: '15',
    creatorName: 'Azeb Hailu',
    creatorRole: 'singer',
    youtubeUrl: 'http://www.youtube.com/watch?v=tFD85JleeXs',
    thumbnail: getYouTubeThumbnailUrl('http://www.youtube.com/watch?v=tFD85JleeXs'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2026-09-22',
    description: 'Demo worship music video for contributor workflow testing.',
  },
  {
    id: 'demo-video-fenan-medhanite',
    title: 'Medhanite (መድኃኒቴ)',
    creatorId: '16',
    creatorName: 'Fenan Befkadu',
    creatorRole: 'singer',
    youtubeUrl: 'http://www.youtube.com/watch?v=KFrJ042zIIk',
    thumbnail: getYouTubeThumbnailUrl('http://www.youtube.com/watch?v=KFrJ042zIIk'),
    duration: 'YouTube',
    status: 'AVAILABLE',
    uploadDate: '2026-09-22',
    description: 'Demo worship music video for contributor workflow testing.',
  },
];

const MOCK_CONTRIBUTORS: Contributor[] = [
  {
    id: 'demo-contributor-hallelujah-ephrem',
    creatorId: '5',
    userId: '7',
    videoId: '686d5ba778f844ec9012011e',
    userName: 'ephrem',
    displayName: 'Ephrem Alemu',
    profilePhoto: 'https://ui-avatars.com/api/?name=Ephrem+Alemu&background=e2f6f6&color=1b5e5e',
    role: 'Lead Vocalist',
    bankAccountLinked: true,
    acceptedAt: '2026-09-20T16:00:00Z',
  },
  {
    id: 'demo-contributor-hallelujah-samuel',
    creatorId: '5',
    userId: '13',
    videoId: '686d5ba778f844ec9012011e',
    userName: 'samuel',
    displayName: 'Samuel Negussie',
    profilePhoto: 'https://ui-avatars.com/api/?name=Samuel+Negussie&background=e2f6f6&color=1b5e5e',
    role: 'Keyboardist',
    bankAccountLinked: true,
    acceptedAt: '2026-09-20T17:30:00Z',
  },
  {
    id: 'demo-contributor-samuel',
    creatorId: '7',
    userId: '13',
    videoId: 'demo-video-ephrem-lesew',
    userName: 'samuel',
    displayName: 'Samuel Negussie',
    profilePhoto: 'https://ui-avatars.com/api/?name=Samuel+Negussie&background=e2f6f6&color=1b5e5e',
    role: 'Keyboardist',
    bankAccountLinked: true,
    acceptedAt: '2026-09-20T10:00:00Z',
  },
  {
    id: 'demo-contributor-yosef',
    creatorId: '8',
    userId: '10',
    videoId: 'demo-video-kalkidan-mirkuze',
    userName: 'yosef',
    displayName: 'Yosef Kassa',
    profilePhoto: 'https://ui-avatars.com/api/?name=Yosef+Kassa&background=e2f6f6&color=1b5e5e',
    role: 'Backing Vocalist',
    bankAccountLinked: true,
    acceptedAt: '2026-09-19T14:30:00Z',
  },
];

const MOCK_CONTRIBUTOR_REQUESTS: ContributorRequest[] = [
  {
    id: 'demo-request-inbox-hallelujah',
    creatorId: '686d5b5678f844ec90120115',
    creatorName: 'Aster Abebe',
    videoId: '686d5ba778f844ec9012011e',
    videoTitle: 'Hallelujah | ሃሌሉያ',
    contributorUserId: '5',
    contributorUsername: 'singer',
    contributorDisplayName: 'Aster Abebe',
    contributorProfilePhoto: 'https://ui-avatars.com/api/?name=Aster+Abebe&background=e2f6f6&color=1b5e5e',
    role: 'Lead Vocalist',
    status: 'pending',
    createdAt: '2026-09-22T09:00:00Z',
  },
  {
    id: 'demo-request-inbox-efeligihalehu',
    creatorId: '686d5bf478f844ec90120121',
    creatorName: 'Dawit Getachew',
    videoId: '686d5c3578f844ec90120127',
    videoTitle: 'Efeligihalehu እፈልግሃለሁ',
    contributorUserId: '5',
    contributorUsername: 'singer',
    contributorDisplayName: 'Aster Abebe',
    contributorProfilePhoto: 'https://ui-avatars.com/api/?name=Aster+Abebe&background=e2f6f6&color=1b5e5e',
    role: 'Backing Vocalist',
    status: 'pending',
    createdAt: '2026-09-22T09:30:00Z',
  },
  {
    id: 'demo-request-inbox-at-your-feet',
    creatorId: '686d5bf478f844ec90120121',
    creatorName: 'Dawit Getachew',
    videoId: '686d5c3e78f844ec9012012a',
    videoTitle: 'At your Feet "በእግሮችህ ስር"',
    contributorUserId: '5',
    contributorUsername: 'singer',
    contributorDisplayName: 'Aster Abebe',
    contributorProfilePhoto: 'https://ui-avatars.com/api/?name=Aster+Abebe&background=e2f6f6&color=1b5e5e',
    role: 'Worship Leader',
    status: 'pending',
    createdAt: '2026-09-22T10:00:00Z',
  },
  {
    id: 'demo-request-inbox-lesew',
    creatorId: '7',
    creatorName: 'Ephrem Alemu',
    videoId: 'demo-video-ephrem-lesew',
    videoTitle: 'Lesew Alaweram (ለሰው አላወራም)',
    contributorUserId: '5',
    contributorUsername: 'singer',
    contributorDisplayName: 'Aster Abebe',
    contributorProfilePhoto: 'https://ui-avatars.com/api/?name=Aster+Abebe&background=e2f6f6&color=1b5e5e',
    role: 'Guest Vocalist',
    status: 'pending',
    createdAt: '2026-09-22T10:30:00Z',
  },
  {
    id: 'demo-request-inbox-preaching',
    creatorId: '686d59a578f844ec901200ff',
    creatorName: 'Phrophet Zenebe Girma',
    videoId: '686d5a0978f844ec90120105',
    videoTitle: 'ሁሉን ያውቃል // ዕብራያን ተከታታይ ትምህርት ክፍል 32',
    contributorUserId: '5',
    contributorUsername: 'singer',
    contributorDisplayName: 'Aster Abebe',
    contributorProfilePhoto: 'https://ui-avatars.com/api/?name=Aster+Abebe&background=e2f6f6&color=1b5e5e',
    role: 'Guest Worship Leader',
    status: 'pending',
    createdAt: '2026-09-22T11:00:00Z',
  },
  {
    id: 'demo-request-hallelujah-minase',
    creatorId: '5',
    creatorName: 'Aster Abebe',
    videoId: '686d5ba778f844ec9012011e',
    videoTitle: 'Hallelujah | ሃሌሉያ',
    contributorUserId: '9',
    contributorUsername: 'minase',
    contributorDisplayName: 'Minase Firdawek',
    contributorProfilePhoto: 'https://ui-avatars.com/api/?name=Minase+Firdawek&background=e2f6f6&color=1b5e5e',
    role: 'Lead Guitarist',
    status: 'pending',
    createdAt: '2026-09-21T13:15:00Z',
  },
  {
    id: 'demo-request-hallelujah-kalkidan',
    creatorId: '5',
    creatorName: 'Aster Abebe',
    videoId: '686d5ba778f844ec9012011e',
    videoTitle: 'Hallelujah | ሃሌሉያ',
    contributorUserId: '8',
    contributorUsername: 'kalkidan',
    contributorDisplayName: 'Kalkidan Lilly Tilahun',
    contributorProfilePhoto: 'https://ui-avatars.com/api/?name=Kalkidan+Lilly+Tilahun&background=e2f6f6&color=1b5e5e',
    role: 'Backing Vocalist',
    status: 'pending',
    createdAt: '2026-09-21T14:00:00Z',
  },
  {
    id: 'demo-request-kalkidan',
    creatorId: '7',
    creatorName: 'Ephrem Alemu',
    videoId: 'demo-video-ephrem-lesew',
    videoTitle: 'Lesew Alaweram (ለሰው አላወራም)',
    contributorUserId: '8',
    contributorUsername: 'kalkidan',
    contributorDisplayName: 'Kalkidan Lilly Tilahun',
    contributorProfilePhoto: 'https://ui-avatars.com/api/?name=Kalkidan+Lilly+Tilahun&background=e2f6f6&color=1b5e5e',
    role: 'Guest Vocalist',
    status: 'pending',
    createdAt: '2026-09-21T09:15:00Z',
  },
  {
    id: 'demo-request-minase',
    creatorId: '7',
    creatorName: 'Ephrem Alemu',
    videoId: 'demo-video-ephrem-lesew',
    videoTitle: 'Lesew Alaweram (ለሰው አላወራም)',
    contributorUserId: '9',
    contributorUsername: 'minase',
    contributorDisplayName: 'Minase Firdawek',
    contributorProfilePhoto: 'https://ui-avatars.com/api/?name=Minase+Firdawek&background=e2f6f6&color=1b5e5e',
    role: 'Lead Guitarist',
    status: 'pending',
    createdAt: '2026-09-21T11:45:00Z',
  },
  {
    id: 'demo-request-yosef-accepted',
    creatorId: '8',
    creatorName: 'Kalkidan Lilly Tilahun',
    videoId: 'demo-video-kalkidan-mirkuze',
    videoTitle: 'Mirkuze Shembeko (ምርኩዜ ሸንበቆ)',
    contributorUserId: '10',
    contributorUsername: 'yosef',
    contributorDisplayName: 'Yosef Kassa',
    contributorProfilePhoto: 'https://ui-avatars.com/api/?name=Yosef+Kassa&background=e2f6f6&color=1b5e5e',
    role: 'Backing Vocalist',
    status: 'accepted',
    createdAt: '2026-09-18T08:00:00Z',
    updatedAt: '2026-09-19T14:30:00Z',
  },
];

const MOCK_DONATIONS: Donation[] = [
  {
    id: 'don-1',
    donorId: '6',
    donorName: 'Regular Donor',
    videoId: '686c97a7494e30647ec1afcf',
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
    videoId: '686d5a0978f844ec90120105',
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
    videoId: '686d5a3478f844ec90120108',
    amount: 150,
    recipients: { '2': 100, '4': 50 },
    comment: 'Supporting both the church and the amazing sermon.',
    timestamp: '2024-04-03T18:45:00',
    status: 'completed',
  },
];

const ETHIOPIAN_COMMENTERS = [
  'Amanuel Tesfaye',
  'Marta Bekele',
  'Dawit Tadesse',
  'Hanna Girma',
  'Yohannes Assefa',
  'Selamawit Kassa',
  'Brook Habte',
  'Tsion Lemma',
  'Kalkidan Alemu',
  'Rahel Desta',
  'Elias Mekonnen',
  'Meskerem Getachew',
  'Nataniel Fikru',
  'Hirut Ayele',
  'Yafet Solomon',
  'Liya Wondimu',
  'Aster Mulugeta',
  'Kaleb Yohannes',
  'Mekdes Birhanu',
  'Saron Gebremariam',
];

const COMMENT_TEXTS = [
  'This message touched my heart and encouraged me today.',
  'The worship lifted my spirit in a powerful way.',
  'Thank you for sharing this blessing with everyone.',
  'A beautiful ministry moment with deep meaning.',
  'I felt peace and joy while listening to this video.',
  'This was a strong and timely encouragement for me.',
  'Your message is a blessing to many families.',
  'The song and message were both inspiring and sincere.',
  'I am grateful for this Spirit-filled content.',
  'Keep going. This kind of ministry helps people deeply.',
];

const COMMENT_DATES = ['2025-07-07', '2025-07-08', '2025-07-09'];

function getCommentAmount(videoIndex: number, commentIndex: number): number {
  return 100 + ((videoIndex * 111 + commentIndex * 73) % 1101);
}

function buildSeedComments(): Comment[] {
  return MOCK_VIDEOS.flatMap((video, videoIndex) => {
    const donationId = `seed-don-${video.id}`;

    return Array.from({ length: 10 }, (_, commentIndex) => {
      const amount = getCommentAmount(videoIndex, commentIndex);
      const authorName = ETHIOPIAN_COMMENTERS[(videoIndex * 3 + commentIndex) % ETHIOPIAN_COMMENTERS.length];
      const text = COMMENT_TEXTS[(videoIndex + commentIndex) % COMMENT_TEXTS.length];
      const hasReply = commentIndex < 4;

      return {
        id: `seed-com-${video.id}-${commentIndex + 1}`,
        donationId,
        videoId: video.id,
        authorId: `seed-author-${videoIndex + 1}-${commentIndex + 1}`,
        authorName,
        amount,
        text,
        timestamp: `${COMMENT_DATES[(videoIndex + commentIndex) % COMMENT_DATES.length]}T${String(10 + commentIndex).padStart(2, '0')}:00:00Z`,
        replies: hasReply
          ? [
              {
                id: `seed-reply-${video.id}-${commentIndex + 1}`,
                authorId: video.creatorId,
                authorName: video.creatorName,
                text: 'Thank you for the support and encouraging words. This encouragement means a lot to our ministry.',
                timestamp: `${COMMENT_DATES[(videoIndex + commentIndex) % COMMENT_DATES.length]}T${String(12 + commentIndex).padStart(2, '0')}:30:00Z`,
              },
            ]
          : [],
      };
    });
  });
}

const MOCK_COMMENTS: Comment[] = buildSeedComments();

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
  DEMO_MUSIC_VIDEOS,
  MOCK_CONTRIBUTORS,
  MOCK_CONTRIBUTOR_REQUESTS,
  MOCK_DONATIONS,
  MOCK_COMMENTS,
  MOCK_VERIFICATION_REQUESTS,
  MOCK_ADMIN_LOGS,
};