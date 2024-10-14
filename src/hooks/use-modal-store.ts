
// import { ChannelCategoryType, ChannelType, PermissionType, ServerType, ServerchannelsChannelChannelTypeChoices } from "@/graphql/gql/graphql";
import { create } from "zustand";

export type ModalType = "createServer" | "invite" | "editServer" | "members" | "createServerRole" | "createChannel"|"choosefiles"| "createEvent" | "createCategory" | "leaveServer" | "deleteServer" | "deleteChannel" | "editChannel" | "messageFile" | "deleteMessage";

interface ModalData {
  // server?: ServerType;
  // channel?: ChannelType;
  // messageId?: number | undefined;
  // ChannelCategoryType?: ChannelCategoryType;
  // channelType?: ServerchannelsChannelChannelTypeChoices;
  // permissions?: PermissionType[];
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false })
}));
