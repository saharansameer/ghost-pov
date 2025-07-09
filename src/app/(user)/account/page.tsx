export const revalidate = 60;

import { headers } from "next/headers";
import { getAuthProvider, getAuthUser } from "@/lib/auth/session";
import { getAvailableCredits } from "@/lib/auth/profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, Separator } from "@/components/ui";
import { User, Calendar, Shield, AlertTriangle, Coins } from "lucide-react";
import { ChangeEmailForm, DeleteAccountButton } from "@/components/client";
import { UserAvatar, NotSuccess } from "@/components/server";
import { getFormatDate } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account | GhostPOV",
  description: "Manage your account preferences and billing information.",
  robots: {
    index: false,
    follow: true,
  },
};

async function ProfileAndCreditsSection() {
  const user = await getAuthUser(await headers());

  if (!user) {
    return <NotSuccess message="Failed to load account details" />;
  }

  const [credits, provider] = await Promise.all([
    getAvailableCredits(user.id),
    getAuthProvider(user.id),
  ]);

  const isCredential = provider === "credential";
  const joinDate = getFormatDate(user?.createdAt as Date, "date-only");

  return (
    <>
      {/*Profile Section*/}
      <Card className="transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Profile Information</CardTitle>
              <CardDescription>Your personal account details</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar and Name */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <UserAvatar
              src={user?.image as string}
              altText={user?.name as string}
              scale={true}
            />
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {user?.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Member since {joinDate}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Email */}
          <ChangeEmailForm
            currEmail={user?.email as string}
            changesAllowed={isCredential}
            emailVerified={user?.emailVerified as boolean}
          />

          {/* Authentication Method */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-muted">
              <Shield className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">Authentication</p>
              <p className="text-muted-foreground">
                {isCredential
                  ? "Email & Password"
                  : `${provider === "google" ? "Google Account" : "Github Account"}`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credits Section */}
      <Card className="transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Coins className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Credits</CardTitle>
              <CardDescription>
                Manage your credits and purchase more
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Credits Summary */}
          <div className="p-2 rounded-lg border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Coins className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Available Credits
                  </h4>
                  <p
                    className={`text-3xl font-bold ${credits! < 3 ? "text-destructive" : "text-primary"}`}
                  >
                    {credits}
                  </p>
                </div>
              </div>
              <Link href="/buy-credits">
                <Button variant="outline">Buy More Credits</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-background transition-all">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Account Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account preferences and billing information
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}

          <ProfileAndCreditsSection />

          {/* Danger Zone */}
          <Card className="transition-all duration-300 hover:shadow-md border-destructive/50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <CardTitle className="text-xl text-destructive">
                    Danger Zone
                  </CardTitle>
                  <CardDescription>
                    Irreversible and destructive actions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-destructive mb-1">
                      Delete Account
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data.
                      This action cannot be undone.
                    </p>
                  </div>
                  <DeleteAccountButton />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
