import Image from "next/image";
import Rigth from "../icons/Rigth";

export default function Hero() {
  return (
    <section className="hero mt-4">
        <div className="py-12">
        <h1 className="text-4xl font-semibold leading-12">Everything <br/> is better <br /> with a &nbsp; <span className="text-primary" >pizza</span> </h1>
       <p className="my-6 text-gray-500">Pizza is the missing piece that makes everyday  better</p>

       <div className="flex gap-4 text-sm">
        <button 
        className="bg-primary uppercase text-white px-4 py-2 rounded-full flex gap-4 justify-center items-center"
        style={{height:'96px'}}
        >
            Order now <Rigth />
        </button>
        <button className="flex gap-2 py-2 text-gray-400 justify-center items-center" style={{height:'96px'}}>Learn more <Rigth /></button>
        
       </div>

        </div>
    
        <div className="relative">
       <Image src={'/pizza.png'} objectFit={'contain'} layout={'fill'} alt="no img found" />
        </div>
    </section>
  )
}
