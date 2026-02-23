import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gen AI - Nextry",
  description: "Test gen ai page of Nextry",
};

export default function TestGenAILayout({ children }: { children: React.ReactNode }) {
  return children;
};