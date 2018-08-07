const list = document.getElementById('list')
const colors = ['', 'red', 'blue', 'yellow', 'green', 'orange', 'white']

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

function createDropDown(noteId) {
  const node = document.createElement('select')
  node.setAttribute("id", noteId);
  node.setAttribute('class', 'drop-down')
  colors.forEach(color => {
    let option = document.createElement('option')
    let label = color ? document.createTextNode(color) : document.createTextNode('Select background color')
    option.setAttribute('value', color)
    option.appendChild(label)
    node.appendChild(option)
  })
  const children = list.children
  node.addEventListener('change', () => dropDownValue(noteId))
  list.appendChild(node)
}

function dropDownValue(noteId) {
  const index = noteId.slice(4)
  const select = document.getElementsByClassName("drop-down")[index];
  const selectedValue = select.options[select.selectedIndex].value;
  updateNoteColor(noteId, selectedValue)

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
  const noteId = list.children.length === 0 ? 'note' + 0 : 'note' + list.children.length / 4
  node.setAttribute("id", noteId);
  node.appendChild(note)
  list.appendChild(node)
  createEditButton(noteId)
  createDeleteButton(noteId)
  createDropDown(noteId)
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
      const classListArray = Array.from(node.classList)
      let colorClass
      colors.forEach(color => {
        if(classListArray.indexOf(color) > -1) {
          colorClass = color
        }
      })

      const text = node.innerText
      const input = document.createElement('input')
      const saveButton = createSaveButton(node.id)
      setAttributes(input, {
        'type': 'text',
        'value': text,
        'class': 'edit-input ' + colorClass,
        'id': noteId
      })
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
      const classListArray = Array.from(node.classList)
      let colorClass
      colors.forEach(color => {
        if(classListArray.indexOf(color) > -1) {
          colorClass = color
        }
      })
      const text = node.value
      const reCreateEditButton = createEditButton(noteId, true)
      const listElement = document.createElement('li')
      listElement.innerHTML = text
      listElement.setAttribute("id", noteId);
      listElement.classList.add(colorClass)
      list.removeChild(node)
      list.removeChild(listArray[i+1])
      list.insertBefore(listElement,list.children[i])
      list.insertBefore(reCreateEditButton, list.children[i+1])
    }
  }
}

function updateNoteColor(noteId, color) {
  const listArray = Array.from(list.children)
  for(let i = listArray.length-1; i >= 0; i--) {
    const node = listArray[i]
    const classListArray = Array.from(node.classList)
    if(node.id === noteId && node.tagName === "LI" || node.tagName === "INPUT") {
      colors.forEach(color => {
        if(classListArray.indexOf(color) > -1) {
          node.classList.remove(color)
        }
      })
      node.classList.add(color)
    }
  }
}
