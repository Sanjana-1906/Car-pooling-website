import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./payment.css";
import { FaRegCreditCard } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { FaLock } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaRegClock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function Payment() {
  let navigate = useNavigate();
  const [isCreditCardCollapsed, setIsCreditCardCollapsed] = useState(false);
  const [isPaypalCollapsed, setIsPaypalCollapsed] = useState(true);

  const toggleCreditCardCollapse = () => {
    setIsCreditCardCollapsed(!isCreditCardCollapsed);
    setIsPaypalCollapsed(false); // Close Paypal section if open
  };

  const togglePaypalCollapse = () => {
    setIsPaypalCollapsed(!isPaypalCollapsed);
    setIsCreditCardCollapsed(false); // Close Credit Card section if open
  };

  return (
    <div className="body1">
      <Header />
      <div className="container d-flex justify-content-center ">
        <div className="row g-3">
          <div className="col-md-6 mt-5 ">
            <span1 className="heading1">Payment Method</span1>
            <div className="card1">
              <div className="accordion" id="accordionExample">
                <div className="card1">
                  <div className="card1-header p-1" id="headingTwo">
                    <h2 className="mb-0">
                      <button
                        className="btn1 btn1-light btn1-block text-left collapsed p-3 w-100 rounded-0 border-bottom-custom"
                        type="button"
                        onClick={togglePaypalCollapse}
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <span1>Paypal</span1>
                          <img
                            src="https://i.imgur.com/7kQEsHU.png"
                            width="30"
                            alt="Paypal Logo"
                          />
                        </div>
                      </button>
                    </h2>
                  </div>
                  <div
                    className={`collapse ${isPaypalCollapsed ? "" : "show"}`}
                    aria-labelledby="headingTwo"
                    data-parent="#accordionExample"
                  >
                    <div className="card1-body">
                      <input
                        type="text"
                        className="form1-control"
                        placeholder="Paypal email"
                      />
                    </div>
                  </div>
                </div>
                <div className="card1">
                  <div className="card1-header p-1">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-light btn-block text-left p-3 rounded-0"
                        type="button"
                        onClick={toggleCreditCardCollapse}
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <span1>Credit card</span1>
                          <div className="icons">
                            <img
                              src="https://i.imgur.com/2ISgYja.png"
                              width="30"
                              alt="Credit Card Logo"
                            />
                            <img
                              src="https://i.imgur.com/W1vtnOV.png"
                              width="30"
                              alt="Credit Card Logo"
                            />
                            <img
                              src="https://i.imgur.com/35tC99g.png"
                              width="30"
                              alt="Credit Card Logo"
                            />
                            <img
                              src="https://i.imgur.com/2ISgYja.png"
                              width="30"
                              alt="Credit Card Logo"
                            />
                          </div>
                        </div>
                      </button>
                    </h2>
                  </div>
                  <div
                    className={`collapse ${
                      isCreditCardCollapsed ? "" : "show"
                    }`}
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div className="card1-body payment-card1-body">
                      <span1 className="font-weight-normal card1-text">
                        Card Number
                      </span1>
                      <div className="input1">
                        <i>
                          <FaRegCreditCard />
                        </i>
                        <input
                          type="text"
                          className="form1-control"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                      <div className="row1 mt-3 mb-3">
                        <div className="col-md-6">
                          <span1 className="font-weight-normal card-text">
                            Expiry Date
                          </span1>
                          <div className="input1">
                            <i>
                              <SlCalender />
                            </i>
                            <input
                              type="text"
                              className="form1-control"
                              placeholder="MM/YY"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <span1 className="font-weight-normal card-text">
                            CVC/CVV
                          </span1>
                          <div className="input1">
                            <i>
                              <FaLock />
                            </i>
                            <input
                              type="text"
                              className="form1-control"
                              placeholder="000"
                            />
                          </div>
                        </div>
                      </div>
                      <span1 className="text-muted certificate-text">
                        <i>
                          <FaLock />
                        </i>{" "}
                        Your transaction is secured with ssl certificate
                      </span1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-5">
            <span1 className="heading1">Summary</span1>
            <div className="card1">
              <div className="d-flex justify-content-between p-4">
                <div className="d-flex flex-column">
                  <span1>
                    Pro(Billed Monthly){" "}
                    <i>
                      <TiArrowSortedDown />
                    </i>
                  </span1>
                  <a1 href="#" className="billing">
                    Save 20% with annual billing
                  </a1>
                </div>
                <div className="mt-1">
                  <sup className="super-price">$9.99</sup>
                  <span1 className="super-month">/Month</span1>
                </div>
              </div>
              <hr className="mt-0 line" />
              <div className="p-3">
                <div className="d-flex justify-content-between mb-2">
                  <span1>Referral Bonuses</span1>
                  <span1>-$2.00</span1>
                </div>
                <div className="d-flex justify-content-between">
                  <span1>
                    VAT{" "}
                    <i>
                      <FaRegClock />
                    </i>
                  </span1>
                  <span1>-20%</span1>
                </div>
              </div>
              <hr className="mt-0 line" />
              <div className="p-3 d-flex justify-content-between">
                <div className="d-flex flex-column">
                  <span1>Today you pay(US Dollars)</span1>
                  <small>After 30 days $9.59</small>
                </div>
                <span1>$0</span1>
              </div>
              <div className="p-3">
                <button
                  className="btn btn-warning btn-block free-button"
                  onClick={() =>
                    navigate(
                      '/Feedback'
                    )
                  }
                >
                  Proceed to Pay
                </button>
                <div className="text-center">
                  <a1 href="#">Have a promo code?</a1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Payment;