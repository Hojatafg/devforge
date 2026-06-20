import { useRef, useScroll, useTransform, motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  offsetStart?: string;
  offsetEnd?: string;
}

export default function AnimatedText({
  text,
  className = '',
  offsetStart = 'start 0.8',
  offsetEnd = 'end 0.2',
}: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [offsetStart, offsetEnd] as any,
  });

  return (
    <p ref={ref} className={`relative ${className}`}>
      <span className="invisible">{text}</span>
      {text.split('').map((char, i) => {
        const start = i / text.length;
        const end = Math.min(1, (i + 1) / text.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        return (
          <motion.span
            key={i}
            style={{ opacity, position: 'absolute', left: 0, top: 0 }}
            className="inline"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </p>
  );
}
