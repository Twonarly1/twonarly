import type { ReactNode } from "react";

interface Props extends React.ComponentPropsWithRef<"div"> {
  children: ReactNode;
}

const PageContainer = ({ children, ...rest }: Props) => {
  return (
    <div className="container mx-auto mb-12 h-full space-y-12" {...rest}>
      {children}
    </div>
  );
};

export default PageContainer;
