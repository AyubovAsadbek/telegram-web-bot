import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card/card";
import Cart from "./components/cart/cart";
import { getData } from "./constants/db";
import { Course } from "./types/types";

const courses = getData();
// @ts-expect-error because it is telegram type
const telegram = window.Telegram.WebApp;

const App = () => {
  const [cartItems, setCartItems] = useState<Course[]>([]);

  useEffect(() => {
    telegram.ready();
  });

  const onAddItem = (item: Course) => {
    const existItem = cartItems.find((c) => c.id == item.id);

    if (existItem) {
      const newData = cartItems.map((c) =>
        c.id == item.id
          ? { ...existItem, quantity: existItem.quantity! + 1 }
          : c
      );
      setCartItems(newData);
    } else {
      const newData = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(newData);
    }
  };

  const onRemoveItem = (item: Course) => {
    const existItem = cartItems.find((c) => c.id == item.id);

    if (existItem?.quantity === 1) {
      const newData = cartItems.filter((c) => c.id !== existItem?.id);
      setCartItems(newData);
    } else {
      const newData = cartItems.map((c) =>
        c.id === existItem?.id
          ? { ...existItem, quantity: existItem.quantity! - 1 }
          : c
      );
      setCartItems(newData);
    }
  };

  const onCheckout = () => {
    if (cartItems.length !== 0) {
      telegram.MainButton.text = "Sotib olish :)";
      telegram.MainButton.show();
    } else {
      telegram.MainButton.hide();
    }
  };

  const onSendData = useCallback(() => {
    const queryID = telegram.initDataUnsafe?.query_id;

    if (queryID) {
      fetch("https://telegramwebapibot-b671371abfbb.herokuapp.com/web-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: cartItems,
          queryID: queryID,
        }),
      });
    } else {
      telegram.sendData(JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);

    return () => telegram.offEvent("mainButtonClicked", onSendData);
  }, [onSendData]);

  return (
    <>
      <h1 className="heading">Sammi kurslar</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cards__container">
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
