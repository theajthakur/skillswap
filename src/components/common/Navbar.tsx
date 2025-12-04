import { Button } from "../ui/button";
import { useAuth } from "../providers/AuthProvider";
import Link from "next/link";
import { useEffect, useState } from "react";
import DropdownUI from "../ui/ready/dropdown";
import { ChevronDown, User, Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const { isLogin, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] max-w-7xl z-50 transition-all duration-300 rounded-full px-6 py-3 ${scrolled
        ? "bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-lg"
        : "bg-transparent border-transparent"
        }`}
    >
      <div className="flex justify-between items-center">
        <Link
          href={"/"}
          className="text-2xl font-poppins font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          SkillSwap
        </Link>

        <div className="hidden md:flex gap-8 font-inter font-medium text-foreground/80">
          {["Features", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`${item.toLowerCase()}`}
              className="relative group hover:text-primary transition-colors"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {isLogin ? (
          <div className="hidden md:flex gap-3">
            <DropdownUI
              text={
                <span className="font-semibold text-foreground hover:text-primary transition-colors">
                  {user?.name?.split(" ")[0] || "Profile"} <ChevronDown className="inline w-4 h-4" />
                </span>
              }
              label={
                <div className="w-full flex items-center gap-2 text-primary">
                  <User className="w-4 h-4" /> {user?.name || "User"}
                </div>
              }
              children={[
                { href: "/profile", label: "Profile" },
                { onClick: signOut, label: "Logout" },
              ]}
            />
          </div>
        ) : (
          <div className="hidden md:flex gap-4">
            <Link href="/auth">
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary hover:bg-primary/10 font-semibold"
              >
                Login
              </Button>
            </Link>
            <Link href="/get-started">
              <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 shadow-md hover:shadow-lg transition-all rounded-full px-6">
                Get Started
              </Button>
            </Link>
          </div>
        )}

        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex items-center gap-4">
          {isLogin && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">{user?.name?.split(" ")[0]}</span>
            </div>
          )}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-foreground p-2">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-surface/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col gap-6 md:hidden rounded-b-2xl shadow-2xl animate-in slide-in-from-top-5">
            {["Features", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="h-px bg-white/10 w-full" />
            {isLogin ? (
              <div className="flex flex-col gap-4">
                <Link href="/profile" className="text-lg font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                <button onClick={() => signOut()} className="text-lg font-medium text-red-500 text-left">Logout</button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-lg">Login</Button>
                </Link>
                <Link href="/get-started" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav >
  );
}
