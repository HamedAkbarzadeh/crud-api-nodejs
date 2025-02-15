import { PrismaClient } from "@prisma/client"
import { SignUpUserSchema } from "../schema/users";

export const prisma = new PrismaClient().$extends({
    query: {
        user: {
            create({ args, query }) {
                args.data = SignUpUserSchema.parse(args.data)
                return query(args);
            }
        }
    }
});