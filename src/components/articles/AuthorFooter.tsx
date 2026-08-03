import { Globe, Youtube, Linkedin } from "lucide-react";
import { author } from "@/lib/author";

const AuthorFooter = () => (
  <footer className="mt-16 rounded-xl border border-border bg-muted/30 p-6 sm:p-8 not-prose">
    <p className="font-display font-bold text-lg mb-1">
      {author.name} <span className="text-muted-foreground font-normal text-sm">— {author.title}</span>
    </p>
    <p className="text-sm text-muted-foreground mb-4">
      Found this useful? I publish more .NET and backend engineering content:
    </p>
    <ul className="space-y-2 text-sm">
      <li>
        <a href={author.website} className="inline-flex items-center gap-2 text-primary hover:underline">
          <Globe className="h-4 w-4" /> abdullahsherdy.tech
        </a>{" "}
        <span className="text-muted-foreground">— articles, projects, and contact</span>
      </li>
      <li>
        <a href={author.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
          <Youtube className="h-4 w-4" /> {author.youtubeHandle}
        </a>{" "}
        <span className="text-muted-foreground">— video walkthroughs and tutorials</span>
      </li>
      <li>
        <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
          <Linkedin className="h-4 w-4" /> {author.linkedinHandle}
        </a>{" "}
        <span className="text-muted-foreground">— connect and follow my work</span>
      </li>
    </ul>
  </footer>
);

export default AuthorFooter;
