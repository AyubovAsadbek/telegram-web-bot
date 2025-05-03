import Button from "../button/button";
import { totalPrice } from "../../units/totalPrice.ts";
import "./cart.css";
import { Course } from "../../types/types.ts";

const Cart = ({
  cartItems,
  onCheckout,
}: {
  cartItems: Course[];
  onCheckout: () => void;
}) => {
  return (
    <div className="cart__container">
      <p>
        Umumiy narx:{" "}
        {totalPrice(cartItems).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>
      <Button
        title={cartItems.length === 0 ? "Buyurtma" : "To'lov"}
        type="checkout"
        disable={cartItems.length === 0}
        onClick={onCheckout}
      />
    </div>
  );
};

export default Cart;
