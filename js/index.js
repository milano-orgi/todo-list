import { getTodo, patchTodo } from "./getData.js";

const formEl = document.querySelector("#myForm");
const Ul = document.querySelector("ul");
const li = document.querySelectorAll(`.li`);
const modal = document.querySelector(`.modal`);
const modalInput = document.querySelector(`#modal-input`);
const modalForm = document.querySelector(`.modal-form`);

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const value = formEl.textInput.value.trim();
  if (!value) return;

  await posTodo("http://localhost:8080/todos", value);
  await getTodo("http://localhost:8080/todos");

  formEl.textInput.value = "";
});

function edit(id) {
  modalForm.addEventListener(`submit`, async (e) => {
    e.preventDefault();
    await patchTodo(
      `http://localhost:8080/todos/${id}`,
      modalForm.modalInput.value
    );
    console.log(modalForm.modalInput.value);
    await getTodo("http://localhost:8080/todos");
    modalForm.reset();
  });
}

export function uptadeUi(list) {
  Ul.innerHTML = "";
  list.forEach((todo) => {
    const { id, title, completed } = todo;
    Ul.innerHTML += `
      <li data-id=${id} class="li">
        <span>${title}</span>
        <div>
          <button data-id=${id} class="edit">Edit</button>
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
    const id = li.dataset.id;
    li.remove();

    try {
      await fetch(`http://localhost:8080/todos/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log("O'chirishda muammo:", error);
    }
  }
  if (e.target.classList.contains(`edit`)) {
    openModal();
    let id = e.target.dataset.id;
    edit(id);
    modalInput.value =
      e.target.parentElement.previousElementSibling.textContent;
  }
});

function openModal() {
  modal.classList.toggle(`hidden`);
}

document.addEventListener(`keydown`, (e) => {
  if (e.key == `Escape`) {
    openModal();
  }
});
