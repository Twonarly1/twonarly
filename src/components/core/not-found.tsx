import Link from "@/components/core/link";

const NotFound = () => (
  <div className="flex h-full w-full flex-col items-center justify-center gap-4">
    <h1 className="text-h1">Not Found</h1>

    <Link to="/" variant="outline">
      Go Home
    </Link>
  </div>
);

export default NotFound;
