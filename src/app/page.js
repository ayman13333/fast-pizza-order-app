import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
    <Header />
    <Hero />
    <HomeMenu />

    <section className="text-center my-16">
      <SectionHeaders title1={'About us'} title2={'Our story'} />
    </section>

    <p className="max-w-2xl mx-auto mt-4 text-gray-500">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
    </p>
    </>
  );
}
