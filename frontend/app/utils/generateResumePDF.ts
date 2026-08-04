import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";
import { formatDate } from "@/app/utils/formatDate";
import { About, Award, Certificate, ContactDetails, CustomSection, Education, Experience, Hobby, Language, Skill } from "../types/resume";

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

export function generateResumeHTML({
  contact,
  about,
  experiences,
  educations,
  skills,
  languages,
  hobbies,
  certificates,
  awards,
  customSections,
}: ResumeData): string {
  const fullName = `${contact?.firstName ?? ""} ${contact?.lastName ?? ""}`.trim();

  const hasContact =
    contact?.email ||
    contact?.phone ||
    contact?.address ||
    contact?.city ||
    contact?.postalCode;

  const hasExperiences = experiences.length > 0;
  const hasEducations = educations.length > 0;
  const hasSkills = skills.length > 0;
  const hasLanguages = languages.length > 0;
  const hasHobbies = hobbies.length > 0;
  const hasCertificates = certificates.length > 0;
  const hasAwards = awards.length > 0;

  const latestJobTitle = experiences[0]?.jobTitle;

  const addressLine = [contact?.address, contact?.city, contact?.postalCode]
    .filter(Boolean)
    .join(", ");

  const experienceItems = experiences
    .map((exp) => {
      const dateRange =
        exp.startDate || exp.endDate || exp.currentlyWorkHere
          ? `${formatDate(exp.startDate)}${exp.startDate ? " - " : ""}${
              exp.currentlyWorkHere ? "Present" : formatDate(exp.endDate)
            }`
          : "";

      return `
        <div style="margin-bottom: 20px;">
          ${exp.jobTitle ? `<div class="item-title">${exp.jobTitle}</div>` : ""}
          ${exp.companyName ? `<div class="item-subtitle">${exp.companyName}</div>` : ""}
          ${dateRange ? `<div class="meta">${dateRange}</div>` : ""}
          ${exp.city ? `<div class="meta">${exp.city}</div>` : ""}
          ${exp.jobDescription ? `<div class="body-text">${exp.jobDescription}</div>` : ""}
        </div>
      `;
    })
    .join("");

  const educationItems = educations
    .map((edu) => {
      return `
        <div style="margin-bottom: 20px;">
          ${edu.degree ? `<div class="item-title">${edu.degree}</div>` : ""}
          ${edu.school ? `<div class="item-subtitle">${edu.school}</div>` : ""}
          ${
            edu.graduationDate
              ? `<div class="meta">Graduated ${formatDate(edu.graduationDate)}</div>`
              : ""
          }
          ${edu.city ? `<div class="meta">${edu.city}</div>` : ""}
          ${edu.description ? `<div class="body-text">${edu.description}</div>` : ""}
        </div>
      `;
    })
    .join("");

  const skillItems = skills
    .filter((s) => s.name)
    .map((s) => `<span class="skill">${s.name}</span>`)
    .join("");

  const languageItems = languages
    .filter((l) => l.name)
    .map(
      (l) => `
        <div class="language-row">
          <span class="language-name">${l.name}</span>
          ${l.proficiency ? `<span class="language-level">${l.proficiency}</span>` : ""}
        </div>
      `
    )
    .join("");
  
  const hobbyItems = hobbies
    .filter((h) => h.name)
    .map((h) => `<span class="hobby">${h.name}</span>`)
    .join("");

  const certificateItems = certificates
    .map((cert) => {
      return `
        <div style="margin-bottom: 20px;">
          ${cert.name ? `<div class="item-title">${cert.name}</div>` : ""}
          ${cert.issuer ? `<div class="item-subtitle">${cert.issuer}</div>` : ""}
          ${
            cert.date
              ? `<div class="meta">${formatDate(cert.date)}</div>`
              : ""
          }
          ${
            cert.description
              ? `<div class="body-text">${cert.description}</div>`
              : ""
          }
        </div>
      `;
    })
    .join("");

    const awardItems = awards
      .map((award) => {
        return `
          <div style="margin-bottom: 20px;">
            ${award.title ? `<div class="item-title">${award.title}</div>` : ""}
            ${award.issuer ? `<div class="item-subtitle">${award.issuer}</div>` : ""}
            ${
              award.date
                ? `<div class="meta">${formatDate(award.date)}</div>`
                : ""
            }
            ${
              award.description
                ? `<div class="body-text">${award.description}</div>`
                : ""
            }
          </div>
        `;
      })
      .join("");

    const customSectionItems = customSections
      .filter((s) => s.title || s.subtitle || s.description)
      .map((section) => {
        return `
          <div class="section">
            <div class="section-title">${section.title || "Additional"}</div>
            <div class="divider"></div>
            ${
              section.subtitle
                ? `<div class="item-title">${section.subtitle}</div>`
                : ""
            }
            ${
              section.date
                ? `<div class="meta">${formatDate(section.date)}</div>`
                : ""
            }
            ${
              section.description
                ? `<div class="body-text">${section.description}</div>`
                : ""
            }
          </div>
        `;
      })
      .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      color: #111827;
      line-height: 1.5;
    }
    .header {
      background: #111827;
      color: white;
      padding: 32px 40px;
    }
    .name {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .job-title-header {
      font-size: 14px;
      color: #d1d5db;
      margin-bottom: 16px;
    }
    .contact {
      font-size: 12px;
      color: #d1d5db;
    }
    .contact span { margin-right: 16px; }
    .content {
      padding: 32px 40px;
    }
    .section {
      margin-bottom: 28px;
    }
    .section-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #111827;
      margin-bottom: 8px;
    }
    .divider {
      height: 1px;
      background: #e5e7eb;
      margin-bottom: 14px;
    }
    .item-title {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
    }
    .item-subtitle {
      font-size: 13px;
      font-weight: 500;
      color: #4b5563;
      margin-top: 2px;
    }
    .meta {
      font-size: 11px;
      color: #6b7280;
      margin-top: 2px;
    }
    .body-text {
      font-size: 13px;
      color: #374151;
      margin-top: 10px;
      line-height: 1.6;
    }
    .skill {
      display: inline-block;
      background: #f3f4f6;
      border-radius: 6px;
      padding: 6px 12px;
      font-size: 13px;
      color: #374151;
      margin-right: 8px;
      margin-bottom: 8px;
    }
    .language-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .language-name {
      font-size: 13px;
      font-weight: 500;
      color: #111827;
    }
    .language-level {
      font-size: 13px;
      color: #6b7280;
    }
    .hobby {
      display: inline-block;
      background: #f3f4f6;
      border-radius: 6px;
      padding: 6px 12px;
      font-size: 13px;
      color: #374151;
      margin-right: 8px;
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${fullName || "Your Name"}</div>
    ${
      latestJobTitle
        ? `<div class="job-title-header">${latestJobTitle}</div>`
        : ""
    }
    ${
      hasContact
        ? `<div class="contact">
            ${contact?.email ? `<span>${contact.email}</span>` : ""}
            ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
            ${addressLine ? `<div style="margin-top:6px">${addressLine}</div>` : ""}
          </div>`
        : ""
    }
  </div>

  <div class="content">
    ${
      about?.summary
        ? `<div class="section">
            <div class="section-title">About Me</div>
            <div class="divider"></div>
            <div class="body-text">${about.summary}</div>
          </div>`
        : ""
    }

    ${
      hasExperiences
        ? `<div class="section">
            <div class="section-title">Experience</div>
            <div class="divider"></div>
            ${experienceItems}
          </div>`
        : ""
    }

    ${
      hasEducations
        ? `<div class="section">
            <div class="section-title">Education</div>
            <div class="divider"></div>
            ${educationItems}
          </div>`
        : ""
    }

    ${
      hasSkills
        ? `<div class="section">
            <div class="section-title">Skills</div>
            <div class="divider"></div>
            ${skillItems}
          </div>`
        : ""
    }

    ${
      hasLanguages
        ? `<div class="section">
            <div class="section-title">Languages</div>
            <div class="divider"></div>
            ${languageItems}
          </div>`
        : ""
    }

    ${
      hasHobbies
        ? `<div class="section">
            <div class="section-title">Hobbies</div>
            <div class="divider"></div>
            ${hobbyItems}
          </div>`
        : ""
    }

    ${
      hasCertificates
        ? `<div class="section">
            <div class="section-title">Certificates</div>
            <div class="divider"></div>
            ${certificateItems}
          </div>`
        : ""
    }

    ${
      hasAwards
        ? `<div class="section">
            <div class="section-title">Awards</div>
            <div class="divider"></div>
            ${awardItems}
          </div>`
        : ""
    }

    ${customSectionItems}
  </div>
</body>
</html>
  `;
}

export async function downloadResumePDF(data: ResumeData): Promise<void> {
  try {
    const html = generateResumeHTML(data);

    const { uri } = await Print.printToFileAsync({
      html,
      base64: false,
    });

    const canShare = await Sharing.isAvailableAsync();

    if (canShare) {
      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: "Download Resume",
        UTI: "com.adobe.pdf",
      });
    } else {
      Alert.alert("PDF created", uri);
    }
  } catch (error) {
    console.error("PDF generation failed:", error);
    Alert.alert("Error", "Failed to generate PDF. Please try again.");
    throw error;
  }
}