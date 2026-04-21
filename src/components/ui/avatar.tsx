import fallbackAvatar from "/public/avatar-fallaback.jpg";

const FALLBACK_AVATAR = fallbackAvatar;

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
      src={src || FALLBACK_AVATAR}
      alt={alt || ""}
      onError={(e) => {
        e.currentTarget.src = FALLBACK_AVATAR;
      }}
      className={className}
    />
  );
}

export { Avatar };
