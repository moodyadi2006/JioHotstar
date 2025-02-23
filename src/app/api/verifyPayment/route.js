import crypto from "crypto";

const generatedSignature = (razorpayOrderId, razorpayPaymentId) => {
  const keySecret = process.env.RAZORPAY_PRIVATE_KEY;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(request) {
  const { razorpayPaymentId, orderId, razorpaySignature } =
    await request.json();

  const signature = generatedSignature(orderId, razorpayPaymentId);
  if (signature !== razorpaySignature) {
    return Response.json(
      { message: "Payment verification failed", isOk: false },
      { status: 400 }
    );
  }

  // Probably some database calls here to update order or add premium status to user
  return Response.json(
    { message: "Payment verified successfully", isOk: true },
    { status: 200 }
  );
}
