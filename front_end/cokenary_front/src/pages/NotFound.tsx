
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { SectionContainer } from "@/components/ui/section-container";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <SectionContainer className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <h1 className="text-8xl font-display font-bold mb-4">404</h1>
        <p className="text-2xl text-muted-foreground mb-8">Oops! Page not found</p>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        <Button size="lg" asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </SectionContainer>
  );
};

export default NotFound;
