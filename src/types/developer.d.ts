export interface Developer {
  id: number;
  name: string;
  email: string;
  level: SENIOR | JUNIOR;
}

export interface DeveloperInput {
  name: string;
  email: string;
  level?: SENIOR | JUNIOR;
}

export interface DeveloperUpdate {
  id: number;
  name?: string;
  email?: string;
  level?: SENIOR | JUNIOR;
}

export type Query = {
  developers: Developer[];
  developer: Developer | null;
  developersByLevel: Developer[];
};

export type Mutation = {
  createDeveloper: Developer;
  updateDeveloper: Developer;
  deleteDeveloper: boolean;
};
