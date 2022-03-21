import React from "react";
import Modal from "../ui/Modal";

import classes from "./Cart.module.css";

const Cart = (props) => {
	const cartItems = (
		<ul className={classes["cart-items"]}>
			{[
				{
					id: "m1",
					name: "Sushi",
					description: "Finest fish and veggies",
					price: 22.99,
				},
			].map((item) => (
				<li key={item.id}>{item.name}</li>
			))}
		</ul>
	);

	return (
		<Modal onClose={props.onHideCart}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>45.98</span>
			</div>
			<div className={classes.actions}>
				<button className={classes["button--alt"]} onClick={props.onHideCart}>
					Close
				</button>
				<button className={classes.button}>Order</button>
			</div>
		</Modal>
	);
};

export default Cart;
