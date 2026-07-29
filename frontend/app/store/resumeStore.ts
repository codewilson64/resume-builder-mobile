import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { About, ContactDetails, Education, Experience, Skill } from "../types/resume";

type ResumeStore = {
  contact: ContactDetails;
  experience: Experience;
  education: Education;
  skill: Skill;
  about: About;

  updateContact: (
    field: keyof ContactDetails,
    value: string
  ) => void;

  updateExperience: (
    field: keyof Experience,
    value: string | boolean | null
  ) => void;
  
  updateEducation: (
    field: keyof Education,
    value: string | null
  ) => void;

  updateSkill: (
    field: keyof Skill,
    value: string
  ) => void;

  updateAbout: (
    field: keyof About,
    value: string
  ) => void;

  resetContact: () => void;
  resetExperience: () => void;
  resetEducation: () => void;
  resetSkill: () => void;
  resetAbout: () => void;
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

const initialExperience: Experience = {
  jobTitle: "",
  companyName: "",
  startDate: null,
  endDate: null,
  currentlyWorkHere: false,
  city: "",
  jobDescription: "",
};

const initialEducation: Education = {
  school: "",
  degree: "",
  graduationDate: null,
  city: "",
  description: "",
};

const initialSkill: Skill = {
  name: "",
};

const initialAbout: About = {
  summary: "",
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      contact: initialContact,
      experience: initialExperience,
      education: initialEducation,
      skill: initialSkill,
      about: initialAbout,

      updateContact: (field, value) =>
        set((state) => ({
          contact: {
            ...state.contact,
            [field]: value,
          },
        })),

      updateExperience: (field, value) =>
        set((state) => ({
          experience: {
            ...state.experience,
            [field]: value,
          },
        })),

      updateEducation: (field, value) =>
        set((state) => ({
          education: {
            ...state.education,
            [field]: value,
          },
        })),

      updateSkill: (field, value) =>
        set((state) => ({
          skill: {
            ...state.skill,
            [field]: value,
          },
        })),

      updateAbout: (field, value) =>
        set((state) => ({
          about: {
            ...state.about,
            [field]: value,
          },
        })),

      resetContact: () =>
        set({
          contact: initialContact,
        }),

      resetExperience: () =>
        set({
          experience: initialExperience,
        }),
      
      resetEducation: () =>
        set({
          education: initialEducation,
        }),

      resetSkill: () =>
        set({
          skill: initialSkill,
        }),

      resetAbout: () =>
        set({
          about: initialAbout,
        }),
    }),

    {
      name: "resume-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);