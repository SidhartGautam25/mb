import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from 'axios';

// Types
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ShippingInfo {
  [key: string]: any; // Allow any shipping properties since the original doesn't specify
}

interface CartState {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
  removingId: string | null;
  shippingInfo: ShippingInfo;
}

interface AddItemParams {
  id: string;
  quantity: number;
  name:string;
  image:string;
  price:number;
}

interface ProductResponse {
 
   productId: string;
   quantity:string;
   success:boolean;
    
  
}

interface ApiError {
  message?: string;
  [key: string]: any;
}


// Add items to cart
export const addItemsToCart = createAsyncThunk<CartItem, AddItemParams, { rejectValue: ApiError }>(
  'cart/addItemsToCart',
  async ({ id, quantity ,name,image,price}, { rejectWithValue }) => {
    try {
      const productId=id;
      const { data }: { data: ProductResponse } = await axios.post(`/api/v1/addToCart`,{productId,quantity});

      return {
        id:data.productId,
        quantity:quantity,
        name,
        image,
        price
      };
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      return rejectWithValue(axiosError.response?.data || { message: 'An Error Occurred' });
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[],
    loading: false,
    error: null,
    success: false,
    message: null,
    removingId: null,
    shippingInfo: JSON.parse(localStorage.getItem('shippingInfo') || '{}') as ShippingInfo
  } as CartState,
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeMessage: (state) => {
      state.message = null;
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.removingId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id != action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      state.removingId = null;
    },
    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
      localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
      localStorage.removeItem('shippingInfo');
    }
  },
  extraReducers: (builder) => {
    // Add items to cart
    builder
      .addCase(addItemsToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemsToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        const item = action.payload;
        const existingItem = state.cartItems.find((i) => i.id === item.id);
        if (existingItem) {
          existingItem.quantity = item.quantity;
          state.message = `Updated ${existingItem.name} quantity in the cart`;
        } else {
          state.cartItems.push(item);
          state.message = `${item.name} is added to cart successfully`;
        }
        state.loading = false;
        state.error = null;
        state.success = true;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      })
      .addCase(addItemsToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'An error occurred';
      });
  }
});

export const { removeErrors, removeMessage, removeItemFromCart, saveShippingInfo, clearCart } = cartSlice.actions;
export default cartSlice.reducer;