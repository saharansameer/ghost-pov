import { headers } from "next/headers";
import { getAuthProvider, getAuthUser } from "@/lib/auth/session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  User,
  CreditCard,
  Calendar,
  Shield,
  Trash2,
  AlertTriangle,
  Crown,
  Calendar as CalendarIcon,
} from "lucide-react";
import Image from "next/image";
import { ChangeEmailForm } from "@/components/User/ChangeEmailForm";
import { getFormatDate } from "@/lib/utils";

export default async function AccountPage() {
  const user = await getAuthUser(await headers());
  const provider = await getAuthProvider(user!.id);
  const isCredential = provider === "credential";

  // Mock data for demonstration
  const userData = {
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    avatar: user?.image || null,
    joinDate: getFormatDate(user?.createdAt as Date, "date-only"),
    plan: "Pro",
    billingCycle: "Monthly",
    nextBilling: "August 15, 2024",
    paymentMethod: "**** **** **** 4242",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Account Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account preferences and billing information
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Profile Information</CardTitle>
                  <CardDescription>
                    Your personal account details
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar and Name */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-semibold shadow-lg">
                    {userData.avatar ? (
                      <Image
                        src={userData.avatar}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-2xl font-semibold text-foreground">
                      {userData.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {userData.joinDate}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Email */}
              <ChangeEmailForm
                currEmail={userData.email}
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

          {/* Billing Section */}
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Billing Information</CardTitle>
                  <CardDescription>
                    Manage your subscription and payment details
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Plan */}
              <div className="p-4 rounded-lg bg-accent border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Crown className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {userData.plan} Plan
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Billed {userData.billingCycle.toLowerCase()}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Upgrade Plan
                  </Button>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-muted">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Payment Method
                    </p>
                    <p className="text-muted-foreground">
                      {userData.paymentMethod}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Update Payment
                </Button>
              </div>

              {/* Next Billing */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-muted">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Next Billing Date
                  </p>
                  <p className="text-muted-foreground">
                    {userData.nextBilling}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1">
                  View Billing History
                </Button>
                <Button variant="outline" className="flex-1">
                  Download Invoices
                </Button>
              </div>
            </CardContent>
          </Card>

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
                  <Button
                    variant="destructive"
                    size="sm"
                    className="shrink-0 transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
