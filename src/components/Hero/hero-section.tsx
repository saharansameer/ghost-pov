"use client";

import { motion } from "framer-motion";
import { Badge, Button } from "@/components/ui";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageSquare,
  Sparkles,
  Share2,
  Shield,
  Brain,
  Plus,
  Send,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

const featureCards = [
  {
    icon: Shield,
    title: "Spam Filtering",
    description: "Auto-filter potential abuse or spam feedbacks.",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Smart summaries that highlight patterns and improvements.",
  },
  {
    icon: Share2,
    title: "Instant Sharing",
    description:
      "Generate shareable links in one click. No barriers, just feedback.",
  },
];

const workCards = [
  {
    icon: Plus,
    text: "Create",
    subtext: "Set up your feedback request",
  },
  {
    icon: Send,
    text: "Share",
    subtext: "Send your unique link anywhere",
  },
  {
    icon: MessageSquare,
    text: "Collect",
    subtext: "Receive anonymous responses",
  },
  {
    icon: BarChart3,
    text: "Analyze",
    subtext: "Get AI-powered insights",
  },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-7 pb-16"
    >
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-6 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Built for developers & professionals
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              The Simplest Way
              <br />
              to Get <span className="text-primary">Anonymous</span> Feedback
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            className="text-base text-muted-foreground max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Create an Echo, share the link, get honest feedbacks with zero
            friction, and let AI transform it into insights you can act on.
          </motion.p>

          {/* Single CTA */}
          <motion.div
            className="w-full pt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href={"/sign-up"}>
              <Button
                variant={"default"}
                size="lg"
                className="w-full max-w-60 text-base px-10 py-3 shadow-sm"
              >
                Get Started
              </Button>
            </Link>
          </motion.div>

          {/* Why Choose GhostPOV */}
          <motion.div
            className="pt-12 w-full max-w-5xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
              Why Choose <span className="text-primary">GhostPOV</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {featureCards.map((card, index) => (
                <Card
                  key={`${index}-ftcard`}
                  className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 py-4"
                >
                  <CardContent className="text-center">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-5 mx-auto">
                      <card.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* How It Works */}
          <motion.div
            className="pt-16 w-full max-w-5xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-gradient-to-br from-muted/30 to-muted/50 rounded-2xl p-6 border backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl"></div>
              <div className="relative">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
                  How It Works
                </h2>
                <div className="grid md:grid-cols-4 gap-4">
                  {workCards.map((card, index) => (
                    <div key={`${index}-wkcard`} className="text-center group">
                      <div className="relative mb-4">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto shadow-lg">
                          <card.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-primary font-bold text-xs">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-base font-semibold mb-1">
                        {card.text}
                      </h3>
                      <p className="text-muted-foreground text-xs">
                        {card.subtext}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
