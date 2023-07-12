import type { AuthModalStore } from "@/types";
import { create } from "zustand";

// Creating a useAuthModal hook using the create function from zustand
const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
