import { trpc } from '../../lib/trpc'
import { ideas } from '../../lib/ideas'
import { zCreateIndeaTrpcInput } from './input'

export const createIdeaTrpcRoute = trpc.procedure
  .input(zCreateIndeaTrpcInput)
  .mutation(({ input }) => {
    ideas.unshift(input)
    return true
  })
