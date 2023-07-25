// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: "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",
// });

// const openai = new OpenAIApi(configuration);

// export default async function generate(req, res) {
//   if (!configuration.apiKey) {
//     return;
//   }

//   try {
//     const response = await openai.createImage({
//       prompt: req,
//       n: 6,
//       size: "1024x1024",
//     });

//     return response.data.data;
//   } catch (error) {
//     if (error.response) {
//       res?.status(error.response.status).json(error.response.data);
//     } else {
//       res?.status(500).json({
//         error: {
//           message: "An error occurred during your request.",
//         },
//       });
//     }
//   }
// }

// https://generator-service.fonai.app

export default async function generate(prompt) {
  try {
    const res = await fetch("http://localhost:3000/generate", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    return res.json();
  } catch (err) {
    return err;
  }
}
