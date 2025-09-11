// Types for the navbar components
export interface Navbar02NavItem {
  href?: string;
  label: string;
  submenu?: boolean;
  type?: "description" | "simple" | "icon";
  items?: Array<{
    href: string;
    label: string;
    description?: string;
    icon?: string;
  }>;
}

export interface Navbar02Props extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navigationLinks?: Navbar02NavItem[];
  signInText?: string;
  signInHref?: string;
  ctaText?: string;
  ctaHref?: string;
  onSignInClick?: () => void;
  onCtaClick?: () => void;
}

// Default navigation links
export const defaultNavigationLinks: Navbar02NavItem[] = [
  { href: "#", label: "Home" },
  // {
  //   label: "Features",
  //   submenu: true,
  //   type: "description",
  //   items: [
  //     {
  //       href: "#components",
  //       label: "Components",
  //       description: "Browse all components in the library.",
  //     },
  //     {
  //       href: "#documentation",
  //       label: "Documentation",
  //       description: "Learn how to use the library.",
  //     },
  //     {
  //       href: "#templates",
  //       label: "Templates",
  //       description: "Pre-built layouts for common use cases.",
  //     },
  //   ],
  // },
  // {
  //   label: "Pricing",
  //   submenu: true,
  //   type: "simple",
  //   items: [
  //     { href: "#product-a", label: "Product A" },
  //     { href: "#product-b", label: "Product B" },
  //     { href: "#product-c", label: "Product C" },
  //     { href: "#product-d", label: "Product D" },
  //   ],
  // },
  // {
  //   label: "About",
  //   submenu: true,
  //   type: "icon",
  //   items: [
  //     { href: "#getting-started", label: "Getting Started", icon: "BookOpenIcon" },
  //     { href: "#tutorials", label: "Tutorials", icon: "LifeBuoyIcon" },
  //     { href: "#about-us", label: "About Us", icon: "InfoIcon" },
  //   ],
  // },
];
