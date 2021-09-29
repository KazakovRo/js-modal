library.price = function (options) {
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
          text: 'Close modal',
          type: 'primary',
          handler() {
            modal.close()
            reject()
          }
        },
        {
          text: 'Duplicate fruit',
          type: 'warning',
          handler() {
            modal.close()
            resolve()
          }
        }
      ],
      okButton: 'OK',
      cancelButton: 'Cancel',
      isCanCloseModal: true,
      width: '600px'
    })

    setTimeout(() => modal.open(), 100)
  })
}
