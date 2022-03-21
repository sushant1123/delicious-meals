import React, { useRef, useState } from "react";

import Input from "../../ui/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
	const [isAmountValid, setIsAmountValid] = useState(true);

	const amountRef = useRef();

	const formSubmitHandler = (e) => {
		e.preventDefault();

		const enteredAmount = amountRef.current.value;
		const enteredAmountNum = +enteredAmount;

		if (enteredAmount.trim().length === 0 || enteredAmountNum < 1 || enteredAmountNum > 5) {
			setIsAmountValid(false);
			return;
		}

		props.onAddToCart(enteredAmountNum);
	};

	return (
		<form className={classes.form} onSubmit={formSubmitHandler}>
			<Input
				label="Amount"
				ref={amountRef}
				input={{
					id: "amount_" + props.id,
					type: "number",
					min: "1",
					max: "5",
					step: "1",
					defaultValue: "1",
				}}
			/>
			<button>+ Add</button>
			{!isAmountValid && <p>Please enter a valid amout (1 to 5)</p>}
		</form>
	);
};

export default MealItemForm;
