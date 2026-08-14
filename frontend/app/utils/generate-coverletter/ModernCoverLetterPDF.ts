import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";
import { CoverLetterData } from "../../types/cover-letter";

export function generateModernCoverLetterHTML({
  header,
  body,
  footer,
}: CoverLetterData): string {
  const fullName = `${header?.firstName ?? ""} ${header?.lastName ?? ""}`.trim();

  const contactItems = [header?.email, header?.phone].filter(Boolean);

  const contactBlock =
    contactItems.length > 0
      ? contactItems
          .map(
            (item) =>
              `<div class="contact-item">${item}</div>`
          )
          .join("")
      : "";

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
      line-height: 1.5;
      font-size: 13px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 48px 48px 0 48px;
    }

    .name {
      font-size: 22px;
      font-weight: 700;
      color: #000000;
      flex: 1;
      padding-right: 24px;
    }

    .contact-block {
      text-align: right;
      flex-shrink: 0;
    }

    .contact-item {
      font-size: 13px;
      color: #000000;
      line-height: 1.5;
      margin-bottom: 4px;
    }

    .contact-item:last-child {
      margin-bottom: 0;
    }

    .content {
      padding: 40px 48px 40px 48px;
    }

    .body-text {
      font-size: 13px;
      color: #000000;
      line-height: 1.6;
      white-space: pre-wrap;
      margin-bottom: 36px;
    }

    .footer-text {
      font-size: 13px;
      color: #000000;
      line-height: 1.6;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${fullName || "Your Name"}</div>
    ${
      contactBlock
        ? `<div class="contact-block">${contactBlock}</div>`
        : ""
    }
  </div>

  <div class="content">
    ${
      body?.body
        ? `<div class="body-text">${body.body}</div>`
        : ""
    }

    ${
      footer?.footer
        ? `<div class="footer-text">${footer.footer}</div>`
        : ""
    }
  </div>
</body>
</html>
  `;
}

export async function downloadModernCoverLetterPDF(data: CoverLetterData): Promise<void> {
  try {
    const html = generateModernCoverLetterHTML(data);

    const { uri } = await Print.printToFileAsync({
      html,
      base64: false,
    });

    const canShare = await Sharing.isAvailableAsync();

    if (canShare) {
      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: "Download Cover Letter",
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