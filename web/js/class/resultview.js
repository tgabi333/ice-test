class ResultView {

  /**
   *
   * @param {TurnTest} turnTest
   * @param domElementId
   */
  constructor (turnTest, domElementId) {
    this.turnTest = turnTest
    this.domElementId = domElementId

    this._render()


    this.turnTest.on('icegatheringstatechange', (iceGatheringState) => {
      this.domElement.querySelector('.icegatheringstate').innerText = iceGatheringState
    })

    this.turnTest.on('icecandidate', (candidate) => {
      let template = `<div class="col-12"><div class="row">
        <div class="col-2">${candidate.type}</div>
        <div class="col-2">${candidate.protocol}</div>
        <div class="col-4">${candidate.ip}:${candidate.port}</div>
        <div class="col-4">${ candidate.relatedAddress ? candidate.relatedAddress +':' + candidate.relatedPort : 'N/A'}</div>
      </div></div>`

      let e = document.createElement('div')
      e.innerHTML = template
      this.domElement.appendChild(e.childNodes[0])
    })
  }

  render () {
    return this.domElement
  }

  _render () {
    let template = `<div class="row" id="${this.domElementId}">
       <div class="col-12">IceGatheringState: <strong class="icegatheringstate"></strong></div>
   </div>`

    let e = document.createElement('div')
    e.innerHTML = template
    this.domElement = e.childNodes[0]

    return this.domElement
  }
}