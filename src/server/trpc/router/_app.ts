import { router } from "../trpc";
import { exampleRouter } from "./example";
import { repoRouter } from "./repo";

export const appRouter = router({
  example: exampleRouter,
  repos: repoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
