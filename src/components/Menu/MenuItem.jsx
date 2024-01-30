
export default function MenuItem() {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-2xl hover:shadow-black/25 transition-all">
      <div className="text-center">
      <img src="/pizza.png" className="max-h-24 mx-auto block" alt="pizza" />
      </div>
        
        <h4 className="font-semibold my-4">salad pizza</h4>
        <p className="text-gray-500"> test</p>
        <button className="bg-primary text-white rounded-full px-6 py-2 my-4">Add to cart</button>
      </div>
  )
}
