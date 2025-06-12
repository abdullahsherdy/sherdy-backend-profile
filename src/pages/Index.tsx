import { useState } from "react";
import { Moon, Sun, Download, Github, Linkedin, Youtube, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from 'emailjs-com';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

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

  const projects = [
    {
      title: "The Book Haven",
      description: "A library management system with role-based access (Admin, Author, Member), loan tracking, and penalty calculation",
      tech: ["ASP.NET MVC", "EF Core", "SQL Server"],
      github: "https://github.com/abdullahsherdy/The-Book-Haven"
    },
    {
      title: "FixMate – Vehicle Service Booking System", 
      description: "A clean-architecture based booking platform to manage vehicle services, service status, and mechanic assignment",
      tech: ["ASP.NET Core Web API", "SQL Server", "Docker"],
      github: "#"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Abdullah Sherdy</h2>
            <div className="flex items-center gap-4">
              <a href="#about" className="hover:text-primary transition-colors">About</a>
              <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
              <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent animate-fade-in">
                Hi, I'm Abdullah
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
                Backend Engineer & Problem Solver
              </p>
              <p className="text-lg mb-12 max-w-2xl mx-auto text-muted-foreground animate-fade-in">
                Passionate about problem-solving, API development, and building scalable backend systems. 
                Experienced with C#, ASP.NET Core, EF Core, Python, Docker, and SQL Server.
              </p>
              <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
                <Button size="lg" className="hover-scale">
                  <a href="#projects">View Projects</a>
                </Button>
                <Button variant="outline" size="lg" className="hover-scale">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
                <Button variant="secondary" size="lg" className="hover-scale">
                  <a href="#contact">Hire Me</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <Card className="hover-scale">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Background</h3>
                  <p className="text-muted-foreground mb-4">
                    Computer Science undergraduate at Helwan University with a passion for backend development 
                    and system architecture. I specialize in building robust, scalable applications using modern technologies.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Cairo, Egypt</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>abdullah.sherdy.work@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>+20 010 2186 2880</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
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
                    <Button variant="outline" size="sm">
                      <Github className="mr-2 h-4 w-4" />
                      <a href="https://github.com/abdullahsherdy" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Linkedin className="mr-2 h-4 w-4" />
                      <a href="https://www.linkedin.com/in/abdullah-sherdy/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Youtube className="mr-2 h-4 w-4" />
                      <a href="https://www.youtube.com/channel/UCOP9CFwH4OVHHQaznTgNDsw" target="_blank" rel="noopener noreferrer">YouTube</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {projects.map((project, index) => (
                <Card key={index} className="hover-scale group">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <Button variant="ghost" size="icon">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Future Projects */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-center mb-6 text-muted-foreground">Coming Soon</h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card className="opacity-75">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2">Live Incident Reporting System</h4>
                    <p className="text-sm text-muted-foreground">Real-time SignalR + file upload</p>
                  </CardContent>
                </Card>
                <Card className="opacity-75">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2">EduStream Learning Platform</h4>
                    <p className="text-sm text-muted-foreground">Media API + notifications + progress tracking</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover-scale">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-primary">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.backend.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-primary">DevOps</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.devops.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-primary">Database</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.database.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-primary">Engineering Principles</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.principles.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-scale md:col-span-2 lg:col-span-2">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-primary">Workflow</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.workflow.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
            <Card className="hover-scale">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={loading}
                    />
                    {errors.name && <div style={{ color: '#e11d48', fontSize: 13, marginTop: 4 }}>{errors.name}</div>}
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={loading}
                    />
                    {errors.email && <div style={{ color: '#e11d48', fontSize: 13, marginTop: 4 }}>{errors.email}</div>}
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      disabled={loading}
                    />
                    {errors.message && <div style={{ color: '#e11d48', fontSize: 13, marginTop: 4 }}>{errors.message}</div>}
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <span className="animate-spin mr-2 inline-block border-2 border-t-transparent border-white rounded-full w-4 h-4 align-middle"></span> : null}
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
                
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" size="sm">
                      <Github className="mr-2 h-4 w-4" />
                      <a href="https://github.com/abdullahsherdy" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Linkedin className="mr-2 h-4 w-4" />
                      <a href="https://www.linkedin.com/in/abdullah-sherdy/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Youtube className="mr-2 h-4 w-4" />
                      <a href="https://www.youtube.com/channel/UCOP9CFwH4OVHHQaznTgNDsw" target="_blank" rel="noopener noreferrer">YouTube</a>
                    </Button>
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    <a href="https://leetcode.com/u/abdallahsherdy/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      Check out my LeetCode profile
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border">
          <div className="container mx-auto text-center">
            <p className="text-muted-foreground">
              © 2025 Abdullah Ahmed Abdullah Sherdy. All rights reserved.
              <br />
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
