
export default function SuccessBox({children}) {
  return (
    <div className="max-w-md mx-auto">
          <h2 className="text-center bg-green-200 p-4 rounded-lg my-2 border border-green-300">
            {children}
            </h2>
    </div>
  )
}
