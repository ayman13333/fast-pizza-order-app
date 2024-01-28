import Image from "next/image";
import Rigth from "../icons/Rigth";

export default function Hero() {
  return (
    <section className="grid grid-cols-2">
        <div>
        <h1 className="text-4xl font-semibold">Everything is better with pizza</h1>
       <p className="my-4 text-gray-500">Pizza is the missing piece that makes everyday  better</p>

       <div className="flex gap-4">
        <button className="bg-primary text-white px-4 py-2 rounded-full flex gap-4">
            Order now <Rigth />
        </button>
        <button className="flex gap-2 py-2 text-gray-500">Learn more <Rigth /></button>
        
       </div>
        </div>
    
        <div className="relative">
       <Image src={'/pizza.png'} objectFit={'contain'} layout={'fill'} alt="no img found" />
        </div>
    </section>
  )
}
