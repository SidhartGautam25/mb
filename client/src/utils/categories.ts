export const categories=[
    {
        id:"1",
        str:'fruits',
        name:'Fruits'
    },{
        id:"2",
        str:'vegetables',
        name:'Vegetables'
    },{
        id:"3",
        str:'dairy',
        name:'Dairy'
    },{
        id:"4",
        str:'meat',
        name:'Meat'
    },{
        id:"5",
        str:'medicine',
        name:'Medicine'
    },{
        id:"6",
        str:"kitchensneed",
        name:"Kitchen's need",

    },{
        id:"7",
        str:"grocandpets",
        name:"Groceries & Pets"
    },{
        id:"8",
        str:"healthandbeauty",
        name:"Health & Beauty"
    }
]


export const findCategoryIndex = (category:string) => {
  return categories.findIndex(item => item.str === category);
};