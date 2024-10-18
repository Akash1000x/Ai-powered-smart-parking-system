import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { footerLinks } from "@/config/site";

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("border-t", className)}>
      <div className="grid max-w-6xl grid-cols-2 gap-6 py-8 md:grid-cols-5">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <span className="text-sm font-medium text-foreground">{section.title}</span>
            <ul className="mt-4 list-inside space-y-3">
              {section.items?.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
