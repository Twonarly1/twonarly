import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

interface Props extends React.ComponentPropsWithRef<"div"> {
  children: ReactNode;
}

const PageContainer = ({ children, className, ...rest }: Props) => {
  return (
    <div className={cn("mx-auto max-w-2xl flex-1 space-y-12 bg-content p-4", className)} {...rest}>
      {children}
    </div>
  );
};

export default PageContainer;
