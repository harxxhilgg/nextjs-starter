import { FileText } from "@/components/main/file-text";

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <main className="flex w-full max-w-3xl flex-col">
        <section aria-labelledby="main-heading" className="flex flex-col items-center mt-10 gap-3">
          <h1 id="main-heading" className="text-3xl font-bold tracking-wide">Lorem.</h1>

          <p className="text-secondary text-sm sm:text-[16px] tracking-wide leading-relaxed">
            Edit {" "}
            <FileText file="(main)/page.tsx" />
            {" "} to changes
          </p>
        </section>
      </main>
    </div>
  );
}
