import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "../providers/AuthProvider";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <nav className="flex justify-between items-center px-8 py-5">
      <h1 className="text-2xl font-poppins font-semibold text-primary w-full sm:w-auto text-center sm:text-left">
        SkillSwap
      </h1>

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

      {user ? (
        <div className="hidden sm:flex gap-3">
          <Link href="/profile">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              Profile
            </Button>
          </Link>
        </div>
      ) : (
        <div className="hidden sm:flex gap-3">
          <Link href="/login">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-primary text-white hover:bg-primary/90">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
