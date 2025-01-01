import { trpc } from '../lib/trpc'
import { getIdeaTrpcRoute } from './getIdea'
import { getIdeasTrpcRoute } from './getIdeas'
import { createIdeaTrpcRoute } from './createIdea'
import { signUpTrpcRoute } from './signUp'
import { signInTrpcRoute } from './signIn'
import { getMeTrpcRoute } from './getMe'
import { updateIdeaTrpcRoute } from './updateIdea'
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  getMe: getMeTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
