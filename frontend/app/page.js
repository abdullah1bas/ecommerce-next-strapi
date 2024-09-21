'use client'
import Hero from "./_components/Hero";
import ProductSection from "./_components/ProductSection";
import changeClerk from './_components/changeClerk'

export default function Home() {
  changeClerk('.cl-internal-16vtwdp');
  changeClerk('.cl-internal-lk7758');
  return (
    <div>
      <Hero />
      <ProductSection />
    </div>
  );
}
