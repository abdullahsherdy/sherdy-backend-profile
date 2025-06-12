
import { useEffect, useRef, useState } from 'react';

interface SkillBarProps {
  skill: string;
  percentage: number;
  delay?: number;
}

const SkillBar = ({ skill, percentage, delay = 0 }: SkillBarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const skillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (skillRef.current) {
      observer.observe(skillRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={skillRef} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{skill}</span>
        <span className="text-sm text-muted-foreground">{percentage}%</span>
      </div>
      <div className="skill-progress">
        <div 
          className={`absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-blue-600 rounded-full transition-all duration-1500 ease-out ${
            isVisible ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
