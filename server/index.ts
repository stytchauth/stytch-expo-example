import express from "express";
import "dotenv/config";
import * as stytch from "stytch";
const app = express();
app.use(express.json());
const port = 3000;

const stytchClient = new stytch.Client({
  project_id: process.env.STYTCH_PROJECT_ID || "",
  secret: process.env.STYTCH_SECRET || "",
  env: stytch.envs.test,
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/send_otp", async (req, res) => {
  const { phone_number } = req.body;
  if (!phone_number) {
    return res.status(400).json({ error: "No phone number provided." });
  }

  try {
    const resp = await stytchClient.otps.sms.loginOrCreate({
      phone_number,
    });

    return res.status(200).json({ method_id: resp.phone_id });
  } catch (e: any) {
    console.error(e);
    return res.status(400).json({ error: e?.error_message });
  }
});

app.post("/verify_otp", async (req, res) => {
  const { otp, method_id } = req.body;

  if (!otp) {
    return res.status(400).json({ error: "No OTP provided." });
  }
  try {
    const resp = await stytchClient.otps.authenticate({
      code: otp,
      method_id,
      session_duration_minutes: 60 * 24 * 7, // start a 7 day session
    });

    return res
      .status(200)
      .json({ session_token: resp.session_token, user: resp.session?.user_id });
  } catch (e: any) {
    console.error(e);
    return res.status(400).json({ error: e?.error_message });
  }
});

app.post("/auth_session", async (req, res) => {
  const { session } = req.body;
  if (!session) {
    return res.status(400).json({ error: "No session provided" });
  }

  try {
    const resp = await stytchClient.sessions.authenticate({
      session_token: session,
    });

    return res.status(200).json({ user: resp.session.user_id });
  } catch (e: any) {
    console.error(e);
    return res.status(400).json({ error: e?.error_message });
  }
});

app.post("/logout", async (req, res) => {
  const { session } = req.body;
  if (!session) {
    return res.status(400).json({ error: "No session provided" });
  }

  try {
    await stytchClient.sessions.revoke({ session_token: session });
    return res.status(200).end();
  } catch (e: any) {
    console.error(e?.message);
    return res.status(400).json({ error: e?.error_message });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
