import { Blocks, CheckLine, Settings2, ShieldCog, User, Wallet } from "lucide-react";

export const navLinks = [
  { label: "Tasks", to: "/tasks", icon: CheckLine },
  { label: "Settings", to: "/settings", icon: Settings2 },
  { label: "Profile", to: "/profile", icon: User },
  { label: "Security & Access", to: "/accounts", icon: ShieldCog },
  { label: "Billing", to: "/billing", icon: Wallet },
  { label: "Integrations", to: "/integrations", icon: Blocks },
];
