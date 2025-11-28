"use client";

import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    signOut({ callbackUrl: "/auth" });
    router.push("/");
  }, []);

  return (
    <div className="w-full min-h-[80vh] justify-center items-center text-4xl flex font-bold">
      <motion.p
        initial={{ color: "#00000050", y: 0 }}
        animate={{ color: "#00000080", y: 10 }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        Logging you out...
      </motion.p>
    </div>
  );
}
