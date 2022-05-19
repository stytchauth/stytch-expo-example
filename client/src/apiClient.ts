const BASE_URL = "http://localhost:3000";

const _call = async (
  path: string,
  method: string,
  body: BodyInit | null | undefined = undefined
) => {
  return fetch(BASE_URL + path, {
    headers: { "Content-Type": "application/json" },
    method,
    body,
  });
};

export const sendOTP = async (phoneNumber: string) => {
  // Remove non numeric charaters
  let cleanNumber = phoneNumber.replace(/\D/g, "");
  // Prepend +1 international code
  cleanNumber = "+1" + cleanNumber;
  return _call(
    "/send_otp",
    "POST",
    JSON.stringify({ phone_number: cleanNumber })
  );
};

export const verifyOTP = async (otp: string, methodId: string) => {
  return _call(
    "/verify_otp",
    "POST",
    JSON.stringify({ otp, method_id: methodId })
  );
};

export const authenticateSession = async (session: string) => {
  return _call("/auth_session", "POST", JSON.stringify({ session }));
};

export const logout = async (session: string) => {
  return _call("/logout", "POST", JSON.stringify({ session }));
};
