import Razorpay from "razorpay";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 10 });

export async function POST(request) {
  const { amount } = await request.json();

  const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_PUBLIC_KEY,
    key_secret: process.env.RAZORPAY_PRIVATE_KEY,
  });

  try {
    const order = await razorpayInstance.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${uid.rnd()}`,
    });
    return Response.json(
      {
        success: true,
        message: order,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
