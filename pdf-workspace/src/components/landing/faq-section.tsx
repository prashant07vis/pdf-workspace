import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/constants";

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-ink-200 dark:border-ink-800 bg-ink-50 dark:bg-ink-950/50 px-3 py-1 text-xs font-medium text-ink-700 dark:text-ink-300 mb-4">
            FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-4">
            Questions? We have answers.
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about PDF Workspace.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-0">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-base font-medium hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
