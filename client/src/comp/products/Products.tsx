import Card from "./Card";


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

const books: Book[] = [
  {
    title:
      "White Nights – Fyodor Dostoyevsky | A Million-Copy Bestseller | A Timeless Story of Love, Longing & Solitude - Penguin Classics",
    authors: "Fyodor Dostoyevsky, Ronald Meyer, Fyodor Dostoyevsky, et al.",
    format: "Mass Market Paperback",
    price: 100,
    mrp: 125,
    discount: 20,
    kindlePrice: 85,
    rating: 4.5,
    reviews: 2293,
    delivery: "Tomorrow, 23 Jun",
    image: "/white-nights.jpg",
    badge: "Best seller",
  },
  {
    title: "Ikigai: Japanese secret to long and happy life",
    authors: "Francesc García, Héctor, Miralles",
    format: "Hardcover",
    price: 366,
    mrp: 599,
    discount: 39,
    kindlePrice: 340.72,
    rating: 4.5,
    reviews: 58665,
    delivery: "Tomorrow, 23 Jun",
    image: "/ikigai.jpg",
    badge: "Best seller",
  }
];



export default function ProductsC() {
  return (
    <div className="flex flex-col items-center gap-6 py-6">
      {books.map((book, idx) => (
        <Card key={idx} book={book} />
      ))}
    </div>
  );
}