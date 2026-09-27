import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFText,
  ResumeFeaturedSkill,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeSkills } from "lib/redux/types";

export const ResumePDFSkills = ({
  heading,
  skills,
  themeColor,
}: {
  heading: string;
  skills: ResumeSkills;
  themeColor: string;
  showBulletPoints?: boolean;
}) => {
  const { descriptions, featuredSkills } = skills;
  const featuredSkillsWithText = featuredSkills.filter((item) => item.skill);
  const featuredSkillsPair = [
    [featuredSkillsWithText[0], featuredSkillsWithText[3]],
    [featuredSkillsWithText[1], featuredSkillsWithText[4]],
    [featuredSkillsWithText[2], featuredSkillsWithText[5]],
  ];

  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {featuredSkillsWithText.length > 0 && (
        <View style={{ ...styles.flexRowBetween, marginTop: spacing["0.5"] }}>
          {featuredSkillsPair.map((pair, idx) => (
            <View key={idx} style={{ ...styles.flexCol }}>
              {pair.map((featuredSkill, idx) => {
                if (!featuredSkill) return null;
                return (
                  <ResumeFeaturedSkill
                    key={idx}
                    skill={featuredSkill.skill}
                    rating={featuredSkill.rating}
                    themeColor={themeColor}
                    style={{
                      justifyContent: "flex-end",
                    }}
                  />
                );
              })}
            </View>
          ))}
        </View>
      )}

      {descriptions && descriptions.length > 0 && (
        <View style={{ ...styles.flexCol, marginTop: "1pt" }}>
          {descriptions.map((desc, idx) => {
            const colonIdx = desc.indexOf(":");
            if (colonIdx !== -1) {
              const label = desc.slice(0, colonIdx + 1);
              const content = desc.slice(colonIdx + 1);
              return (
                <View
                  key={idx}
                  style={{
                    ...styles.flexRow,
                    marginTop: "1.5pt",
                    flexWrap: "wrap",
                  }}
                >
                  <ResumePDFText bold={true} style={{ fontSize: "9.5pt" }}>
                    {label}
                  </ResumePDFText>
                  <ResumePDFText style={{ fontSize: "9.5pt" }}>
                    {content}
                  </ResumePDFText>
                </View>
              );
            }
            return (
              <ResumePDFText
                key={idx}
                style={{ fontSize: "9.5pt", marginTop: "1.5pt" }}
              >
                {desc}
              </ResumePDFText>
            );
          })}
        </View>
      )}
    </ResumePDFSection>
  );
};
