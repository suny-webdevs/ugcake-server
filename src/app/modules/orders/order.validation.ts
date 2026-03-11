import { z } from "zod"

export const createOrderValidationSchema = z.object({
  body: z.object({
    userId: z.string().uuid({ message: "Invalid user ID format" }),
    cakeId: z.string().uuid({ message: "Invalid cake ID format" }),
    quantity: z
      .number({ required_error: "Quantity is required" })
      .int("Quantity must be an integer")
      .positive("Quantity must be positive"),
    totalPrice: z
      .number({ required_error: "Total price is required" })
      .positive("Total price must be positive"),
    status: z
      .enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"])
      .optional(),
    paymentMethod: z.enum(["CASH_ON_DELIVERY", "ONLINE"]).optional(),
    message: z.string().optional(),
    customizationDetails: z
      .object({
        size: z.string({ required_error: "Size is required" }),
        text: z.string({ required_error: "Text is required" }),
        flavour: z.enum([
          "BLACKFOREST",
          "VANILLA",
          "WHITEFOREST",
          "CLASSIC_CHOCOLATE",
          "BUTTERSCOTCH",
          "PINEAPPLE",
          "STRAWBERRY",
          "BLUEBERRY",
          "CHOCOVANILLA",
          "CRUNCHY_BUTTERSCOTCH",
          "CHOCOLATE_TRUFFLE",
          "MANGO",
          "HAZELNUT",
          "OPERA",
          "RED_VELVET",
          "OREO",
          "MOCHA",
          "RASMALAI",
          "SUGERFREE_VANILLA",
          "MIX_FRUITS",
          "CHOCO_BERRY",
          "CHOCOLATE_OVERLOAD",
        ]),
        isEggLess: z.boolean().optional(),
        isLessCream: z.boolean().optional(),
        isExtraJuicy: z.boolean().optional(),
        shape: z.enum(["ROUND", "SQUARE", "RECTANGULAR", "HEART", "OVAL"]),
        icingType: z.enum([
          "BUTTERCREAM",
          "FONDANT",
          "ROYAL_ICING",
          "CREAM_CHEESE",
          "GANACHE",
        ]),
        icingColor: z.enum([
          "BLUE",
          "PINK",
          "RED",
          "WHITE",
          "PURPLE",
          "YELLOW",
          "ORANGE",
          "GRAY",
          "DARK_CHOCOLATE",
          "BROWN",
          "CREAM",
          "BLACK",
          "LAVENDER",
          "MINT_GREEN",
          "LIGHT_PINK",
          "LIGHT_BLUE",
          "MULTI_COLOR",
          "GOLD",
          "SILVER",
        ]),
        tiers: z.enum(["ONE", "TWO", "THREE", "FOUR", "FIVE"]),
        height: z.enum(["SMALL", "MEDIUM", "LARGE", "EXTRA_LARGE"]),
      })
      .optional(),
  }),
})

export const updateOrderValidationSchema = z.object({
  body: z.object({
    payload: z.object({
      status: z
        .enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"])
        .optional(),
      paymentMethod: z.enum(["CASH_ON_DELIVERY", "ONLINE"]).optional(),
      message: z.string().optional(),
    }),
  }),
})

export const getOrderByIdValidationSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "ID is required" }).uuid({
      message: "Invalid ID format",
    }),
  }),
})
