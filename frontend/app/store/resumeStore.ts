import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  About,
  ContactDetails,
  Education,
  Experience,
  Skill,
} from "../types/resume";

type ResumeStore = {
  contact: ContactDetails;
  about: About;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];

  // Contact
  updateContact: (field: keyof ContactDetails, value: string) => void;
  resetContact: () => void;

  // About
  updateAbout: (field: keyof About, value: string) => void;
  resetAbout: () => void;

  // Experiences
  addExperience: (experience: Experience) => void;
  updateExperience: (
    id: string,
    field: keyof Experience,
    value: string | boolean | null
  ) => void;
  removeExperience: (id: string) => void;
  resetExperiences: () => void;

  // Educations
  addEducation: (education: Education) => void;
  updateEducation: (
    id: string,
    field: keyof Education,
    value: string | null
  ) => void;
  removeEducation: (id: string) => void;
  resetEducations: () => void;

  // Skills
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, field: keyof Skill, value: string) => void;
  removeSkill: (id: string) => void;
  resetSkills: () => void;

  // Optional: reset everything
  resetAll: () => void;
};

const initialContact: ContactDetails = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  phone: "",
  city: "",
  postalCode: "",
};

const initialAbout: About = {
  summary: "",
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      contact: initialContact,
      about: initialAbout,
      experiences: [],
      educations: [],
      skills: [],

      // ---------- Contact ----------
      updateContact: (field, value) =>
        set((state) => ({
          contact: {
            ...state.contact,
            [field]: value,
          },
        })),

      resetContact: () => set({ contact: initialContact }),

      // ---------- About ----------
      updateAbout: (field, value) =>
        set((state) => ({
          about: {
            ...state.about,
            [field]: value,
          },
        })),

      resetAbout: () => set({ about: initialAbout }),

      // ---------- Experiences ----------
      addExperience: (experience) =>
        set((state) => ({
          experiences: [...state.experiences, experience],
        })),

      updateExperience: (id, field, value) =>
        set((state) => ({
          experiences: state.experiences.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          ),
        })),

      removeExperience: (id) =>
        set((state) => ({
          experiences: state.experiences.filter((item) => item.id !== id),
        })),

      resetExperiences: () => set({ experiences: [] }),

      // ---------- Educations ----------
      addEducation: (education) =>
        set((state) => ({
          educations: [...state.educations, education],
        })),

      updateEducation: (id, field, value) =>
        set((state) => ({
          educations: state.educations.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          ),
        })),

      removeEducation: (id) =>
        set((state) => ({
          educations: state.educations.filter((item) => item.id !== id),
        })),

      resetEducations: () => set({ educations: [] }),

      // ---------- Skills ----------
      addSkill: (skill) =>
        set((state) => ({
          skills: [...state.skills, skill],
        })),

      updateSkill: (id, field, value) =>
        set((state) => ({
          skills: state.skills.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          ),
        })),

      removeSkill: (id) =>
        set((state) => ({
          skills: state.skills.filter((item) => item.id !== id),
        })),

      resetSkills: () => set({ skills: [] }),

      // ---------- Reset all ----------
      resetAll: () =>
        set({
          contact: initialContact,
          about: initialAbout,
          experiences: [],
          educations: [],
          skills: [],
        }),
    }),
    {
      name: "resume-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);