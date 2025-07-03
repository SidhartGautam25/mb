// components/dashboard/AProductCard.tsx
import React from "react";
import { Trash2 } from "lucide-react";



interface AProductCardProps {
  product: Record<string,any>;
  id: string;
  onDelete?: (id: string) => void; // Optional for now
}

const AProductCard: React.FC<AProductCardProps> = ({ product, id, onDelete }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    } else {
      console.log("Delete product", id);
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Product Info */}
      <div className="flex items-center gap-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-md border"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-gray-600 text-sm">₹{product.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Delete Button */}
      <div className="flex items-center">
        <button
          onClick={handleDelete}
          className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
        >
          <Trash2 className="w-4 h-4 inline mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default AProductCard;
