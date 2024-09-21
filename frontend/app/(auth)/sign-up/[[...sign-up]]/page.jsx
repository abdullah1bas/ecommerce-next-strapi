"use client";
import { SignUp } from '@clerk/nextjs'
import changeClerk from "../../../_components/changeClerk";
import Link from "next/link";

export default function Page() {
  changeClerk(".cl-internal-16vtwdp");
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="login-section">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <Link className="block text-white" href="/">
              <span className="sr-only">Home</span>
              <img src="/logo.svg" alt="" className="text-white" />
            </Link>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to FashionFusion 🦑
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              The FashionFusion website is designed to showcase a wide range of
              commercial products. It offers a user-friendly interface for
              customers to browse and purchase items online. 
            </p>
          </div>
        </section>

        <main className="login-main">
          <div className="max-w-xl lg:max-w-3xl text-center flex md:flex-col md:items-center">
            <div className="relative -mt-16 block lg:hidden mb-4">
              <Link
                className="login-logo"
                href="/"
              >
                <span className="sr-only">Home</span>
                <img src="/logo.svg" alt="" className="text-white" />
              </Link>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                Welcome to FashionFusion 🦑
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                The FashionFusion website is designed to showcase a wide range of
                commercial products. It offers a user-friendly interface for
                customers to browse and purchase items online. 
              </p>
            </div>

            <SignUp />
          </div>
        </main>
      </div>
    </section>
  );
}
