import { motion } from "framer-motion";
import { Sparkles, Wrench, Bug } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageTransition from "@/components/shared/PageTransition";
import Seo from "@/components/shared/Seo";
import { updates, type UpdateKind } from "@/data/updates";
import { useDarkMode } from "@/hooks/useDarkMode";

const kindStyles: Record<UpdateKind, { label: string; icon: typeof Sparkles; className: string }> = {
  feature: { label: "New", icon: Sparkles, className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" },
  improvement: { label: "Improved", icon: Wrench, className: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30" },
  fix: { label: "Fixed", icon: Bug, className: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30" },
};

const UpdatesPage = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Seo
        title="Updates — Abdullah Sherdy"
        description="What's new on abdullahsherdy.tech — features, improvements, and fixes."
        canonicalPath="/updates"
      />
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} activeSection="updates" />
      <PageTransition>
        <main className="container mx-auto max-w-3xl px-4 pt-28 pb-20">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold font-display mb-3">Updates</h1>
            <p className="text-muted-foreground">What's new on the site — features, improvements, and fixes.</p>
          </header>
          <ol className="relative border-l border-border pl-6 space-y-8">
            {updates.map((update, i) => {
              const { label, icon: Icon, className } = kindStyles[update.kind];
              return (
                <motion.li
                  key={`${update.date}-${update.title}`}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="relative"
                >
                  <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${className}`}>
                      <Icon className="h-3 w-3" /> {label}
                    </span>
                    <time className="text-xs text-muted-foreground" dateTime={update.date}>
                      {new Date(update.date + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </time>
                  </div>
                  <h2 className="font-display font-bold text-lg">{update.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{update.description}</p>
                </motion.li>
              );
            })}
          </ol>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default UpdatesPage;
