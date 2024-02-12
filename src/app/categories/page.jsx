import Tabs from "@/components/layout/Tabs";

export default function page() {
  return (
    <section className="mt-8 max-w-lg mx-auto">
      <Tabs isAdmin={true} />
    </section>
  )
}
