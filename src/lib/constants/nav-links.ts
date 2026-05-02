import { CreditCard, Scroll, Shield, SwatchBook, User } from "lucide-react";

export const navLinks = [
  { label: "Tasks", to: "/tasks", icon: Scroll },
  { label: "Settings", to: "/settings", icon: SwatchBook },
  { label: "Profile", to: "/profile", icon: User },
  { label: "Account & Security", to: "/accounts", icon: Shield },
  { label: "Billing", to: "/billing", icon: CreditCard },
];
