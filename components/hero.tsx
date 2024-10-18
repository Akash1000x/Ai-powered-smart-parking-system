import clsx from "clsx";
import Link from "next/link";

const Hero = ({ authenticated }: { authenticated: boolean }) => {
  return (
    <section className="relative min-h-[calc(100vh-50px)] overflow-hidden bg-[linear-gradient(to_bottom,#fff,#b49de0_40%,#A46EDB_88%)]  dark:bg-[linear-gradient(to_bottom,#000,#200D42_40%,#4F21A1_74%,#A46EDB_88%_50%)]">
      <div className="absolute left-1/2 top-[calc(100%-90px)]  lg:top-[calc(100%-150px)] h-[500px] w-[700px]   md:h-[500px] md:w-[1100px] lg:h-[750px] lg:w-[100%] -translate-x-1/2 rounded-[100%] border-[#B48CDE] bg-black bg-[radial-gradient(closest-side,#000_82%,#9560EB)]"></div>
      <div className="dark:border-dark-border absolute left-0 top-0 z-0 grid h-full w-full grid-cols-[clamp(28px,10vw,120px)_auto_clamp(28px,10vw,120px)] border-b border-border">
        <div className="col-span-1 flex h-full items-center justify-center" />
        <div className="dark:border-dark-border col-span-1 flex h-full items-center justify-center border-x border-white/10" />
        <div className="col-span-1 flex h-full items-center justify-center" />
      </div>
      <figure className="bg-accent-500/40 pointer-events-none absolute -bottom-[70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full blur-[200px]" />
      <figure className="bg-surface-primary dark:bg-dark-surface-primary pointer-events-none absolute left-[4vw] top-[64px] z-20 hidden aspect-square w-[32vw] rounded-full opacity-50 blur-[100px] md:block" />
      <figure className="bg-surface-primary dark:bg-dark-surface-primary pointer-events-none absolute bottom-[-50px] right-[7vw] z-20 hidden aspect-square w-[30vw] rounded-full opacity-50 blur-[100px] md:block" />
      <div className="dark:divide-dark-border relative z-10 flex flex-col divide-y divide-white/10 pt-[35px]">
        <div className="flex flex-col items-center justify-end">
          <div className="dark:border-dark-border flex items-center gap-2 !border !border-b-0 border-white/5 px-4 py-2">
            <p className="text-text-tertiary dark:text-dark-text-tertiary text-sm tracking-tight h-10"></p>
          </div>
        </div>
        <div>
          <div className="mx-auto flex h-[288px] max-w-[80vw] shrink-0 flex-col items-center justify-center gap-2 px-2 py-4 sm:px-10 lg:px-24">
            <h1 className="text-text-primary dark:text-dark-text-primary text-pretty text-center text-4xl  sm:text-5xl md:text-6xl  lg:text-[clamp(50px,7vw,75px)] font-medium leading-none tracking-[-1.44px] md:max-w-screen-lg md:tracking-[-2.16px]">
              Seamless, Hassle-Free Parking at Your Fingertips
            </h1>
            <h2 className="text-2xl text-text-tertiary dark:text-dark-text-tertiary max-w-2xl text-pretty text-center md:text-lg">
              Ai powered smart parking solution for your business
            </h2>
          </div>
        </div>

        <div className=" dark:divide-dark-border flex items-start justify-center divide-y divide-white/10  px-8 sm:px-24">
          <div className="flex w-full max-w-[80vw] flex-col items-center justify-start md:!max-w-[392px]">
            <Link href="/docs" className="cursor-pointer w-full">
              <div
                className={clsx(
                  "!h-14 flex-col items-center justify-center rounded-none !text-base",
                  "max-w-sm:!border-x-0 dark:border-dark-border flex w-full !border-x !border-y-0 border-white/10 !bg-transparent backdrop-blur-xl transition-colors duration-150 hover:!bg-black/5 dark:hover:!bg-white/5"
                )}
              >
                Learn more
              </div>
            </Link>
            <Link href={!authenticated ? "/sign-up" : "/dashboard"} className="cursor-pointer w-full">
              <div
                className={clsx(
                  "text-white dark:text-black boder-2 !h-14 flex-col items-center justify-center rounded-none border-none !text-base",
                  "flex w-full border-[1.2px] border-white/5 bg-gradient-to-tr from-purple-800 via-purple-700 to-purple-400"
                )}
              >
                {!authenticated ? "Get started" : "Dashboard"}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
