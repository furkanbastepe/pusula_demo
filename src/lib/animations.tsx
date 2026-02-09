"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

// Stagger children fade in animation
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 20 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3, ease: "easeOut" },
    },
};

export const slideInFromBottom: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
};

// Scroll-triggered animation wrapper
interface ScrollAnimationProps {
    children: ReactNode;
    variant?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn" | "slideInFromBottom";
    className?: string;
    delay?: number;
    once?: boolean;
}

const variantMap: Record<string, Variants> = {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    slideInFromBottom,
};

export function ScrollAnimation({
    children,
    variant = "fadeInUp",
    className = "",
    delay = 0,
    once = true,
}: ScrollAnimationProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-50px" });
    const variants = variantMap[variant];

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            variants={variants}
            style={{ transitionDelay: `${delay}s` }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Stagger container component
interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function StaggerContainer({ children, className = "", delay = 0 }: StaggerContainerProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.08,
                        delayChildren: delay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Stagger item
interface StaggerItemProps {
    children: ReactNode;
    className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
    return (
        <motion.div variants={fadeInUp} className={className}>
            {children}
        </motion.div>
    );
}

// Page transition wrapper
export function PageTransition({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Glow pulse animation
export const glowPulse: Variants = {
    initial: { boxShadow: "0 0 20px rgba(19, 236, 91, 0.2)" },
    animate: {
        boxShadow: [
            "0 0 20px rgba(19, 236, 91, 0.2)",
            "0 0 40px rgba(19, 236, 91, 0.4)",
            "0 0 20px rgba(19, 236, 91, 0.2)",
        ],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
};

// Counter animation hook for numbers
export function AnimatedCounter({ value, duration = 1 }: { value: number; duration?: number }) {
    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={value}
        >
            <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {value}
            </motion.span>
        </motion.span>
    );
}

// Floating animation for badges/icons
export const floatingAnimation: Variants = {
    initial: { y: 0 },
    animate: {
        y: [-2, 2, -2],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
};

// Card hover effect
export const cardHover = {
    scale: 1.02,
    transition: { duration: 0.2 },
};

// Button click effect
export const buttonTap = {
    scale: 0.97,
};

export default {
    staggerContainer,
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    slideInFromBottom,
    glowPulse,
    floatingAnimation,
};
