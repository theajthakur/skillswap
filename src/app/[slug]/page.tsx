"use client";
import type { ComponentType } from "react";
import GetStarted from "@/components/basics/GetStarted";
import ResetPassword from "@/components/user/reset/Reset";
import { useParams } from "next/navigation";
import NotFound from "@/components/common/NotFound";
import Logout from "@/components/common/Logout";

export default function page() {
  const { slug } = useParams();
  const pages = [
    { reset: ResetPassword },
    { "get-started": GetStarted },
    { logout: Logout },
  ];
  const page = pages.map((pageObj, index) => {
    const maybe = pageObj[slug as keyof typeof pageObj];
    if (maybe) {
      const Component = maybe as ComponentType;
      return <Component key={index} />;
    }
    return null;
  });
  return (
    <>{pages.find((e, i) => e[slug as keyof typeof e]) ? page : <NotFound />}</>
  );
}
