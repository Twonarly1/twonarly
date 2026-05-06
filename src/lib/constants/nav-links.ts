import { CreditCard, Shield, SwatchBook, TextAlignJustify, User } from "lucide-react";

export const navLinks = [
  { label: "Tasks", to: "/tasks", icon: TextAlignJustify },
  { label: "Settings", to: "/settings", icon: SwatchBook },
  { label: "Profile", to: "/profile", icon: User },
  { label: "Account & Security", to: "/accounts", icon: Shield },
  { label: "Billing", to: "/billing", icon: CreditCard },
];
