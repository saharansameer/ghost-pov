"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, MessageSquare, Zap } from "lucide-react";
import Link from "next/link";

const freeTierFeatures = [
  "Includes 10 AI credits",
  "AI-powered Summary & Insights",
  "Anonymous Feedback Collection",
  "Auto Spam Filtering",
  "Shareable Links",
];

const creditsFeatures = [
  "Credits Never Expire",
  "No Subscription Needed",
  "No Credit Card Required",
  "Flexible Payment Options",
];

export default function PricingSection() {
  return (
    <section id="pricing" className="flex flex-col items-center pt-10 pb-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Simple, <span className="text-primary">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you need more. No subscriptions, no hidden
            fees.
          </p>
        </motion.div>

        <div className="w-full flex justify-center">
          <div className="flex flex-col items-center sm:flex-row gap-20 max-w-4xl w-full">
            {/* Free Plan */}
            <motion.div
              className="w-full max-w-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader className="text-center pb-8">
                  <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Free</CardTitle>
                  <CardDescription className="text-base">
                    Start collecting feedback instantly
                  </CardDescription>
                  <div className="pt-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">$0</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 h-44">
                  {freeTierFeatures.map((feature, index) => (
                    <div
                      key={`${index}-featitem`}
                      className="flex items-center gap-3"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </CardContent>

                <CardFooter className="pt-8 mt-auto">
                  <Link href={"/sign-up"} className="w-full">
                    <Button className="w-full" size="lg">
                      Get Started For Free
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Buy Credits Plan */}
            <motion.div
              className="w-full max-w-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader className="text-center pb-8">
                  <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Credits</CardTitle>
                  <CardDescription className="text-base">
                    Get more AI-powered insights
                  </CardDescription>
                  <div className="pt-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">$3</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 h-44">
                  {creditsFeatures.map((feature, index) => (
                    <div
                      key={`${index}-featitem`}
                      className="flex items-center gap-3"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </CardContent>

                <CardFooter className="pt-8 mt-auto">
                  <Link href={"/buy-credits"} className="w-full">
                    <Button className="w-full" size="lg">
                      Purchase Credits
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Additional info */}
        <motion.div
          className="text-center mt-16 space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              No setup fees
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              No recurring payments
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              Pay as you go
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
