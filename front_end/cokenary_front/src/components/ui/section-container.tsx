
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

export function SectionContainer({ 
  children, 
  className, 
  fullWidth = false,
  noPadding = false
}: SectionContainerProps) {
  return (
    <section className={cn(
      "py-8 md:py-12",
      fullWidth ? "w-full" : "container mx-auto",
      !noPadding && "px-4",
      className
    )}>
      {children}
    </section>
  );
}
