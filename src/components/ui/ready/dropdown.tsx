"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React from "react";
type DropdownItem =
  | { label: string; onClick: () => void; href?: never }
  | { label: string; href: string; onClick?: never }
  | { label: string; href: string; onClick: () => void };

export default function DropdownUI({
  text,
  label,
  children,
}: {
  text: React.ReactNode;
  label: React.ReactNode;
  children: DropdownItem[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{text}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {children.map((item, index) => {
          if (item.onClick) {
            return (
              <DropdownMenuItem key={index} onClick={item.onClick}>
                {item.label}
              </DropdownMenuItem>
            );
          }

          return (
            <Link key={index} href={item.href!}>
              <DropdownMenuItem>{item.label}</DropdownMenuItem>
            </Link>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
