import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import "./PlansScreen.css";
function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout__sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    docRef.onSnapshot(async (snap) => {
      const { sessionId, error } = snap.data();

      if (error) {
        alert(`An error occured ${error.message}`);
      }

      if (sessionId) {
        //we have session
        // init stripe

        const stripe = await loadStripe(
          "pk_test_51IYcDDKF1qUCljWu7O3PftoCir5XPIzLHYnMZit3peWGBguURw2dnuv5m0CTgh9I6FX3Evlm7PYMj5O6bwOsa8t900gQtIDEtl"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  console.log("this is products", products);
  return (
    <div className="plansScreen">
      {Object.entries(products).map(([productId, productData]) => {
        //add Some user logic to check if the user has purchased a plan

        return (
          <div className="plansScreen__plan">
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button onClick={() => loadCheckout(productData.prices.priceId)}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
