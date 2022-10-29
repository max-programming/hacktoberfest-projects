import { Repos } from "@/types";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const getByLanguageSchema = z.object({
  language: z.string().min(1),
  p: z.number().default(1),
  s: z.string().default(""),
  o: z.string().default("desc"),
  q: z.string().default(""),
  startStars: z.number().default(1),
  endStars: z.string().default(""),
});

export const repoRouter = router({
  getByLanguage: publicProcedure
    .input(getByLanguageSchema)
    .query(async ({ input }) => {
      const { language, endStars, o, p, q, s, startStars } = input;
      const starsQuery =
        startStars && endStars
          ? `stars:${startStars}..${endStars}`
          : startStars && !endStars
          ? `stars:>${startStars}`
          : !startStars && endStars
          ? `stars:<${endStars}`
          : "";
      const apiUrl = `https://api.github.com/search/repositories?q=topic%3Ahacktoberfest+language%3A${language}+${q}+${starsQuery}&page=${p}&per_page=21&sort=${s}&order=${o}`;
      const res = await fetch(apiUrl, {
        headers: { Accept: "application/vnd.github.mercy-preview+json" },
      });
      const repos: Repos = await res.json();
      if (!repos.items) return;
      repos.items = repos.items.filter((repo) => !repo.archived);
      return {
        page: p,
        languageName: language,
        repos,
      };
    }),
});
