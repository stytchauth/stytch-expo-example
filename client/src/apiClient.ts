const BASE_URL = "http://10.103.177.165:3000";

class APIClient {
  _url: string;
  constructor(baseUrl: string) {
    this._url = baseUrl;
  }

  async _call(
    path: string,
    method: string,
    body: BodyInit | null | undefined = undefined
  ) {
    console.log(body);
    return fetch(this._url + path, {
      headers: { "Content-Type": "application/json" },
      method,
      body,
    });
  }

  async sendOTP(phoneNumber: string) {
    // Remove non numberic charaters
    let cleanNumber = phoneNumber.replace(/\D/g, "");
    // Prepend +1 international code
    cleanNumber = "+1" + cleanNumber;
    return this._call(
      "/send_otp",
      "POST",
      JSON.stringify({ phone_number: cleanNumber })
    );
  }

  async verifyOTP(otp: string, methodId: string) {
    return this._call(
      "/verify_otp",
      "POST",
      JSON.stringify({ otp, method_id: methodId })
    );
  }

  async authenticateSession(session: string) {
    return this._call("/auth_session", "POST", JSON.stringify({ session }));
  }
}

export default new APIClient(BASE_URL);
