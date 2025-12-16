"use client";

import { ChatListItem } from "./ChatListItem";

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
};

type Props = {
  chats: Chat[];
  activeChatId: string;
  onSelectChat: (id: string) => void;
};

export function ChatSidebar({ chats, activeChatId, onSelectChat }: Props) {
  return (
    <div className="w-full md:w-72 border-r h-screen overflow-y-auto p-2">
      <h2 className="px-3 py-2 font-semibold text-lg">Chats</h2>

      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          name={chat.name}
          lastMessage={chat.lastMessage}
          active={chat.id === activeChatId}
          onClick={() => onSelectChat(chat.id)}
        />
      ))}
    </div>
  );
}
