import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";
import { formatDate } from "@/app/utils/formatDate";
import { About, ContactDetails, Education, Experience, Skill } from "../types/resume";

export type ResumeData = {
  contact: ContactDetails | null;
  about: About | null;
  experience: Experience | null;
  education: Education | null;
  skill: Skill | null;
};

export function generateResumeHTML({
  contact,
  about,
  experience,
  education,
  skill,
}: ResumeData): string {
  const fullName = `${contact?.firstName ?? ""} ${contact?.lastName ?? ""}`.trim();

  const hasContact =
    contact?.email ||
    contact?.phone ||
    contact?.address ||
    contact?.city ||
    contact?.postalCode;

  const hasExperience =
    experience?.jobTitle ||
    experience?.companyName ||
    experience?.jobDescription;

  const hasEducation =
    education?.school ||
    education?.degree ||
    education?.description;

  const addressLine = [contact?.address, contact?.city, contact?.postalCode]
    .filter(Boolean)
    .join(", ");

  const experienceDate =
    experience?.startDate || experience?.endDate || experience?.currentlyWorkHere
      ? `${formatDate(experience?.startDate)}${
          experience?.startDate ? " - " : ""
        }${
          experience?.currentlyWorkHere
            ? "Present"
            : formatDate(experience?.endDate)
        }`
      : "";

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
    }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="header">
    <div class="name">${fullName || "Your Name"}</div>
    ${
      experience?.jobTitle
        ? `<div class="job-title-header">${experience.jobTitle}</div>`
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

  <!-- Content -->
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
      hasExperience
        ? `<div class="section">
            <div class="section-title">Experience</div>
            <div class="divider"></div>
            ${
              experience?.jobTitle
                ? `<div class="item-title">${experience.jobTitle}</div>`
                : ""
            }
            ${
              experience?.companyName
                ? `<div class="item-subtitle">${experience.companyName}</div>`
                : ""
            }
            ${
              experienceDate
                ? `<div class="meta">${experienceDate}</div>`
                : ""
            }
            ${
              experience?.city
                ? `<div class="meta">${experience.city}</div>`
                : ""
            }
            ${
              experience?.jobDescription
                ? `<div class="body-text">${experience.jobDescription}</div>`
                : ""
            }
          </div>`
        : ""
    }

    ${
      hasEducation
        ? `<div class="section">
            <div class="section-title">Education</div>
            <div class="divider"></div>
            ${
              education?.degree
                ? `<div class="item-title">${education.degree}</div>`
                : ""
            }
            ${
              education?.school
                ? `<div class="item-subtitle">${education.school}</div>`
                : ""
            }
            ${
              education?.graduationDate
                ? `<div class="meta">Graduated ${formatDate(
                    education.graduationDate
                  )}</div>`
                : ""
            }
            ${
              education?.city
                ? `<div class="meta">${education.city}</div>`
                : ""
            }
            ${
              education?.description
                ? `<div class="body-text">${education.description}</div>`
                : ""
            }
          </div>`
        : ""
    }

    ${
      skill?.name
        ? `<div class="section">
            <div class="section-title">Skills</div>
            <div class="divider"></div>
            <span class="skill">${skill.name}</span>
          </div>`
        : ""
    }
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