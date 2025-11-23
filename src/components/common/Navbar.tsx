import { Button } from "../ui/button";
import { useAuth } from "../providers/AuthProvider";
import Link from "next/link";
import { useEffect, useState } from "react";
import DropdownUI from "../ui/ready/dropdown";
import { ChevronDown, User } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const { isLogin, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`flex justify-between items-center px-8 -top-5 transition-all ${
        scrolled ? "sticky top-0 bg-white border-b py-2" : "py-5"
      }`}
    >
      <Link
        href={"/"}
        className="text-2xl font-poppins font-semibold text-primary w-full sm:w-auto text-center sm:text-left"
      >
        SkillSwap
      </Link>

      <div className="hidden sm:flex gap-6 font-inter text-textSecondary">
        <Link href="#features" className="hover:text-primary">
          Features
        </Link>
        <Link href="#about" className="hover:text-primary">
          About
        </Link>
        <Link href="#contact" className="hover:text-primary">
          Contact
        </Link>
      </div>

      {isLogin ? (
        <div className="hidden sm:flex gap-3">
          <DropdownUI
            text={
              <>
                {user?.name?.split(" ")[0] || "Profile"} <ChevronDown />
              </>
            }
            label={
              <div className="w-full flex items-center gap-2">
                <User /> {user?.name || "User"}
              </div>
            }
            children={[
              { href: "/profile", label: "Profile" },
              { onClick: signOut, label: "Logout" },
            ]}
          />
        </div>
      ) : (
        <div className="hidden sm:flex gap-3">
          <Link href="/auth">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              Login
            </Button>
          </Link>
          <Link href="/get-started">
            <Button className="bg-primary text-white hover:bg-primary/90">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
