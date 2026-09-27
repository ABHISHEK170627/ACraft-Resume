import { View } from "@react-pdf/renderer";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import {
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import type { ResumeProfile } from "lib/redux/types";

export const ResumePDFProfile = ({
  profile,
  themeColor,
  isPDF,
}: {
  profile: ResumeProfile;
  themeColor: string;
  isPDF: boolean;
}) => {
  const { name, email, phone, url, summary, location } = profile;

  // Split multiple URLs if comma or space separated, or single url
  const urls = url ? url.split(",").map((u) => u.trim()).filter(Boolean) : [];

  const contactItems = [
    email ? { type: "email", value: email, href: `mailto:${email}` } : null,
    phone ? { type: "phone", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` } : null,
    location ? { type: "location", value: location, href: null } : null,
  ].filter(Boolean) as { type: string; value: string; href: string | null }[];

  return (
    <ResumePDFSection style={{ marginTop: spacing["3"], alignItems: "center" }}>
      <ResumePDFText
        bold={true}
        themeColor={themeColor}
        style={{
          fontSize: "20pt",
          textAlign: "center",
          letterSpacing: "0.5pt",
          textTransform: "uppercase",
        }}
      >
        {name}
      </ResumePDFText>

      {summary && (
        <ResumePDFText
          style={{
            fontSize: "9.5pt",
            textAlign: "center",
            marginTop: "1.5pt",
            color: "#404040",
          }}
        >
          {summary}
        </ResumePDFText>
      )}

      {contactItems.length > 0 && (
        <View
          style={{
            ...styles.flexRow,
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: "2.5pt",
          }}
        >
          {contactItems.map((item, idx) => (
            <View key={idx} style={{ ...styles.flexRow, alignItems: "center" }}>
              {idx > 0 && (
                <ResumePDFText style={{ marginHorizontal: "4pt", color: "#525252" }}>
                  {"·"}
                </ResumePDFText>
              )}
              {item.href ? (
                <ResumePDFLink src={item.href} isPDF={isPDF}>
                  <ResumePDFText style={{ fontSize: "9pt", color: "#1d4ed8" }}>
                    {item.value}
                  </ResumePDFText>
                </ResumePDFLink>
              ) : (
                <ResumePDFText style={{ fontSize: "9pt" }}>{item.value}</ResumePDFText>
              )}
            </View>
          ))}
        </View>
      )}

      {urls.length > 0 && (
        <View
          style={{
            ...styles.flexRow,
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: "1.5pt",
          }}
        >
          {urls.map((rawUrl, idx) => {
            const href = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
            return (
              <View key={idx} style={{ ...styles.flexRow, alignItems: "center" }}>
                {idx > 0 && (
                  <ResumePDFText style={{ marginHorizontal: "4pt", color: "#525252" }}>
                    {"·"}
                  </ResumePDFText>
                )}
                <ResumePDFLink src={href} isPDF={isPDF}>
                  <ResumePDFText style={{ fontSize: "9pt", color: "#1d4ed8" }}>
                    {rawUrl}
                  </ResumePDFText>
                </ResumePDFLink>
              </View>
            );
          })}
        </View>
      )}
    </ResumePDFSection>
  );
};
