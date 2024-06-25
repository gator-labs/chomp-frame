import axios from "axios";

export async function getQuestion() {
  const response = await axios.get(`${process.env.CHOMP_API}/api/question/get`, {
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.API_KEY,
    },
  });
  return response.data.question;
}
