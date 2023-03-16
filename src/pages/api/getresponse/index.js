import { OpenAIApi, Configuration } from "openai";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let { prompt, secret } = await req.body;

    const configuration = new Configuration({
      // apiKey: process.env.OPENAI_API_KEY,
      apiKey: process.env.GPT_KEY,
    });
    const openai = new OpenAIApi(configuration);

    if (secret === process.env.SECRET)
      try {
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a true, hardcore Stoic. Answer everything like a true Stoic",
            },
            { role: "user", content: prompt },
            // {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
            // {"role": "user", "content": "Where was it played?"}
          ],
          max_tokens: 250,
          temperature: 1,
        });

        res.status(200).json(completion.data);
      } catch (err) {
        console.log("--------------------");
        console.log(err);
        res.status(500).json({ error: err });
      }
    else res.status(404).json({ error: "now allowed" });
  } else {
    res.status(404).json({ error: "not available" });
  }
}
