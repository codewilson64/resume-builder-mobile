import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";
import { formatDate } from "@/app/utils/formatDate";
import { ResumeData } from "../types/resume";

export function generateVegaResumeHTML({
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

  const addressBlock = [contact?.city, contact?.address, contact?.postalCode]
    .filter(Boolean)
    .join(", ");

  const skillsText = skills
    .filter((s) => s.name)
    .map((s) => s.name)
    .join(", ");

  const languagesText = languages
    .filter((l) => l.name)
    .map((l) => (l.proficiency ? `${l.name} (${l.proficiency})` : l.name))
    .join(", ");

  const hobbiesText = hobbies
    .filter((h) => h.name)
    .map((h) => h.name)
    .join(", ");

  const experienceItems = experiences
    .map((exp) => {
      const companyLine = [exp.companyName, exp.city].filter(Boolean).join(" | ");
      const dateRange =
        exp.startDate || exp.endDate || exp.currentlyWorkHere
          ? `${formatDate(exp.startDate)}${exp.startDate ? " - " : ""}${
              exp.currentlyWorkHere ? "Present" : formatDate(exp.endDate)
            }`
          : "";
      const titleLine = [exp.jobTitle, dateRange].filter(Boolean).join(" | ");

      return `
        <div class="item">
          ${companyLine ? `<div class="item-title">${companyLine}</div>` : ""}
          ${titleLine ? `<div class="item-subtitle">${titleLine}</div>` : ""}
          ${
            exp.jobDescription
              ? `<div class="body-text">${exp.jobDescription}</div>`
              : ""
          }
        </div>
      `;
    })
    .join("");

  const educationItems = educations
    .map((edu) => {
      const schoolLine = [edu.school, edu.city].filter(Boolean).join(" | ");
      const degreeLine = [
        edu.degree,
        edu.graduationDate ? formatDate(edu.graduationDate) : null,
      ]
        .filter(Boolean)
        .join(" | ");

      return `
        <div class="item">
          ${schoolLine ? `<div class="item-title">${schoolLine}</div>` : ""}
          ${degreeLine ? `<div class="item-subtitle">${degreeLine}</div>` : ""}
          ${
            edu.description
              ? `<div class="body-text">${edu.description}</div>`
              : ""
          }
        </div>
      `;
    })
    .join("");

  const certificateItems = certificates
    .map((cert) => {
      const metaLine = [cert.issuer, cert.date ? formatDate(cert.date) : null]
        .filter(Boolean)
        .join(" | ");

      return `
        <div class="item">
          ${cert.name ? `<div class="item-title">${cert.name}</div>` : ""}
          ${metaLine ? `<div class="item-subtitle">${metaLine}</div>` : ""}
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
      const metaLine = [award.issuer, award.date ? formatDate(award.date) : null]
        .filter(Boolean)
        .join(" | ");

      return `
        <div class="item">
          ${award.title ? `<div class="item-title">${award.title}</div>` : ""}
          ${metaLine ? `<div class="item-subtitle">${metaLine}</div>` : ""}
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
              ? `<div class="item-subtitle">${formatDate(section.date)}</div>`
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

    @page {
      margin-top: 24px;
      margin-bottom: 24px;
      margin-left: 0;
      margin-right: 0;
    }
    @page :first {
      margin-top: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      color: #000000;
      line-height: 1.4;
      font-size: 12px;
    }

    .header {
      padding: 28px 36px 32px 36px;
    }
    .name {
      font-size: 22px;
      font-weight: 700;
      color: #000000;
    }
    .contact-block {
      margin-top: 4px;
      font-size: 12px;
      color: #000000;
      line-height: 1.45;
    }
    .contact-block div + div {
      margin-top: 2px;
    }

    .content {
      padding: 0 36px 24px 36px;
    }

    .section {
      margin-bottom: 16px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .section-title {
      font-size: 13px;
      font-weight: 700;
      color: #000000;
      margin-bottom: 3px;
      page-break-after: avoid;
      break-after: avoid;
    }
    .divider {
      height: 1px;
      background: #9ca3af;
      margin-bottom: 6px;
      page-break-after: avoid;
      break-after: avoid;
    }

    .item {
      margin-bottom: 10px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .item-title {
      font-size: 12px;
      font-weight: 600;
      color: #000000;
    }
    .item-subtitle {
      font-size: 12px;
      color: #000000;
      margin-top: 1px;
    }
    .body-text {
      font-size: 12px;
      color: #000000;
      margin-top: 3px;
      line-height: 1.4;
    }
    .plain-text {
      font-size: 12px;
      color: #000000;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${fullName || "Your Name"}</div>
    ${
      hasContact
        ? `<div class="contact-block">
            ${contact?.phone ? `<div>${contact.phone}</div>` : ""}
            ${contact?.email ? `<div>${contact.email}</div>` : ""}
            ${addressBlock ? `<div>${addressBlock}</div>` : ""}
          </div>`
        : ""
    }
  </div>

  <div class="content">
    ${
      about?.summary
        ? `<div class="section">
            <div class="section-title">Summary</div>
            <div class="divider"></div>
            <div class="body-text">${about.summary}</div>
          </div>`
        : ""
    }

    ${
      hasSkills && skillsText
        ? `<div class="section">
            <div class="section-title">Skills</div>
            <div class="divider"></div>
            <div class="plain-text">${skillsText}</div>
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
      hasLanguages && languagesText
        ? `<div class="section">
            <div class="section-title">Languages</div>
            <div class="divider"></div>
            <div class="plain-text">${languagesText}</div>
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

    ${
      hasHobbies && hobbiesText
        ? `<div class="section">
            <div class="section-title">Hobbies</div>
            <div class="divider"></div>
            <div class="plain-text">${hobbiesText}</div>
          </div>`
        : ""
    }

    ${customSectionItems}
  </div>
</body>
</html>
  `;
}

export async function downloadVegaResumePDF(data: ResumeData): Promise<void> {
  try {
    const html = generateVegaResumeHTML(data);

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