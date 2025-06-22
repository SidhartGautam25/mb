import { Star } from "lucide-react";
interface Book {
  title: string;
  authors: string;
  format: string;
  price: number;
  mrp: number;
  discount: number;
  kindlePrice?: number;
  rating: number;
  reviews: number;
  delivery: string;
  image: string;
  badge?: string;
}
interface BookCardProps {
  book: Book;
}

const Card: React.FC<BookCardProps> = ({ book }) => {
  return (
   <div className="border rounded-xl shadow-md flex flex-col md:flex-row gap-4 p-4 w-[90%] md:w-[70%] mx-auto">
      <div className="relative w-full md:w-1/4 flex-shrink-0">
        {book.badge && (
          <span className="absolute top-0 left-0 bg-orange-500 text-white text-xs px-2 py-1 rounded-br-md">
            {book.badge}
          </span>
        )}
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-auto object-contain rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2 text-sm md:text-base w-full">
        <h2 className="font-semibold text-gray-800">{book.title}</h2>
        <p className="text-gray-600">by {book.authors}</p>
        <div className="flex items-center gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-500" />
          ))}
          <span className="text-gray-600 text-xs">({book.reviews})</span>
        </div>
        <div>
          <span className="text-blue-700 font-medium">{book.format}</span>
          <div className="text-gray-800">
            ₹{book.price} {" "}
            <span className="line-through text-sm text-gray-500">
              ₹{book.mrp}
            </span>{" "}
            <span className="text-green-600 text-sm">
              ({book.discount}% off)
            </span>
          </div>
          {book.kindlePrice && (
            <div className="text-sm text-blue-600">
              Kindle Edition: ₹{book.kindlePrice} • Available instantly
            </div>
          )}
          <div className="text-sm text-gray-700">
            FREE delivery <span className="font-semibold">{book.delivery}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;