import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import './style2.css'; // Import the custom CSS file
import { useNavigate } from 'react-router-dom';

function Cart1() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the cart items from local storage on component mount
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  // Function to increment the quantity of an item
  const incrementQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  // Function to decrement the quantity of an item
  const decrementQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;
      setCartItems(updatedCartItems);
      updateLocalStorage(updatedCartItems);
    }
  };

  // Function to remove an item from the cart
  const removeItem = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index]) {
      const itemName = updatedCartItems[index].name; // Get the name of the item to show in the success message

      updatedCartItems.splice(index, 1);
      setCartItems(updatedCartItems);
      updateLocalStorage(updatedCartItems);

      // Show success message using SweetAlert2
      Swal.fire({
        icon: "success",
        title: `${itemName} removed from cart!`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  // Function to calculate the total price for an item
  const calculateTotalPrice = (item) => {
    const total = item.price * item.quantity;
    return isNaN(total) ? 0 : total;
  };

  // Function to calculate the total price for all items in the cart
  const calculateTotalPriceForCart = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += calculateTotalPrice(item);
    });
    return totalPrice;
  };

  // Function to update the cart items in the local storage
  const updateLocalStorage = (updatedCartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // Function to handle the payment button click
  const handlePaymentClick = () => {
    // Navigate to PaymentForm and pass state

    navigate('/project/payment', { state: { cartItems } });
  };

  return (
    <div className="cart-container">
      <h1><b>Cart</b></h1>
      <div className="items-container">
        {cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.imageUrl} alt={item.name} className="item-image" />
            <div className="item-details">

              <h2><b style={{ color: 'Green' }}>{item.name}</b></h2>


              <h2>Price: Rs{item.price}</h2>
              <div className="quantity-container">
                <div className="quantity-btn" onClick={() => decrementQuantity(index)}>
                  -
                </div>
                <span s><h3>{item.quantity}</h3></span>
                <div className="quantity-btn" onClick={() => incrementQuantity(index)}>
                  +
                </div>
              </div>
              <h2><b>Total: Rs{calculateTotalPrice(item)}</b></h2>
              <span className="delete-btn" onClick={() => removeItem(index)}>
                Remove
              </span>
            </div>
          </div>
        ))}
      </div>
      <div id="totalPriceSection">
        <h1>Total Price: <span id="totalPrice">Rs{calculateTotalPriceForCart()}</span></h1>
      </div>
      <button className="payment-btn" onClick={handlePaymentClick}>Pay</button>
    </div>
  );
};


export default Cart1;
