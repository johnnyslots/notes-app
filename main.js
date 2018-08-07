const list = document.getElementById('list')

function createEditButton(noteId, reCreate) {
  const node = document.createElement('button')
  const label = document.createTextNode('Edit Note')
  const children = document.getElementById("list").children
  node.setAttribute("id", noteId)
  node.addEventListener('click',() => editNote(noteId))
  node.appendChild(label)
  if(!reCreate) {
    document.getElementById("list").appendChild(node)
  }
  else return node
}

function createDeleteButton(noteId) {
  const node = document.createElement('button')
  node.setAttribute("id", noteId);
  const label = document.createTextNode('Delete Note')
  const children = document.getElementById("list").children
  node.addEventListener('click', () => deleteNote(noteId))
  node.appendChild(label)
  document.getElementById("list").appendChild(node)
}

function createSaveButton(noteId) {
  const node = document.createElement('button')
  node.setAttribute("id", noteId);
  const label = document.createTextNode('Save Note')
  node.appendChild(label)
  node.addEventListener('click', () => saveNote(noteId))
  return node
}

function addNote() {
  const form = document.getElementById('add-note-form')
  const note = document.createTextNode(form.elements[0].value)
  const node = document.createElement('li')
  const noteId = list.children.length === 0 ? 'note' + 0 : 'note' + list.children.length / 3
  node.setAttribute("id", noteId);
  node.appendChild(note)
  node.classList.add('note')
  list.appendChild(node)
  createEditButton(noteId)
  createDeleteButton(noteId)
  document.getElementById("add-note-form").reset();
}

function deleteNote(noteId) {
  const listArray = Array.from(list.children)
  for(let i = listArray.length-1; i >= 0; i--) {
    if(listArray[i].id === noteId) {
      document.getElementById("list").removeChild(list.children[i])
    }
  }
}

function setAttributes(element, attributes) {
  for(let key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

function editNote(noteId) {
  const listArray = Array.from(list.children)
  for(let i = listArray.length-1; i >= 0; i--) {
    const node = listArray[i]
    if(node.id === noteId && node.tagName === "LI") {
      const text = node.innerText
      const input = document.createElement('input')
      const saveButton = createSaveButton(node.id)
      setAttributes(input, {
        'type': 'text',
        'value': text,
        'class': 'edit-input',
        'id': noteId
      })
      // input.setAttribute("type", 'text');
      // input.setAttribute("name", 'firstname');
      // input.setAttribute("value", text);
      // input.setAttribute("class", 'edit-input');
      // input.setAttribute("id", noteId);
      list.removeChild(node)
      list.removeChild(listArray[i+1])
      list.insertBefore(input, list.children[i])
      list.insertBefore(saveButton, list.children[i+1])
    }
  }
}

function saveNote(noteId) {
  const listArray = Array.from(list.children)
  for(let i = listArray.length-1; i >= 0; i--) {
    const node = listArray[i]
    if(node.id === noteId && node.tagName === "INPUT") {
      const text = node.value
      const reCreateEditButton = createEditButton(noteId, true)
      const listElement = document.createElement('li')
      listElement.innerHTML = text
      listElement.setAttribute("id", noteId);
      list.removeChild(node)
      list.removeChild(listArray[i+1])
      list.insertBefore(listElement,list.children[i])
      list.insertBefore(reCreateEditButton, list.children[i+1])
    }
  }
}
