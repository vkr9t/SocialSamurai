import type {
  SocialAccount,
  Opportunity,
  ScheduledPost,
  InboxItem,
  AIPreferenceRule,
  UserSubscription,
  UserUsageLimits,
  NotificationItem,
} from '../types';

export const INITIAL_ACCOUNTS: SocialAccount[] = [
  {
    id: 'acc_x_1',
    platform: 'x',
    handle: '@vikrant_builds',
    name: 'Vikrant Kumar',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    connected: true,
    connectedAt: '2026-08-10T10:00:00Z',
    scopes: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
    capabilities: {
      read: true,
      search: true,
      post: true,
      reply: true,
    },
    lastSynced: '2 mins ago',
  },
  {
    id: 'acc_reddit_1',
    platform: 'reddit',
    handle: 'u/vikrant_dev',
    name: 'Vikrant Kumar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    connected: true,
    connectedAt: '2026-08-12T14:30:00Z',
    scopes: ['identity', 'submit', 'read'],
    capabilities: {
      read: true,
      search: true,
      post: true,
      reply: true,
    },
    lastSynced: '5 mins ago',
  },
  {
    id: 'acc_linkedin_1',
    platform: 'linkedin',
    handle: 'vikrant-kumar-ai',
    name: 'Vikrant Kumar',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    connected: false,
    scopes: ['w_member_social', 'r_liteprofile'],
    capabilities: {
      read: false,
      search: false,
      post: true,
      reply: false,
    },
  },
];

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp_1',
    platform: 'x',
    authorHandle: '@tech_founder_jack',
    authorName: 'Jack Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    postContent:
      "I've been trying to figure out how early stage AI startups are automating their social keyword tracking without violating platform limits. Anyone doing this cleanly?",
    matchedTopic: 'AI Startups',
    relevanceScore: 96,
    intentTag: 'High Intent',
    aiReasoning:
      'Strong match for AI/SaaS interest. High-intent founder actively looking for automated social listening & API solutions.',
    engagement: {
      likes: 42,
      replies: 19,
      reposts: 8,
    },
    postedAge: '14m ago',
  },
  {
    id: 'opp_2',
    platform: 'reddit',
    authorHandle: 'u/saas_dev_99',
    authorName: 'Alex Thorne',
    authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    postContent:
      "What's the single best way to get your first 100 paying SaaS users in 2026? Organic social outreach vs paid ads vs cold email?",
    matchedTopic: 'SaaS Growth',
    relevanceScore: 94,
    intentTag: 'Founder Question',
    aiReasoning:
      'Direct target user inquiry in r/SaaS. High engagement opportunity to share authentic value about AI-curated organic engagement.',
    engagement: {
      likes: 128,
      replies: 54,
    },
    postedAge: '32m ago',
  },
  {
    id: 'opp_3',
    platform: 'x',
    authorHandle: '@sarah_vibe_codes',
    authorName: 'Sarah Jenkins',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    postContent:
      'Vibe coding apps with AI agents has completely changed my development velocity. Shipped 3 React + Vite micro-SaaS tools in 48 hours!',
    matchedTopic: 'Vibe Coding',
    relevanceScore: 91,
    intentTag: 'Product Launch',
    aiReasoning:
      'Trending conversation around vibe coding & agentic development. Great spot to showcase SocialSamurai command center capabilities.',
    engagement: {
      likes: 310,
      replies: 87,
      reposts: 45,
    },
    postedAge: '1h ago',
  },
  {
    id: 'opp_4',
    platform: 'linkedin',
    authorHandle: 'marcus-chen-cto',
    authorName: 'Marcus Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
    postContent:
      'Why automated social bots fail: They spam generic comments instead of identifying context. AI co-pilots that put human approval first will win the next decade.',
    matchedTopic: 'AI Command Center',
    relevanceScore: 89,
    intentTag: 'Technical',
    aiReasoning:
      'Thought-leadership post directly reinforcing SocialSamurai’s core philosophy: Human Approval > Unattended Bot Spam.',
    engagement: {
      likes: 540,
      replies: 112,
    },
    postedAge: '2h ago',
  },
  {
    id: 'opp_5',
    platform: 'x',
    authorHandle: '@buildspace_alumni',
    authorName: 'Dave Miller',
    authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
    postContent:
      'Looking for beta testers for a new social listening dashboard. DM me if you run a tech account with >1k followers.',
    matchedTopic: 'App Development',
    relevanceScore: 86,
    intentTag: 'High Intent',
    aiReasoning:
      'Relevant community peer searching for tech creators and tools in your niche.',
    engagement: {
      likes: 24,
      replies: 15,
      reposts: 3,
    },
    postedAge: '3h ago',
  },
  {
    id: 'opp_6',
    platform: 'reddit',
    authorHandle: 'u/fullstack_samurai',
    authorName: 'Kenji Sato',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
    postContent:
      'Built a custom canvas arcade mini-game into my Web App for user retention. Bounce rate dropped by 65%. Gamification works when done right.',
    matchedTopic: 'Gamification',
    relevanceScore: 84,
    intentTag: 'Technical',
    aiReasoning:
      'Matches arcade mini-game engagement research. High affinity for developer feedback.',
    engagement: {
      likes: 95,
      replies: 28,
    },
    postedAge: '4h ago',
  },
  {
    id: 'opp_7',
    platform: 'x',
    authorHandle: '@growth_hacker_z',
    authorName: 'Zoe Brooks',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    postContent:
      'What are your top 3 daily social workflow tools? Mine: Raycast, SocialSamurai, and Claude 3.6.',
    matchedTopic: 'SaaS',
    relevanceScore: 98,
    intentTag: 'Product Launch',
    aiReasoning:
      'Direct brand reference / viral opportunity on X! High priority for immediate response.',
    engagement: {
      likes: 180,
      replies: 42,
      reposts: 19,
    },
    postedAge: '5h ago',
  },
];

export const INITIAL_SCHEDULED: ScheduledPost[] = [
  {
    id: 'sch_1',
    platform: 'x',
    content:
      '⚔️ Discipline finds what matters. 90% of social media noise is distraction. The remaining 10% contains your next customer, co-founder, or investor. #BuildInPublic #AI',
    scheduledTime: 'Today at 4:30 PM',
    status: 'scheduled',
    targetAudience: 'Developers & Founders',
  },
  {
    id: 'sch_2',
    platform: 'linkedin',
    content:
      'We built SocialSamurai around one key principle: AI creates drafts, but humans keep total ownership. No unattended auto-posting loops. Here is why that matters for platform compliance and brand authenticity...',
    scheduledTime: 'Tomorrow at 10:00 AM',
    status: 'scheduled',
    targetAudience: 'Product Leaders',
  },
  {
    id: 'sch_3',
    platform: 'reddit',
    content:
      'r/SaaS: How we integrated a 60-second 2D fighting game into our social command center SaaS to boost daily active retention.',
    scheduledTime: 'Aug 18, 2026 at 2:00 PM',
    status: 'scheduled',
    targetAudience: 'r/SaaS Community',
  },
];

export const INITIAL_INBOX: InboxItem[] = [
  {
    id: 'inb_1',
    platform: 'x',
    authorHandle: '@venture_capital_dan',
    authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
    messageType: 'question',
    content: 'Hey Vikrant! Saw your tweet about SocialSamurai AI curation pipeline. Are you guys currently raising pre-seed?',
    priority: 'HIGH',
    aiSummary: 'Potential investor asking about fundraising status.',
    suggestedReply: 'Thanks Dan! We are currently bootstrapping but open to strategic conversations with founders-focused investors. Would love to share our deck.',
    timestamp: '10m ago',
    read: false,
  },
  {
    id: 'inb_2',
    platform: 'reddit',
    authorHandle: 'u/indie_hacker_leo',
    authorAvatar: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=120&q=80',
    messageType: 'reply',
    content: 'Awesome reply on r/SaaS earlier! How do you configure keyword confidence thresholds for Reddit API search?',
    priority: 'MEDIUM',
    aiSummary: 'Technical user inquiring about keyword search matching configuration.',
    suggestedReply: 'Hey Leo! We use multi-stage topic scoring (Keyword -> Intent -> Relevance score > 0.6) before storing discovered posts.',
    timestamp: '1h ago',
    read: false,
  },
  {
    id: 'inb_3',
    platform: 'x',
    authorHandle: '@growth_martina',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    messageType: 'mention',
    content: 'Just tried @socialsamurai in demo mode — the 60-second Samurai Last Stand mini game while waiting for curation scan is genius! 🥷⚔️',
    priority: 'HIGH',
    aiSummary: 'Positive user testimonial regarding retention mini-game.',
    suggestedReply: 'Appreciate the love Martina! Earn those daily 10 credits and keep striking! ⚔️',
    timestamp: '3h ago',
    read: true,
  },
];

export const INITIAL_PREFERENCES: AIPreferenceRule[] = [
  {
    id: 'pref_1',
    category: 'Tone & Length',
    insight: 'You prefer short, punchy responses (< 240 chars) over lengthy paragraphs.',
    confidence: 94,
    updatedAt: 'Updated 1 hour ago',
  },
  {
    id: 'pref_2',
    category: 'Emoji Styling',
    insight: 'You rarely use decorative emojis except for selective Samurai symbols (⚔️, 🥷).',
    confidence: 91,
    updatedAt: 'Updated 3 hours ago',
  },
  {
    id: 'pref_3',
    category: 'Content Focus',
    insight: 'Your audience responds 2.7× stronger to technical build insights than promotional posts.',
    confidence: 98,
    updatedAt: 'Updated Today',
  },
  {
    id: 'pref_4',
    category: 'Approval Pattern',
    insight: 'You consistently edit out promotional fluff and add direct technical details.',
    confidence: 88,
    updatedAt: 'Updated 2 days ago',
  },
];

export const INITIAL_SUBSCRIPTION: UserSubscription = {
  plan: 'free',
  billingCycle: 'monthly',
  renewsAt: '2026-09-01T00:00:00Z',
  entitlement: 'free_tier',
};

export const INITIAL_LIMITS: UserUsageLimits = {
  dailyOpportunitiesCount: 2,
  dailyOpportunitiesMax: 3,
  monthlyRepliesCount: 7,
  monthlyRepliesMax: 10,
  monthlyPostsCount: 3,
  monthlyPostsMax: 5,
  dailyCreditsCount: 6,
  dailyCreditsMax: 10,
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: '🥷 High-Match Opportunity',
    message: 'SocialSamurai found a 96% match from @tech_founder_jack on X.',
    type: 'opportunity',
    timestamp: '14m ago',
    read: false,
  },
  {
    id: 'notif_2',
    title: '⚔️ Daily Arena Ready',
    message: 'Today’s Samurai: Last Stand battle is open. Fight to earn 10 credits!',
    type: 'battle',
    timestamp: '1h ago',
    read: false,
  },
  {
    id: 'notif_3',
    title: '🔥 High Performance Alert',
    message: 'Your recent technical reply on r/SaaS reached top 5 comments.',
    type: 'published',
    timestamp: '4h ago',
    read: true,
  },
];

export const MOCK_KEYWORDS = ['AI', 'SaaS', 'Startups', 'App development', 'Vibe coding', 'BuildInPublic'];
