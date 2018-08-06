
function createEditButton() {
  const node = document.createElement('button')
  const label = document.createTextNode('Edit Note')
  const lastChild = document.getElementById("list").lastChild.id
  node.addEventListener('click', () => editNote(lastChild))
  node.appendChild(label)
  document.getElementById(lastChild).appendChild(node)
}

function createDeleteButton() {
  const node = document.createElement('button')
  const label = document.createTextNode('Delete Note')
  const lastChild = document.getElementById("list").lastChild.id
  node.addEventListener('click', () => deleteNote(lastChild))
  node.appendChild(label)
  document.getElementById(lastChild).appendChild(node)
}

function addNote() {
  const form = document.getElementById('add-note-form')
  const note = document.createTextNode(form.elements[0].value)
  const node = document.createElement('li')
  node.setAttribute("id", "note" + list.children.length);
  node.appendChild(note)
  node.classList.add('note')
  document.getElementById('list').appendChild(node)
  createEditButton()
  createDeleteButton()
  document.getElementById("add-note-form").reset();
}

function deleteNote(noteId) {
  const note = document.getElementById(noteId)
  return note.parentNode.removeChild(note)
}

function editNote(noteId) {
  console.log('EDIT!')
}
