window.iceServers = []

let iceListDiv = $('#ice-list')

try {
  let localStorage = window.localStorage
  let storedIceServers = localStorage.getItem('iceServers')
  if (storedIceServers) {
    iceServers = JSON.parse(storedIceServers)
  }
} catch (e) {
  console.error(e)
}

renderIceServers()

function renderIceServers() {
  iceListDiv.empty()

  let hasActiveElement = false
  window.iceServers.forEach((element, index) => {
    renderElement(element, index)
    if (element.isActive) {
      hasActiveElement = true
    }
  })

  startButton[0].disabled = !hasActiveElement

  if (!window.iceServers.length) {
    let template = `<div class="row"><div class="col-12">No ICE servers, please add at least one below</div></div>`
    let e = document.createElement('div')
    e.innerHTML = template
    iceListDiv.append(e.childNodes[0])
  }
}

function renderElement(element, index) {
  let template = `<div class="row" data-id="${index}"><div class="col-9">`

  if (element.type === 'stun') {
    template += `URL: ${element.url}`
  } else {
    template += `URL: ${element.url} Username: ${element.username} Credential: ${element.credential}`
  }

  template += `</div>
  <div class="col-1 text-center"><input type="checkbox" class="active-checkbox" ${element.isActive ? 'checked' : ''}></div>
  <div class="col-2 text-right">
    <a href="#" class="btn btn-outline-secondary delete-server">
        <i class="fas fa-trash-alt"></i>
    </a>
</div>`

  let e = document.createElement('div')
  e.innerHTML = template
  iceListDiv.append(e.childNodes[0])
}

$('#stun-form').submit((event) => {
  event.preventDefault()

  let server = {
    type: 'stun',
    isActive: true,
    url: $('#add-new-stun').val()
  }

  addServer(server)
  event.currentTarget.reset()
  renderIceServers()
})


$('#turn-form').submit((event) => {
  event.preventDefault()

  let server = {
    type: 'turn',
    isActive: true,
    url: $('#add-new-turn').val(),
    username: $('#add-new-turn-username').val(),
    credential: $('#add-new-turn-credential').val()
  }

  addServer(server)
  event.currentTarget.reset()
  renderIceServers()
})

function addServer(server) {
  try {
    let localStorage = window.localStorage
    let storedIceServers = localStorage.getItem('iceServers')
    if (storedIceServers) {
      iceServers = JSON.parse(storedIceServers)
    }
    iceServers.push(server)

    localStorage.setItem('iceServers', JSON.stringify(iceServers))
  } catch (e) {
    console.error(e)
  }
}

function removeServer (index) {
  iceServers.splice(index, 1)
  localStorage.setItem('iceServers', JSON.stringify(iceServers))
}

function changeActiveServer (index, isActive) {
  iceServers[index].isActive = !!isActive
  localStorage.setItem('iceServers', JSON.stringify(iceServers))
}


iceListDiv.on('click', '.delete-server', (event) => {
  event.preventDefault()
  let id = parseInt(event.currentTarget.parentElement.parentElement.dataset.id, 10)

  removeServer(id)
  renderIceServers()
})

iceListDiv.on('change', '.active-checkbox', (event) => {
  event.preventDefault()
  let id = parseInt(event.currentTarget.parentElement.parentElement.dataset.id, 10)

  changeActiveServer(id, event.currentTarget.checked)
  renderIceServers()
})
