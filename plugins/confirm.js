library.confirm = function (options) {
  return new Promise((resolve, reject) => {
    const modal = library.modal({
      modalTitle: options.title,
      closeButton: '&times;',
      content: options.content,
      deleteFromHtml() {
        modal.destroy()
      },
      footerButtons: [
        {
          text: 'Cancel',
          type: 'secondary',
          handler() {
            modal.close()
            reject()
          }
        },
        {
          text: 'Delete fruit',
          type: 'danger',
          handler() {
            modal.close()
            resolve()
          }
        }
      ],
      okButton: 'OK',
      cancelButton: 'Cancel',
      isCanCloseModal: false,
      width: '600px'
    })

    setTimeout(() => modal.open(), 100)
  })
}
