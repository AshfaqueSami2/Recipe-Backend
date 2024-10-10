'use client'
import { useState } from "react";

const Pricing = () => {
  // Use state to toggle between annual and monthly pricing
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="relative font-inter antialiased">
      <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">

          {/* Pricing toggle */}
          <div className="flex justify-center max-w-[14rem] m-auto mb-8 lg:mb-16">
            <div className="relative flex w-full p-1 bg-white dark:bg-slate-900 rounded-full">
              <span className="absolute inset-0 m-1 pointer-events-none" aria-hidden="true">
                <span
                  className={`absolute inset-0 w-1/2 bg-indigo-500 rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out ${
                    isAnnual ? "translate-x-0" : "translate-x-full"
                  }`}
                ></span>
              </span>
              <button
                className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
                  isAnnual ? "text-white" : "text-slate-500 dark:text-slate-400"
                }`}
                onClick={() => setIsAnnual(true)}
              >
                Yearly <span className={`${isAnnual ? "text-indigo-200" : "text-slate-400 dark:text-slate-500"}`}>-20%</span>
              </button>
              <button
                className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
                  isAnnual ? "text-slate-500 dark:text-slate-400" : "text-white"
                }`}
                onClick={() => setIsAnnual(false)}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Pricing plans */}
          <div className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none">
            
            {/* Plan 1: Basic Plan */}
            <div className="h-full">
              <div className="relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5">
                <div className="mb-5">
                  <div className="text-slate-900 dark:text-slate-200 font-semibold mb-1">Basic Recipes</div>
                  <div className="inline-flex items-baseline mb-2">
                    <span className="text-slate-900 dark:text-slate-200 font-bold text-3xl">$</span>
                    <span className="text-slate-900 dark:text-slate-200 font-bold text-4xl">{isAnnual ? "9" : "12"}</span>
                    <span className="text-slate-500 font-medium">/mo</span>
                  </div>
                  <div className="text-sm text-slate-500 mb-5">
                    Access to a curated list of easy-to-follow basic recipes, perfect for beginners.
                  </div>
                  <a
                    className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
                    href="#0"
                  >
                    Purchase Plan
                  </a>
                </div>
                <div className="text-slate-900 dark:text-slate-200 font-medium mb-3">Includes:</div>
                <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-3 grow">
                  <li className="flex items-center">
                    <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>100+ basic recipes</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Quick & easy meal ideas</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Basic ingredient lists</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Plan 2: Advanced Plan */}
            <div className="h-full">
              <div className="relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5">
                <div className="mb-5">
                  <div className="text-slate-900 dark:text-slate-200 font-semibold mb-1">Advanced Recipes</div>
                  <div className="inline-flex items-baseline mb-2">
                    <span className="text-slate-900 dark:text-slate-200 font-bold text-3xl">$</span>
                    <span className="text-slate-900 dark:text-slate-200 font-bold text-4xl">{isAnnual ? "19" : "24"}</span>
                    <span className="text-slate-500 font-medium">/mo</span>
                  </div>
                  <div className="text-sm text-slate-500 mb-5">
                    Explore gourmet recipes and culinary techniques for advanced cooking enthusiasts.
                  </div>
                  <a
                    className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
                    href="#0"
                  >
                    Purchase Plan
                  </a>
                </div>
                <div className="text-slate-900 dark:text-slate-200 font-medium mb-3">Includes:</div>
                <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-3 grow">
                  <li className="flex items-center">
                    <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>300+ advanced recipes</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Exclusive culinary tips</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Advanced ingredient techniques</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Plan 3: Professional Plan */}
            <div className="h-full">
              <div className="relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5">
                <div className="mb-5">
                  <div className="text-slate-900 dark:text-slate-200 font-semibold mb-1">Professional Recipes</div>
                  <div className="inline-flex items-baseline mb-2">
                    <span className="text-slate-900 dark:text-slate-200 font-bold text-3xl">$</span>
                    <span className="text-slate-900 dark:text-slate-200 font-bold text-4xl">{isAnnual ? "39" : "49"}</span>
                    <span className="text-slate-500 font-medium">/mo</span>
                  </div>
                  <div className="text-sm text-slate-500 mb-5">
                    For chefs and food enthusiasts who want access to professional-level recipes and techniques.
                  </div>
                  <a
                    className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
                    href="#0"
                  >
                    Purchase Plan
                  </a>
                </div>
                <div className="text-slate-900 dark:text-slate-200 font-medium mb-3">Includes:</div>
                <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-3 grow">
                  <li className="flex items-center">
                    <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>500+ professional recipes</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Advanced cooking techniques</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Access to chef-exclusive content</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};


export default Pricing;

