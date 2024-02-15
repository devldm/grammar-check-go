export type solution = {
  ID: string;
  CreatedAt: string;
  UpdatedAt: string;
  GrammarID: string;
  UserID: string;
  Solution: string;
  Grammar: string;
};

export type solutionPost = {
  solution: FormDataEntryValue;
  grammar_id: string;
  user_id: string;
};

export type solutionWithUserData = {
  ID: string;
  CreatedAt: string;
  UpdatedAt: string;
  GrammarID: string;
  UserID: string;
  Solution: string;
  Grammar: string;
  ClerkUsername: string;
  ClerkEmail: string;
  ClerkImage: string;
  UserID_2: string;
};
