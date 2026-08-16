import React, { useState } from 'react';
import { Inbox, MessageSquare, AlertCircle, Archive, Check, Sparkles, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InboxItem } from '../../types';

export const InboxView: React.FC = () => {
  const { inbox } = useApp();
  const [filter, setFilter] = useState<'all' | 'priority' | 'mentions' | 'replies'>('all');
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});
  const [sentMap, setSentMap] = useState<Record<string, boolean>>({});

  const filteredItems = inbox.filter((item) => {
    if (filter === 'priority') return item.priority === 'HIGH';
    if (filter === 'mentions') return item.messageType === 'mention';
    if (filter === 'replies') return item.messageType === 'reply';
    return true;
  });

  const handleSendReply = (id: string) => {
    setSentMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#111111] border border-white/10 p-6 rounded-3xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">Unified Inbox</h1>
            <span className="text-xs bg-[#E3262E]/20 text-[#E3262E] px-2.5 py-1 rounded-full font-bold">
              {inbox.filter((i) => !i.read).length} UNREAD
            </span>
          </div>
          <p className="text-xs text-[#A1A1AA] mt-1">
            Mentions, replies & high-priority messages summarized by AI.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-[#171717] border border-white/10 p-2 rounded-2xl overflow-x-auto">
        {(['all', 'priority', 'mentions', 'replies'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition uppercase whitespace-nowrap ${
              filter === f
                ? 'bg-[#E3262E] text-white shadow-md shadow-[#E3262E]/20'
                : 'text-[#A1A1AA] hover:text-[#F5F5F5]'
            }`}
          >
            {f === 'all'
              ? 'All Messages'
              : f === 'priority'
              ? '⚡ High Priority'
              : f === 'mentions'
              ? 'Mentions'
              : 'Replies'}
          </button>
        ))}
      </div>

      {/* Message List */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const replyVal = replyTextMap[item.id] ?? item.suggestedReply;
          const isSent = sentMap[item.id];

          return (
            <div
              key={item.id}
              className={`bg-[#171717] border rounded-3xl p-5 sm:p-6 transition shadow-xl ${
                item.priority === 'HIGH' ? 'border-[#E3262E]/50' : 'border-white/10'
              }`}
            >
              {/* Header bar */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.authorAvatar}
                    alt={item.authorHandle}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#F5F5F5]">{item.authorHandle}</span>
                      <span className="text-[10px] bg-[#111111] text-[#A1A1AA] px-2 py-0.5 rounded-md uppercase font-mono">
                        {item.platform}
                      </span>
                    </div>
                    <span className="text-xs text-[#A1A1AA]">{item.timestamp}</span>
                  </div>
                </div>

                {item.priority === 'HIGH' && (
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#E3262E]/20 text-[#E3262E] border border-[#E3262E]/40 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> HIGH PRIORITY
                  </span>
                )}
              </div>

              {/* Message text */}
              <p className="text-sm text-[#F5F5F5] mb-4 bg-[#080808] p-3.5 rounded-2xl border border-white/5">
                "{item.content}"
              </p>

              {/* AI Summary Box */}
              <div className="bg-[#111111] border border-white/5 rounded-2xl p-3.5 mb-4 space-y-1">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI CONVERSATION SUMMARY
                </span>
                <p className="text-xs text-[#A1A1AA]">{item.aiSummary}</p>
              </div>

              {/* AI Suggested Reply & Editor */}
              {isSent ? (
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/40 rounded-2xl text-xs text-emerald-400 font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4" /> Reply sent successfully!
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-[#A1A1AA] uppercase">
                    AI Suggested Reply:
                  </label>
                  <textarea
                    value={replyVal}
                    onChange={(e) =>
                      setReplyTextMap({ ...replyTextMap, [item.id]: e.target.value })
                    }
                    rows={2}
                    className="w-full bg-[#080808] border border-white/10 rounded-2xl p-3 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#E3262E] transition resize-none"
                  />

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={() => handleSendReply(item.id)}
                      className="py-2 px-4 bg-[#E3262E] hover:bg-[#f4333b] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5 fill-white" />
                      <span>Approve & Reply</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
