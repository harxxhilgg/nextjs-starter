import { FileText } from "@/components/main/file-text";
import { MainForm } from "@/components/main/form";
import { getLocations } from "@/app/actions";
import { DataTable } from "@/components/main/data-table";
import { columns } from "@/components/main/columnts";

export default async function Home() {
  const locations = await getLocations();

  return (
    <div className="flex items-center justify-center">
      <main className="flex w-full max-w-3xl flex-col">
        <section aria-labelledby="main-heading" className="flex flex-col items-center mt-10 gap-10">
          <h1 id="main-heading" className="text-3xl font-bold tracking-wide">Lorem.</h1>

          <p className="text-secondary text-sm sm:text-[16px] tracking-wide leading-relaxed">
            Edit {" "}
            <FileText file="(main)/page.tsx" />
            {" "} to changes
          </p>

          <MainForm />

          <div className="w-full px-6">
            <h2 className="text-xl font-semibold mb-4">Saved Locations</h2>

            <DataTable columns={columns} data={locations} />
          </div>
        </section>
      </main>
    </div>
  );
}
