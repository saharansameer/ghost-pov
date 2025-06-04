"use client";

import React from "react";
import { Button, Card, Input } from "@/components/ui";
import {
  Share2,
  Ghost,
  Brain,
  Zap,
  Shield,
  Mail,
  Code,
  Github,
} from "lucide-react";
import { addEmailToWaitlist } from "@/lib/waitlist";
import Link from "next/link";

export function Hero() {
  const [email, setEmail] = React.useState("");
  const onClickHandler = async () => {
    if (email.trim() === "") return;
    await addEmailToWaitlist(email);
    setEmail("");
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Ghost className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">GhostPOV</span>
          </div>
          <Link href="https://github.com/saharansameer/ghost-pov">
            <Button variant={"outline"} className="cursor-pointer">
              <Github style={{ width: "20px", height: "20px" }} />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Development Status Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary border border-border text-secondary-foreground text-sm font-medium mb-4">
            <Code className="w-4 h-4 mr-2" />
            Currently in Development
          </div>
          {/* Main Headline */}
          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Get <span className="text-primary">Honest Feedback</span>
            <br />
            Without the Awkwardness
          </h1>

          {/* Subheading */}
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            We&apos;re building the simplest way to collect anonymous feedback.
            Create shareable links, get honest insights, and receive AI-powered
            summaries of feedbacks that help you improve.
          </p>

          {/* Email Signup Form */}
          <div className="max-w-md mx-auto mb-16">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                onClick={onClickHandler}
              >
                Join Waitlist
                <Mail className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              No spam, just updates on our progress and early access.
            </p>
          </div>

          {/* Building in Public Progress */}
          <div className="bg-card border border-border rounded-lg p-6 mb-16">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-primary mr-2" />
              <span className="text-foreground font-semibold">
                Building in Public
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 mb-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${process.env.NEXT_PUBLIC_PROGRESS_PERCENT}` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground">
              {process.env.NEXT_PUBLIC_PROGRESS_PERCENT} Completed
            </p>
          </div>

          {/* Upcoming Feature Cards */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Upcoming Features
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="bg-card border-border p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Share2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Instant Sharing
                </h3>
                <p className="text-muted-foreground">
                  Generate shareable links in one click. No accounts, no
                  barriers, just feedback.
                </p>
              </Card>

              <Card className="bg-card border-border p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Complete Anonymity
                </h3>
                <p className="text-muted-foreground">
                  Full privacy for feedback givers. No tracking, no profiles,
                  just honest opinions.
                </p>
              </Card>

              <Card className="bg-card border-border p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  AI-Powered Insights
                </h3>
                <p className="text-muted-foreground">
                  Smart summaries that highlight patterns and actionable
                  improvements.
                </p>
              </Card>
            </div>
          </div>

          {/* How It Will Work */}
          <div className="bg-muted/50 rounded-2xl p-8 border border-border mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              How It Will Work
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold text-xl">
                    1
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Create
                </h3>
                <p className="text-muted-foreground text-sm">
                  Describe what you want feedback on
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold text-xl">
                    2
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Share
                </h3>
                <p className="text-muted-foreground text-sm">
                  Share your unique link with anyone, anywhere
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold text-xl">
                    3
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Collect
                </h3>
                <p className="text-muted-foreground text-sm">
                  Receive anonymous feedback instantly
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold text-xl">
                    4
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Improve
                </h3>
                <p className="text-muted-foreground text-sm">
                  Get AI-powered insights and summaries
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Ghost className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              GhostPOV
            </span>
          </div>
          <div className="flex space-x-6 text-muted-foreground text-sm">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
