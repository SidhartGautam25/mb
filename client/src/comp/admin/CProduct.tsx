import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { removeErrors, removeSuccess } from "../../context/admin/adminSlice";
import { toast } from "react-toastify";


const DashboardC: React.FC = () => {
  const categories:string[]=["vegetables","fruits"];
  const Tags:string[]=["free","50% OFF","30% OFF"];
  const [id,setId]=useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<string[]>([]);
  // const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [discount,setDiscount]=useState("");
 
  const { error, success, loading} =useAppSelector(
    (state) => state.admin
  );
  
  const dispatch = useAppDispatch();

 const handleCheckboxChange = (tag: string): void => {
    setTags((prevTags: string[]) => 
      prevTags.includes(tag)
        ? prevTags.filter((t: string) => t !== tag)
        : [...prevTags, tag]
    );
  };

    const createProductImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    
    if (!files) return;
    
    const fileArray: File[] = Array.from(files);
    
    setImage([]);
    // setImagePreview([]);
    
    fileArray.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (): void => {
        if (reader.readyState === 2 && reader.result) {
          const result = reader.result as string;
          // setImagePreview((old: string[]) => [...old, result]);
          setImage((old: string[]) => [...old, result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

   useEffect(()=>{
    if(error){
        toast.error(error,{position:'top-center',autoClose:3000});
        dispatch(removeErrors())
    }
    if(success){
        toast.success("Product Created successfully",{position:'top-center',autoClose:3000});
        dispatch(removeSuccess()) 
        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setStock("");
        setImage([]);
        // setImagePreview([]);
    }
  },[dispatch,error,success])

   


  return (
   <div>
     <form className="product-form" encType="multipart/form-data" >
          <input
            type="text"
  
            placeholder="Enter Product Name"
            required
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
           <input
            type="text"
  
            placeholder="Enter Id for this product"
            required
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="number"
          
            placeholder="Enter Product Price"
            required
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
           
            placeholder="Enter Product Description"
            required
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
           <input
            type="text"
  
            placeholder="Enter Discount"
            
            name="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <select
            
            required
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Choose a Category</option>
            {categories.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
         <div>
      <label>Select Tags:</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
        {Tags.map((tag: string) => (
          <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="checkbox"
              checked={tags.includes(tag)}
              onChange={() => handleCheckboxChange(tag)}
            />
            {tag}
          </label>
        ))}
      </div>
      <p>Selected: {tags.join(', ')}</p>
    </div>
          <input
            type="number"
           
            placeholder="Enter Product Stock"
            required
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <div >
            <input
              type="file"
              accept="image/"
              
              multiple
              name="image"
              onChange={createProductImage}
            />
          </div>
          {/* <div className="image-preview-container">
           { imagePreview.map((img,index)=>(
            <img
            src={img}
            alt="Product Preview"
            className="image-preview"
            key={index}
          />
           ))}
          </div> */}
          <button className="submit-btn">{loading?'Creating Product...':'Create'}</button>
        </form>
   </div>
  );
};

export default DashboardC;
