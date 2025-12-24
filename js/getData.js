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

export async function patchTodo(params, title) {
  try {
    let res = await fetch(params, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) {
      throw new Error("Patchda muammo bor");
    }
    let data = await res.json();
    console.log(data);
  } catch (error) {
    alert(error);
  }
}
