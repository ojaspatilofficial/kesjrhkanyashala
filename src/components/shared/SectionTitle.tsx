import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, center = false, light = false }) => (
  <div className={`mb-10 ${center ? 'text-center' : ''}`}>
    {subtitle && (
      <span className={`eyebrow mb-2 ${light ? '!text-gold-300' : ''}`}>{subtitle}</span>
    )}
    <h2 className={`text-3xl md:text-4xl font-serif font-bold leading-tight ${light ? 'text-white' : 'text-primary-900'}`}>
      {title}
    </h2>
    <div
      className={`h-1 w-20 rounded-full bg-gradient-to-r from-primary-600 to-gold-400 mt-4 ${center ? 'mx-auto' : ''}`}
    />
  </div>
);

export default SectionTitle;
