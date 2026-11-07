import { useState } from "react";

// A photo that shows a dark textured box until the photo file is added
export default function Photo({ src, alt = "", className = "", ...rest }) {
  const [missing, setMissing] = useState(false);
  if (missing || !src) {
    return <div className={`bg-[radial-gradient(circle_at_30%_20%,#2a2a2e,#111113)] ${className}`} aria-hidden="true" />;
  }
  return <img src={src} alt={alt} onError={() => setMissing(true)} className={`object-cover ${className}`} {...rest} />;
}
