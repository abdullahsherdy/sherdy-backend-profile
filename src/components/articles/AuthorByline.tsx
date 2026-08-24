import { Globe, Youtube, Linkedin } from "lucide-react";
import { author } from "@/lib/author";
import { cn } from "@/lib/utils";

interface AuthorBylineProps {
  /** Show the name + title line above the links (default true). */
  showIdentity?: boolean;
  className?: string;
}

/**
 * Author identity + primary social links. Single source for the byline that used
 * to be hand-duplicated in the article header and the article footer.
 */
const AuthorByline = ({ showIdentity = true, className }: AuthorBylineProps) => (
  <div className={className}>
    {showIdentity && (
      <p className="font-semibold">
        {author.name} <span className="font-normal text-muted-foreground">— {author.title}</span>
      </p>
    )}
    <p className={cn("flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground", showIdentity && "mt-1")}>
      <a href={author.website} className="inline-flex items-center gap-1 hover:text-primary">
        <Globe className="h-3.5 w-3.5" /> abdullahsherdy.tech
      </a>
      <a href={author.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary">
        <Youtube className="h-3.5 w-3.5" /> YouTube
      </a>
      <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary">
        <Linkedin className="h-3.5 w-3.5" /> LinkedIn
      </a>
    </p>
  </div>
);

export default AuthorByline;
