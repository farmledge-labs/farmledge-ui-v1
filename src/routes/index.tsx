import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/farmledge/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Farmledge — Trusted warehouse receipts for Nigerian farmers" },
      {
        name: "description",
        content:
          "Farmledge tokenises certified warehouse deposits so farmers, custodians, and lenders share one trusted record of stored commodities.",
      },
      { property: "og:title", content: "Farmledge — Trusted warehouse receipts" },
      {
        property: "og:description",
        content:
          "Every harvest accounted for. Every record, unshakable.",
      },
    ],
  }),
  component: Landing,
});
