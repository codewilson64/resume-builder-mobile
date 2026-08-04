import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  About,
  Award,
  Certificate,
  ContactDetails,
  CustomSection,
  Education,
  Experience,
  Hobby,
  Language,
  Skill,
} from "../types/resume";

type ResumeStore = {
  contact: ContactDetails;
  about: About;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  languages: Language[];
  hobbies: Hobby[];
  certificates: Certificate[];
  awards: Award[];
  customSections: CustomSection[];

  // Contact
  updateContact: (field: keyof ContactDetails, value: string) => void;
  resetContact: () => void;

  // About
  updateAbout: (field: keyof About, value: string) => void;
  resetAbout: () => void;

  // Experiences
  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, field: keyof Experience, value: string | boolean | null) => void;
  removeExperience: (id: string) => void;
  resetExperiences: () => void;

  // Educations
  addEducation: (education: Education) => void;
  updateEducation: (id: string, field: keyof Education, value: string | null) => void;
  removeEducation: (id: string) => void;
  resetEducations: () => void;

  // Skills
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, field: keyof Skill, value: string) => void;
  removeSkill: (id: string) => void;
  resetSkills: () => void;

  // Language
  addLanguage: (language: Language) => void;
  updateLanguage: (id: string, field: keyof Language, value: string) => void;
  removeLanguage: (id: string) => void;
  resetLanguages: () => void;
  
  // Hobby
  addHobby: (hobby: Hobby) => void;
  updateHobby: (id: string, field: keyof Hobby, value: string) => void;
  removeHobby: (id: string) => void;
  resetHobbies: () => void;

  // Certificate
  addCertificate: (certificate: Certificate) => void;
  updateCertificate: (id: string, field: keyof Certificate, value: string | null) => void;
  removeCertificate: (id: string) => void;
  resetCertificates: () => void;

  // Award
  addAward: (award: Award) => void;
  updateAward: (id: string, field: keyof Award, value: string | null) => void;
  removeAward: (id: string) => void;
  resetAwards: () => void;

  // Custom Section
  addCustomSection: (section: CustomSection) => void;
  updateCustomSection: (id: string, field: keyof CustomSection, value: string) => void;
  removeCustomSection: (id: string) => void;
  resetCustomSections: () => void;

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
      languages: [],
      hobbies: [],
      certificates: [],
      awards: [],
      customSections: [],

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

      // ---------- Languages ----------
      addLanguage: (language) =>
        set((state) => ({
          languages: [...state.languages, language],
        })),

      updateLanguage: (id, field, value) =>
        set((state) => ({
          languages: state.languages.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          ),
        })),

      removeLanguage: (id) =>
        set((state) => ({
          languages: state.languages.filter((item) => item.id !== id),
        })),

      resetLanguages: () => set({ languages: [] }),

      // ---------- Hobbies ----------
      addHobby: (hobby) =>
        set((state) => ({
          hobbies: [...state.hobbies, hobby],
        })),

      updateHobby: (id, field, value) =>
        set((state) => ({
          hobbies: state.hobbies.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          ),
        })),

      removeHobby: (id) =>
        set((state) => ({
          hobbies: state.hobbies.filter((item) => item.id !== id),
        })),

      resetHobbies: () => set({ hobbies: [] }),

      // ---------- Certificates ----------
      addCertificate: (certificate) =>
        set((state) => ({
          certificates: [...state.certificates, certificate],
        })),

      updateCertificate: (id, field, value) =>
        set((state) => ({
          certificates: state.certificates.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          ),
        })),

      removeCertificate: (id) =>
        set((state) => ({
          certificates: state.certificates.filter((item) => item.id !== id),
        })),

      resetCertificates: () => set({ certificates: [] }),

      // ---------- Awards ----------
      addAward: (award) =>
        set((state) => ({
          awards: [...state.awards, award],
        })),

      updateAward: (id, field, value) =>
        set((state) => ({
          awards: state.awards.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          ),
        })),

      removeAward: (id) =>
        set((state) => ({
          awards: state.awards.filter((item) => item.id !== id),
        })),

      resetAwards: () => set({ awards: [] }),

      // ---------- Custom sections ----------
      addCustomSection: (section) =>
        set((state) => ({
          customSections: [...state.customSections, section],
        })),

      updateCustomSection: (id, field, value) =>
        set((state) => ({
          customSections: state.customSections.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          ),
        })),

      removeCustomSection: (id) =>
        set((state) => ({
          customSections: state.customSections.filter((item) => item.id !== id),
        })),

      resetCustomSections: () => set({ customSections: [] }),

      // ---------- Reset all ----------
      resetAll: () =>
        set({
          contact: initialContact,
          about: initialAbout,
          experiences: [],
          educations: [],
          skills: [],
          languages: [],
          hobbies: [],
          certificates: [],
          awards: [],
          customSections: [],
        }),
    }),
    {
      name: "resume-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);