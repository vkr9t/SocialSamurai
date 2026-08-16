export type MascotState =
  | 'ready'
  | 'scanning'
  | 'thinking'
  | 'focused'
  | 'idea'
  | 'working'
  | 'excited'
  | 'happy'
  | 'celebration'
  | 'guard';

export type PlatformType = 'x' | 'reddit' | 'linkedin';

export interface SocialAccount {
  id: string;
  platform: PlatformType;
  handle: string;
  name: string;
  avatar: string;
  connected: boolean;
  connectedAt?: string;
  scopes: string[];
  capabilities: {
    read: boolean;
    search: boolean;
    post: boolean;
    reply: boolean;
  };
  lastSynced?: string;
}

export interface Opportunity {
  id: string;
  platform: PlatformType;
  authorHandle: string;
  authorName: string;
  authorAvatar: string;
  postContent: string;
  matchedTopic: string;
  relevanceScore: number; // 0-100
  intentTag: 'High Intent' | 'Technical' | 'Founder Question' | 'Product Launch' | 'General';
  aiReasoning: string;
  engagement: {
    likes: number;
    replies: number;
    reposts?: number;
  };
  postedAge: string;
  saved?: boolean;
  dismissed?: boolean;
  replied?: boolean;
}

export interface AIReplyOption {
  tone: 'Thoughtful' | 'Short' | 'Technical' | 'Witty';
  content: string;
}

export interface DraftReply {
  id: string;
  opportunityId: string;
  platform: PlatformType;
  originalPost: string;
  authorHandle: string;
  selectedTone: 'Thoughtful' | 'Short' | 'Technical' | 'Witty';
  draftText: string;
  status: 'pending' | 'edited' | 'approved' | 'posted' | 'discarded';
  createdAt: string;
}

export interface ScheduledPost {
  id: string;
  platform: PlatformType;
  content: string;
  scheduledTime: string;
  status: 'scheduled' | 'published' | 'draft';
  targetAudience?: string;
}

export interface InboxItem {
  id: string;
  platform: PlatformType;
  authorHandle: string;
  authorAvatar: string;
  messageType: 'mention' | 'reply' | 'direct_message' | 'question';
  content: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  aiSummary: string;
  suggestedReply: string;
  timestamp: string;
  read: boolean;
}

export interface AIPreferenceRule {
  id: string;
  category: string;
  insight: string;
  confidence: number;
  updatedAt: string;
}

export interface UserSubscription {
  plan: 'free' | 'samurai';
  billingCycle: 'monthly' | 'yearly';
  renewsAt: string;
  entitlement: 'samurai_pro' | 'free_tier';
}

export interface UserUsageLimits {
  dailyOpportunitiesCount: number;
  dailyOpportunitiesMax: number;
  monthlyRepliesCount: number;
  monthlyRepliesMax: number;
  monthlyPostsCount: number;
  monthlyPostsMax: number;
  dailyCreditsCount: number;
  dailyCreditsMax: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'opportunity' | 'battle' | 'system' | 'published';
  timestamp: string;
  read: boolean;
}

export type ViewTab =
  | 'dashboard'
  | 'opportunities'
  | 'create'
  | 'inbox'
  | 'calendar'
  | 'analytics'
  | 'battle'
  | 'connections'
  | 'automation'
  | 'settings';
