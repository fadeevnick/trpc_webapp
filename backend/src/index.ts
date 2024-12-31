import express from 'express'
import cors from 'cors'
import { applyTrpcToExpressApp } from './lib/trpc'
import { trpcRouter } from './router'
import { AppContext, createAppContext } from './lib/ctx'
import { applyPassportToExpressApp } from './lib/passport'

async function startServer() {
  let ctx: AppContext | null = null

  try {
    ctx = createAppContext()
    const expressApp = express()

    expressApp.use(cors())

    expressApp.get('/ping', (req, res) => {
      res.send('pong')
    })

    applyPassportToExpressApp(expressApp, ctx)
    applyTrpcToExpressApp(expressApp, ctx, trpcRouter)

    expressApp.listen(3000, () => {
      console.log('Listening at http://localhost:3000')
    })
  } catch (error) {
    console.log(error)
    await ctx?.stop()
  }
}

startServer()
