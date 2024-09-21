"use client"; // تأكد من وجود هذا السطر في أعلى الملف

import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartContext } from "../_context/CartContext";
import CartApis from "../_utils/CartApis";
import Cart from "../_components/Cart";
const links = [
  { url: '/', name: "Home" },
  { url: '/explore', name: "Explore" },
  { url: '/', name: "Projects" },
  { url: '/about-us', name: "About Us" },
  { url: '/contact-us', name: "Contact Us" },
];
function Header() {
  const [hideHeader, setHideHeader] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    // تحقق إذا كانت الصفحة هي صفحة تسجيل الدخول أو التسجيل
    const isLogIn = pathName.includes("sign-in");
    const isLogUp = pathName.includes("sign-up");

    // تحديث الحالة لإخفاء أو إظهار الـ Header
    setHideHeader(isLogIn || isLogUp);
  }, [pathName]);

  const [openCart, setOpenCart] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const { user } = useUser();
  useEffect(() => {
    user && getCartItems();
  }, [user]);
  const getCartItems = () => {
    CartApis.getUserCartItems(user.primaryEmailAddress.emailAddress).then(
      (res) => {
        console.log("response from cart items", res?.data?.data);
        res?.data?.data.forEach((cItem) => {
          setCart((oldCart) => [
            ...oldCart,
            {
              id: cItem.id,
              product: cItem?.attributes?.products?.data[0],
            },
          ]);
        });
      }
    );
  };
  const cartRef = useRef(null);

  // Close the cart when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setOpenCart(false);
      }
    }

    // Listen for clicks on the document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartRef]);
  return !hideHeader ? (
    <header className="bg-white dark:bg-gray-900">
      <div className="flex items-center h-16 max-w-screen-xl gap-8 px-4 mx-auto shadow-md sm:px-6 lg:px-8">
        {/* Image da comp fe next src = / next fahem path 2le gwa al public */}
        <Image src="/logo.svg" alt="logo" width={30} height={30} />

        <div className="flex items-center justify-end flex-1 md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {links.map((link) => (
                <Link key={link.name} href={link.url} className="header-link">
                  {link.name}
                </Link>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {!user ? (
              <div className="sm:flex sm:gap-4">
                {[
                  {
                    classN:
                      "block login-button bg-primary text-white hover:bg-teal-500 dark:hover:bg-teal-500",
                    name: "Login",
                    ref: "/sign-in",
                  },
                  {
                    classN: "login-button register-button",
                    name: "Register",
                    ref: "/sign-up",
                  },
                ].map((link) => (
                  <Link key={link.ref} href={link.ref} className={link.classN}>
                    {link.name}
                  </Link>
                ))}
              </div>
            ) : (
              <>
                <button
                  className="flex items-center gap-5"
                  onClick={() => setOpenCart(!openCart)}
                >
                  <h2 className="flex gap-1 cursor-pointer">
                    <ShoppingCart />({cart?.length || 0})
                  </h2>
                  <UserButton afterSignOutUrl="/" />
                </button>
                {openCart && <Cart {...{ cartRef, openCart, setOpenCart }} />}
              </>
            )}

            <button className="toggle-menu">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  ) : null;
}

export default Header;

// function Header() {
//   const {user} = useUser();
//   const [login , setLogin] = useState({logIn: false, logUp: false});
//   const location = window.location.href;
//   // console.log(window.location.href === '/sign-in');
//   useEffect(()=> {
//     setLogin({
//       logIn: location.toString().includes('sign-in'),
//       logUp: location.toString().includes('sign-up'),
//     })
//     console.log(!login.logIn);
//   },[])

//   return ( !login.logIn || !login.logIn ?
//     <header className="bg-white dark:bg-gray-900">
//       <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 shadow-md">
//         {/* Image da comp fe next src = / next fahem path 2le gwa al public */}
//         <Image src={"/logo.svg"} width={50} height={50} alt="logo" />

//         <div className="flex flex-1 items-center justify-end md:justify-between">
//           <nav aria-label="Global" className="hidden md:block">
//             <ul className="flex items-center gap-6 text-sm">
//               <li>
//                 <a
//                   className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
//                   href="#"
//                 >
//                   Home
//                 </a>
//               </li>

//               <li>
//                 <a
//                   className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
//                   href="#"
//                 >
//                   Explore
//                 </a>
//               </li>

//               <li>
//                 <a
//                   className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
//                   href="#"
//                 >
//                   Projects
//                 </a>
//               </li>

//               <li>
//                 <a
//                   className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
//                   href="#"
//                 >
//                   About Us
//                 </a>
//               </li>

//               <li>
//                 <a
//                   className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
//                   href="#"
//                 >
//                   Contact Us
//                 </a>
//               </li>

//             </ul>
//           </nav>

//           <div className="flex items-center gap-4">
//             {user ?
//             <button >
//               <UserButton afterSignOutUrl="/" />
//             </button>
//             :<div className="sm:flex sm:gap-4">
//               <a
//                 className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500 dark:hover:bg-teal-500"
//                 href="#"
//               >
//                 Login
//               </a>

//               <a
//                 className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-500 transition hover:text-teal-500/75 sm:block dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
//                 href="#"
//               >
//                 Register
//               </a>
//             </div>}

//             <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
//               <span className="sr-only">Toggle menu</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="size-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//     : null
//   );
// }

// export default Header;
