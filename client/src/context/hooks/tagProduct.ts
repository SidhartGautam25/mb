import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { findTagIndex } from '../../utils/tags';


interface Product {
  // Define your product interface based on your API response
  id: string;
  name: string;
  price: number;
  // ... other product fields
}

interface ProductResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
  // ... other response fields
}

const useProductFetcher = (initialTag: string = '', initialPage: number = 1) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [tag, setTag] = useState<string>(initialTag);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchProducts = async (pageNum: number, Tag: string) => {
    console.log("Trying to fetch products");
    setLoading(true);
    setError(null);

    try {
      let link = `/api/v1/productsByTag?page=${pageNum}`;
      
      if (Tag) {
        const tag=findTagIndex(Tag);
        link += `&tag=${tag}`;
      }

      console.log("Trying to get products");
      const { data } = await axiosInstance.get<ProductResponse>(link);
      console.log("Data is ", data);

      setProducts(data.products);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts(page, tag);
  }, []);

  // Function to manually refetch with new parameters
  const refetch = (newTag?: string, newPage?: number) => {
    const updatedTag = newTag !== undefined ? newTag : tag;
    const updatedPage = newPage !== undefined ? newPage : page;
    
    if (newTag !== undefined) setTag(newTag);
    if (newPage !== undefined) setPage(newPage);
    
    fetchProducts(updatedPage, updatedTag);
  };

  return {
    products,
    loading,
    error,
    page,
    totalPages,
    tag,
    refetch,
    setPage,
    setTag,
  };
};

export default useProductFetcher;