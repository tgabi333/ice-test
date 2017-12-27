let container = document.getElementById('container')

let template = `<div class="alert alert-${adapter.browserDetails.version ?  'primary' : 'danger'} alert-dismissible fade show" role="alert">
        Your browser is <strong>${adapter.browserDetails.browser} ${adapter.browserDetails.version ? adapter.browserDetails.version : 'unkown version'}</strong>`

if (!adapter.browserDetails.version) {
  template += ` and it seems to be <strong>not supported</strong> by <a href="https://github.com/webrtc/adapter" class="alert-link">webrtc-adapter</a>.`
}

template += `
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`

let e = document.createElement('div')
e.innerHTML = template
container.prepend(e.childNodes[0])


