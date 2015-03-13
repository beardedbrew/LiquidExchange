`var products = [
  {
    "name": "Budlight",
    "price": 2.50,
    "priceFloor": 2.50,
    "status": "neutral",
    "logo": "http://emwgradstudent.files.wordpress.com/2012/07/budweiser-bowtie-logo.png"
  },
  {
    "name": "Fat Tire",
    "price": 4.50,
    "priceFloor": 2.50,
    "status": "neutral",
    "logo": "http://beerstreetjournal.com/wp-content/uploads/New-Belgium-Brewing-Logo8.gif"
  },
  {
    "name": "Easy Street Wheet",
    "price": 4.50,
    "priceFloor": 2.20,
    "status": "neutral",
    "logo": "http://upload.wikimedia.org/wikipedia/en/3/33/Odell_Brewing_Company_logo.png"
  },
  {
    "name": "Yeti Stout",
    "price": 4.75,
    "priceFloor": 2.75,
    "status": "neutral",
    "logo": "http://ciceroschatter.files.wordpress.com/2011/04/great-divide-logo.png"
  },
  {
    "name": "Hazed Hoppy Session Ale",
    "price": 4.00,
    "priceFloor": 3.50,
    "status": "neutral",
    "logo": "http://beerpulse.com/wp-content/uploads/2011/11/boulder-beer-co.jpg"
  }
];`

Product = (data) ->
  self = this
  self.name = ko.observable(data.name)
  self.price = ko.observable(data.price)
  self.priceFloor = ko.observable(data.priceFloor)
  self.status = ko.observable(data.status)
  self.logo = ko.observable(data.logo)
  self.lastUpdate = ko.observable(moment.utc().format('ddd MMM DD YYYY HH:mm:ss z'))

  self.buy = ->
    self.price self.price() + 0.05
    self.status 'up'
    return

  this

AppViewModel = ->
  self = this
  self.products = ko.observableArray()
  self.purchases = ko.observableArray()

  self.load = ->
    _.each products, (data) ->
      self.products.push new Product(data, parent)
      return
    self.sortProducts()
    self.changePrices()
    return

  self.changePrices = ->
    setInterval (->
      _.each self.products(), (data) ->
        if data.status() == 'up' and moment().diff(data.lastUpdate(), 'seconds') > 25
          self.lowerPrice data, 0.01
        if data.status() == 'down' or data.status() == 'neutral'
          self.lowerPrice data, 0.01
        return
      self.sortProducts()
      return
    ), 5000
    return

  self.lowerPrice = (product, change) ->
    if product.price().toFixed(2) > product.priceFloor()
      product.price math.subtract(product.price(), change)
      product.lastUpdate moment.utc().format('ddd MMM DD YYYY HH:mm:ss z')
      product.status 'down'
    return

  self.sortProducts = ->
    self.products.sort (l, r) ->
      if l.price() < r.price() then 1 else -1
    return

  return

appViewModel = new AppViewModel
ko.applyBindings appViewModel
appViewModel.load()