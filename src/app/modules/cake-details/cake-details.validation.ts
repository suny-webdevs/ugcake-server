import { z } from "zod"

export const createCakeDetailsValidationSchema = z.object({
  body: z.object({
    orderId: z.string().uuid({ message: "Invalid order ID format" }),
    size: z
      .string({ required_error: "Size is required" })
      .min(1, { message: "Size cannot be empty" }),
    text: z
      .string({ required_error: "Text is required" })
      .min(1, { message: "Text cannot be empty" }),
    flavour: z.enum(
      [
        "VANILLA",
        "CHOCOLATE",
        "STRAWBERRY",
        "RED_VELVET",
        "CARROT",
        "CHEESECAKE",
        "LEMON",
        "COFFEE",
        "PISTACHIO",
        "MATCHA",
      ],
      { message: "Invalid flavour" },
    ),
    isEggLess: z.boolean().optional(),
    isLessCream: z.boolean().optional(),
    isExtraJuicy: z.boolean().optional(),
    shape: z.enum(["ROUND", "SQUARE", "RECTANGULAR", "HEART", "OVAL"], {
      message: "Invalid shape",
    }),
    icingType: z.enum(
      ["BUTTERCREAM", "FONDANT", "ROYAL_ICING", "CREAM_CHEESE", "GANACHE"],
      { message: "Invalid icing type" },
    ),
    icingColor: z.enum(
      [
        "WHITE",
        "BLACK",
        "RED",
        "PINK",
        "BLUE",
        "GREEN",
        "YELLOW",
        "PURPLE",
        "GOLD",
        "SILVER",
      ],
      { message: "Invalid icing color" },
    ),
    tiers: z.enum(["ONE", "TWO", "THREE", "FOUR", "FIVE"], {
      message: "Invalid tiers",
    }),
    height: z.enum(["SMALL", "MEDIUM", "LARGE", "EXTRA_LARGE"], {
      message: "Invalid height",
    }),
  }),
})

export const updateCakeDetailsValidationSchema = z.object({
  body: z.object({
    payload: z.object({
      size: z.string().min(1).optional(),
      text: z.string().min(1).optional(),
      flavour: z
        .enum([
          "VANILLA",
          "CHOCOLATE",
          "STRAWBERRY",
          "RED_VELVET",
          "CARROT",
          "CHEESECAKE",
          "LEMON",
          "COFFEE",
          "PISTACHIO",
          "MATCHA",
        ])
        .optional(),
      isEggLess: z.boolean().optional(),
      isLessCream: z.boolean().optional(),
      isExtraJuicy: z.boolean().optional(),
      shape: z
        .enum(["ROUND", "SQUARE", "RECTANGULAR", "HEART", "OVAL"])
        .optional(),
      icingType: z
        .enum([
          "BUTTERCREAM",
          "FONDANT",
          "ROYAL_ICING",
          "CREAM_CHEESE",
          "GANACHE",
        ])
        .optional(),
      icingColor: z
        .enum([
          "WHITE",
          "BLACK",
          "RED",
          "PINK",
          "BLUE",
          "GREEN",
          "YELLOW",
          "PURPLE",
          "GOLD",
          "SILVER",
        ])
        .optional(),
      tiers: z.enum(["ONE", "TWO", "THREE", "FOUR", "FIVE"]).optional(),
      height: z.enum(["SMALL", "MEDIUM", "LARGE", "EXTRA_LARGE"]).optional(),
    }),
  }),
})

export const getCakeDetailsByIdValidationSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "ID is required" }).uuid({
      message: "Invalid ID format",
    }),
  }),
})
