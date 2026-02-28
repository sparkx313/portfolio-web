import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticProps {
    children: React.ReactElement;
    magneticPull?: number;
}

const Magnetic: React.FC<MagneticProps> = ({ children, magneticPull = 0.3 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const boundingRect = ref.current?.getBoundingClientRect();
        if (boundingRect) {
            const { width, height, left, top } = boundingRect;
            const middleX = clientX - (left + width / 2);
            const middleY = clientY - (top + height / 2);
            setPosition({ x: middleX * magneticPull, y: middleY * magneticPull });
        }
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // React 18 fixes for updating spring values
    useEffect(() => {
        springX.set(x);
        springY.set(y);
    }, [x, y, springX, springY]);

    return (
        <motion.div
            style={{ position: 'relative', x: springX, y: springY, display: 'inline-block' }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
        >
            {children}
        </motion.div>
    );
};

export default Magnetic;
