function _createModal(options) {
  const modal = document.createElement('div')
  modal.classList.add('vmodal')
  modal.insertAdjacentHTML(
    'afterbegin',
    `<div class="modal-overlay">
        <div class="modal-window">
          <div class="modal-header">
            <span class="modal-title">Modal title</span>
            <span class="modal-close">&times;</span>
          </div>

          <div class="modal-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, debitis?</p>
            <p>
              Lorem ipsum dol ea facilis rerum odit quis in
              quisquam sapiente.
            </p>
          </div>

          <div class="modal-footer">
            <button>OK</button>
            <button>Cancel</button>
          </div>
        </div>
      </div>
  `
  )

  document.body.appendChild(modal)
  return modal
}

library.modal = function (options) {
  const elModal = _createModal(options)
  const ANIMATION_SPEED = 200
  let isOpen = false

  return {
    open() {
      !isOpen && elModal.classList.add('open')
    },
    close() {
      isOpen = true
      elModal.classList.remove('open')
      elModal.classList.add('hide-animation')
      setTimeout(() => {
        elModal.classList.remove('hide')
        isOpen = false
      }, ANIMATION_SPEED)
    },
    destroy() {}
  }
}
