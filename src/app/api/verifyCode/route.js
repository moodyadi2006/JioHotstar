import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request) {
  await dbConnect();
  try {
    const { username, verifyCode } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    const existingUser = await UserModel.findOne({ username: decodedUsername });
    if (!existingUser) {
      return Response.json(
        {
          success: false,
          message: "User Not found",
        },
        {
          status: 404,
        }
      );
    }
    if (
      verifyCode == existingUser.verifyCode &&
      existingUser.verifyCodeExpiry > Date.now()
    ) {
      existingUser.isVerified = true;
      await existingUser.save();
      return Response.json(
        {
          success: true,
          message: "User verified successfully",
        },
        {
          status: 200,
        }
      );
    } else if (Date.now() > existingUser.verifyCodeExpiry) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired, please sign up again to get a new verification code",
        },
        {
          status: 402,
        }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Verification code is invalid",
        },
        {
          status: 403,
        }
      );
    }
  } catch (error) {
    console.error("Error verifying User");
    return Response.json(
      {
        success: false,
        message: "Error registering User",
      },
      {
        status: 500,
      }
    );
  }
}
