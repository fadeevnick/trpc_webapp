import { trpc } from '../../lib/trpc'
import { ideas } from '../../lib/ideas'
import { zCreateIndeaTrpcInput } from './input'

export const createIdeaTrpcRoute = trpc.procedure
  .input(zCreateIndeaTrpcInput)
  .mutation(({ input }) => {
    if (ideas.find((idea) => idea.nick === input.nick)) {
      throw new Error('Idea with this nick already exists')
    }
    ideas.unshift(input)
    return true
  })
