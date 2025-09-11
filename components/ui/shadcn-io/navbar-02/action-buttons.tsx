import * as React from "react";
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  signInText: string;
  signInHref?: string;
  ctaText: string;
  ctaHref?: string;
  onSignInClick?: () => void;
  onCtaClick?: () => void;
}

export const ActionButtons = React.forwardRef<HTMLDivElement, ActionButtonsProps>(({ signInText, ctaText, onSignInClick, onCtaClick }, ref) => {
  return (
    <div className="flex items-center gap-3" ref={ref}>
      <Button
        variant="ghost"
        size="sm"
        className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        onClick={(e) => {
          e.preventDefault();
          if (onSignInClick) onSignInClick();
        }}>
        {signInText}
      </Button>
      <Button
        size="sm"
        className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
        onClick={(e) => {
          e.preventDefault();
          if (onCtaClick) onCtaClick();
        }}>
        {ctaText}
      </Button>
    </div>
  );
});

ActionButtons.displayName = "ActionButtons";
