import { trpc } from '../../lib/trpc'
import { ideas } from '../../lib/ideas'

export const getIdeasTrpcRoute = trpc.procedure.query(() => {
  return {
    ideas: ideas.map((i) => ({ ...i, text: undefined })),
  }
})
