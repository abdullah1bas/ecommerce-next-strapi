"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { useSearchParams } from "next/navigation";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

function Checkout() {
  // لتتعامل مع الـ URL query parameters (المعلمات الموجودة في عنوان الصفحة) في تطبيقات العميل.
  // هذه Hook تتيح لك قراءة أو استخراج قيم معينة من الـ URL.
  const searchParams = useSearchParams();
  console.log(Number(searchParams.get("amount")) * 100);
  // options = al 3omla , mode , amount
  const options = {
    mode: "payment",
    currency: "usd",
    amount: Number(searchParams.get("amount")) * 100,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={Number(searchParams.get("amount"))} />
    </Elements>
  );
}

export default Checkout;
