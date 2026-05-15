import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function RequestQuoteLink() {
    return (
        <Link href="/contact" className={`${buttonVariants({ variant: "default", size: "lg" })} px-8 py-6 text-[11px] font-black uppercase tracking-widest bg-accent hover:bg-white! hover:text-accent! shadow-2xl transition-all`}>
            Request a Quote
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <path d="M2 14L14 2M14 2H5M14 2V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </Link>
    );
}