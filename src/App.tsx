import { Footer, Nav } from "@/components/Layout";
import { useRoute } from "@/lib/route";
import Home from "@/pages/Home";
import PackagePage from "@/pages/PackagePage";

export default function App() {
  const route = useRoute();
  return (
    <>
      <Nav activeSlug={route.page === "package" ? route.slug : undefined} />
      <main key={route.page === "package" ? route.slug : "home"}>
        {route.page === "package" ? <PackagePage slug={route.slug} /> : <Home />}
      </main>
      <Footer />
    </>
  );
}
