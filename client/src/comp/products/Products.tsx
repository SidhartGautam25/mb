import Card from "./Card";
import { categories } from "../../utils/categories";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getProduct, removeErrors } from "../../context/product/productSlice";
import { toast } from "react-toastify";


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


  const { loading, error,products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const searchParams= new URLSearchParams(location.search);
  const category=searchParams.get("category") || 'vegetables'
  
    useEffect(()=>{
        dispatch(getProduct({page:1,category}))
    },[dispatch,category])
    useEffect(()=>{
      if(error){
        toast.error("Some Error Occured",{position:'top-center',autoClose:3000});
        dispatch(removeErrors())
      }
    },[dispatch,error])

  return (
    <>
    {loading?(<div>Loading</div>):(
        <div className="flex flex-col items-center gap-6 py-6">
      {products.map((product, idx) => (
        <Card key={idx} product={product} />
      ))}
    </div>
    )}</>
  
  );
}