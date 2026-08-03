import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="py-8 px-4 border-t border-border">
    <div className="container mx-auto flex flex-col items-center gap-2 text-center">
      <nav className="flex gap-4 text-sm text-muted-foreground">
        <Link to="/articles" className="hover:text-primary transition-colors">Articles</Link>
        <Link to="/playground" className="hover:text-primary transition-colors">Playground</Link>
        <Link to="/updates" className="hover:text-primary transition-colors">Updates</Link>
      </nav>
      <p className="text-muted-foreground">
        © {new Date().getFullYear()} Abdullah Sherdy. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
