import { checkout, polar, portal } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import { polarClient } from "./polar";

export const auth = betterAuth({
    database : prismaAdapter(prisma, {
        provider : 'postgresql'
    }),
    emailAndPassword: {
        enabled : true,
        autoSignIn: true
    },
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "4285aa39-6c79-4346-976a-2eaf76dc86fe",
                            slug: "rnr-Pro" // Custom slug for easy reference in Checkout URL, e.g. /checkout/rnr-Pro
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly: true
                }),
                portal()
            ],
        })
    ]
})