import React from "react";


interface Order {
  id: string;
  date: string;
  status: string;
  total: string;
}

const OrderHistory: React.FC<{ orders: Order[] }> = ({ orders }) => (
   <div className="bg-white shadow rounded-xl p-4 col-span-2">
    <h2 className="text-lg font-semibold mb-2">Order History</h2>
    <ul className="divide-y divide-gray-200">
      {orders.map(order => (
        <li key={order.id} className="py-2">
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Order #{order.id}</p>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{order.status}</p>
              <p className="font-semibold">{order.total}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);


export default OrderHistory;