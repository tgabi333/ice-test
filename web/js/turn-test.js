window.turnTests = []

let resultListDiv = $('#result-list')
let startButton = $('#start-test-button')

startButton.on('click', (event) => {
  event.preventDefault()

  let iceServers = window.iceServers.filter((e) => e.isActive).map((e) => {
    let r = { urls: [e.url]}
    if (e.username) {
      r.username = e.username
    }
    if (e.credential) {
      r.credential = e.credential
    }

    return r
  })

  let t = new TurnTest(iceServers)
  turnTests.push(t)

  renderResults()
})

renderResults()

function renderResults() {
  window.turnTests.forEach((element, index) => {
    renderResult(element, index)
  })

  if (!window.turnTests.length) {
    let template = `<div class="row" id="empty-test-message"><div class="col-12">No Tests yet, please start a test.</div></div>`
    let e = document.createElement('div')
    e.innerHTML = template
    resultListDiv.append(e.childNodes[0])
  } else {
    $('#empty-test-message').remove()
  }
}

function renderResult(turnTest, index) {
  if (document.getElementById('turn-test-' + index)) {
    return
  }

  let view = new ResultView(turnTest, 'turn-test-' + index)
  resultListDiv.prepend(view.render())
  turnTest.start()
}
