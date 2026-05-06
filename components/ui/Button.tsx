import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'glass';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center px-6 py-2.5 rounded-md font-display font-bold tracking-wide transition-all duration-300 ease-out active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-accent-primary to-accent-secondary text-white hover:scale-[1.03] hover:shadow-[0_0_20px_var(--accent-glow)]",
    ghost: "bg-transparent text-text-secondary hover:text-text-primary border border-border-subtle hover:border-accent-primary hover:bg-glass",
    glass: "backdrop-blur-md bg-glass border border-border-subtle text-text-primary hover:bg-white/10",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
