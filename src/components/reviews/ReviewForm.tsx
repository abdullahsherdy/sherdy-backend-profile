import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, PenLine } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MagneticButton from "@/components/MagneticButton";
import StarRating from "./StarRating";
import { useToast } from "@/hooks/use-toast";
import { submitReview, type ReviewInput } from "@/lib/reviews";
import { REVIEWS_QUERY_KEY } from "@/hooks/useReviews";

const MIN_QUOTE = 10;
const MAX_QUOTE = 600;
// Parity with the DB column caps so oversize input is caught client-side, not by a failed insert.
const MAX_NAME = 80;
const MAX_ROLE = 60;

interface FormErrors {
  name?: string;
  role?: string;
  rating?: string;
  quote?: string;
}

const emptyForm = {
  name: "",
  role: "",
  org: "",
  category: "teaching" as ReviewInput["category"],
  rating: 0,
  quote: "",
  website: "", // honeypot — real users leave this blank
};

interface ReviewFormProps {
  triggerLabel?: string;
  triggerVariant?: "default" | "outline" | "secondary" | "ghost";
  triggerSize?: "default" | "sm" | "lg";
}

/**
 * "Write a review" dialog. Mirrors the controlled-input + validate() + useToast
 * pattern from Contact.tsx. Owns its own open state and renders its own trigger
 * (MagneticButton wired via onClick) rather than using DialogTrigger asChild,
 * because MagneticButton doesn't forward refs/props that Radix's Slot needs.
 */
const ReviewForm = ({
  triggerLabel = "Write a review",
  triggerVariant = "default",
  triggerSize = "default",
}: ReviewFormProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (input: ReviewInput) => submitReview(input),
    onSuccess: () => {
      toast({
        title: "Thank you!",
        description: "Your review is now live on the site — thanks for sharing.",
      });
      setForm(emptyForm);
      setErrors({});
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: REVIEWS_QUERY_KEY });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Your review couldn't be submitted. Please try again.",
      });
    },
  });

  const loading = mutation.isPending;

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    const nameLength = form.name.trim().length;
    if (nameLength < 2) next.name = "Please enter your name.";
    else if (nameLength > MAX_NAME) next.name = `Please keep your name under ${MAX_NAME} characters.`;
    const roleLength = form.role.trim().length;
    if (roleLength < 2) next.role = "Please add your role (e.g. Student, Client).";
    else if (roleLength > MAX_ROLE) next.role = `Please keep your role under ${MAX_ROLE} characters.`;
    if (form.rating < 1) next.rating = "Please select a star rating.";
    const quoteLength = form.quote.trim().length;
    if (quoteLength < MIN_QUOTE) next.quote = `Please write at least ${MIN_QUOTE} characters.`;
    else if (quoteLength > MAX_QUOTE) next.quote = `Please keep it under ${MAX_QUOTE} characters.`;
    return next;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Honeypot: bots fill hidden fields. Pretend success, submit nothing.
    if (form.website.trim() !== "") {
      setForm(emptyForm);
      setOpen(false);
      return;
    }
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    mutation.mutate({
      name: form.name,
      role: form.role,
      org: form.org,
      category: form.category,
      rating: form.rating,
      quote: form.quote,
    });
  };

  const quoteCount = form.quote.trim().length;

  return (
    <>
      <MagneticButton variant={triggerVariant} size={triggerSize} onClick={() => setOpen(true)}>
        <span className="flex items-center">
          <PenLine className="mr-2 h-4 w-4" />
          {triggerLabel}
        </span>
      </MagneticButton>

      <Dialog open={open} onOpenChange={(next) => { if (!loading) setOpen(next); }}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Share your experience</DialogTitle>
            <DialogDescription>
              Students, parents, and clients welcome. Your review appears on the site as soon as you submit.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Honeypot — off-screen, hidden from assistive tech, not tab-reachable */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />

            <div>
              <Label htmlFor="review-name">Name</Label>
              <Input
                id="review-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                disabled={loading}
                required
                maxLength={MAX_NAME}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "review-name-error" : undefined}
              />
              {errors.name && (
                <p id="review-name-error" className="mt-1 text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="review-role">Role</Label>
                <Input
                  id="review-role"
                  placeholder="Student, Parent, Client…"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  disabled={loading}
                  required
                  maxLength={MAX_ROLE}
                  aria-invalid={Boolean(errors.role)}
                  aria-describedby={errors.role ? "review-role-error" : undefined}
                />
                {errors.role && (
                  <p id="review-role-error" className="mt-1 text-sm text-destructive">{errors.role}</p>
                )}
              </div>
              <div>
                <Label htmlFor="review-org">
                  Course / company <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="review-org"
                  value={form.org}
                  onChange={(e) => setForm({ ...form, org: e.target.value })}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <Label className="mb-2 block">What did I help with?</Label>
              <RadioGroup
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v as ReviewInput["category"] })}
                className="grid grid-cols-2 gap-2"
                disabled={loading}
              >
                <Label
                  htmlFor="cat-teaching"
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-border/60 p-3 text-sm transition-colors hover:border-accent/60 hover:bg-accent/5 [&:has([data-state=checked])]:border-accent [&:has([data-state=checked])]:bg-accent/5"
                >
                  <RadioGroupItem value="teaching" id="cat-teaching" />
                  Teaching / mentoring
                </Label>
                <Label
                  htmlFor="cat-engineering"
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-border/60 p-3 text-sm transition-colors hover:border-primary/40 hover:bg-primary/5 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
                >
                  <RadioGroupItem value="engineering" id="cat-engineering" />
                  Engineering / freelance
                </Label>
              </RadioGroup>
            </div>

            <div>
              <Label className="mb-2 block">Rating</Label>
              <StarRating
                value={form.rating}
                onChange={(v) => setForm({ ...form, rating: v })}
                size={28}
                describedById={errors.rating ? "review-rating-error" : undefined}
              />
              {errors.rating && (
                <p id="review-rating-error" className="mt-1 text-sm text-destructive">{errors.rating}</p>
              )}
            </div>

            <div>
              <Label htmlFor="review-quote">Your review</Label>
              <Textarea
                id="review-quote"
                rows={4}
                maxLength={MAX_QUOTE}
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                disabled={loading}
                required
                aria-invalid={Boolean(errors.quote)}
                aria-describedby={errors.quote ? "review-quote-error" : "review-quote-count"}
              />
              <div className="mt-1 flex items-center justify-between gap-2">
                {errors.quote ? (
                  <p id="review-quote-error" className="text-sm text-destructive">{errors.quote}</p>
                ) : (
                  <span />
                )}
                <span id="review-quote-count" className="text-xs text-muted-foreground">
                  {quoteCount}/{MAX_QUOTE}
                </span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              By submitting, you agree your name, role, and review may be shown publicly on this site.
            </p>

            <MagneticButton type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting…
                </span>
              ) : (
                "Submit review"
              )}
            </MagneticButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReviewForm;
