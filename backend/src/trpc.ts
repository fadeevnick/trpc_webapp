import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const ideas = [...Array(100).keys()].map((num: number) => ({
  nick: `cool-idea-nick-${num + 1}`,
  name: `Idea ${num + 1}`,
  description: `Description of idea ${num + 1}...`,
  text: [...Array(100).keys()]
    .map((num2: number) => `<p>Text paragraph ${num2 + 1} of idead ${num + 1}...</p>`)
    .join(''),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return {
      ideas: ideas.map((i) => ({ ...i, text: undefined })),
    }
  }),
  getIdea: trpc.procedure
    .input(
      z.object({
        ideaNick: z.string(),
      })
    )
    .query(({ input }) => {
      const idea = ideas.find((idea) => idea.nick === input.ideaNick)
      return { idea: idea || null }
    }),
})

export type TrpcRouter = typeof trpcRouter
