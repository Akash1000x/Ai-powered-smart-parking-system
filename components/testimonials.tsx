import Image from "next/image";
import SectionTitle from "./section-title";
interface Testimonial {
  id: number;
  name: string;
  designation: string;
  content: string;
  image: string;
  star: number;
}

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Sabo Masties",
    designation: "Founder @ Rolex",
    content:
      "The platform has completely transformed how we manage our workflows. It's efficient, user-friendly, Highly recommend it to anyone looking to streamline their operations!",
    image: "/images/testimonials/author-01.png",
    star: 5,
  },
  {
    id: 2,
    name: "Margin Gesmu",
    designation: "Founder @ UI Hunter",
    content:
      "The integration process was seamless, and the platform's flexibility allows us to customize it to our exact needs. Our team productivity has skyrocketed since we started using it!",
    image: "/images/testimonials/author-02.png",
    star: 5,
  },
  {
    id: 3,
    name: "William Smith",
    designation: "Founder @ Trorex",
    content:
      "What I love most is how intuitive the system is. Our entire team adopted it quickly, and it’s improved our project management efficiency tenfold. Excellent service and support!",
    image: "/images/testimonials/author-03.png",
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-100 py-20 dark:bg-dark-2 md:py-[120px]">
      <div className="container px-4">
        <SectionTitle subtitle="Testimonials" title="What our Client Say" paragraph="" width="640px" center />

        <div className="mt-[60px] flex flex-wrap lg:mt-20 gap-y-8">
          {testimonialData.map((testimonial, i) => (
            <SingleTestimonial key={i} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const starIcon = (
  <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
    <path d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z" />
  </svg>
);

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  const { star, name, image, content, designation } = testimonial;

  const ratingIcons = [];
  for (let index = 0; index < star; index++) {
    ratingIcons.push(
      <span key={index} className="text-[#fbb040]">
        {starIcon}
      </span>
    );
  }

  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div
        className="rounded-xl bg-white px-4 py-[30px] shadow-testimonial dark:bg-dark sm:px-[30px]"
        data-wow-delay=".1s"
      >
        <div className="mb-[18px] flex items-center gap-[2px]">{ratingIcons}</div>

        <p className="mb-6 text-base text-body-color dark:text-dark-6">“{content}</p>

        <div className="flex items-center gap-4">
          <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
            <Image src={image} alt={name} width={50} height={50} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-dark dark:text-white">{name}</h3>
            <p className="text-body-secondary text-xs">{designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
