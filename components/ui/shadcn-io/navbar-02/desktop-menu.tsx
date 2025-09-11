import * as React from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ListItem } from "./list-item";
import { Navbar02NavItem } from "./types";

interface DesktopMenuProps {
  navigationLinks: Navbar02NavItem[];
}

export const DesktopMenu = React.forwardRef<HTMLDivElement, DesktopMenuProps>(({ navigationLinks }, ref) => {
  return (
    <NavigationMenu className="flex" ref={ref}>
      <NavigationMenuList className="gap-1">
        {navigationLinks.map((link, index) => (
          <NavigationMenuItem key={index}>
            {link.submenu ? (
              <>
                <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {link.type === "description" && link.label === "Features" ? (
                    <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <button onClick={(e) => e.preventDefault()} className="flex h-full w-full select-none flex-col justify-center items-center text-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md cursor-pointer">
                            <div className="mb-3 text-xl font-medium">Reaz Islam</div>
                            <p className="text-sm leading-tight text-muted-foreground">Beautifully designed components built with Radix UI and Tailwind CSS.</p>
                          </button>
                        </NavigationMenuLink>
                      </div>
                      {link.items?.map((item, itemIndex) => (
                        <ListItem key={itemIndex} title={item.label} href={item.href} type={link.type}>
                          {item.description}
                        </ListItem>
                      ))}
                    </div>
                  ) : link.type === "simple" ? (
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {link.items?.map((item, itemIndex) => (
                        <ListItem key={itemIndex} title={item.label} href={item.href} type={link.type}>
                          {item.description}
                        </ListItem>
                      ))}
                    </div>
                  ) : link.type === "icon" ? (
                    <div className="grid w-[400px] gap-3 p-4">
                      {link.items?.map((item, itemIndex) => (
                        <ListItem key={itemIndex} title={item.label} href={item.href} icon={item.icon} type={link.type}>
                          {item.description}
                        </ListItem>
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-3 p-4">
                      {link.items?.map((item, itemIndex) => (
                        <ListItem key={itemIndex} title={item.label} href={item.href} type={link.type}>
                          {item.description}
                        </ListItem>
                      ))}
                    </div>
                  )}
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink href={link.href} className={cn("text-white hover:text-white/90 transition-colors cursor-pointer px-4 py-2 rounded-md", "hover:bg-transparent")} onClick={(e) => e.preventDefault()}>
                {link.label}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
});

DesktopMenu.displayName = "DesktopMenu";
