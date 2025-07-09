export type Skill = {
  id: number;
  learnedBy: string[];
  name: string;
  proficiency: string;
  type: string;
  yearLearned?: number;
};

export type SkillFormData = Skill & {
  id?: number;
};
