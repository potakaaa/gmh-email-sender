import FormSection from "@/components/pages/contact/form-section";
import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-7 px-6 py-12 w-full sm:max-w-xl">
      <section className="flex flex-col gap-1">
        <h1 className="drop-shadow-sm font-bold text-primary text-xl">
          Hello, I'm Gerald!
        </h1>
        <p className="text-muted-foreground text-xs">From Monark CAT Company</p>
      </section>
      <FormSection />
    </div>
  );
};

export default Contact;
