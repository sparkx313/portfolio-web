import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position conceptually
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        setX(xPct);
        setY(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setX(0);
        setY(0);
    };

    const springConfig = { damping: 20, stiffness: 300, mass: 1 };

    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // Rotate more on larger screens, less on mobile (if needed we can cap this)
    const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                height: '100%'
            }}
            className={className}
        >
            <motion.div
                style={{
                    rotateX: isHovered ? rotateX : 0,
                    rotateY: isHovered ? rotateY : 0,
                    scale: isHovered ? 1.02 : 1,
                    height: '100%',
                    transformStyle: 'preserve-3d',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >
                <div style={{ transform: 'translateZ(30px)', height: '100%' }}>
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default TiltCard;
