export type Skill = {
  id: number;
  learnedBy: number[];
  name: string;
  proficiency: number;
  type: number;
  yearLearned?: number;
};

export type SkillFormData = Skill & {
  id?: number;
};
