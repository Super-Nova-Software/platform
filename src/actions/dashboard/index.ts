'use server'

import { client } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: '2024-09-30.acacia',
})

export const getUserClients = async () => {
  try {
    const user = await currentUser()
    if (user) {
      const clients = await client.bookings.count({
        where: {
          client: {
            clerkId: user.id,
          },
          status: 'PENDING',
        },
      })
      if (clients) {
        return clients
      }
    }
  } catch (error) {
    console.log(error)
  }
}
export const getUserBalance = async () => {
  try {
    const user = await currentUser()
    if (user) {
      const connectedStripe = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          stripeId: true,
        },
      })

      if (connectedStripe) {
        const transactions = await stripe.balance.retrieve({
          stripeAccount: connectedStripe.stripeId!,
        })

        if (transactions) {
          const sales = transactions.pending.reduce((total, next) => {
            return total + next.amount
          }, 0)

          return sales / 100
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const getUserPlanInfo = async () => {
  try {
    const user = await currentUser()
    if (user) {
      const plan = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          _count: {
            select: {
              Case: true,
            },
          },
          subscription: {
            select: {
              plan: true,
              credits: true,
            },
          },
        },
      })
      if (plan) {
        return {
          plan: plan.subscription?.plan,
          credits: plan.subscription?.credits,
          Cases: plan._count.Case,
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const getUserTotalProductPrices = async () => {
  try {
    const user = await currentUser()
    if (user) {
      const products = await client.document.findMany({
        where: {
          case: {
            client: {
              clerkId: user.id,
            },
          },
        },
        select: {
          file: true,
        },
      })

      if (products) {
        const total = products.reduce((total) => {
          return total
        }, 0)

        return total
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const getUserTransactions = async () => {
  try {
    const user = await currentUser()
    if (user) {
      const connectedStripe = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          stripeId: true,
        },
      })

      if (connectedStripe) {
        const transactions = await stripe.charges.list({
          stripeAccount: connectedStripe.stripeId!,
        })
        if (transactions) {
          return transactions
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}
