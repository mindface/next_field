import { NextApiRequest, NextApiResponse } from 'next'

export default (req:NextApiRequest, res:NextApiResponse) => {
  res.setHeader("content-type","application/json")
  res.statusCode = 200;
  res.json({ name: "John Doe" });
};
