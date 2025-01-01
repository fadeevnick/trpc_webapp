import { trpc } from '../../lib/trpc'
import { zCreateIndeaTrpcInput } from './input'

export const createIdeaTrpcRoute = trpc.procedure
  .input(zCreateIndeaTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED')
    }

    const idea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick,
      },
    })
    if (idea) {
      throw new Error('Idea with this nick already exists')
    }

    await ctx.prisma.idea.create({
      data: {
        ...input,
        authorId: ctx.me.id,
      },
    })

    return true
  })
