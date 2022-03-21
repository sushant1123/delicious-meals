import React, { useContext } from "react";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

import classes from "./MealItem.module.css";

const MealItem = (props) => {
	const price = `₹ ${props.meal.price.toFixed(2)}`;
	const context = useContext(CartContext);

	const addToCartHandler = (amount) => {
		context.addItem({ ...props.meal, amount: amount });
	};

	return (
		<li className={classes.meal}>
			<div>
				<h3>{props.meal.name}</h3>
				<div className={classes.description}>{props.meal.description}</div>
				<div className={classes.price}>{price}</div>
			</div>
			<div>
				<MealItemForm onAddToCart={addToCartHandler} id={props.id} />
			</div>
		</li>
	);
};

export default MealItem;
