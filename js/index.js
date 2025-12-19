import { getTodo } from "./getData.js";

const formEl = document.querySelector("#myForm");
const Ul = document.querySelector("ul");
const li = document.querySelectorAll(`.li`);
console.log(li);

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const value = formEl.textInput.value.trim();
  if (!value) return;

  await posTodo("http://localhost:8080/todos", value);
  await getTodo("http://localhost:8080/todos");

  formEl.textInput.value = "";
});

export function uptadeUi(list) {
  Ul.innerHTML = "";
  list.forEach((todo) => {
    const { id, title, completed } = todo;
    Ul.innerHTML += `
      <li data-id=${id} class="li">
        <span>${title}</span>
        <div>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </div>
      </li>
    `;
  });
}

async function posTodo(params, title) {
  try {
    const res = await fetch(params, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) throw new Error("Qoshishda muammo bor");

    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

getTodo("http://localhost:8080/todos");

Ul.addEventListener("click", async (e) => {
  if (e.target.tagName === "BUTTON" && e.target.textContent === "Delete") {
    const li = e.target.closest("li");
    const id = li.dataset.id; // li ga data-id qo‘shgan bo‘lish kerak

    li.remove();

    try {
      await fetch(`http://localhost:8080/todos/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log("O'chirishda muammo:", error);
    }
  }
});
