import z from 'zod'
import { zCreateIndeaTrpcInput } from '../createIdea/input'

export const zUpdateIdeaTrpcInput = zCreateIndeaTrpcInput.extend({
  ideaId: z.string().min(1),
})
