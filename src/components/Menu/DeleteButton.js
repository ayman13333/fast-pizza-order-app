import { useState } from "react";

export default function DeleteButton({ label, onConfirm }) {
  const [showConfirm, setShowConfirm] = useState(false);
  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 items-center h-full flex justify-center">
        <div className="bg-white p-4 rounded-lg">
          <div className="my-4">Are you sure?</div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button
              onClick={()=>{
                onConfirm();
                setShowConfirm(false);
              }}
              type="button"
              className="bg-primary text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <button onClick={() => setShowConfirm(true)} type="button">
      {label}
    </button>
  );
}
