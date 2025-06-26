import { useAppSelector } from "../../context/hooks";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartSection: React.FC<{ items: CartItem[] }> = ({ items }) => {

 
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-2">Cart Items</h2>
      <ul className="divide-y divide-gray-200">
        {items.map((item, index) => (
          <li key={index} className="py-2">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <div className="font-semibold">{item.price}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartSection;
