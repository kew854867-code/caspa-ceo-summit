import { clerkClient, getAuth } from "@clerk/express";
import { Router, type IRouter } from "express";
import { GetCurrentUserResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/auth/me", async (req, res) => {
  const userId = getAuth(req).userId;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const user = await clerkClient.users.getUser(userId);
  const primaryEmail = user.emailAddresses.find(
    (address) => address.id === user.primaryEmailAddressId,
  );
  const email = primaryEmail?.emailAddress ?? "";
  const verifiedEmail =
    primaryEmail?.verification?.status === "verified"
      ? email.trim().toLowerCase()
      : "";
  const adminEmails = new Set(
    (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean),
  );

  res.json(
    GetCurrentUserResponse.parse({
      userId: user.id,
      email,
      displayName:
        [user.firstName, user.lastName].filter(Boolean).join(" ") ||
        user.username ||
        "Summit member",
      isAdmin: Boolean(verifiedEmail && adminEmails.has(verifiedEmail)),
    }),
  );
});

export default router;