import fallbackAvatar from "/public/avatar-fallaback.jpg";

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
      src={src || fallbackAvatar}
      alt={alt}
      onError={(e) => {
        e.currentTarget.src = fallbackAvatar;
      }}
      className={className}
    />
  );
}

export { Avatar };
