import Hero from "@/components/hero";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { imageDetection } from "./action/image-detection";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Hero authenticated={!!session} />
      <Pricing />
      <Testimonials />
    </div>
  );
}
