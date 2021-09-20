const fruits = [
  { id: 1, title: 'Apple', price: 20, img: 'https://lifeglobe.net/x/entry/6259/1a-0.jpg' },
  {
    id: 2,
    title: 'Orange',
    price: 30,
    img: 'https://m.dom-eda.com/uploads/images/catalog/item/dfc9a3e974/3cbf3bd41c_1000.jpg'
  },
  {
    id: 3,
    title: 'Mango',
    price: 40,
    img: 'https://nebanan.com.ua/wp-content/uploads/2019/11/dizajn-bez-nazvaniya-29-e1602670749739.jpg'
  }
]

const createCard = fruit => `
  <div class="col" style="max-width: 400px">
    <div class="card" style="width: 350px">
      <img src="${fruit.img}" class="card-img-top" style="height: 300px" alt="${fruit.title}" />
      <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>

        <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Get price</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
      </div>
    </div>
  </div>
`

function renderFruitCards() {
  const AllCards = fruits.map(fruit => createCard(fruit)).join('')

  document.querySelector('#fruits').innerHTML = AllCards
}

renderFruitCards()

const priceModal = library.modal({
  modalTitle: 'Product price',
  closeButton: '&times;',
  footerButtons: [
    {
      text: 'Close modal',
      type: 'primary',
      handler() {
        priceModal.close()
      }
    }
  ],
  okButton: 'OK',
  cancelButton: 'Cancel',
  isCanCloseModal: true,
  width: '600px'
})

const confirmModal = library.modal({
  modalTitle: 'Are you sure?',
  closeButton: '&times;',
  footerButtons: [
    {
      text: 'Cancel',
      type: 'secondary',
      handler() {
        confirmModal.close()
      }
    },
    {
      text: 'Delete fruit',
      type: 'danger',
      handler() {
        confirmModal.close()
      }
    }
  ],
  okButton: 'OK',
  cancelButton: 'Cancel',
  isCanCloseModal: false,
  width: '600px'
})

document.addEventListener('click', e => {
  e.preventDefault()
  const btnType = e.target.dataset.btn
  const fruitId = +e.target.dataset.id
  const fruit = fruits.find(item => item.id === fruitId)

  if (btnType === 'price') {
    priceModal.setContent(`
      <p>Price for ${fruit.title}: <strong>${fruit.price}$</strong> </p>
    `)

    priceModal.open()
  } else if (btnType === 'remove') {
    confirmModal.setContent(`
      <p>Do you want delete: <strong>${fruit.title} ?</strong> </p>
    `)

    confirmModal.open()
  }
})
