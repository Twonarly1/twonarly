import { rootRouteId, useMatch } from "@tanstack/react-router";

import Link from "@/components/core/link";

const DefaultNotFound = () => {
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-6 p-4">
      <div className="flex flex-col items-center gap-2">
        <span className="font-medium text-7xl tabular-nums tracking-tight">404</span>
        <h1 className="font-medium text-3xl">Page not found</h1>
        <p className="text-center text-secondary-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <div className="flex items-center gap-2">
        {isRoot ? (
          <Link to="/">Home</Link>
        ) : (
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
          >
            Go Back
          </Link>
        )}
      </div>
    </div>
  );
};

export default DefaultNotFound;
