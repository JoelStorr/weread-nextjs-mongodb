
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.TOKENSECRET;
const key = new TextEncoder().encode(secretKey);

// NOTE: Creates a token that works for 10 sec
export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

// NOTE: Decrypt the token
export async function decrypt(input) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}