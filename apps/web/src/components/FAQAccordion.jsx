import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Can I place a booking with multi-point pick-up and drop?',
    answer: 'Yes, you can. However, costs for the extra point of delivery or pick-up will be charged accordingly.'
  },
  {
    question: 'Will I be charged a cancellation fee if I cancel my shipment?',
    answer: 'If you cancel the shipment before it is dispatched, no cancellation fees will be charged. But if the shipment is dispatched or has reached the pickup location, a cancellation fee applies.'
  },
  {
    question: 'How is Globe Express Logistics rated?',
    answer: 'With a strong belief in customer satisfaction, we have acquired a stellar rating of 4.7/5 for our overall experience.'
  },
  {
    question: 'What if my shipment is delayed?',
    answer: 'We strive for on-time delivery. However, in unforeseen circumstances, please contact our Transport Nagar office immediately, and our support team will resolve the issue.'
  },
  {
    question: 'Do you provide overseas transportation?',
    answer: 'No. To ensure the highest level of reliability and speed, we specialize exclusively in secure, nationwide ground transportation across India using our dedicated road fleet.'
  },
  {
    question: 'Do you provide logistics facilities for chemicals?',
    answer: 'Transporting chemicals requires specific licenses. Please contact our team directly to discuss your chemical logistics requirements and verify our current licensing capabilities.'
  }
];

function FAQAccordion() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{letterSpacing: '-0.02em'}}>
          Frequently asked questions
        </h2>
        <p className="text-center text-muted-foreground mb-12 mx-auto">
          Find answers to common questions about our logistics services
        </p>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-all duration-200"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default FAQAccordion;