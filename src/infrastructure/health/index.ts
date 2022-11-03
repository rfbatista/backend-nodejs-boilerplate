import { makeModule } from '@context/container'
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

const healthModule = makeModule('health', async ({ hooks }) => {
  const router = hooks.get('apiRouter') as Router
  router.get('/v1/health-check', (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Application is running...' })
  })
})

export { healthModule }
