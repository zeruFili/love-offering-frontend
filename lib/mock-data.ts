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

const COMMENT_AMOUNTS = [100, 150, 200, 250, 320, 450, 600, 800, 1000, 1200];

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

function buildSeedComments(): Comment[] {
  return MOCK_VIDEOS.flatMap((video, videoIndex) => {
    const donationId = `seed-don-${video.id}`;

    return Array.from({ length: 10 }, (_, commentIndex) => {
      const amount = COMMENT_AMOUNTS[(videoIndex + commentIndex) % COMMENT_AMOUNTS.length];
      const authorName = ETHIOPIAN_COMMENTERS[(videoIndex * 3 + commentIndex) % ETHIOPIAN_COMMENTERS.length];
      const text = COMMENT_TEXTS[(videoIndex + commentIndex) % COMMENT_TEXTS.length];

      return {
        id: `seed-com-${video.id}-${commentIndex + 1}`,
        donationId,
        videoId: video.id,
        authorId: `seed-author-${videoIndex + 1}-${commentIndex + 1}`,
        authorName,
        amount,
        text,
        timestamp: `${COMMENT_DATES[(videoIndex + commentIndex) % COMMENT_DATES.length]}T${String(10 + commentIndex).padStart(2, '0')}:00:00Z`,
        replies: [],
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
  MOCK_DONATIONS,
  MOCK_COMMENTS,
  MOCK_VERIFICATION_REQUESTS,
  MOCK_ADMIN_LOGS,
};