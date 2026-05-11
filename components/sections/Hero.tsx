"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  {
    value: "13+",
    label: "Years of Total Logistics Solutions for Large-Scale Engineering in West Africa",
    sub: null,
  },
  {
    value: "12",
    label: "Integrated Service Lines",
    sub: null,
  },
  {
    value: "Certified",
    label: "Classification Partners",
    sub: "ABS · ClassNK · DNV-GL · Lloyd's · RINA · KR",
  },
];

export default function Hero() {
  return (
    <div className="w-full relative min-h-screen px-4 sm:px-6 lg:px-24 pt-2">
      {/* Background image — data-speed="0" keeps it fixed via ScrollSmoother */}
      <div
        data-speed="0"
        className="absolute inset-0 -z-10 pointer-events-none"
      >
        <Image
          src="/images/hero.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/20" />
      </div>

      <div className="bg-white/20 backdrop-blur-md border border-white/25 rounded-2xl relative shadow-xl">
        <motion.section
          className="w-full px-6 sm:px-10 py-16 sm:py-24 lg:py-28"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mx-auto text-center">
            <motion.p
              className="text-xs uppercase tracking-[0.4em] text-primary font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Established 2011 · Ghana · West Africa
            </motion.p>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <span className="bg-linear-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                Precision Logistics
              </span>
              <br />
              <span className="text-foreground">
                for Oil &amp; Gas Operations.
              </span>
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              Integrated onshore and offshore logistics across West Africa, Air &amp; Sea Freight,
              Bunkering, Ship Husbandry, and Crew Management. Where others hesitate, we deliver.
            </motion.p>
          </div>
        </motion.section>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-2 pb-8 sm:pb-16">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.value}
            className="bg-white/20 backdrop-blur-md border border-white/25 rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-between gap-4 sm:gap-0 min-h-[100px] sm:min-h-[200px] shadow-lg hover:bg-white/25 hover:shadow-xl transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.12, ease: "easeOut" }}
          >
            {/* Value */}
            <p className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none tabular-nums">
              {stat.value}
            </p>

            {/* Divider + label block */}
            <div className="sm:mt-6 pt-0 sm:pt-4 border-t-0 sm:border-t border-white/20 space-y-1 text-right sm:text-left max-w-[55%] sm:max-w-none">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/60 font-semibold leading-snug">
                {stat.label}
              </p>
              {stat.sub && (
                <p className="text-[10px] tracking-widest text-white/40 font-medium">
                  {stat.sub}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
