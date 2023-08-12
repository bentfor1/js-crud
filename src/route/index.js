// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []

  static #count = 0

  constructor(
    img,
    title,
    description,
    category,
    price,
    amount = 0,
  ) {
    this.id = ++Product.#count // Генеруємо унікальний id для товару
    this.img = img
    this.title = title
    this.description = description
    this.category = category
    this.price = price
    this.amount = amount
  }

  //   static add = (
  //     img,
  //     title,
  //     description,
  //     category,
  //     price,
  //   ) => {
  //     const newProduct = new Product(
  //       img,
  //       title,
  //       description,
  //       category,
  //       price,
  //     )
  //     this.#list.push(newProduct)
  //   }

  static add = (...data) => {
    const newProduct = new Product(...data)
    this.#list.push(newProduct)
  }

  static getList = () => {
    return this.#list
  }

  static getById = (id) => {
    return this.#list.find((product) => product.id === id)
  }

  static getRandomList = (id) => {
    // Фільтруємо товари, щоб вилучити той, з яким порівнюємо id
    const filteredList = this.#list.filter(
      (product) => product.id !== id,
    )
    // Відсортуємо за допомогою Math.random() та перемішвємо масив
    const shuffledList = filteredList.sort(
      () => Math.random() - 0.5,
    )
    // Повертаємо перші 3 елементи з перемішаного масиву
    return shuffledList.slice(0, 3)
  }
}

Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютер Asus Gaming (X43v31) AMD Ryzen 5 3600/`,
  `AMD Ryzen 5 3600 (3.6-4.2 ГГц) / RAM 16 ГБ / HDD 1ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8ГБ / без ОД / LAN / без ОС`,
  [
    { id: 1, text: `Готовий до відправки` },
    { id: 2, text: `Топ продажів` },
  ],
  27000,
  10,
)

Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/`,
  `SMD Ryzen 5 3600 (3.6-4.2 ГГц) / RAM 16 ГБ / HDD 1ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8ГБ / без ОД / LAN / без ОС`,
  [{ id: 1, text: `` }],
  20000,
  10,
)

Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютер IBM Gaming (X43v31) AMD Ryzen 5 3600/`,
  `DMD Ryzen 5 3600 (3.6-4.2 ГГц) / RAM 16 ГБ / HDD 1ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8ГБ / без ОД / LAN / без ОС`,
  [{ id: 2, text: `Топ продажів` }],
  28000,
  11,
)

Product.add(
  'https://picsum.photos/200/300',
  `2Комп'ютер IBM Gaming (X43v31) AMD Ryzen 5 3600/`,
  `DMD Ryzen 5 3600 (3.6-4.2 ГГц) / RAM 16 ГБ / HDD 1ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8ГБ / без ОД / LAN / без ОС`,
  [{ id: 2, text: `Топ продажів` }],
  28000,
  12,
)

Product.add(
  'https://picsum.photos/200/300',
  `3Комп'ютер IBM Gaming (X43v31) AMD Ryzen 5 3600/`,
  `DMD Ryzen 5 3600 (3.6-4.2 ГГц) / RAM 16 ГБ / HDD 1ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8ГБ / без ОД / LAN / без ОС`,
  [{ id: 2, text: `Топ продажів` }],
  28000,
  15,
)

Product.add(
  'https://picsum.photos/200/300',
  `4Комп'ютер IBM Gaming (X43v31) AMD Ryzen 5 3600/`,
  `DMD Ryzen 5 3600 (3.6-4.2 ГГц) / RAM 16 ГБ / HDD 1ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8ГБ / без ОД / LAN / без ОС`,
  [{ id: 2, text: `Топ продажів` }],
  28000,
  0,
)

// ================================================================
class Promocode {
  static #list = []
  constructor(name, factor) {
    this.name = name
    this.factor = factor
  }
  static add = (name, factor) => {
    const newPromocode = new Promocode(name, factor)
    Promocode.#list.push(newPromocode)
    return newPromocode
  }
  static getByName = (name) => {
    return this.#list.find((promo) => promo.name === name)
  }

  static calc = (promo, price) => price * promo.factor
}

// ================================================================
Promocode.add('SUMMER2023', 0.9)
Promocode.add('DISCOUNT50', 0.5)
Promocode.add('SALE25', 0.75)

// ================================================================

// ================================================================
class Purchase {
  static DELIVERY_PRICE = 150
  static #BONUS_FACTOR = 0.1

  static #list = []

  static #count = 0

  static #bonusAccount = new Map()

  static getBonusBalance = (email) => {
    return Purchase.#bonusAccount.get(email) || 0
  }

  static calcBonusAmount = (val) => {
    return val * Purchase.#BONUS_FACTOR
  }

  static updateBonusBalance = (email, price, bonusUse) => {
    const amount = this.calcBonusAmount(price)
    const currentBalance = Purchase.getBonusBalance(email)
    const updateBalance = currentBalance + amount - bonusUse

    Purchase.#bonusAccount.set(email, updateBalance)

    console.log(email, updateBalance)

    return amount
  }

  constructor(data, product) {
    this.id = ++Purchase.#count

    this.firstname = data.firstname
    this.lastname = data.lastname

    this.phone = data.phone
    this.email = data.email

    this.comment = data.comment || null
    this.bonus = data.bonus || 0
    this.promocode = data.promocode || null

    this.totalPrice = data.totalPrice
    this.productPrice = data.productPrice
    this.deliveryPrice = data.deliveryPrice
    this.amount = data.amount

    this.product = product
  }

  static add = (...arg) => {
    const newPurchase = new Purchase(...arg)
    this.#list.push(newPurchase)
    return newPurchase
  }

  static getList = () => {
    return Purchase.#list
      .reverse()
      .map(({ id, product, totalPrice, bonus }) => {
        return {
          id,
          product,
          totalPrice,
          bonus,
        }
      })
  }

  static getById = (id) => {
    return Purchase.#list.find((item) => item.id === id)
  }

  static updateByID = (id, data) => {
    const purchase = Purchase.getById(id)
    if (purchase) {
      if (data.firstname)
        purchase.firstname = data.firstname
      if (data.lastname) purchase.lastname = data.lastname
      if (data.email) purchase.email = data.email
      if (data.phone) purchase.phone = data.phone
      return true
    } else {
      return false
    }
  }
}
// ================================================================

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
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )

    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }
}

// ================================================================
// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-index',

    data: {
      list: Product.getList(),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/alert', function (req, res) {
  // res.render генерує нам HTML сторінку

  const list2 = Product.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',

    data: {
 3-purchase
      message: 'Операція успішна',
      info: 'Товар створений',
      link: '/test-path',

    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-product', function (req, res) {
  const id = Number(req.query.id)
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-product', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-product',

    data: {
      list: Product.getRandomList(id),
      product: Product.getById(id),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-create', function (req, res) {
  const id = Number(req.query.id)
  const amount = Number(req.body.amount)

  console.log(id, amount)
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-product', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-product',

    data: {
      list: Product.getRandomList(id),
      product: Product.getById(id),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/purchase-create', function (req, res) {
  const id = Number(req.query.id)
  const amount = Number(req.body.amount)

  if (amount < 1) {
    return res.render('alert', {
      style: 'alert',
      title: 'Помилка вводу',
      info: 'Некоректна кількість товару',
      href: `/purchase-product?id=${id}`,
    })
  }

  const product = Product.getById(id)

  if (product.amount < amount) {
    return res.render('alert', {
      style: 'alert',
      title: 'Помилка вводу',
      info: 'Такої кількості товару немає в наявності',
      href: `/purchase-product?id=${id}`,
    })
  }

  console.log(product, amount)

  const productPrice = product.price * amount
  const totalPrice = productPrice + Purchase.DELIVERY_PRICE
  const bonus = Purchase.calcBonusAmount(totalPrice)
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-create',

    data: {
      //   title: 'Ваше замовлення',
      //   subtitle: 'Оформлення замовлення',
      id: product.id,

      cart: [
        {
          text: `${product.title}(${amount} шт)`,
          price: productPrice,
        },
        {
          text: `Доставка`,
          price: Purchase.DELIVERY_PRICE,
        },
      ],
      totalPrice,
      productPrice,
      amount,
      deliveryPrice: Purchase.DELIVERY_PRICE,
      bonus,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/purchase-submit', function (req, res) {
  const id = Number(req.query.id)

  let {
    totalPrice,
    productPrice,
    deliveryPrice,
    amount,

    firstname,
    lastname,
    email,
    phone,
    comment,

    promocode,
    bonus,
  } = req.body

  console.log(req.body, 'це обєкт')

  const product = Product.getById(id)

  if (!product) {
    return res.render('alert', {
      style: 'alert',
      title: 'Помилка',
      info: 'Товар не знайдено',
      href: `/purchase-list`,
    })
  }

  if (product.amount < amount) {
    return res.render('alert', {
      style: 'alert',
      title: 'Помилка',
      info: 'Товару немає в потрібній кількості',
      href: `/purchase-list`,
    })
  }

  totalPrice = Number(totalPrice)
  productPrice = Number(productPrice)
  deliveryPrice = Number(deliveryPrice)
  amount = Number(amount)
  bonus = Number(bonus)

  //   console.log(
  //     'ціни',
  //     totalPrice,
  //     productPrice,
  //     deliveryPrice,
  //     amount,
  //   )

  if (
    isNaN(totalPrice) ||
    isNaN(productPrice) ||
    isNaN(deliveryPrice) ||
    isNaN(amount) ||
    isNaN(bonus)
  ) {
    return res.render('alert', {
      style: 'alert',
      title: 'Помилка',
      info: 'Некоректні дані',
      href: `/purchase-list`,
    })
  }

  if (!firstname || !lastname || !phone || !email) {
    return res.render('alert', {
      style: 'alert',
      title: "Заповніть обов'язкові поля",
      info: 'Некоректні дані',
      href: `/purchase-list`,
    })
  }

  if (bonus || bonus > 0) {
    const bonusAmount = Purchase.getBonusBalance(email)

    console.log(bonusAmount)

    if (bonus > bonusAmount) {
      bonus = bonusAmount
    }

    Purchase.updateBonusBalance(email, totalPrice, bonus)

    totalPrice -= bonus
  } else {
    Purchase.updateBonusBalance(email, totalPrice, 0)
  }

  if (promocode) {
    promocode = Promocode.getByName(promocode)
    if (promocode) {
      totalPrice = Promocode.calc(promocode, totalPrice)
    }
  }

  if (totalPrice < 0) totalPrice = 0

  const purchase = Purchase.add(
    {
      totalPrice,
      productPrice,
      deliveryPrice,
      amount,

      firstname,
      lastname,
      email,
      phone,
      comment,

      promocode,
      bonus,
    },
    product,
  )

  console.log(purchase, '1111111111111111111')

  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',

    title: 'Успішно',
    info: 'Замовлення створено',
    href: `/purchase-list`,
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// ================================================================
router.get('/purchase-list', function (req, res) {
  const list = Purchase.getList()

  // console.log('=========>', list)

  res.render('purchase-list', {
    style: 'purchase-list',
    data: {
      list: list,
    },
  })
})

// ================================================================
router.post('/purchase-list', function (req, res) {
  const id = Number(req.query.id)
  const list = Purchase.getById(id)

  // console.log('=========>', list, id)

  res.render('purchase-info', {
    style: 'purchase-info',
    data: {
      list: list,
    },
  })
})

// ================================================================
router.post('/purshase-edit', function (req, res) {
  const id = Number(req.query.id)
  const list = Purchase.getById(id)

  res.render('purchase-edit', {
    style: 'purchase-edit',
    data: {
      list: list,
    },
  })
})

// ================================================================
router.post('/purshase-success', function (req, res) {
  const id = Number(req.query.id)
  const list = req.body

  const data = Purchase.updateByID(id, list)

  if (
    list.firstname.length < 1 ||
    list.lastname.length < 1 ||
    list.email.length < 1 ||
    list.phone.length < 1
  ) {
    return res.render('alert', {
      style: 'alert',
      title: 'Помилка',
      info: 'Поля не повинні бути пустими',
      href: `/purchase-list`,
    })
  }

  if (!data) {
    return res.render('alert', {
      style: 'alert',
      title: 'Помилка',
      info: 'Не вдалося відредагувати данні',
      href: `/purchase-list`,
    })
  }

  res.render('alert', {
    style: 'alert',
    title: 'Успішне виконання дії',
    info: 'Данні відредаговано',
    href: `/purchase-list`,
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
      info: 'Товар ваш не знайдено',
      product: null,
    })
  }
})

// ================================================================
router.post('/product-delete', function (req, res) {
  const { id } = req.body
  const productId = Number(id)
  const product = Product.getById(productId)

  if (product !== undefined) {
    Product.deleteById(productId)
    res.render('success-info', {
      style: 'success-info',
      info: 'Товар видалено',
      product: null,
    })
  } else {
    res.render('success-info', {
      style: 'success-info',
      info: 'Товар не знайдено',
      product: null,
    })
  }
})

router.get('/product-delete', function (req, res) {
  const { id } = req.query
  const productId = Number(id)
  const product = Product.getById(productId)

  if (product !== undefined) {
    Product.deleteById(productId)
    res.redirect('/') // Перенаправлення на головну сторінку або на бажану сторінку після видалення
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
