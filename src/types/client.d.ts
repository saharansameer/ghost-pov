declare global {
  type ReactChildren = Readonly<{ children: React.ReactNode }>;

  type SocialProvider = "google" | "github"
  type AuthMode = "sign-in" | "sign-up"
}

export {};
