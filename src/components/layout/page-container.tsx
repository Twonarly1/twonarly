import type { ComponentPropsWithRef, ReactNode } from "react";

interface Props extends ComponentPropsWithRef<"div"> {
  children: ReactNode;
}

const PageContainer = ({ children, className, ...rest }: Props) => {
  return (
    <div className="mx-auto mt-8 max-w-2xl flex-1 space-y-12 bg-content p-4 sm:mt-0" {...rest}>
      {children}
    </div>
  );
};

export default PageContainer;
