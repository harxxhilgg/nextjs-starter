import { getLocations } from "@/app/actions";
import { columns } from "@/components/main/columnts";
import { DataTable } from "@/components/main/data-table";
import { MainForm } from "@/components/main/form";

export default async function LocationPage() {
  const locations = await getLocations();

  return (
    <div className="flex flex-col items-center gap-10">
      <MainForm />

      <div className="w-full px-6 max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Saved Locations</h2>

        <DataTable columns={columns} data={locations} />
      </div>
    </div>
  );
}
