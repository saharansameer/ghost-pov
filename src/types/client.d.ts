declare global {
  // Common Children Props Type
  type ReactChildren = Readonly<{ children: React.ReactNode }>;

  // Auth Types
  type SocialProvider = "google" | "github"
  type AuthMode = "sign-in" | "sign-up"
}

export {};
