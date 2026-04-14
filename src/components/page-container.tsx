import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

interface Props extends React.ComponentPropsWithRef<"div"> {
  children: ReactNode;
}

const PageContainer = ({ children, className, ...rest }: Props) => {
  return (
    <div
      className={cn("no-scrollbar container mx-auto flex-1 space-y-12 last:mb-24", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default PageContainer;
