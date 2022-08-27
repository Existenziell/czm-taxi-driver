import Ably from "ably/promises"

export default async function handler(req, res) {
  const client = new Ably.Realtime(process.env.NEXT_PUBLIC_ABLY_API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'czmTaxiClient' });
  res.status(200).json(tokenRequestData);
}
