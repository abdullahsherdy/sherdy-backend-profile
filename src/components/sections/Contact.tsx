import { useState } from "react";
import { Github, Linkedin, Youtube } from "lucide-react";
import emailjs from "emailjs-com";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import MagneticButton from "@/components/MagneticButton";
import { socials } from "@/data/portfolio";

type FormErrors = { name?: string; email?: string; message?: string };

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setLoading(true);
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(
      () => {
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I'll get back to you soon!",
        });
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
        setLoading(false);
      },
      () => {
        toast({
          title: "Error",
          description: "There was an error sending your message. Please try again.",
        });
        setLoading(false);
      }
    );
  };

  return (
    <section id="contact" className="py-16 px-4 bg-muted/50 scroll-mt-24" data-section>
      <div className="container mx-auto max-w-2xl">
        <SectionHeading eyebrow="Say hello" title="Get In Touch" />
        <AnimatedSection animation="fade-up" delay={200}>
          <Card className="hover-scale magnetic-hover transition-colors border-border/60 hover:border-primary/40 hover:bg-primary/5">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={loading}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="text-destructive text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={loading}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="text-destructive text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Textarea
                    placeholder="Your Message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    disabled={loading}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="text-destructive text-sm mt-1">{errors.message}</p>
                  )}
                </div>
                <MagneticButton type="submit" className="w-full" disabled={loading}>
                  {loading ? <span className="animate-spin mr-2 inline-block border-2 border-t-transparent border-white rounded-full w-4 h-4 align-middle"></span> : null}
                  {loading ? "Sending..." : "Send Message"}
                </MagneticButton>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Prefer email?{" "}
                <a href={`mailto:${socials.email}`} className="link-underline hover:text-primary transition-colors">
                  {socials.email}
                </a>
              </p>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex justify-center gap-4">
                  <MagneticButton variant="outline" size="sm">
                    <Github className="mr-2 h-4 w-4" />
                    <a href={socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  </MagneticButton>
                  <MagneticButton variant="outline" size="sm">
                    <Linkedin className="mr-2 h-4 w-4" />
                    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </MagneticButton>
                  <MagneticButton variant="outline" size="sm">
                    <Youtube className="mr-2 h-4 w-4" />
                    <a href={socials.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
                  </MagneticButton>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  <a href={socials.leetcode} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-primary transition-colors">
                    Check out my LeetCode profile
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contact;
