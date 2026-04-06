const loginEmail = document.getElementById('login-email')
const loginPassword = document.getElementById('login-password')
const loginButton = document.getElementById('login-button')
const loginMessage = document.getElementById('login-message')

const contactName = document.getElementById('contact-name')
const contactMessage = document.getElementById('contact-message')
const contactSubmit = document.getElementById('contact-submit')
const contactError = document.getElementById('contact-error')
const contactSuccess = document.getElementById('contact-success')

const productSearch = document.getElementById('product-search')
const productList = document.getElementById('product-list')

const openModalButton = document.getElementById('open-modal')
const closeModalButton = document.getElementById('close-modal')
const confirmModalButton = document.getElementById('confirm-modal')
const modalBackdrop = document.getElementById('modal-backdrop')

const loadUsersButton = document.getElementById('load-users')
const usersStatus = document.getElementById('users-status')
const usersList = document.getElementById('users-list')

const products = ['Laptop', 'Keyboard', 'Mouse', 'Monitor', 'Headphones']

function renderProducts(items) {
  productList.innerHTML = ''

  items.forEach((item) => {
    const li = document.createElement('li')
    li.textContent = item
    productList.appendChild(li)
  })
}

renderProducts(products)

loginButton.addEventListener('click', () => {
  const email = loginEmail.value.trim()
  const password = loginPassword.value.trim()

  if (email === 'admin@example.com' && password === 'secret123') {
    loginMessage.textContent = 'Zalogowano poprawnie'
    return
  }

  loginMessage.textContent = 'Nieprawidłowe dane logowania'
})

contactSubmit.addEventListener('click', () => {
  const name = contactName.value.trim()
  const message = contactMessage.value.trim()
  contactError.textContent = ''
  contactSuccess.textContent = ''

  if (!name || !message) {
    contactError.textContent = 'Wszystkie pola są wymagane'
    return
  }

  if (message.length < 5) {
    contactError.textContent = 'Wiadomość musi mieć co najmniej 5 znaków'
    return
  }

  contactSuccess.textContent = 'Formularz został wysłany'
})

productSearch.addEventListener('input', () => {
  const query = productSearch.value.trim().toLowerCase()
  const filtered = products.filter((product) => product.toLowerCase().includes(query))
  renderProducts(filtered)
})

openModalButton.addEventListener('click', () => {
  modalBackdrop.classList.remove('hidden')
})

closeModalButton.addEventListener('click', () => {
  modalBackdrop.classList.add('hidden')
})

confirmModalButton.addEventListener('click', () => {
  modalBackdrop.classList.add('hidden')
})

loadUsersButton.addEventListener('click', async () => {
  usersStatus.textContent = 'Ładowanie...'
  usersList.innerHTML = ''

  try {
    const response = await fetch('https://example.com/api/users')

    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }

    const users = await response.json()

    users.forEach((user) => {
      const li = document.createElement('li')
      li.textContent = user.name
      usersList.appendChild(li)
    })

    usersStatus.textContent = 'Użytkownicy załadowani'
  } catch (error) {
    usersStatus.textContent = error instanceof Error ? error.message : 'Unknown error'
  }
})