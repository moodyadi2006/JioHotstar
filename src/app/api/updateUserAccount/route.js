import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function PATCH(request) {
  const body = await request.json();
  const { planPurchase, timePeriod, email, orderId, orderExpiry } = body;
  console.log(orderExpiry, orderId);
  await dbConnect();
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }
    user.planPurchase = planPurchase;
    user.timePeriod = timePeriod;
    user.orderId = orderId;
    user.orderExpiry = orderExpiry;
    await user.save();
    return Response.json(
      {
        success: true,
        message: "User status updated successfuly",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "An error occurred on the server" },
      { status: 500 }
    );
  }
}
