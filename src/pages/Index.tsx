import { useState, useEffect } from "react";
import { Moon, Sun, Download, Github, Linkedin, Youtube, Mail, Phone, MapPin, ExternalLink, Menu, X, GraduationCap, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import LearningRoadmap from "@/components/LearningRoadmap";
import AnimatedSection from "@/components/AnimatedSection";
import TypewriterText from "@/components/TypewriterText";
import MagneticButton from "@/components/MagneticButton";
import SkillBar from "@/components/SkillBar";
import emailjs from 'emailjs-com';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [activeSection, setActiveSection] = useState<string>("about");

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      try { localStorage.setItem("theme", "dark"); } catch {
        // Ignore localStorage errors (e.g., in private browsing)
      }
    } else {
      document.documentElement.classList.remove("dark");
      try { localStorage.setItem("theme", "light"); } catch {
        // Ignore localStorage errors (e.g., in private browsing)
      }
    }
  };

  // initialize theme from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      }
    } catch {
      // Ignore localStorage errors (e.g., in private browsing)
    }
  }, []);

  // basic scrollspy to highlight current section in nav
  useEffect(() => {
    const sectionIds = ["about", "projects", "services", "learning", "skills", "contact", "work-experience", "roles"];
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        // emphasize the section once ~40% is visible; header offset handled via scroll-mt on sections
        threshold: 0.4
      }
    );
    elements.forEach((el) => observer.observe(el));
    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setLoading(true);
    emailjs.send(
      'service_el5hyxy',      // TODO: Replace with your EmailJS service ID
      'template_4auovm6',     // TODO: Replace with your EmailJS template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      'LfHew_mrxUGTgdpGe'       // TODO: Replace with your EmailJS public key
    ).then(
      (result) => {
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I'll get back to you soon!",
        });
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
        setLoading(false);
      },
      (error) => {
        toast({
          title: "Error",
          description: "There was an error sending your message. Please try again.",
        });
        setLoading(false);
      }
    );
  };

  const skills = {
    backend: ["C#", "ASP.NET Core", "Python", "PHP", "Java", "JS"],
    devops: ["Git", "Cloud", "Docker"],
    database: ["MSSQL", "Oracle", "EF Core", "MongoDB"],
    principles: ["OOP", "SOLID", "RESTful API", "Clean Architecture"],
    workflow: ["Agile/Scrum", "Trello", "Git-Flow"]
  };

  const skillLevels = [
    { skill: "C# & ASP.NET Core", percentage: 90 },
    { skill: "Database Design", percentage: 85 },
    { skill: "RESTful APIs", percentage: 88 },
    { skill: "Docker & DevOps", percentage: 75 },
    { skill: "System Architecture", percentage: 80 }
  ];

  const projects = [
    {
      title: "The Book Haven – Library Management System",
      description: "Full-stack library management system with role-based access control (Admin, Author, Member), loan tracking, penalty calculation, and comprehensive book management.",
      role: "Full-Stack Developer",
      impact: [
        "Implemented role-based authorization with ASP.NET Identity",
        "Designed normalized database schema reducing data redundancy by 40%",
        "Built automated penalty calculation system for overdue loans"
      ],
      techDecision: "Used ASP.NET MVC with EF Core for rapid development while maintaining clean separation of concerns",
      tech: ["ASP.NET MVC", "C#", "EF Core", "SQL Server", "Bootstrap"],
      github: "https://github.com/abdullahsherdy/The-Book-Haven",
      demo: null
    },
    {
      title: "FixMate – Vehicle Service Booking Platform", 
      description: "Clean architecture-based RESTful API for vehicle service booking, managing service requests, status tracking, and mechanic assignment with real-time updates.",
      role: "Backend Engineer",
      impact: [
        "Architected solution using Clean Architecture principles with CQRS pattern",
        "Implemented repository pattern with Unit of Work for maintainable data access",
        "Containerized application with Docker for consistent deployment"
      ],
      techDecision: "Adopted Clean Architecture to ensure testability, maintainability, and independence from frameworks",
      tech: ["ASP.NET Core Web API", "C#", "Clean Architecture", "SQL Server", "Docker", "Swagger"],
      github: "#",
      demo: null
    }
  ];


  return (

    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground">
        
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <AnimatedSection animation="fade-up">
              <h1 className="text-xl font-bold">Abdullah Sherdy</h1>
            </AnimatedSection>
            <AnimatedSection animation="slide-in-right" delay={300}>
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-4">
                <a href="#about" aria-current={activeSection === "about" ? "page" : undefined} className={`link-underline hover:text-primary transition-colors ${activeSection === "about" ? "text-primary" : ""}`}>About</a>
                <a href="#projects" aria-current={activeSection === "projects" ? "page" : undefined} className={`link-underline hover:text-primary transition-colors ${activeSection === "projects" ? "text-primary" : ""}`}>Projects</a>
                <a href="#services" aria-current={activeSection === "services" ? "page" : undefined} className={`link-underline hover:text-primary transition-colors ${activeSection === "services" ? "text-primary" : ""}`}>Services</a>
                <a href="#learning" aria-current={activeSection === "learning" ? "page" : undefined} className={`link-underline hover:text-primary transition-colors ${activeSection === "learning" ? "text-primary" : ""}`}>Learning</a>
                <a href="#skills" aria-current={activeSection === "skills" ? "page" : undefined} className={`link-underline hover:text-primary transition-colors ${activeSection === "skills" ? "text-primary" : ""}`}>Skills</a>
                <a href="#contact" aria-current={activeSection === "contact" ? "page" : undefined} className={`link-underline hover:text-primary transition-colors ${activeSection === "contact" ? "text-primary" : ""}`}>Contact</a>
                <a href="https://github.com/abdullahsherdy" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/abdullah-sherdy/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="magnetic-hover">
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
              {/* Hamburger for Mobile */}
              <button
                className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Open menu"
                onClick={() => setIsMobileMenuOpen(true)}
                type="button"
              >
                <Menu className="h-7 w-7" />
              </button>
            </AnimatedSection>
          </div>
          {/* Mobile Aside Menu */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-[100] flex">
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu overlay"
                tabIndex={-1}
              />
              {/* Aside Menu */}
              <aside
                className="relative ml-0 w-64 max-w-[80vw] h-full bg-background shadow-lg p-6 flex flex-col gap-6 animate-slide-in-left"
                style={{ zIndex: 101 }}
                aria-label="Mobile menu"
              >
                <button
                  className="absolute top-4 right-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  type="button"
                >
                  <X className="h-6 w-6" />
                </button>
                <nav className="flex flex-col gap-4 mt-8">
                  <a href="#about" className="link-underline hover:text-primary transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>About</a>
                  <a href="#projects" className="link-underline hover:text-primary transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
                  <a href="#services" className="link-underline hover:text-primary transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
                  <a href="#learning" className="link-underline hover:text-primary transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>Learning</a>
                  <a href="#skills" className="link-underline hover:text-primary transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
                  <a href="#contact" className="link-underline hover:text-primary transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                  <Button variant="ghost" size="icon" onClick={() => { toggleDarkMode(); setIsMobileMenuOpen(false); }} className="magnetic-hover self-start mt-2">
                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                </nav>
                <div className="flex gap-3 mt-8">
                  <a href="https://github.com/abdullahsherdy" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github className="h-5 w-5" /></a>
                  <a href="https://www.linkedin.com/in/abdullah-sherdy/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
                  <a href="https://www.youtube.com/channel/UCOP9CFwH4OVHHQaznTgNDsw" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube className="h-5 w-5" /></a>
                </div>
              </aside>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              {/* Availability Badge */}
              <AnimatedSection animation="fade-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-sm font-medium">Available for Backend Engineering Roles</span>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-up" delay={200}>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="block mb-2">Abdullah Sherdy</span>
                  <span className="block text-3xl md:text-5xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Backend Software Engineer
                  </span>
                </h1>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-up" delay={400}>
                <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium">
                  Building Scalable APIs & Systems with C# / ASP.NET Core
                </p>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-up" delay={600}>
                <p className="text-base md:text-lg mb-12 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
                  Computer Science student specializing in backend development, RESTful APIs, database design, and clean architecture. 
                  Experienced with C#, ASP.NET Core, Entity Framework, SQL Server, Docker, and building production-ready systems.
                </p>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-up" delay={800}>
                <div className="flex flex-wrap justify-center gap-4">
                  <MagneticButton size="lg">
                    <a href="#projects">View My Work</a>
                  </MagneticButton>
                  <MagneticButton variant="outline" size="lg">
                    <a href="resume/abdullah_sherdy_cv.pdf" download="abdullah_sherdy_cv.pdf" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download CV
                    </a>
                  </MagneticButton>
                  <MagneticButton variant="secondary" size="lg">
                    <a href="#contact">Get In Touch</a>
                  </MagneticButton>
                </div>
              </AnimatedSection>
              
              {/* Tech Stack Preview */}
              <AnimatedSection animation="fade-up" delay={1000}>
                <div className="mt-16 pt-8 border-t border-border/40">
                  <p className="text-sm text-muted-foreground mb-4">Core Technologies</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {["C#", "ASP.NET Core", "SQL Server", "EF Core", "Docker", "RESTful APIs", "Clean Architecture", "Git"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-4 bg-muted/50 scroll-mt-24" data-section>
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
            </AnimatedSection>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <AnimatedSection animation="slide-in-left" delay={200}>
                <Card className="hover-scale magnetic-hover transition-colors border-border/60 hover:border-primary/40 hover:bg-accent/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Background</h3>
                    <p className="text-muted-foreground mb-4">
                      Computer Science undergraduate at Helwan University with a passion for backend development 
                      and system architecture. I specialize in building robust, scalable applications using modern technologies.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary animate-float" />
                        <span>Cairo, Egypt</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary animate-float" style={{animationDelay: '0.5s'}} />
                        <span>abdullah.sherdy.work@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary animate-float" style={{animationDelay: '1s'}} />
                        <span>+20 010 2186 2880</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
              
              <AnimatedSection animation="slide-in-right" delay={400}>
                <Card className="hover-scale magnetic-hover transition-colors border-border/60 hover:border-primary/40 hover:bg-accent/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Education & Certifications</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Computer Science Student</h4>
                        <p className="text-muted-foreground">Helwan University</p>
                      </div>
                      <div>
                        <h4 className="font-medium">.NET Web Development Graduate</h4>
                        <p className="text-muted-foreground">Digital Egypt Pioneers</p>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <MagneticButton variant="outline" size="sm">
                        <Github className="mr-2 h-4 w-4" />
                        <a href="https://github.com/abdullahsherdy" target="_blank" rel="noopener noreferrer">GitHub</a>
                      </MagneticButton>
                      <MagneticButton variant="outline" size="sm">
                        <Linkedin className="mr-2 h-4 w-4" />
                        <a href="https://www.linkedin.com/in/abdullah-sherdy/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                      </MagneticButton>
                      <MagneticButton variant="outline" size="sm">
                        <Youtube className="mr-2 h-4 w-4" />
                        <a href="https://www.youtube.com/channel/UCOP9CFwH4OVHHQaznTgNDsw" target="_blank" rel="noopener noreferrer">My Channel</a>
                      </MagneticButton>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section id="work-experience" className="py-16 px-4 scroll-mt-24" data-section>
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold text-center mb-12">Work Experience</h2>
            </AnimatedSection>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              {[ // Placeholder data
                {
                  title: "Backend Engineer Intern",
                  company: "Code Casa",
                  duration: "Jun 2024– May 2024",
                  description: "Developed a large scale web application "
                },
                {
                  title: "Online Coding Instructor",
                  company: "Private Group Related to freelance camp initiative",
                  duration: "Feb 2025 - Present",
                  description: "Taught coding to children aged 14-24 years old"
                }
                
              ].map((job, idx) => (
                <AnimatedSection key={idx} animation="slide-in-left" delay={idx * 200}>
                  <Card className="hover-scale magnetic-hover transition-colors border-border/60 hover:border-primary/40 hover:bg-accent/10">
                    <CardContent className="p-6">
                      < h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-primary">{job.company}</span>
                        <span className="text-xs text-muted-foreground">&bull;</span>
                        <span className="text-sm text-muted-foreground">{job.duration}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{job.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Roles I Can Work Section */}
        <section id="roles" className="py-16 px-4 bg-muted/50 scroll-mt-24" data-section>
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold text-center mb-6">Roles I Can Work</h2>
              <p className="text-center text-lg text-muted-foreground mb-8">I'm open to working in these roles:</p>
            </AnimatedSection>
            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
              {["Software Engineer", "Backend Engineer", "Coding Instructor"].map((role, idx) => (
                <Badge key={idx} variant="secondary" className="text-base px-4 py-2 shadow-md">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 px-4 scroll-mt-24" data-section>
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold text-center mb-4">Services</h2>
              <p className="text-center text-lg text-muted-foreground mb-12">How I can help you or your team</p>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <AnimatedSection animation="slide-in-left" delay={100}>
                <Card className="hover-scale magnetic-hover group transition-colors border-border/60 hover:border-primary/40 hover:bg-accent/10">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <GraduationCap className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                      <h3 className="text-xl font-semibold">1:1 Private Coding Instructor</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Personalized mentorship for beginners and intermediates. Curriculum tailored to your goals (fundamentals, problem-solving, backend basics, project guidance).
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2 mb-6 list-disc pl-5">
                      <li>Weekly 60–90 min live sessions + homework review</li>
                      <li>Structured roadmap and resources</li>
                      <li>DM support between sessions</li>
                    </ul>
                    <div className="flex flex-wrap gap-3">
                      <MagneticButton>
                        <a href="mailto:abdullah.sherdy.work@gmail.com?subject=1%3A1%20Private%20Coding%20Instruction%20Inquiry" className="flex items-center">
                          Book 1:1 Session
                        </a>
                      </MagneticButton>
                      <MagneticButton variant="outline">
                        <a href="#contact">Contact Me</a>
                      </MagneticButton>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="slide-in-right" delay={200}>
                <Card className="hover-scale magnetic-hover group transition-colors border-border/60 hover:border-primary/40 hover:bg-accent/10">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Server className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                      <h3 className="text-xl font-semibold">Backend Engineering & APIs</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      End-to-end backend solutions: clean architectures, RESTful APIs, database design, performance tuning, containerization, and deployment.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {['ASP.NET Core', 'EF Core', 'SQL Server', 'Docker', 'Clean Architecture'].map((tag, i) => (
                        <Badge key={i} variant="secondary" className="animate-pulse-glow">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <MagneticButton>
                        <a href="#contact">Request a Quote</a>
                      </MagneticButton>
                      <MagneticButton variant="outline">
                        <a href="#projects" className="flex items-center">View Projects</a>
                      </MagneticButton>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Learning Roadmap Section */}
        <LearningRoadmap />

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 scroll-mt-24" data-section>
          <div className="container mx-auto max-w-6xl">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                <p className="text-muted-foreground text-lg">Real-world applications showcasing backend engineering expertise</p>
              </div>
            </AnimatedSection>
            
            <div className="space-y-8">
              {projects.map((project, index) => (
                <AnimatedSection key={index} animation="fade-up" delay={index * 200}>
                  <Card className="hover-scale magnetic-hover group transition-all duration-300 border-border/60 hover:border-primary/40 hover:shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                          </div>
                          <p className="text-sm text-primary font-medium mb-3">{project.role}</p>
                          <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <MagneticButton variant="outline" size="sm">
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <Github className="h-4 w-4" />
                              <span>Code</span>
                            </a>
                          </MagneticButton>
                          {project.demo && (
                            <MagneticButton variant="default" size="sm">
                              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <ExternalLink className="h-4 w-4" />
                                <span>Demo</span>
                              </a>
                            </MagneticButton>
                          )}
                        </div>
                      </div>
                      
                      {/* Key Impact */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <span className="inline-block w-1 h-4 bg-primary rounded"></span>
                          Key Contributions & Impact
                        </h4>
                        <ul className="space-y-2 ml-3">
                          {project.impact.map((item, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">▸</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Tech Decision */}
                      <div className="mb-6 p-4 bg-muted/40 rounded-lg border border-border/40">
                        <h4 className="text-sm font-semibold mb-2">Architecture Decision</h4>
                        <p className="text-sm text-muted-foreground italic">{project.techDecision}</p>
                      </div>
                      
                      {/* Tech Stack */}
                      <div>
                        <h4 className="text-sm font-semibold mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="px-3 py-1">{tech}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
            
            {/* CTA for more projects */}
            <AnimatedSection animation="fade-up" delay={600}>
              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">
                  View more projects and contributions on GitHub
                </p>
                <MagneticButton variant="outline">
                  <a href="https://github.com/abdullahsherdy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    <span>Visit GitHub Profile</span>
                  </a>
                </MagneticButton>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Public Work & Contributions */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Public Work & Contributions</h2>
                <p className="text-muted-foreground text-lg">Building in public and sharing knowledge with the community</p>
              </div>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* GitHub Activity */}
              <AnimatedSection animation="fade-up" delay={200}>
                <Card className="hover-scale magnetic-hover transition-all duration-300 border-border/60 hover:border-primary/40 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Github className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">GitHub</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-3xl font-bold text-primary">15+</p>
                        <p className="text-sm text-muted-foreground">Public Repositories</p>
                      </div>
                      <div>
                        <p className="text-2xl font-semibold">Active</p>
                        <p className="text-sm text-muted-foreground">Regular commits & contributions</p>
                      </div>
                    </div>
                    <MagneticButton variant="outline" className="w-full mt-6">
                      <a href="https://github.com/abdullahsherdy" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        <Github className="h-4 w-4" />
                        <span>View Profile</span>
                      </a>
                    </MagneticButton>
                  </CardContent>
                </Card>
              </AnimatedSection>
              
              {/* LeetCode Activity */}
              <AnimatedSection animation="fade-up" delay={400}>
                <Card className="hover-scale magnetic-hover transition-all duration-300 border-border/60 hover:border-primary/40 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Server className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">LeetCode</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-3xl font-bold text-primary">100+</p>
                        <p className="text-sm text-muted-foreground">Problems Solved</p>
                      </div>
                      <div>
                        <p className="text-2xl font-semibold">Consistent</p>
                        <p className="text-sm text-muted-foreground">Daily problem-solving practice</p>
                      </div>
                    </div>
                    <MagneticButton variant="outline" className="w-full mt-6">
                      <a href="https://leetcode.com/u/abdallahsherdy" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        <span>View Profile</span>
                      </a>
                    </MagneticButton>
                  </CardContent>
                </Card>
              </AnimatedSection>
              
              {/* YouTube Channel */}
              <AnimatedSection animation="fade-up" delay={600}>
                <Card className="hover-scale magnetic-hover transition-all duration-300 border-border/60 hover:border-primary/40 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Youtube className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">YouTube</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-3xl font-bold text-primary">Educational</p>
                        <p className="text-sm text-muted-foreground">Content Creator</p>
                      </div>
                      <div>
                        <p className="text-2xl font-semibold">Tech Tutorials</p>
                        <p className="text-sm text-muted-foreground">Backend & algorithms content</p>
                      </div>
                    </div>
                    <MagneticButton variant="outline" className="w-full mt-6">
                      <a href="https://www.youtube.com/channel/UCOP9CFwH4OVHHQaznTgNDsw" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        <Youtube className="h-4 w-4" />
                        <span>Visit Channel</span>
                      </a>
                    </MagneticButton>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
            
            {/* Consistency Statement */}
            <AnimatedSection animation="fade-up" delay={800}>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6 text-center">
                  <p className="text-lg font-medium mb-2">
                    <span className="text-primary">Committed to continuous learning</span> and contributing to the developer community
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Regular code contributions, problem-solving practice, and knowledge sharing through educational content
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 px-4 bg-muted/50 scroll-mt-24" data-section>
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
            </AnimatedSection>
            
            {/* Skill Progress Bars */}
            <AnimatedSection animation="fade-up" delay={200}>
              <div className="max-w-2xl mx-auto mb-12">
                <h3 className="text-xl font-semibold text-center mb-8 text-primary">Expertise Level</h3>
                {skillLevels.map((skill, index) => (
                  <SkillBar 
                    key={index}
                    skill={skill.skill}
                    percentage={skill.percentage}
                    delay={index * 200}
                  />
                ))}
              </div>
            </AnimatedSection>

            {/* Skill Categories */}
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, skillList], categoryIndex) => (
                <AnimatedSection key={category} animation="rotate-in" delay={categoryIndex * 150}>
                  <Card className="hover-scale magnetic-hover transition-colors border-border/60 hover:border-primary/40 hover:bg-accent/10">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 text-primary capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className={`animate-wobble stagger-${index + 1}`}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-4 scroll-mt-24" data-section>
          <div className="container mx-auto max-w-2xl">
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
            </AnimatedSection>
            <AnimatedSection animation="bounce-in" delay={200}>
              <Card className="hover-scale magnetic-hover transition-colors border-border/60 hover:border-primary/40 hover:bg-accent/10">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">

                    {/* name input */}
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        disabled={loading}
                        className="magnetic-hover"
                      />
                      {errors.name && <div style={{ color: '#e11d48', fontSize: 13, marginTop: 4 }}>{errors.name}</div>}
                    </div>

                    {/* email input */}
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled={loading}
                        className="magnetic-hover"
                      />
                      {errors.email && <div style={{ color: '#e11d48', fontSize: 13, marginTop: 4 }}>{errors.email}</div>}
                    </div>

                    {/* message input */}
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        disabled={loading}
                        className="magnetic-hover"
                      />
                      {errors.message && <div style={{ color: '#e11d48', fontSize: 13, marginTop: 4 }}>{errors.message}</div>}
                    </div>
                    <MagneticButton type="submit" className="w-full" disabled={loading}>
                      {loading ? <span className="animate-spin mr-2 inline-block border-2 border-t-transparent border-white rounded-full w-4 h-4 align-middle"></span> : null}
                      {loading ? 'Sending...' : 'Send Message'}
                    </MagneticButton>
                  </form>

                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="flex justify-center gap-4">
                      <MagneticButton variant="outline" size="sm">
                        <Github className="mr-2 h-4 w-4" />
                        <a href="https://github.com/abdullahsherdy" target="_blank" rel="noopener noreferrer">GitHub</a>
                      </MagneticButton>
                      <MagneticButton variant="outline" size="sm">
                        <Linkedin className="mr-2 h-4 w-4" />
                        <a href="https://www.linkedin.com/in/abdullah-sherdy/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                      </MagneticButton>
                      <MagneticButton variant="outline" size="sm">
                        <Youtube className="mr-2 h-4 w-4" />
                        <a href="https://www.youtube.com/channel/UCOP9CFwH4OVHHQaznTgNDsw" target="_blank" rel="noopener noreferrer">YouTube</a>
                      </MagneticButton>
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      <a href="https://leetcode.com/u/abdallahsherdy" target="_blank" rel="noopener noreferrer" className="link-underline hover:text-primary transition-colors">
                        Check out my LeetCode profile
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border">
          <div className="container mx-auto text-center">
            <AnimatedSection animation="fade-up">
              <p className="text-muted-foreground">
                © 2025 Abdullah Ahmed Abdullah Sherdy. All rights reserved.
                <br/>
              </p>
            </AnimatedSection>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
