import * as React from "react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HamburgerIcon } from "./hamburger-icon";
import { Navbar02NavItem } from "./types.js";

interface MobileMenuProps {
  navigationLinks: Navbar02NavItem[];
}

export const MobileMenu = React.forwardRef<HTMLDivElement, MobileMenuProps>(({ navigationLinks }, ref) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground text-white" variant="ghost" size="icon">
          <HamburgerIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-1">
        <NavigationMenu className="max-w-none">
          <NavigationMenuList className="flex-col items-start gap-0">
            {navigationLinks.map((link, index) => (
              <NavigationMenuItem key={index} className="w-full">
                {link.submenu ? (
                  <>
                    <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">{link.label}</div>
                    <ul>
                      {link.items?.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <button onClick={(e) => e.preventDefault()} className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline">
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <button onClick={(e) => e.preventDefault()} className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline">
                    {link.label}
                  </button>
                )}
                {/* Add separator between different types of items */}
                {index < navigationLinks.length - 1 && ((!link.submenu && navigationLinks[index + 1].submenu) || (link.submenu && !navigationLinks[index + 1].submenu) || (link.submenu && navigationLinks[index + 1].submenu && link.type !== navigationLinks[index + 1].type)) && <div role="separator" aria-orientation="horizontal" className="bg-border -mx-1 my-1 h-px w-full" />}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </PopoverContent>
    </Popover>
  );
});

MobileMenu.displayName = "MobileMenu";
