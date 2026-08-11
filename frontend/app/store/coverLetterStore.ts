import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Header, Body, Footer, CoverLetterData } from "../types/cover-letter";

type CoverLetterStore = {
  currentCoverLetterId: number | null;
  header: Header;
  body: Body;
  footer: Footer;

  // Header
  updateHeader: (field: keyof Header, value: string) => void;
  resetHeader: () => void;

  // Body
  updateBody: (field: keyof Body, value: string) => void;
  resetBody: () => void;

  // Footer
  updateFooter: (field: keyof Footer, value: string) => void;
  resetFooter: () => void;

  // Load a full cover letter from SQLite into the store
  loadCoverLetter: (data: CoverLetterData, id?: number | null) => void;

  // Set current cover letter id
  setCurrentCoverLetterId: (id: number | null) => void;

  // Optional: reset everything
  resetAll: () => void;
};

const initialHeader: Header = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const initialBody: Body = {
  body: "",
};

const initialFooter: Footer = {
  footer: "",
};

export const useCoverLetterStore = create<CoverLetterStore>()(
  persist(
    (set) => ({
      currentCoverLetterId: null,
      header: initialHeader,
      body: initialBody,
      footer: initialFooter,

      // ---------- Header ----------
      updateHeader: (field, value) =>
        set((state) => ({
          header: {
            ...state.header,
            [field]: value,
          },
        })),

      resetHeader: () => set({ header: initialHeader }),

      // ---------- Body ----------
      updateBody: (field, value) =>
        set((state) => ({
          body: {
            ...state.body,
            [field]: value,
          },
        })),

      resetBody: () => set({ body: initialBody }),

      // ---------- Footer ----------
      updateFooter: (field, value) =>
        set((state) => ({
          footer: {
            ...state.footer,
            [field]: value,
          },
        })),

      resetFooter: () => set({ footer: initialFooter }),

      // ---------- Load Cover Letter (from SQLite) ----------
      loadCoverLetter: (data, id = null) =>
        set({
          currentCoverLetterId: id ?? null,
          header: data.header ?? initialHeader,
          body: data.body ?? initialBody,
          footer: data.footer ?? initialFooter,
        }),

      setCurrentCoverLetterId: (id) => set({ currentCoverLetterId: id }),

      // ---------- Reset all ----------
      resetAll: () =>
        set({
          currentCoverLetterId: null,
          header: initialHeader,
          body: initialBody,
          footer: initialFooter,
        }),
    }),
    {
      name: "cover-letter-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);