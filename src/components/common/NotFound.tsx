import React from "react";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="bg-background flex items-center justify-center p-6">
            <div className="bg-surface rounded-2xl shadow-xl p-10 max-w-md w-full flex flex-col items-center gap-6 text-center">
                <div className="w-60 h-60 flex items-center justify-center">
                    <img
                        src="/disconnected.jpg"
                        alt="Not found"
                        width={500}
                        height={500}
                        className="w-full h-full object-contain"
                    />
                </div>

                <h1 className="text-foreground text-3xl font-bold">Page Not Found</h1>

                <p className="text-text-secondary text-base leading-relaxed">
                    This skill connection seems broken. The page you're looking for does not exist.
                </p>

                <Link
                    href="/"
                    className="flex items-center gap-2 bg-primary text-surface px-6 py-3 rounded-xl font-medium text-lg hover:bg-secondary transition-all active:scale-95"
                >
                    <RefreshCcw size={20} />
                    Go Home
                </Link>
            </div>
        </div>
    );
}
