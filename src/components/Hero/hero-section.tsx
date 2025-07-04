"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Share2, Shield } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="flex items-center justify-center pt-10 pb-20">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Built for developers & professionals
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Get <span className="text-primary">Anonymous</span> Feedback
              <br />
              Without the Friction
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Create anonymous feedback posts called &ldquo;echos&rdquo; and share
            them publicly. Get feedbacks and Generate AI-powered insights from
            real responses.
          </motion.p>

          {/* Feature highlights */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-primary" />
              Instant Sharing
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Complete Anonymity
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI-powered Insights
            </div>
          </motion.div>

          {/* Why Choose GhostPOV */}
          <motion.div
            className="pt-20 w-full max-w-6xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              How <span className="text-primary">GhostPOV</span> works?
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-16"></div>
          </motion.div>

          {/* Space for OG image */}
          <motion.div
            className="pt-12 w-full max-w-2xl h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p>OG Image Place Holder</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
