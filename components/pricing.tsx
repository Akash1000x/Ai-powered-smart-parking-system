"use client";
import { Price, pricingData } from "@/config/pricing-data";
import SectionTitle from "./section-title";
import axios from "axios";
import { Button } from "./ui/button";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="relative z-20 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px] px-10"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle subtitle="Pricing Table" title="Our Pricing Plan" paragraph="" center />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {pricingData.map((product, i) => (
            <PricingBox key={i} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingBox = ({ product }: { product: Price }) => {
  // POST request
  const handleSubscription = async (e: any) => {
    e.preventDefault();
    const { data } = await axios.post(
      "/api/payment",
      {
        priceId: product.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.assign(data);
  };

  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div
        className="relative z-10 mb-10 overflow-hidden rounded-xl bg-white px-8 py-10 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.08)] dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-14"
        data-wow-delay=".1s"
      >
        {product.nickname === "yearly" && (
          <p className="absolute right-[-50px] top-[60px] inline-block -rotate-90 rounded-bl-md rounded-tl-md bg-primary px-5 py-2 text-base font-medium text-white">
            Recommended
          </p>
        )}
        {product.unit_amount === "custom" ? (
          <div className="mb-11 text-4xl font-semibold text-dark dark:text-white xl:text-[42px] xl:leading-[1.21] text-center">
            Custom
          </div>
        ) : (
          <>
            <span className="mb-5 block text-xl font-medium text-dark dark:text-white capitalize">
              {product.nickname}
            </span>
            <h2 className="mb-11 text-4xl font-semibold text-dark dark:text-white xl:text-[42px] xl:leading-[1.21]">
              <span className="text-xl font-medium">$ </span>
              <span className="-ml-1 -tracking-[2px]">{product.unit_amount}</span>
              <span className="text-base font-normal text-body-color dark:text-dark-6"> Per Month</span>
            </h2>
          </>
        )}

        <div className="w-full">
          {product.unit_amount === "custom" ? (
            <Button size={"lg"}>Contact us</Button>
          ) : (
            <Button onClick={handleSubscription} size={"lg"}>
              Purchase Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
