import * as React from "react";
import { BookOpenIcon, InfoIcon, LifeBuoyIcon } from "lucide-react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

// ListItem component for navigation menu items
export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    href?: string;
    icon?: string;
    type?: "description" | "simple" | "icon";
    children?: React.ReactNode;
  }
>(({ className, title, children, icon, type, ...props }, ref) => {
  const renderIconComponent = (iconName?: string) => {
    if (!iconName) return null;
    switch (iconName) {
      case "BookOpenIcon":
        return <BookOpenIcon className="h-5 w-5" />;
      case "LifeBuoyIcon":
        return <LifeBuoyIcon className="h-5 w-5" />;
      case "InfoIcon":
        return <InfoIcon className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <NavigationMenuLink asChild>
      <a ref={ref} onClick={(e) => e.preventDefault()} className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer", className)} {...props}>
        {type === "icon" && icon ? (
          <div className="flex items-start space-x-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">{renderIconComponent(icon)}</div>
            <div className="space-y-1">
              <div className="text-base font-medium leading-tight">{title}</div>
              {children && <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>}
            </div>
          </div>
        ) : (
          <>
            <div className="text-base font-medium leading-none">{title}</div>
            {children && <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>}
          </>
        )}
      </a>
    </NavigationMenuLink>
  );
});

ListItem.displayName = "ListItem";
