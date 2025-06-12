
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Cloud, Network, Zap, Database, Settings } from "lucide-react";

const CurrentlyLearning = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const learningTopics = [
    {
      icon: Network,
      title: "Microservices Architecture",
      subtitle: "Advanced distributed system patterns"
    },
    {
      icon: Cloud,
      title: "Kubernetes & Docker",
      subtitle: "Container orchestration & deployment"
    },
    {
      icon: Zap,
      title: "gRPC & High-Performance APIs",
      subtitle: "Modern communication protocols"
    },
    {
      icon: Database,
      title: "Event-Driven Architecture",
      subtitle: "Asynchronous messaging patterns"
    },
    {
      icon: Settings,
      title: "System Design",
      subtitle: "Scalable architecture principles"
    },
    {
      icon: Brain,
      title: "AI/ML Integration",
      subtitle: "Backend services for ML models"
    }
  ];

  return (
    <section ref={sectionRef} id="learning" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">🧠 Currently Learning</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {learningTopics.map((topic, index) => {
            const IconComponent = topic.icon;
            return (
              <Card
                key={index}
                className={`hover-scale group ${
                  isVisible ? `animate-fade-up learning-card-${index + 1}` : 'opacity-0'
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {topic.subtitle}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CurrentlyLearning;
