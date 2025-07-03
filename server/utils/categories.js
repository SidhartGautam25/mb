export const categories=[
    {
        id: "1",
        str: "fashion",
        name: "Fashion",
        subcategories: [
            { id: "1-1", str: "clothes", name: "Clothes" },
            { id: "1-2", str: "shoes", name: "Shoes" },
            { id: "1-3", str: "sunglasses", name: "Sunglasses" },
            { id: "1-4", str: "belt", name: "Belt" },
            { id: "1-5", str: "wallet", name: "Wallet" },
            { id: "1-6", str: "cap", name: "Cap" },
            { id: "1-7", str: "socks", name: "Socks" } // corrected spelling
        ]
    },
    {
        id: "2",
        str: "watches",
        name: "Watches",
        subcategories: []
    },
    {
        id: "3",
        str: "ladies_kurti",
        name: "Ladies Kurti",
        subcategories: []
    },
    {
        id: "4",
        str: "ladies_suit",
        name: "Ladies Suit",
        subcategories: []
    },
    {
        id: "5",
        str: "home_decor",
        name: "Home Decor",
        subcategories: []
    },
    {
        id: "6",
        str: "home_furnishing",
        name: "Home Furnishing",
        subcategories: []
    },
    {
        id: "7",
        str: "bed_sheet",
        name: "Bed Sheet",
        subcategories: []
    },
    {
        id: "8",
        str: "cosmetics",
        name: "Cosmetics",
        subcategories: []
    },
    {
        id: "9",
        str: "artificial_jewelry",
        name: "Artificial Jewelry",
        subcategories: []
    },
    {
        id: "10",
        str: "toys",
        name: "Toys",
        subcategories: []
    },
    {
        id: "11",
        str: "mobile_accessories",
        name: "Mobile Accessories",
        subcategories: []
    },
    {
        id: "12",
        str: "kids_knowledge_kit",
        name: "Kids Knowledge Kit",
        subcategories: []
    },
    {
        id: "13",
        str: "novel_books",
        name: "Novel Books",
        subcategories: []
    },
    {
        id: "14",
        str: "plastic_items",
        name: "Plastic Items",
        subcategories: [
            { id: "14-1", str: "mug", name: "Mug" },
            { id: "14-2", str: "basket", name: "Basket" },
            { id: "14-3", str: "comb", name: "Comb" },
            { id: "14-4", str: "etc", name: "Etc" }
        ]
    },
    {
        id: "15",
        str: "broom",
        name: "Broom",
        subcategories: []
    },
    {
        id: "16",
        str: "hand_bag",
        name: "Hand Bag",
        subcategories: []
    },
    {
        id: "17",
        str: "luggage_bag",
        name: "Luggage Bag", // corrected spelling
        subcategories: []
    },
    {
        id: "18",
        str: "trolley",
        name: "Trolley", // corrected spelling
        subcategories: []
    },
    {
        id: "19",
        str: "beverage_items",
        name: "Beverage Items",
        subcategories: [
            { id: "19-1", str: "cold_drinks", name: "Cold Drinks" },
            { id: "19-2", str: "healthy_drinks", name: "Healthy Drinks" },
            { id: "19-3", str: "etc", name: "Etc" }
        ]
    },
    {
        id: "20",
        str: "chocolate_toffee",
        name: "Chocolate / Toffee",
        subcategories: []
    },
    {
        id: "21",
        str: "snacks",
        name: "Snacks",
        subcategories: []
    },
    {
        id: "22",
        str: "others",
        name: "Others",
        subcategories: []
    },
    {
        id: "23",
        str: "etc",
        name: "Etc",
        subcategories: []
    }
]

export const getCat=(ind)=>{
    console.log("return value is ",categories[ind].str);
    return categories[ind].str;

}