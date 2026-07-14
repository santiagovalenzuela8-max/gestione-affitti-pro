import Image from "next/image";

export function Logo({
  className = "h-8 w-8",
  variant = "black",
}: {
  className?: string;
  variant?: "black" | "white";
}) {
  return (
    <Image
      src={variant === "white" ? "/images/logo-white.png" : "/images/logo-black.png"}
      alt="Gestione Affitti Pro"
      width={500}
      height={500}
      className={`${className} object-contain`}
    />
  );
}
