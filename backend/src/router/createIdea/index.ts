import { trpc } from '../../lib/trpc'
import { zCreateIndeaTrpcInput } from './input'

export const createIdeaTrpcRoute = trpc.procedure
  .input(zCreateIndeaTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const idea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick,
      },
    })
    if (idea) {
      throw new Error('Idea with this nick already exists')
    }

    await ctx.prisma.idea.create({
      data: input,
    })

    return true
  })
