function Avatar({
  src,
  alt,
  className,
}: {
  src?: string | null;
  alt?: string;
  className?: string;
}) {
  return (
    <img
      src={src || "/avatar-fallback.jpg"}
      alt={alt}
      onError={(e) => {
        e.currentTarget.src = "/avatar-fallback.jpg";
      }}
      className={className}
    />
  );
}

export default Avatar;
