import { Ellipsis } from "lucide-react";
import { useState } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { navLinks } from "@/lib/constants/nav-links";
import Link from "./core/link";
import { Button } from "./ui/button";

// First 2 are pinned, rest go in the "More" menu
const PINNED_COUNT = 3;
const pinnedLinks = navLinks.slice(0, PINNED_COUNT);
const moreLinks = navLinks.slice(PINNED_COUNT);

const MobileBottomNav = () => {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 overflow-x-auto border-t bg-sidebar md:hidden">
      <div className="flex h-14 items-center justify-around bg-sidebar px-2">
        {pinnedLinks.map((item) => {
          return (
            <Link
              key={item.to}
              to={item.to}
              variant="outline"
              className="h-auto flex-col"
              activeProps={{ className: "text-sidebar-foreground" }}
            >
              <item.icon className="size-5 transition-colors" />
              <span className="font-medium text-xs leading-none">{item.label}</span>
            </Link>
          );
        })}
        <Drawer open={moreOpen} onOpenChange={setMoreOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="h-auto flex-col">
              <Ellipsis className="size-5 transition-colors" />
              <span className="font-medium text-xs leading-none">More</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="sr-only">
              <DrawerTitle className="hidden" />
              <DrawerDescription className="hidden" />
            </DrawerHeader>

            <div className="p-4">
              {moreLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-base text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
                  activeProps={{ className: "bg-muted text-foreground" }}
                >
                  <item.icon className="size-4 shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default MobileBottomNav;

// import { Link } from "@tanstack/react-router";
// import { Ellipsis } from "lucide-react";
// import { useState } from "react";

// import {
//   Drawer,
//   DrawerContent,
//   DrawerDescription,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import { navLinks } from "@/lib/constants/nav-links";

// // First 2 are pinned, rest go in the "More" menu
// const PINNED_COUNT = 2;
// const pinnedLinks = navLinks.slice(0, PINNED_COUNT);
// const moreLinks = navLinks.slice(PINNED_COUNT);

// const MobileBottomNav = () => {
//   const [moreOpen, setMoreOpen] = useState(false);

//   return (
//     <nav className="fixed inset-x-0 bottom-0 z-50 border-t md:hidden">
//       <div className="flex h-14 items-center justify-around bg-sidebar px-2">
//         {pinnedLinks.map((item) => {
//           return (
//             <Link
//               key={item.to}
//               to={item.to}
//               className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1.5 text-sidebar-foreground/70 transition-colors hover:text-foreground active:scale-95"
//               activeProps={{ className: "text-sidebar-foreground" }}
//             >
//               <item.icon className="size-5 transition-colors" />
//               <span className="font-medium text-xs leading-none">{item.label}</span>
//             </Link>
//           );
//         })}

//         <Drawer open={moreOpen} onOpenChange={setMoreOpen}>
//           <DrawerTrigger className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1.5 text-muted-foreground transition-colors hover:text-foreground active:scale-95">
//             <Ellipsis className="size-5 transition-colors" />
//             <span className="font-medium text-xs leading-none">More</span>
//           </DrawerTrigger>
//           <DrawerContent>
//             <DrawerHeader className="sr-only">
//               <DrawerTitle className="hidden" />
//               <DrawerDescription className="hidden" />
//             </DrawerHeader>

//             <div className="p-4">
//               {moreLinks.map((item) => (
//                 <Link
//                   key={item.to}
//                   to={item.to}
//                   onClick={() => setMoreOpen(false)}
//                   className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-base text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
//                   activeProps={{ className: "bg-muted text-foreground" }}
//                 >
//                   <item.icon className="size-4 shrink-0" />
//                   <span className="font-medium">{item.label}</span>
//                 </Link>
//               ))}
//             </div>
//           </DrawerContent>
//         </Drawer>
//       </div>
//     </nav>
//   );
// };

// export default MobileBottomNav;
