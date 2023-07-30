// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []

  static #count = 0

  constructor(img, title, description, category, price) {
    this.id = ++Product.#count // Генеруємо унікальний id для товару
    this.img = img
    this.title = title
    this.description = description
    this.category = category
    this.price = price
  }

  static add = (
    img,
    title,
    description,
    category,
    price,
  ) => {
    const newProduct = new Product(
      img,
      title,
      description,
      category,
      price,
    )
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
)

Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/`,
  `SMD Ryzen 5 3600 (3.6-4.2 ГГц) / RAM 16 ГБ / HDD 1ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8ГБ / без ОД / LAN / без ОС`,
  [{ id: 1, text: `` }],
  20000,
)

Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютер IBM Gaming (X43v31) AMD Ryzen 5 3600/`,
  `DMD Ryzen 5 3600 (3.6-4.2 ГГц) / RAM 16 ГБ / HDD 1ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8ГБ / без ОД / LAN / без ОС`,
  [{ id: 2, text: `Топ продажів` }],
  28000,
)

Product.add(
  'https://picsum.photos/200/300',
  `2Комп'ютер IBM Gaming (X43v31) AMD Ryzen 5 3600/`,
  `DMD Ryzen 5 3600 (3.6-4.2 ГГц) / RAM 16 ГБ / HDD 1ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8ГБ / без ОД / LAN / без ОС`,
  [{ id: 2, text: `Топ продажів` }],
  28000,
)

Product.add(
  'https://picsum.photos/200/300',
  `3Комп'ютер IBM Gaming (X43v31) AMD Ryzen 5 3600/`,
  `DMD Ryzen 5 3600 (3.6-4.2 ГГц) / RAM 16 ГБ / HDD 1ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8ГБ / без ОД / LAN / без ОС`,
  [{ id: 2, text: `Топ продажів` }],
  28000,
)

Product.add(
  'https://picsum.photos/200/300',
  `4Комп'ютер IBM Gaming (X43v31) AMD Ryzen 5 3600/`,
  `DMD Ryzen 5 3600 (3.6-4.2 ГГц) / RAM 16 ГБ / HDD 1ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8ГБ / без ОД / LAN / без ОС`,
  [{ id: 2, text: `Топ продажів` }],
  28000,
)
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

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',

    data: {
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
  const amaunt = Number(req.body.amaunt)

  console.log(id, amaunt)
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

// Підключаємо роутер до бек-енду
module.exports = router
