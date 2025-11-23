"use client";
import type { ComponentType } from "react";
import GetStarted from "@/components/basics/GetStarted";
import UserProfile from "@/components/user/profile/Profile";
import ResetPassword from "@/components/user/reset/Reset";
import { useParams } from "next/navigation";

export default function page() {
  const { slug } = useParams();
  const pages = [
    { profile: UserProfile },
    { reset: ResetPassword },
    { "get-started": GetStarted },
  ];
  return (
    <>
      {pages.map((pageObj, index) => {
        const maybe = pageObj[slug as keyof typeof pageObj];
        if (maybe) {
          const Component = maybe as ComponentType;
          return <Component key={index} />;
        }
        return null;
      })}
    </>
  );
}
