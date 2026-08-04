/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response, type NextFunction } from 'express'

import * as models from '../models/index'
import * as db from '../data/mongodb'

export function retrieveOrderDetail () {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await db.ordersCollection.findOne({ orderId: req.params.id })
      const [deliveryAddress] = await models.sequelize.query(`SELECT * FROM Addresses WHERE id = '${req.query.addressId}'`)
      res.status(200).json({ status: 'success', data: { order, deliveryAddress } })
    } catch (error) {
      next(error)
    }
  }
}
