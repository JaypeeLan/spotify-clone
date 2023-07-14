import type { UploadModalStore } from "@/types";
import { create } from "zustand";

// Creating a useAuthModal hook using the create function from zustand
const useUploadModal = create<UploadModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUploadModal;
