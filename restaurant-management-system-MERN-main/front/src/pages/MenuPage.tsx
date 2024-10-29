import React, { useState, useEffect } from "react";
import "../css/menu.css"; // Ensure this path is correct
import NavbarComponent from "../components/NavbarComponent";
import { useSelector, useDispatch } from "react-redux";
import { empty } from "../store/cartSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { socket } from "../sockets";
import MenuItemComponent from "../components/MenuItemComponent";

interface Order {
  items: string[];
  total: number;
  status: string;
  id: string;
}

interface MenuItem {
  name: string;
  category: string;
  price: number;
  description: string;
}

export default function MenuPage() {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const cartItems = useSelector((state: any) => state.cart);
  const [menu, setMenu] = useState<MenuItem[]>([]); // Specify the type here
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>([]); // Specify the type here
  const [success, setSuccess] = useState(false);
  const [order, setOrder] = useState<Order>({
    items: [],
    total: 0,
    status: "",
    id: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const notify = (text: string) => toast.success(text);

  const orderParser = (cartitems: [any]) => {
    let new_items: any = [
      {
        name: cartitems[0].name,
        price: cartitems[0].price,
        description: cartitems[0].description,
        quantity: 1,
      },
    ];

    for (let i = 1; i < cartitems.length; i++) {
      let found = false;
      for (let j = 0; j < new_items.length; j++) {
        if (new_items && new_items[j].name === cartitems[i].name) {
          new_items[j].quantity += 1;
          found = true;
          break;
        }
      }
      if (!found) {
        new_items.push({
          name: cartitems[i].name,
          price: cartitems[i].price,
          description: cartitems[i].description,
          quantity: 1,
        });
      }
    }
    return new_items;
  };

  const fetchMenu = async () => {
    // Replace with current trending Tamil Nadu dishes
    const trendingTamilMenu: MenuItem[] = [
      { name: "Kothu Parotta", category: "Main Course", price: 100, description: "Parotta with egg or meat" },
      { name: "Biryani", category: "Main Course", price: 150, description: "Spicy rice with meat" },
      { name: "Madurai Jigarthanda", category: "Dessert", price: 70, description: "Famous Madurai cold drink" },
      { name: "Nethili Fry", category: "Appetizer", price: 120, description: "Crispy fried anchovy fish" },
      { name: "Chicken Chettinad", category: "Main Course", price: 200, description: "Spicy chicken curry" },
      { name: "Paruppu Vadai", category: "Appetizer", price: 50, description: "Crispy lentil fritters" },
      { name: "Keerai Vadai", category: "Appetizer", price: 50, description: "Spinach fritters" },
      { name: "Karandi Omelette", category: "Appetizer", price: 40, description: "Mini skillet omelette" },
      { name: "Chettinad Prawn Masala", category: "Main Course", price: 250, description: "Spicy prawn curry" },
      { name: "Milagu Pongal", category: "Breakfast", price: 60, description: "Pepper rice with lentils" },
      { name: "Thayir Sadam", category: "Main Course", price: 40, description: "Curd rice with seasoning" },
      { name: "Kuzhi Paniyaram", category: "Appetizer", price: 80, description: "Steamed rice dumplings" },
      { name: "Mutton Sukka", category: "Appetizer", price: 200, description: "Dry mutton preparation" },
      { name: "Sambar Sadam", category: "Main Course", price: 70, description: "Rice with lentil curry" },
      { name: "Kozhi Varuval", category: "Appetizer", price: 180, description: "Spicy chicken fry" },
      { name: "Puliyodarai", category: "Main Course", price: 50, description: "Tamarind rice" },
      { name: "Karuvepillai Sadam", category: "Main Course", price: 60, description: "Curry leaf rice" },
      { name: "Ragi Mudde", category: "Main Course", price: 50, description: "Finger millet balls" },
      { name: "Mutton Biryani", category: "Main Course", price: 220, description: "Traditional mutton biryani" },
      { name: "Sundal Kulambu", category: "Main Course", price: 100, description: "Black gram curry" },
      { name: "Filter Coffee", category: "Dessert", price: 30, description: "South Indian filter coffee" },
      { name: "Rasam Vadai", category: "Appetizer", price: 60, description: "Lentil fritters in rasam" },
      { name: "Paal Payasam", category: "Dessert", price: 70, description: "Milk rice dessert" },
      { name: "Vada Curry", category: "Main Course", price: 90, description: "Lentil dumplings in gravy" },
      { name: "Ghee Roast Dosa", category: "Breakfast", price: 80, description: "Crispy dosa with ghee" },
    ];

    // Set the menu and filtered menu to the hardcoded Tamil Nadu dishes
    setMenu(trendingTamilMenu);
    setFilteredMenu(trendingTamilMenu);
  };

  const handleCheckout = () => {
    if (total <= 0) {
      toast.error("Cart Empty! Please add items.");
      return;
    }
    socket.emit("new-order", order);
    setSuccess(true);
    notify("Checkout Successful!");
    localStorage.setItem("myorder", JSON.stringify(order));
    dispatch(empty());
  };

  const updateTotal = () => {
    let total = 0;
    cartItems.forEach((item: any) => {
      total += item.price;
    });
    setTotal(total);
    let items = cartItems.length !== 0 ? orderParser(cartItems) : [];
    setOrder({ ...order, items: items, total: total, status: "Pending" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    updateTotal();
  }, [cartItems]);

  useEffect(() => {
    fetchMenu();
  }, []);

  useEffect(() => {
    const filtered = menu.filter((item: any) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? item.category === selectedCategory : true)
    );
    setFilteredMenu(filtered);
  }, [menu, searchTerm, selectedCategory]);

  return (
    <>
      <NavbarComponent />
      <div className="container-menu">
        <h2>Menu</h2>

        {/* Search and Filter */}
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search for items..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div className="menu-items">
          {filteredMenu.map((item: any) => (
            <MenuItemComponent key={item.name} item={item} />
          ))}
        </div>
      </div>

      <div className="cart">
        <h3>Shopping Cart</h3>
        {success && <h4 className="text-success text-center">Checkout successful</h4>}
        <ul className="cart-items">
          {cartItems
            .reduce((uniqueItems: any[], item: any) => {
              if (!uniqueItems.some((uniqueItem) => uniqueItem.name === item.name)) {
                uniqueItems.push(item);
              }
              return uniqueItems;
            }, [])
            .map((item: any) => (
              <li key={item.name}>
                {item.name} - ₹{item.price}
              </li>
            ))}
        </ul>
        <p>Total: ₹{total}</p>
        <button className="btn-green" onClick={handleCheckout}>Checkout</button>
      </div>

      <ToastContainer />
    </>
  );
}
