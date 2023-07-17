// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class User {
  static #list = []

  constructor(email, login, password) {
    this.email = email
    this.login = login
    this.password = password
    this.id = new Date().getTime()
  }

  verifyPassword = (password) => this.password === password

  static add = (user) => {
    this.#list.push(user)
  }

  static getList = () => {
    return this.#list
  }

  static getById = (id) =>
    this.#list.find((user) => user.id === id)

  static deleteById = (id) => {
    const index = this.#list.find((user) => user.id === id)

    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  static updateById = (id, data) => {
    const user = this.getById(id)

    if (user) {
      this.update(user, data)
      return true
    } else {
      return false
    }
  }

  static update = (user, { email }) => {
    if (email) {
      user.email = email
    }
  }
}

//===///===//===================///==================

class Product {
  static #list = []

  constructor(name, price, description) {
    this.id =
      Math.floor(Math.random() * (99999 - 10000 + 1)) +
      10000
    this.createDate = new Date().toISOString()
    this.name = name
    this.price = price
    this.description = description
  }

  static getList() {
    return this.#list
  }

  static add(product) {
    this.#list.push(product)
  }

  static getById(id) {
    return this.#list.find((product) => product.id === id)
  }

  static updateById = (id, data) => {
    const product = this.getById(id)

    if (product) {
      this.update(product, data)
      return true
    } else {
      return false
    }
  }

  static update(product, { name, price, description }) {
    if (name) {
      product.name = name
    }

    if (price) {
      product.price = price
    }

    if (description) {
      product.description = description
    }
  }

  static deleteById(id) {
    this.#list = this.#list.filter(
      (product) => product.id !== id,
    )
  }
}

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  const list = User.getList()

  const list2 = Product.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',

    data: {
      users: {
        list: User.getList(),
        isEmpty: list.length === 0,
      },
      products: {
        list2: Product.getList(),
        isEmpty: list2.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.post('/user-create', function (req, res) {
  const { email, login, password } = req.body

  const user = new User(email, login, password)

  User.add(user)

  console.log(User.getList())

  res.render('success-info', {
    style: 'success-info',
    info: 'Користувач створений',
  })
})

// ================================================================

router.get('/user-delete', function (req, res) {
  const { id } = req.query

  console.log(id)

  User.deleteById(Number(id))

  res.render('success-info', {
    style: 'success-info',
    info: 'Користувач видалений',
  })
})

// ================================================================

router.post('/user-update', function (req, res) {
  const { email, password, id } = req.body

  let result = false

  const user = User.getById(Number(id))

  if (user.verifyPassword(password)) {
    User.update(user, { email })
    result = true
  }

  console.log(email, password, id)

  res.render('success-info', {
    style: 'success-info',
    info: result
      ? 'Email пошту оновлено'
      : 'Сталася помилка',
  })
})

// ================================================================
// ================================================================

router.get('/product-create', function (req, res) {
  const { id } = req.query

  console.log(id)

  Product.update(Number(id))

  res.render('product-create', {
    style: 'success-info',
    info: 'Товар отримано',
  })
})

// ================================================================

router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body

  const product = new Product(name, price, description)

  Product.add(product)

  console.log(Product.getList())

  res.render('product-create', {
    style: 'success-info',
    info: 'Товар створено',
  })
})

// ================================================================

router.get('/product-edit', function (req, res) {
  const { id } = req.query
  const product = Product.getById(Number(id))

  if (product) {
    res.render('product-edit', {
      style: 'success-info',
      info: 'Товар отримано',
      product: product,
    })
  } else {
    res.render('product-edit', {
      style: 'success-info',
      info: 'Товар не знайдено',
      product: null,
    })
  }
})

// ================================================================

router.post('/product-edit', function (req, res) {
  const { name, price, description, id } = req.body
  const product = Product.getById(Number(id))

  if (product) {
    Product.update(product, { name, price, description })
    res.render('product-edit', {
      style: 'success-info',
      info: 'Дані товару оновлено',
      product: product,
    })
  } else {
    res.render('product-edit', {
      style: 'success-info',
      info: 'Товар не знайдено',
      product: null,
    })
  }
})

// ================================================================
router.post('/product-delete', function (req, res) {
  const { name, price, description, id } = req.body
  const product = Product.getById(Number(id))

  if (product !== undefined) {
    Product.deleteById(product, {
      name,
      price,
      description,
    })
    res.render('product-delete', {
      style: 'success-info',
      info: 'Товар видалено',
      product: null,
    })
  } else {
    res.render('product-delete', {
      style: 'success-info',
      info: 'Товар не знайдено',
      product: null,
    })
  }
})

router.get('/product-delete', function (req, res) {
  const { id } = req.query
  const product = Product.getById(Number(id))

  if (product) {
    Product.deleteById(Number(id))
    res.redirect('/') // Redirect to the homepage or the desired page after deletion
  } else {
    res.render('product-delete', {
      style: 'success-info',
      info: 'Товар не не знайдено',
      product: null,
    })
  }
})

//==================================================================

// Підключаємо роутер до бек-енду
module.exports = router
