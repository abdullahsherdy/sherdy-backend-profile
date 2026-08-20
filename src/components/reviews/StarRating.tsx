import { useState, type KeyboardEvent } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  /** Provide to make the widget interactive; omit for a read-only display. */
  onChange?: (value: number) => void;
  /** Star size in px (default 20). */
  size?: number;
  className?: string;
  id?: string;
}

const STARS = [1, 2, 3, 4, 5] as const;

/**
 * Star rating widget. No shadcn primitive exists for this, so it's built from
 * lucide `Star` icons. Read-only when `onChange` is omitted (renders as an image
 * with an aria-label); an accessible radiogroup with keyboard support when interactive.
 */
const StarRating = ({ value, onChange, size = 20, className, id }: StarRatingProps) => {
  const [hover, setHover] = useState(0);
  const interactive = typeof onChange === "function";

  if (!interactive) {
    const rounded = Math.round(value);
    return (
      <div
        className={cn("inline-flex items-center gap-0.5", className)}
        role="img"
        aria-label={`${value.toFixed(1)} out of 5 stars`}
      >
        {STARS.map((i) => (
          <Star
            key={i}
            style={{ width: size, height: size }}
            className={i <= rounded ? "fill-current text-accent" : "text-muted-foreground/30"}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  const shown = hover || value;

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange!(Math.min(5, (value || 0) + 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange!(Math.max(1, (value || 1) - 1));
    }
  };

  return (
    <div
      id={id}
      role="radiogroup"
      aria-label="Rating from 1 to 5 stars"
      className={cn("inline-flex items-center gap-1", className)}
      onKeyDown={handleKeyDown}
      onMouseLeave={() => setHover(0)}
    >
      {STARS.map((i) => {
        const active = i <= shown;
        // Roving tabindex: the checked star (or the first, when unset) is the tab stop.
        const focusable = value === i || (value === 0 && i === 1);
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={value === i}
            aria-label={`${i} star${i > 1 ? "s" : ""}`}
            tabIndex={focusable ? 0 : -1}
            onClick={() => onChange!(i)}
            onMouseEnter={() => setHover(i)}
            className="rounded p-0.5 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Star
              style={{ width: size, height: size }}
              className={active ? "fill-current text-accent" : "text-muted-foreground/40"}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
