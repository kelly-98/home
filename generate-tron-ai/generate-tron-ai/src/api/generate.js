// https://be.tronai.app/images

export default async function generate(prompt) {
  console.log(
    "body",
    JSON.stringify({
      ...prompt,
    })
  );
  try {
    const res = await fetch("http://localhost:8000/images", {
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
        ...prompt,
      }),
    });
    return res.json();
  } catch (err) {
    return err;
  }
}

export async function getNumsGeneratedImg() {
  try {
    const res = await fetch("http://localhost:8000/analytics", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    return res.json();
  } catch (err) {
    return err;
  }
}
