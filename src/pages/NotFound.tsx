import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Mail } from "lucide-react";
import PageShell from "@/components/shared/PageShell";
import Seo from "@/components/shared/Seo";

const NotFound = () => (
  <PageShell
    seo={<Seo title="Page not found — Abdullah Sherdy" noindex />}
    mainClassName="container mx-auto flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 py-20 text-center"
  >
    <p className="eyebrow">404</p>
    <h1 className="text-4xl font-bold font-display">Page not found</h1>
    <p className="max-w-md text-muted-foreground">
      That page doesn't exist or may have moved. Here's where to go next:
    </p>
    <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
      <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" /> Home
      </Link>
      <Link to="/articles" className="inline-flex items-center gap-2 text-primary hover:underline">
        <FileText className="h-4 w-4" /> Articles
      </Link>
      <a href="/#contact" className="inline-flex items-center gap-2 text-primary hover:underline">
        <Mail className="h-4 w-4" /> Get in touch
      </a>
    </div>
  </PageShell>
);

export default NotFound;
