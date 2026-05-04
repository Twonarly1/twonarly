import { CreditCard, Shield, SquareDashed, SwatchBook, TextAlignJustify, User } from "lucide-react";

export const navLinks = [
  { label: "Dashboard", to: "/dashboard", icon: SquareDashed },
  { label: "Tasks", to: "/tasks", icon: TextAlignJustify },
  { label: "Settings", to: "/settings", icon: SwatchBook },
  { label: "Profile", to: "/profile", icon: User },
  { label: "Account & Security", to: "/accounts", icon: Shield },
  { label: "Billing", to: "/billing", icon: CreditCard },
  // { label: "Integrations", to: "/integrations", icon: Blocks },
];
