import React, { ReactNode } from 'react';

interface SectionProps {
    title: string;
    children: ReactNode;
    className?: string;
    id?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className = '', id }) => {
    return (
        <section
            id={id}
            className={`min-w-full h-full flex flex-col justify-center px-12 md:px-24 snap-start border-r border-white/10 last:border-none ${className}`}
        >
            <div className="max-w-4xl w-full mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-primarycolor tracking-tight uppercase">
                    {title}
                </h2>
                <div className="text-lg md:text-xl font-light text-textcolor/90 leading-relaxed space-y-6">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default Section;
