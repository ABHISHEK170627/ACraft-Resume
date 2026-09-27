import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeWorkExperience } from "lib/redux/types";

export const ResumePDFWorkExperience = ({
  heading,
  workExperiences,
  themeColor,
}: {
  heading: string;
  workExperiences: ResumeWorkExperience[];
  themeColor: string;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {workExperiences.map(({ company, jobTitle, date, descriptions }, idx) => {
        return (
          <View key={idx} style={idx !== 0 ? { marginTop: spacing["2"] } : {}}>
            <View style={{ ...styles.flexRowBetween, alignItems: "center" }}>
              <ResumePDFText bold={true}>
                {jobTitle && company
                  ? `${jobTitle} — ${company}`
                  : jobTitle || company}
              </ResumePDFText>
              {date && (
                <ResumePDFText style={{ fontSize: "9.5pt" }}>
                  {date}
                </ResumePDFText>
              )}
            </View>
            {descriptions && descriptions.length > 0 && (
              <View style={{ ...styles.flexCol, marginTop: spacing["1"] }}>
                <ResumePDFBulletList items={descriptions} />
              </View>
            )}
          </View>
        );
      })}
    </ResumePDFSection>
  );
};
