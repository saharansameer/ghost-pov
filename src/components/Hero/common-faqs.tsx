"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqArray = { value: string; trigger: string; content: React.ReactNode }[];

/*
  {
    item: "",
    trigger: "",
    content: <></>,
  },
*/

const faqs: FaqArray = [
  {
    value: "item-1",
    trigger: "What is an Echo?",
    content: (
      <>
        <p>
          An Echo is like a post where you share your thoughts or questions. It
          only needs a title and description. Once created, you can share its
          link to receive anonymous feedback from others.
        </p>
      </>
    ),
  },
  {
    value: "item-2",
    trigger: "What are Credits and why are they needed?",
    content: (
      <>
        <p>
          Credits are used to generate AI-powered summaries and insights. Every
          new user gets 2 free credits after signing up.
        </p>
      </>
    ),
  },
  {
    value: "item-3",
    trigger: "Can I get a refund?",
    content: (
      <>
        <p>
          No, refunds aren&apos;t available. Make payment only if you&apos;re sure.
        </p>
      </>
    ),
  },
  {
    value: "item-4",
    trigger: "What if someone sends abusive or spam feedbacks?",
    content: (
      <>
        <p>
          Each feedback message is passed through our spam filtering process.
          Potential abuse or spam feedbacks are flagged and kept in separate
          spam list.
        </p>
        <p>
          You can also move messages to the spam list or remove them from it
          anytime.
        </p>
      </>
    ),
  },
];

export function CommonFaqs() {
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mb-40 px-2"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold text-center mt-10 mb-7">
        Common <span className="text-primary">FAQ</span>s
      </h2>
      <Accordion type="single" collapsible className="w-full" defaultValue="">
        {faqs.map((faq, index) => (
          <AccordionItem key={`${index}-fqit`} value={faq.value}>
            <AccordionTrigger className="font-semibold text-lg">{faq.trigger}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {faq.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
}
