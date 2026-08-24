import ReaderCta from "./ReaderCta";
import AuthorByline from "./AuthorByline";
import { author } from "@/lib/author";

/**
 * Article footer. Leads with the reader → hire/learn conversion band (the warmest
 * lead the site gets), then a lighter "follow my work" byline underneath so the
 * social links stay available but secondary.
 */
const AuthorFooter = () => (
  <footer className="mt-16 rounded-xl border border-border bg-muted/30 p-6 sm:p-8 not-prose">
    <ReaderCta />
    <div className="mt-6 border-t border-border/60 pt-5">
      <p className="text-sm text-muted-foreground mb-2">
        {author.name} publishes more .NET and backend engineering content — follow along:
      </p>
      <AuthorByline showIdentity={false} />
    </div>
  </footer>
);

export default AuthorFooter;
