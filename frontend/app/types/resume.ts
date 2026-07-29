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
  jobTitle: string;
  companyName: string;
  startDate: string | null;
  endDate: string | null;
  currentlyWorkHere: boolean;
  city: string;
  jobDescription: string;
};

export type Education = {
  school: string;
  degree: string;
  graduationDate: string | null;
  city: string;
  description: string;
};

export type Skill = {
  name: string;
};

export type About = {
  summary: string;
};