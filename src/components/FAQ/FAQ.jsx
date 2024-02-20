import React from "react";
import "./FAQ.css";
const FAQ = () => {
  const faqs = [
    {
      question: "How do I book a consultation?",
      answer:
        'You can book a consultation by clicking on the "Book Consult" tab.',
    },
    {
      question: "Can I order medicine online?",
      answer:
        'Yes, you can order medicine online by navigating to the "Order Medicine" section.',
    },
    {
      question: "How are lab tests conducted?",
      answer:
        'Lab tests are conducted by certified professionals. You can schedule a lab test through our "Lab Test" section.',
    },
  ];

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <ul>
        {faqs.map((faq, index) => (
          <li key={index}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
