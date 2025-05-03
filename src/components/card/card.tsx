import { useState } from "react";
import { Course } from "../../types/types.ts";
import Button from "../button/button.tsx";
import "./card.css";

const Card = (props: {
  course: Course;
  onAddItem: (item: Course) => void;
  onRemoveItem: (item: Course) => void;
}) => {
  const { course, onAddItem, onRemoveItem } = props;

  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
    onAddItem(course);
  };

  const handleDecrement = () => {
    setCount(count - 1);
    onRemoveItem(course);
  };

  return (
    <div className="card">
      <span className={`${count !== 0 ? "card__badge" : "card__badge-hidden"}`}>
        {count}
      </span>
      <div className="image__container">
        <img
          src={course.image}
          alt={course.title}
          width={"100%"}
          height={"230px"}
        />
      </div>
      <div className="card__body">
        <h2 className="card__title">{course.title}</h2>
        <div className="card__price">
          {course.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
      </div>
      <div className="hr"></div>

      <div className="btn__container">
        <Button
          type="add"
          title="+"
          onClick={handleIncrement}
          disable={false}
        />
        {count !== 0 && (
          <Button
            type="remove"
            title="-"
            onClick={handleDecrement}
            disable={false}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
