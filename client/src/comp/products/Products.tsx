import Card from "./Card";
// import { categories } from "../../utils/categories";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProduct, removeErrors } from "../../context/product/productSlice";
import { toast } from "react-toastify";


interface Product {
    [key: string]: any; 
}

export default function ProductsC() {


  const { loading, error,products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const searchParams= useParams();
  console.log("searchParam is ",searchParams.category);
  const category=searchParams.category || 'vegetables';
  const navigate=useNavigate();

  const productClciked=(product:Product)=>{
    const productUrl=`/product/${product._id}`;
    navigate(productUrl);
    
  }
  
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
        <div onClick={()=>productClciked(product)}><Card key={idx} product={product} /></div>
      ))}
    </div>
    )}</>
  
  );
}