
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";


const secretKey = process.env.TOKENSECRET;
const key = new TextEncoder().encode(secretKey);

// NOTE: Creates a token that works for 10 sec
export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 hour")
    .sign(key);
}

// NOTE: Decrypt the token
export async function decrypt(input) {

  try{
    const tokenData =  await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });

    // console.log('-------------------- jwtVerify ----------------');
    // console.log(tokenData);

    return tokenData.payload;

  } catch (error){

    // console.log('--------------- First Error -----------------')
    // console.log(error);
    throw error
  }

}

//NOTE: Getting the session Token
export async function getSession(): Promise<JWTPayload | null | false> {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  try{
    return await decrypt(session);

  } catch(error){
    // console.log("------------------- Error -------------------")
    // console.log(error)

    if(error.code === 'ERR_JWT_EXPIRED'){
      return false;
    }
  }

  return false
}
