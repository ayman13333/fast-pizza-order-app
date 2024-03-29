import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
    <Hero />
    <HomeMenu />

    <section className="text-center my-16">
      <SectionHeaders title1={'About us'} title2={'Our story'} />
    </section>

    <p className="max-w-2xl mx-auto mt-4 text-gray-500" id="about">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
    </p>

    <section className="text-center mt-10" id="contact">
      <SectionHeaders title1={'Contact Us'} title2={'Dont hesitate'} />
      <div className="mt-8">

      <a className="text-4xl underline text-gray-500" href="tel:12345">12345</a>
      </div>
    </section>

    </>
  );
}
