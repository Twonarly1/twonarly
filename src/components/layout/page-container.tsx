import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

interface Props extends React.ComponentPropsWithRef<"div"> {
  children: ReactNode;
}

const PageContainer = ({ children, className, ...rest }: Props) => {
  return (
    <div
      className={cn(
        "mx-auto mt-8 max-w-2xl flex-1 space-y-6 bg-content p-4 sm:mt-0 sm:space-y-12",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default PageContainer;
