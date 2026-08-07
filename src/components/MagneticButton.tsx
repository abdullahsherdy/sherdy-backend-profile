
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  asChild?: boolean;
}

const MagneticButton = ({
  children,
  className = '',
  variant = 'default',
  size = 'default',
  type = 'button',
  disabled = false,
  onClick,
  asChild = false,
}: MagneticButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.1, y: y * 0.1 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <Button
      asChild={asChild}
      type={asChild ? undefined : type}
      variant={variant}
      size={size}
      disabled={disabled}
      className={`magnetic-hover transition-transform duration-200 ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default MagneticButton;
