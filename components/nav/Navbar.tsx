"use client";


import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight, Menu,
  //  Search, ShoppingBasket 
} from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "next/image";


const navigation = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "QHSE", href: "#qhse" },
  { name: "Projects", href: "#projects" },
  { name: "Partners", href: "#partners" },
];

export default function Navbar() {


  return (
    // <nav
    //   ref={navRef}
    //   className="fixed top-0 left-0 z-100 w-full transition-all duration-300 py-6 px-6 lg:px-12 flex items-center justify-between"
    //   aria-label="Main navigation"
    // >
    //   <div className="flex items-center gap-12">
    //     <Link href="/" className="relative flex items-center gap-2">
    //       {/* Northbrook Logo */}
    //       <div className="relative w-48 h-10 lg:w-56 lg:h-12">
    //         <Image
    //           src="/images/logo.png"
    //           alt="Northbrook Logo"
    //           fill
    //           className="object-contain"
    //           priority
    //         />
    //       </div>
    //     </Link>

    //     {/* Live Status Beats */}
    //     <div className="hidden lg:flex items-center gap-3 pl-8 border-l border-foreground/10">
    //       <div className="relative h-2 w-2">
    //         <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-40" />
    //         <div className="relative h-full w-full rounded-full bg-accent" />
    //       </div>
    //       <span className="nav-text-item font-mono text-[9px] uppercase tracking-[0.3em] text-white font-black">
    //         Ops Status: Nominal / GH-TEMA
    //       </span>
    //     </div>
    //   </div>

    //   {/* Desktop Nav */}
    //   <div className="hidden md:flex items-center gap-4">
    //     <NavigationMenu>
    //       <NavigationMenuList className="gap-1">
    //         {NAV_LINKS.map((link) => (
    //           <NavigationMenuItem key={link.name}>
    //             <MagneticButton strength={0.15} radius={30}>
    //               <Link href={link.href} legacyBehavior passHref>
    //                 <NavigationMenuLink
    //                   className={cn(
    //                     navigationMenuTriggerStyle(),
    //                     "nav-text-item bg-transparent hover:bg-transparent hover:text-accent focus:bg-transparent text-white uppercase text-[11px] tracking-[0.2em] font-black transition-colors"
    //                   )}
    //                 >
    //                   {link.name}
    //                 </NavigationMenuLink>
    //               </Link>
    //             </MagneticButton>
    //           </NavigationMenuItem>
    //         ))}
    //       </NavigationMenuList>
    //     </NavigationMenu>

    //     <div className="h-6 w-px bg-foreground/10 mx-4" />

    //     <MagneticButton strength={0.2} radius={50}>
    //       <Button variant="default" className="px-10 h-14 font-black uppercase tracking-widest text-[11px] shadow-xl bg-accent hover:bg-foreground">
    //         Request a Quote
    //       </Button>
    //     </MagneticButton>
    //   </div>

    //   {/* Mobile Nav */}
    //   <div className="md:hidden">
    //     <Sheet>
    //       <SheetTrigger asChild>
    //         <Button variant="ghost" size="icon" aria-label="Open menu" className="text-foreground">
    //           <Menu className="h-8 w-8" />
    //         </Button>
    //       </SheetTrigger>
    //       <SheetContent side="right" className="bg-background border-accent/20 flex flex-col justify-center gap-8">
    //         {NAV_LINKS.map((link, i) => (
    //           <Link
    //             key={link.name}
    //             href={link.href}
    //             className="text-4xl font-black uppercase tracking-tighter hover:text-accent transition-colors text-foreground"
    //           >
    //             {link.name}
    //           </Link>
    //         ))}
    //         <Button variant="default" className="mt-8 py-10 text-xl font-black uppercase tracking-widest bg-accent">
    //           Request a Quote
    //         </Button>
    //       </SheetContent>
    //     </Sheet>
    //   </div>
    // </nav>
    <header className="flex items-center mx-auto px-6 lg:px-24">
      <div className="w-full md:w-2/3 lg:w-1/2 bg-background/95 backdrop-blur-sm p-4 rounded-br-2xl flex items-center gap-2">
        <a href="#" className="text-xl font-semibold bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
        </a>

        <nav className="hidden lg:flex items-center justify-between w-full">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant="link"
              className="cursor-pointer relative group hover:text-primary transition-colors"
            >
              {item.name}
            </Button>
          ))}
          {/* <Button variant="ghost" size="icon" className="cursor-pointer relative group hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="cursor-pointer relative group hover:text-primary transition-colors">
            <ShoppingBasket className="w-5 h-5" />
          </Button> */}
        </nav>

        <Sheet>
          <SheetTrigger asChild className="lg:hidden ml-auto">
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[400px] p-0 bg-background/95 backdrop-blur-md border-r border-border/50"
          >
            <SheetHeader className="p-6 text-left border-b border-border/50">
              <SheetTitle className="flex items-center justify-between">
                <a href="#" className="text-xl font-semibold bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
                </a>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col p-6 space-y-1">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="justify-start px-2 h-12 text-base font-medium hover:bg-accent/50 hover:text-primary transition-colors"
                >
                  {item.name}
                </Button>
              ))}
            </nav>
            <Separator className="mx-6" />
            {/* <div className="p-6 flex flex-col gap-4">
              <Button variant="outline" className="justify-start gap-2 h-12 hover:bg-accent/50 transition-colors">
                <Search className="w-4 h-4" />
                Search
              </Button>
              <Button variant="outline" className="justify-start gap-2 h-12 hover:bg-accent/50 transition-colors relative">
                <ShoppingBasket className="w-4 h-4" />
                Cart
                <span className="absolute right-3 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </div> */}
            <Separator className="mx-6" />
            <div className="p-6">
              <Button className="w-full h-12 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl">
                Request a Quote
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:flex w-1/2 justify-end items-center pr-4 gap-4 ml-auto">
        <Button
          variant="secondary"
          className="cursor-pointer bg-primary-foreground p-0 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <span className="pl-4 py-2 text-sm font-medium">Request a Quote</span>
          <div className="rounded-full flex items-center justify-center m-auto bg-background w-10 h-10 ml-2 group-hover:scale-110 transition-transform duration-300">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </Button>
      </div>
    </header>
  );
}
