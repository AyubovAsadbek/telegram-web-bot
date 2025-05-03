import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card/card.tsx";
import Cart from "./components/cart/cart.tsx";
import { Course } from "./types/types.ts";
import { getData } from "./constants/db.ts";

const courses = getData();

// @ts-ignore
const telegram = window.Telegram?.WebApp;

const App = () => {
  const [cartItems, setCartItems] = useState<Course[]>([]);

  useEffect(() => {
    telegram?.ready();
  }, []);

  const onAddItem = (item: Course) => {
    const existItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existItem) {
      const newData = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...existItem, quantity: (existItem.quantity ?? 0) + 1 }
          : cartItem
      );
      setCartItems(newData);
    } else {
      const newData = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(newData);
    }
  };

  const onRemoveItem = (item: Course) => {
    const existItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existItem?.quantity === 1) {
      const newData = cartItems.filter((cartItem) => cartItem.id !== item.id);
      setCartItems(newData);
    } else {
      const newData = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...item, quantity: (item.quantity ?? 0) - 1 }
          : cartItem
      );
      setCartItems(newData);
    }
  };

  const onCheckout = () => {
    telegram.MainButton.text = "Sotib olish :)";
    telegram.MainButton.show();
  };

  return (
    <>
      <h1 className="heading"> Sammi kurslar</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cards_container">
        {courses.map((course) => (
          <Card
            key={course.id}
            course={course}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </>
  );
};

export default App;
