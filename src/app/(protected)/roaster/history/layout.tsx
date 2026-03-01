import { Metadata } from "next";

export const metadata: Metadata = {
  title: "History - Roaster",
  description: "History Page of Roaster",
};

export default function RoastHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
