import { uptadeUi } from "./index.js";

export async function getTodo(params) {
  try {
    const res = await fetch(params);
    if (!res.ok) throw new Error("API muammo");
    const data = await res.json();

    uptadeUi(data);
  } catch (error) {
    console.log(error);
  }
}
