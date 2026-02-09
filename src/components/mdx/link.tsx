import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

type MdxLinkProps = ComponentPropsWithoutRef<"a">;

export function MdxLink({ href, children, ...props }: MdxLinkProps) {
  const isInternal = href?.startsWith("/") || href?.startsWith("#");

  if (isInternal && href) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
