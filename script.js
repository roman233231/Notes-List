let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  const noteList = document.getElementById("noteList");
  noteList.innerHTML = "";

  notes.forEach((note, index) => {
    const li = document.createElement("li");

    if (note.archived) li.classList.add("archived");

    
    let noteClass = "note-type-none";
    switch (note.type) {
      case "Терміново":
        noteClass = "note-type-urgent";
        break;
      case "Домашня робота":
        noteClass = "note-type-homework";
        break;
      case "Список купівлі":
        noteClass = "note-type-shopping";
        break;
      case "Домашні справи":
        noteClass = "note-type-house";
        break;
    }
    li.classList.add(noteClass);

    const typeEl = document.createElement("div");
    typeEl.textContent = `Тип: ${note.type}`;
    typeEl.style.fontFamily = "cursive";
    typeEl.style.fontWeight = "bold";
    typeEl.style.left = "15px"
    li.appendChild(typeEl);

    const titleEl = document.createElement("div");
    titleEl.textContent = note.title;
    titleEl.style.fontWeight = "bold";
    titleEl.contentEditable = true;
    titleEl.oninput = () => {
      notes[index].title = titleEl.textContent;
      saveNotes();
    };
    li.appendChild(titleEl);

    const textEl = document.createElement("div");
    textEl.textContent = note.text;
    textEl.contentEditable = true;
    textEl.oninput = () => {
      notes[index].text = textEl.textContent;
      saveNotes();
    };
    li.appendChild(textEl);

    const date = document.createElement("div");
    date.className = "note-date";
    date.textContent = note.date;
    li.appendChild(date);

    const dell = document.createElement("button");
    dell.textContent = "Видалити";
    dell.className = "delete";
    dell.onclick = () => {
      notes.splice(index, 1);
      saveNotes();
      renderNotes();
    };
    li.appendChild(dell);

    const archivet = document.createElement("button");
    archivet.textContent = "Архівувати";
    archivet.className = "archive";
    archivet.onclick = () => {
      notes[index].archived = !notes[index].archived;
      saveNotes();
      renderNotes();
    };
    li.appendChild(archivet);

    noteList.appendChild(li);
  });
}


function addNote() {
  const title = document.getElementById("noteInput").value.trim();
  const text = document.getElementById("textInput").value.trim();
  const type = document.getElementById("noteType").value;

  if (title === "" && text === "") return;

  const newNote = {
    title,
    text,
    type,
    date: new Date().toLocaleString(),
    archived: false,
  };

  notes.push(newNote);
  saveNotes();
  renderNotes();

  document.getElementById("noteInput").value = "";
  document.getElementById("textInput").value = "";
}
renderNotes();
