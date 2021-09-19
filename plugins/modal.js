Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling)
}

function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement('div')
  }

  const wrap = document.createElement('div')
  wrap.classList.add('modal-footer')

  buttons.forEach(btn => {
    const elBtn = document.createElement('button')
    elBtn.textContent = btn.text
    elBtn.classList.add('modal-btn')
    elBtn.classList.add(`btn-${btn.type || 'default-class'}`)
    elBtn.onclick = btn.handler || defaultFunction

    wrap.appendChild(elBtn)
  })

  return wrap
}

function _createModal(options) {
  const modal = document.createElement('div')
  const { modalTitle, closeButton, content, footerButtons, isCanCloseModal, width } = options
  const DEFAULT_WIDTH = '700px'

  modal.classList.add('vmodal')
  modal.insertAdjacentHTML(
    'afterbegin',
    `<div class='modal-overlay'>
        <div class='modal-window' style='width: ${width || DEFAULT_WIDTH}'>
          <div class='modal-header'>
            <span class='modal-title'>${modalTitle}</span>
            ${isCanCloseModal ? `<span class='modal-close' data-close='true'>${closeButton}</span>` : ''}
          </div>

          <div class='modal-body' data-content>
            ${content ? content : ''}
          </div>
        </div>
      </div>
  `
  )

  const footer = _createModalFooter(footerButtons)
  footer.appendAfter(modal.querySelector('[data-content]'))
  document.body.appendChild(modal)
  return modal
}

const options = {
  modalTitle: 'Modal title',
  closeButton: '&times;',
  content: `
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, debitis?</p>   
    <p>Lorem ipsum dol ea facilis rerum odit quis in quisquam sapiente.</p>
  `,
  footerButtons: [
    {
      text: 'OK',
      type: 'primary',
      handler() {
        console.log('Primary btn clicked')
        myModal.close()
      }
    },
    {
      text: 'Cancel',
      type: 'danger',
      handler() {
        console.log('Danger btn clicked')
        myModal.close()
      }
    }
  ],
  okButton: 'OK',
  cancelButton: 'Cancel',
  isCanCloseModal: true,
  width: '600px'
}

library.modal = function (options) {
  const elModal = _createModal(options)
  const ANIMATION_SPEED = 200
  let isOpen = false
  let destroyed = false

  const modalMethods = {
    open() {
      destroyed && console.log('mdoal is destroyed')
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
    }
  }

  const listener = e => (e.target.dataset.close ? modalMethods.close() : '')

  elModal.addEventListener('click', listener)

  return Object.assign(modalMethods, {
    destroy() {
      elModal.parentNode.removeChild(elModal)
      elModal.removeEventListener('click', listener)
      destroyed = true
    },
    setContent(html) {
      elModal.querySelector('[data-content]').innerHTML = html
    }
  })
}
