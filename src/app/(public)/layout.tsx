import Footer from "@/components/footer/footer";
import TopNav from "@/components/nav/top-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full flex-col items-center sm:items-start">
        <div className="w-full sm:max-w-3xl md:max-w-5xl mx-auto sticky top-0 z-50 backdrop-blur-xs bg-background/70 sm:bg-background/50">
          <TopNav />
        </div>

        <div className="w-full flex my-auto">{children}</div>

        <div className="w-full mt-auto pb-4">
          <Footer />
        </div>
      </main>
    </div>
  );
}
