export type Header = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export type Body = {
  body: string;
}

export type Footer = {
  footer: string;
}

export type CoverLetterData = {
  header: Header;
  body: Body;
  footer: Footer;
}