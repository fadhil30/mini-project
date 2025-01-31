import CategorySection from "@/components/categorySection";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroSection from "@/components/heroSection";
import PopularEvent from "@/components/popularEventSection";
import SubscribeSection from "@/components/subscribeSection";

export default function Home() {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <HeroSection />
      <CategorySection />
      <PopularEvent />
      <SubscribeSection />
      <Footer />
    </section>
  );
}
