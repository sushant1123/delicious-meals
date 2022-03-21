import { useState } from "react";
import Cart from "./compoents/cart/Cart";
import Header from "./compoents/layout/Header";
import Meals from "./compoents/meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
	const [cartIsShown, setCartIsShown] = useState(false);

	const showCartHandler = () => {
		setCartIsShown(true);
	};

	const hideCartHandler = () => {
		setCartIsShown(false);
	};

	return (
		<CartProvider>
			{cartIsShown && <Cart onHideCart={hideCartHandler} />}
			<Header onShowCart={showCartHandler} />
			<main>
				<Meals />
			</main>
		</CartProvider>
	);
}

export default App;
