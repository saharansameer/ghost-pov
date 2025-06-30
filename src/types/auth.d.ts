export type SocialProvider = "google" | "github";

export type AuthMode = "sign-in" | "sign-up";

export type AuthProvider = "credential" | "google" | "github"

export interface AuthActionState {
  success: boolean;
  email?: string;
  rootError?: string;
  fieldError?: {
    email?: string;
    password?: string;
  };
}
