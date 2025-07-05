"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import {
  Check,
  X,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Zap,
  Flame,
} from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for testing the waters",
    icon: MessageSquare,
    features: [
      {
        text: "10 echos per month",
        tooltip: "Create and share upto 10 echos per month",
      },
      {
        text: "2 AI summary credits",
        tooltip: "Only 2, not monthly",
      },
      {
        text: "7 days feedback retention",
        tooltip: "Feedbacks will be removed after 7 days",
      },
      {
        text: "Auto Spam Filtering",
        cross: true,
      },
      {
        text: "Add-on AI Summary Credits",
        cross: true,
      },
      {
        text: "Larger Token Size",
        cross: true,
      },
    ],
    cta: "Get Started For Free",
    popular: false,
  },
  {
    name: "Plus",
    price: "$20",
    description: "Best value for serious feedback seekers",
    icon: Flame,
    features: [
      {
        text: "Unlimited echos",
        tooltip: "Create as many feedback requests as you need",
      },
      {
        text: "50 AI summary credits",
        tooltip: "Each AI summary costs 1 credit",
      },
      {
        text: "90 days feedback retention",
        tooltip: "Keep your feedback for 3 months",
      },
      {
        text: "Auto Spam Filtering",
        tooltip: "Auto-filter potential abuse or spam feedbacks",
      },
      {
        text: "Add-on AI Summary Credits",
        tooltip: "You will able to purchase AI Summary Credits",
      },
      {
        text: "Larger Token Size",
      },
    ],
    cta: "Get Lifetime Access",
    popular: true,
  },
  {
    name: "Pro",
    price: "$50",
    description: "Best value for professionals",
    icon: Zap,
    features: [
      {
        text: "Unlimited echos",
        tooltip: "Create as many feedback requests as you need",
      },
      {
        text: "200 AI summary credits",
        tooltip: "Each AI summary costs 1 credit",
      },
      {
        text: "300 days feedback retention",
        tooltip: "Keep your feedback for 10 months",
      },
      {
        text: "Auto Spam Filtering",
        tooltip: "Auto-filter potential abuse or spam feedbacks",
      },
      {
        text: "Add-on AI Summary Credits",
        tooltip: "You will able to purchase AI Summary Credits",
      },
      {
        text: "Largest Token Size",
      },
    ],
    cta: "Get Lifetime Access",
    popular: false,
  },
];

type FeatureType = { text: string; tooltip?: string; cross?: boolean };

export default function PricingSection() {
  return (
    <section className="pt-10 pb-20">
      <div className="px-4 md:px-6">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="secondary" className="px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Simple, Transparent Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Choose Your <span className="text-primary">Feedback</span> Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you need more. No subscriptions, no hidden
            fees.
          </p>
        </motion.div>

        <TooltipProvider>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card
                  className={`h-full ${plan.popular ? "border-primary ring-2 ring-primary/20" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="px-4 py-1">Most Popular</Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
                      <plan.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {plan.description}
                    </CardDescription>
                    <div className="pt-4">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold">{plan.price}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {plan.features.map(
                      (feature: FeatureType, featureIndex: number) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-3"
                        >
                          {feature.cross ? (
                            <X className="w-5 h-5 text-destructive flex-shrink-0" />
                          ) : (
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                          )}

                          <span className="text-sm flex-1">{feature.text}</span>
                          {feature.tooltip && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>{feature.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      )
                    )}
                  </CardContent>

                  <CardFooter className="mt-auto sticky">
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TooltipProvider>

        {/* Additional info */}
        <motion.div
          className="text-center mt-16 space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground">
            All plans include secure, anonymous feedback collection and public
            sharing capabilities.
          </p>
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
