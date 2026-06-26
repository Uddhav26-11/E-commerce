import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51TjwO3KaBHhp8O3fU1k25wDmNaSv7E0AZAkSozu56GcBmlNp46liMBsozWW54jXJvzOUd2jzaiqYMLPbkUGuRLD500ZZdKNmYF"
);