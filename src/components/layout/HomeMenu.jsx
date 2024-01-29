import Image from "next/image";
import MenuItem from "../Menu/MenuItem";

export default function HomeMenu() {
  return (
    <section>
      <div className="absolute  left-0 right-0 justify-start overflow-hidden"> 
      <div className="absolute left-0 -top-[70px] text-left">
        <Image src={'/sallad1.png'} width={109} height={189} alt="salad" />
      </div>
      <div className="absolute -top-[100px]  right-0">
        <Image src={'/sallad2.png'} width={107} height={195} alt="salad" />
      </div>
      </div>
      
      <div className="text-center mb-4">
        <h3 className="uppercase text-gray-500 font-semibold">Check out</h3>
        <h2 className="text-primary font-bold text-4xl italic">Menu</h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
      <MenuItem />
      <MenuItem />
      <MenuItem />
      <MenuItem />
      <MenuItem />
      <MenuItem />
      </div>
    </section>
  )
}
