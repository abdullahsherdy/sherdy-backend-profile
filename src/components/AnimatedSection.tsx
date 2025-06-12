
import { useEffect, useRef, useState } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'slide-in-left' | 'slide-in-right' | 'bounce-in' | 'rotate-in';
  delay?: number;
  threshold?: number;
}

const AnimatedSection = ({ 
  children, 
  className = "", 
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1 
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold]);

  const animationClass = isVisible ? `animate-${animation}` : 'opacity-0';

  return (
    <div 
      ref={sectionRef} 
      className={`${animationClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
