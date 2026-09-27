import { View } from "@react-pdf/renderer";
import {
  ResumePDFBulletList,
  ResumePDFSection,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeEducation } from "lib/redux/types";

export const ResumePDFEducation = ({
  heading,
  educations,
  themeColor,
  showBulletPoints,
}: {
  heading: string;
  educations: ResumeEducation[];
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {educations.map(
        ({ school, degree, date, gpa, descriptions = [] }, idx) => {
          const showDescriptions = descriptions.join("") !== "";

          return (
            <View key={idx} style={idx !== 0 ? { marginTop: spacing["2"] } : {}}>
              <View style={{ ...styles.flexRowBetween, alignItems: "center" }}>
                <ResumePDFText bold={true}>
                  {degree && school ? `${degree} — ${school}` : degree || school}
                </ResumePDFText>
                {date && (
                  <ResumePDFText style={{ fontSize: "9.5pt" }}>
                    {date}
                  </ResumePDFText>
                )}
              </View>
              {gpa && (
                <ResumePDFText
                  style={{
                    fontSize: "9pt",
                    color: "#525252",
                    marginTop: "1pt",
                  }}
                >
                  {gpa.includes("GPA") || gpa.includes("CGPA")
                    ? gpa
                    : `CGPA: ${gpa}`}
                </ResumePDFText>
              )}
              {showDescriptions && (
                <View style={{ ...styles.flexCol, marginTop: spacing["1"] }}>
                  <ResumePDFBulletList
                    items={descriptions}
                    showBulletPoints={showBulletPoints}
                  />
                </View>
              )}
            </View>
          );
        }
      )}
    </ResumePDFSection>
  );
};
