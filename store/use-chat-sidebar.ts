import { create } from "zustand";

export enum ChatVarient {
  CHAT = "chat",
  COMMUNITY = "COMMUNITY",
}

interface ChatSidebarStore {
  collapsed: boolean;
  varient: ChatVarient;
  onExpand: () => void;
  onCollapse: () => void;
  onChangeVarient: (varient: ChatVarient) => void;
}

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
  collapsed: false,
  varient: ChatVarient.CHAT,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
  onChangeVarient: (varient: ChatVarient) => set(() => ({ varient })),
}));
