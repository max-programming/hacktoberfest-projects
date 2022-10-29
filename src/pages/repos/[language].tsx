import Head from "next/head";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { BsArrowUp } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

import Card from "@/src/components/Card";
import Header from "@/src/components/Header";
import Pagination from "@/src/components/Pagination";
import Sort from "@/src/components/Sort";
import StarsFilter from "@/src/components/StarsFilter";
import capFirstLetter from "@/src/utils/capFirstLetter";
import { trpc } from "@/src/utils/trpc";
import Skeleton from "@/src/components/Skeleton";

const Language = () => {
  const [scrollToTopBtn, setScrollToTopBtn] = useState(false);
  const router = useRouter();
  const { language } = router.query;
  const { data, isLoading } = trpc.repos.getByLanguage.useQuery(
    {
      ...router.query,
      language: language as string,
    },
    { enabled: router.isReady }
  );
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onScroll = () => {
    if (window.scrollY >= 200) {
      setScrollToTopBtn(true);
    } else {
      setScrollToTopBtn(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  if (!data || isLoading) {
    // if (true) {
    return (
      <>
        <Header />
        <div className="container mx-auto">
          <div className="min-h-screen pt-5">
            <div className="text-center">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>{`${capFirstLetter(data.languageName)} Repositories`}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.ico"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" sizes="32x32" href="/favicon-32x32.ico" />
        <link rel="icon" sizes="16x16" href="/favicon-16x16.ico" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#1A202C"></meta>
      </Head>

      <Header />
      <AnimatePresence>
        {scrollToTopBtn && (
          <motion.div
            className="fixed bottom-2 right-2 z-20"
            onClick={scrollToTop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative h-16 w-16 rounded-full bg-primary">
              <div className="absolute inset-3">
                <BsArrowUp size={40} className="text-slate-100" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="container mx-auto">
        <div className="min-h-screen pt-5">
          <div className="text-center">
            <div className="mx-auto w-5/6 max-w-md">
              <h1 className="mb-5 text-5xl font-bold">
                {data.repos.total_count} repositories for{" "}
                <span className="font-mono text-primary underline">
                  {router.query.q
                    ? router.query.q +
                      " in " +
                      capFirstLetter(data.languageName)
                    : capFirstLetter(data.languageName)}
                </span>
              </h1>
            </div>
          </div>
          <Sort />
          <StarsFilter />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.repos.items.map((repo) => (
              <Card key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
        <Pagination page={data.page} totalCount={data.repos.total_count} />
      </div>
    </>
  );
};

export default Language;
