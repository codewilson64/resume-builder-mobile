export type ContactDetails = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  city: string;
  postalCode: string;
};

export type Experience = {
  id: string; 
  jobTitle: string;
  companyName: string;
  startDate: string | null;
  endDate: string | null;
  currentlyWorkHere: boolean;
  city: string;
  jobDescription: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  graduationDate: string | null;
  city: string;
  description: string;
};

export type Skill = {
  id: string;
  name: string;
};

export type About = {
  summary: string;
};

export type Language = {
  id: string;
  name: string;
  proficiency: string;
};

export type Hobby = {
  id: string;
  name: string;
};

export type Certificate = {
  id: string;
  name: string;
  issuer: string;
  date: string | null;
  description: string;
};

export type Award = {
  id: string;
  title: string;
  issuer: string;
  date: string | null;
  description: string;
};

export type CustomSection = {
  id: string;
  title: string;       
  subtitle: string;    
  date: string | null;
  description: string;
};

export type ResumeData = {
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
};