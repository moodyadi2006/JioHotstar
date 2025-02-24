"use client";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import React, { useState } from "react";

const ClientComponent = ({ token }) => {
  const [planPurchase, setPlanPurchase] = useState("None");
  const [timePeriod, setTimePeriod] = useState("None");
  const [amount, setAmount] = useState(0);
  const fetchPaymentStatus = async (orderId) => {
    let expiryDate = new Date();
    if (timePeriod === "Quarterly") {
      expiryDate.setMonth(expiryDate.getMonth() + 3);
    } else if (timePeriod === "Yearly") {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else if (timePeriod === "Monthly") {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    }

    const response = await axios.patch("/api/updateUserAccount", {
      planPurchase: planPurchase,
      timePeriod: timePeriod,
      email: token.email,
      orderId: orderId,
      orderExpiry: expiryDate,
    });

    toast({
      title: response.data.message,
      description: "You can make your entertainment journey limitless after re-login",
    });
  };

  const handlePlanPurchase = (plan) => {
    setPlanPurchase(plan);
    if (plan === "Super") {
      if (timePeriod === "Quarterly") {
        setAmount(149);
      } else if (timePeriod === "Yearly") {
        setAmount(899);
      } else if (timePeriod === "Monthly") {
        setAmount(99);
      } else {
        setAmount(0);
      }
    } else if (plan === "Premium") {
      if (timePeriod === "Quarterly") {
        setAmount(349);
      } else if (timePeriod === "Yearly") {
        setAmount(1499);
      } else if (timePeriod === "Monthly") {
        setAmount(299);
      } else {
        setAmount(0);
      }
    }
  };
  const handleTimePeriod = (period) => {
    setTimePeriod(period);
    if (period === "Quarterly") {
      if (planPurchase === "Super") {
        setAmount(149);
      } else if (planPurchase === "Premium") {
        setAmount(349);
      } else {
        setAmount(0);
      }
    } else if (period === "Yearly") {
      if (planPurchase === "Super") {
        setAmount(899);
      } else if (planPurchase === "Premium") {
        setAmount(1499);
      } else {
        setAmount(0);
      }
    } else if (period === "Monthly") {
      if (planPurchase === "Super") {
        setAmount(99);
      } else if (planPurchase === "Premium") {
        setAmount(299);
      } else {
        setAmount(0);
      }
    } else {
      setAmount(0);
    }
  };
  const { toast } = useToast();

  function loadScript() {
    return new Promise(function (resolve, reject) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject(err);
      };
      document.body.appendChild(script);
    });
  }

  const handlePayment = async () => {
    if (!token) {
      toast({
        title: "Please Login first...",
        description: "You have to login to buy a plan",
        variant: "destructive",
      });
      return;
    }
    if (planPurchase === "None" || timePeriod === "None") {
      toast({
        title: "Please select a valid Plan",
        description: "Select time period as well as Plan",
        variant: "destructive",
      });
      return;
    }
    const now = Date.now();
    const orderExpiryTimestamp = new Date(token.orderExpiry).getTime();

    if (orderExpiryTimestamp > now) {
      toast({
        title: "You have already subscribed",
        description:
          "You cannot buy another plan if already subscribed to one. Wait until your current plan expires",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.post("/api/checkout", {
        amount: amount,
      });
      const order = response.data.message;
      await loadScript();
      const finalOrderObject = {
        key: process.env.RAZORPAY_PUBLIC_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        handler: function (response) {
          const options2 = {
            razorpayPaymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          axios.post("/api/verifyPayment", options2).then((res) => {
            if (res.data.isOk) {
              toast({
                title: "Payment Successful",
                description:
                  res.data.message +
                  ", You have successfuly subscribed to JioHotstar",
              });
              fetchPaymentStatus(order.id);
            }
          });
        },
      };
      const rzp1 = new window.Razorpay(finalOrderObject);
      rzp1.open();
      rzp1.on("payment.failed", function (response) {
        console.error(response.error.code);
        console.error(response.error.description);
        console.error(response.error.source);
        console.error(response.error.step);
        console.error(response.error.reason);
        console.error(response.error.metadata.order_id);
        console.error(response.error.metadata.payment_id);
        alert("Payment failed. Please try again.");
      });
    } catch (error) {
      return Response.json(
        { success: true, message: error.message },
        { status: 400 }
      );
    }
  };

  return (
    <div className="w-2/3 flex flex-col justify-center items-center ">
      {/* Pricing Comparison Card */}
      <div className="w-[95%] bg-black p-8 pt-0 rounded-lg text-white">
        {/* Header */}
        <div className="grid grid-cols-3 text-xl font-bold pb-4">
          <div></div>
          {planPurchase === "Super" ? (
            <div className="text-yellow-400 text-center">Super</div>
          ) : (
            <div className="text-gray-400 text-center">Super</div>
          )}
          {planPurchase === "Premium" ? (
            <div className="text-yellow-400 text-center">Premium</div>
          ) : (
            <div className="text-gray-400 text-center">Premium</div>
          )}
        </div>

        {[
          { label: "All content", super: "✔", premium: "✔" },
          { label: "Watch on TV or Laptop", super: "✔", premium: "✔" },
          {
            label: "Ads free movies and shows (except sports)",
            super: "✖",
            premium: "✔",
          },
          {
            label: "Number of devices that can be logged in",
            super: "2",
            premium: "4",
          },
          {
            label: "Max video quality",
            super: "Full HD 1080p",
            premium: "4K 2160p + Dolby Vision",
          },
          {
            label: "Max audio quality",
            super: "Dolby Atmos",
            premium: "Dolby Atmos",
          },
        ].map((row, index) => (
          <div key={index} className={`grid grid-cols-3 py-3 `}>
            <div className="text-white text-lg">{row.label}</div>
            <div
              className={`text-center ${
                row.super === "✖" ? "text-red-500 text-lg" : "text-lg"
              } ${planPurchase === "Super" ? "bg-gray-700  w-[90%] mx-auto" : ""}`}
            >
              {row.super}
            </div>
            <div
              className={`text-center text-lg ${
                planPurchase === "Premium" ? "bg-gray-700  w-[90%] mx-auto" : ""
              }`}
            >
              {row.premium}
            </div>
          </div>
        ))}
      </div>

      {/* Subscription Selection */}
      <div className="w-[90%] p-4 rounded-lg mt-6">
        <div className="flex justify-center space-x-4 text-gray-400 mb-4">
          {["Quarterly", "Yearly", "Monthly"].map((plan) => (
            <span
              key={plan}
              className={`px-4 py-2 rounded-full cursor-pointer ${
                timePeriod === plan ? "bg-gray-700 text-white" : "bg-gray-800"
              }`}
              onClick={() => {
                handleTimePeriod(plan);
              }}
            >
              {plan}
              {timePeriod === plan && (
                <span className="ml-2 text-blue-500">✔</span>
              )}
            </span>
          ))}
        </div>

        {/* Pricing Details */}
        <div className="w-full flex gap-2 justify-between items-center ">
          {planPurchase === "Super" ? (
            <div
              className="flex w-[50%] flex-col justify-between items-start active:border-white p-4 border-2 border-blue-500 cursor-pointer rounded-lg"
              onClick={() => handlePlanPurchase("Super")}
            >
              <span className="text-gray-400 font-bold text-xl">Super</span>
              {timePeriod === "None" && (
                <span className="text-white font-extrabold text-2xl">
                  <span className="text-sm text-gray-600">Select any Plan</span>
                </span>
              )}
              {timePeriod === "Quarterly" && (
                <span className="text-white font-extrabold text-2xl">
                  ₹149<span className="text-sm text-gray-600">/3Months</span>
                </span>
              )}
              {timePeriod === "Yearly" && (
                <span className="text-white font-extrabold text-2xl">
                  ₹899<span className="text-sm text-gray-600">/Year</span>
                </span>
              )}
              {timePeriod === "Monthly" && (
                <span className="text-white font-extrabold text-2xl">
                  ₹99<span className="text-sm text-gray-600">/Month</span>
                </span>
              )}
            </div>
          ) : (
            <div
              className="flex w-[50%] flex-col justify-between items-start active:border-white p-4 border-2 border-gray-500 cursor-pointer rounded-lg"
              onClick={() => handlePlanPurchase("Super")}
            >
              <span className="text-gray-400 font-bold text-xl">Super</span>
              <span className="text-white font-extrabold text-2xl">
                <span className="text-sm text-gray-600">Select any plan </span>
              </span>
            </div>
          )}
          {planPurchase === "Premium" ? (
            <div
              className="flex w-[50%] flex-col justify-between items-start active:border-white p-4 border-2 border-blue-500 cursor-pointer rounded-lg"
              onClick={() => handlePlanPurchase("Premium")}
            >
              <span className="text-gray-400 font-bold text-xl">Premium</span>
              {timePeriod === "None" && (
                <span className="text-white font-extrabold text-2xl">
                  <span className="text-sm text-gray-600">
                    Select any plan{" "}
                  </span>
                </span>
              )}
              {timePeriod === "Quarterly" && (
                <span className="text-white font-extrabold text-2xl">
                  ₹349<span className="text-sm text-gray-600">/3Months</span>
                </span>
              )}
              {timePeriod === "Yearly" && (
                <span className="text-white font-extrabold text-2xl">
                  ₹1499<span className="text-sm text-gray-600">/Year</span>
                </span>
              )}
              {timePeriod === "Monthly" && (
                <span className="text-white font-extrabold text-2xl">
                  ₹299<span className="text-sm text-gray-600">/Month</span>
                </span>
              )}
            </div>
          ) : (
            <div
              className="flex w-[50%] flex-col justify-between items-start active:border-white p-4 border-2 border-gray-500 cursor-pointer rounded-lg"
              onClick={() => handlePlanPurchase("Premium")}
            >
              <span className="text-gray-400 font-bold text-xl">Premium</span>
              <span className="text-white font-extrabold text-2xl">
                <span className="text-sm text-gray-600">Select any plan</span>
              </span>
            </div>
          )}
        </div>

        {/* CTA Button */}

        <button
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-200"
          onClick={handlePayment}
          id="rzp-button1"
        >
          Continue with{" "}
          {planPurchase === "None" ? "Entertainment" : planPurchase} →
        </button>
      </div>
    </div>
  );
};

export default ClientComponent;
