import { geistMono } from "@/lib/fonts";

export function FileText({ file }: { file?: string }) {
  return (
    <span className={`${geistMono.className} text-black dark:text-white bg-black/10 dark:bg-white/10 px-1 rounded`}>{file}</span>
  )
};