import React, { useContext, useRef, useState } from "react";
import "./Checkout.scss";
import postData, { makePostRequestWithResponse } from "../../Context/utils/postData";
import CartContext from "../../Context/CartContext";
import getUrl from "../../Context/utils/getUrl";
import PaystackPop from '@paystack/inline-js';
import { useNavigate } from "react-router-dom";


const Checkout = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [formIsOpen, setFormIsOpen] = useState(true)

  const [userExists, setUserExists] = useState(false);

  let emailRef = useRef();
  let firstNameRef = useRef();
  let lastNameRef = useRef();
  let phoneRef = useRef();
  let adderssRef = useRef();
  let stateRef = useRef();
  let cityRef = useRef();
  let zipcodeRef = useRef();

  const context = useContext(CartContext);
  const navigate = useNavigate()

  const emailBlurHandler = (event) => {
    emailRef.current.classList = ''
    setEmail(event.target.value);
    let data = {
      email: event.target.value,
      cart_id: localStorage.getItem("cart_id"),
    };
    const url = getUrl(`/api/customer/exists/`);
    postData(url, data).then((data) => {
      if (data.error) {
        console.log("Sorry that email does not exist");
      } else {
        console.log(data);
        emailRef.current.value = data.email;
        firstNameRef.current.value = data.first_name;
        lastNameRef.current.value = data.last_name;
        phoneRef.current.value = data.phone;
        setUserExists(true);
      }
    });
    console.log(event.target.value);
  };

  const completeOrderHandler = (payentReference) => {
    const checkoutUrl = getUrl(`/api/checkout/${localStorage.getItem('cart_id')}/`)
    const data = {reference: payentReference}
    makePostRequestWithResponse(checkoutUrl, data)
    .then(response => response.json())
    .then(data => console.log(data))
    localStorage.removeItem('cart_id')
    console.log('Complete')
}

  function payWithPaystack() {
    let payReference = ''+Math.floor((Math.random() * 1000000000) + 1);
    const payStack = new PaystackPop()
    payStack.newTransaction({
    key: 'pk_test_74f19c33a7325ecc99f7794b48229dc5ecfa7032', // Replace with your public key
    amount: context.cartTotal * 100,
    email: email,
    ref: payReference,
    firstname: firstName,
    lastname: lastName,
    currency: 'NGN',
    onSuccess(transaction){
        completeOrderHandler(transaction.reference)
        let message = 'Payment complete! Reference: ' + transaction.reference;
        payReference = transaction.reference
        alert(message);
        navigate('/')
    },
    onCancel(){
        alert('Transaction was not completed, window closed.');
        navigate('/')
    }
    });
};

  const customerInfoSubmitHandler = (event) => {
    const allRefs = [emailRef, firstNameRef, lastNameRef, phoneRef,
                        adderssRef, stateRef, cityRef, zipcodeRef,];
    let status;
    const customerUrl = getUrl(
      `/api/customer/new/${localStorage.getItem("cart_id")}/`
    );
    const shippingUrl = getUrl(
      `/api/shipping/new/${localStorage.getItem("cart_id")}/`
    );

    event.preventDefault();
    let userInfo = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
    };
    let shippingInfo = {
      address: address,
      state: state,
      city: city,
      zipcode: zipcode,
    };

    if (userExists !== true) {
      makePostRequestWithResponse(customerUrl, userInfo)
      .then(response => {
        if (response.status == 400){
            console.log('Response:', response)
            response.json().then(data => {
                for (const ref of allRefs) {
                    // console.log('Error data:', data)
                    if (Object.keys(data).includes(ref.current.id)){
                        console.log(ref.current.id)
                        console.log(ref.current)
                        ref.current.classList += 'invalid'
                    }
                }
            })
        }else {
            return response.json()
        }
      })
      .then((data) =>
        console.log("Customer post data", data)
      );
    }
    makePostRequestWithResponse(shippingUrl, shippingInfo)
      .then((response) => {
        if (response.status == 400){
            console.log('Response:', response)
            response.json().then(data => {
                for (const ref of allRefs) {
                    // console.log('Error data:', data)
                    if (Object.keys(data).includes(ref.current.id)){
                        console.log(ref.current.id)
                        console.log(ref.current)
                        ref.current.classList += 'invalid'
                    }
                }
            })
        }else {
            return response.json()
        }
      })
      .then((data) => console.log(data));
    setFormIsOpen(false)
    payWithPaystack()
}

  return (
    <div className="mesh__checkout section__padding">
      <div className="mesh__checkout-title">
        <h1>Checkout</h1>
        <h2>&#8358;{context.cartTotal}</h2>
      </div>
      { formIsOpen && <div className="mesh__checkout-customer_info">
        <form onSubmit={customerInfoSubmitHandler}>
          <div className="mesh__checkout-customer_info__user_info">
            <div className="checkout__form_control">
              <input
                ref={emailRef}
                onBlur={emailBlurHandler}
                type="email"
                id="email"
                placeholder="Email; example@email.com"
              />
            </div>
            <div className="checkout__form_control">
              <input
                ref={firstNameRef}
                onBlur={(event) => {
                    firstNameRef.current.classList = ''
                    setFirstName(event.target.value)}}
                type="text"
                id="first_name"
                placeholder="First Name"
              />
            </div>
            <div className="checkout__form_control">
              <input
                ref={lastNameRef}
                onBlur={(event) => {
                    lastNameRef.current.classList = ''
                    setLastName(event.target.value)}}
                type="text"
                id="last_name"
                placeholder="Last Name"
              />
            </div>
            <div className="checkout__form_control">
              <input
                ref={phoneRef}
                onBlur={(event) => {
                    phoneRef.current.classList = ''
                    setPhone(event.target.value)}}
                type="tel"
                id="phone"
                placeholder="Phone"
              />
            </div>
          </div>

          <div className="mesh__checkout-customer_info__shipping_info">
            <h3>Shipping Info</h3>
            <div className="mesh__checkout-customer_info__shipping_info__form">
              <div className="checkout__form_control">
                <input ref={adderssRef}
                  onBlur={(event) => {
                    adderssRef.current.classList = ''
                    setAddress(event.target.value)}}
                  type="text"
                  id="address"
                  placeholder="Address"
                />
              </div>
              <div className="checkout__form_control">
                <input ref={stateRef}
                  onBlur={(event) => {
                    stateRef.current.classList = ''
                    setState(event.target.value)}}
                  type="text"
                  id="state"
                  placeholder="State"
                />
              </div>
              <div className="checkout__form_control">
                <input ref={cityRef}
                  onBlur={(event) => {
                    cityRef.current.classList = ''
                    setCity(event.target.value)}}
                  type="text"
                  id="city"
                  placeholder="City"
                />
              </div>
              <div className="checkout__form_control">
                <input ref={zipcodeRef}
                  onBlur={(event) => {
                    zipcodeRef.current.classList = ''
                    setZipcode(event.target.value)}}
                  type="text"
                  id="zipcode"
                  placeholder="Zipcode"
                />
              </div>
            </div>
          </div>
          <div className="mesh__checkout-customer_info__submit">
            <button type="submit">Continue</button>
          </div>
        </form>
      </div>}
    </div>
  );
};

export default Checkout;
