import Tabs from "@/components/layout/Tabs";

export default function Page() {
  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <Tabs isAdmin={true} />
    </section>
  )
}
