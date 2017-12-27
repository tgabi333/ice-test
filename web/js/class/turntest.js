class TurnTest extends EventEmitter3 {

  constructor (iceServers) {
    super()
    this.iceServers = iceServers

    this.candidates = []
    this.startTime = undefined
    this.endTime = undefined
  }

  start() {
    this.startTime = Date.now()
    this.pc = new RTCPeerConnection({iceServers: this.iceServers})

    this.pc.onicegatheringstatechange = (e) => {
      if (this.pc.iceGatheringState === 'complete') {
        this.endTime = Date.now()
      }
      this.emit('icegatheringstatechange', this.pc.iceGatheringState)
    }

    this.pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.candidates.push({time: Date.now(), candidate: event.candidate})
        this.emit('icecandidate', event.candidate)
      }
    }

    this.pc.createOffer({offerToReceiveAudio: true}).then((desc) => {
      return this.pc.setLocalDescription(desc)
    }).catch((error) => {
      console.error(error)
      reject(error)
    })
  }


  stop() {
    this.pc.onicegatheringstatechange = null
    this.pc.onicecandidate = null
    this.pc.close()
    this.pc = undefined
    this.candidates = undefined
  }
}