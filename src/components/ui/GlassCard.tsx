import React, { HTMLAttributes } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`glass-effect rounded-xl p-6 backdrop-blur-md border border-white/10 transition-all duration-300 ease-in-out hover:border-white/20 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface GlassCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const GlassCardHeader: React.FC<GlassCardHeaderProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

interface GlassCardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const GlassCardTitle: React.FC<GlassCardTitleProps> = ({ children, className = '', ...props }) => {
  return (
    <h3 className={`text-xl font-bold text-foreground ${className}`} {...props}>
      {children}
    </h3>
  );
};

interface GlassCardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const GlassCardDescription: React.FC<GlassCardDescriptionProps> = ({ children, className = '', ...props }) => {
  return (
    <p className={`text-sm text-gray-300 ${className}`} {...props}>
      {children}
    </p>
  );
};

interface GlassCardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const GlassCardContent: React.FC<GlassCardContentProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={` ${className}`} {...props}>
      {children}
    </div>
  );
};

interface GlassCardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const GlassCardFooter: React.FC<GlassCardFooterProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`mt-6 flex items-center ${className}`} {...props}>
      {children}
    </div>
  );
};

export { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent, GlassCardFooter };