var products = [
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
];;
var AppViewModel, Product, appViewModel;

Product = function(data) {
  var self;
  self = this;
  self.name = ko.observable(data.name);
  self.price = ko.observable(data.price);
  self.priceFloor = ko.observable(data.priceFloor);
  self.status = ko.observable(data.status);
  self.logo = ko.observable(data.logo);
  self.lastUpdate = ko.observable(moment.utc().format('ddd MMM DD YYYY HH:mm:ss z'));
  self.buy = function() {
    self.price(self.price() + 0.05);
    self.status('up');
  };
  return this;
};

AppViewModel = function() {
  var self;
  self = this;
  self.products = ko.observableArray();
  self.purchases = ko.observableArray();
  self.load = function() {
    _.each(products, function(data) {
      self.products.push(new Product(data, parent));
    });
    self.sortProducts();
    self.changePrices();
  };
  self.changePrices = function() {
    setInterval((function() {
      _.each(self.products(), function(data) {
        if (data.status() === 'up' && moment().diff(data.lastUpdate(), 'seconds') > 25) {
          self.lowerPrice(data, 0.01);
        }
        if (data.status() === 'down' || data.status() === 'neutral') {
          self.lowerPrice(data, 0.01);
        }
      });
      self.sortProducts();
    }), 5000);
  };
  self.lowerPrice = function(product, change) {
    if (product.price().toFixed(2) > product.priceFloor()) {
      product.price(math.subtract(product.price(), change));
      product.lastUpdate(moment.utc().format('ddd MMM DD YYYY HH:mm:ss z'));
      product.status('down');
    }
  };
  self.sortProducts = function() {
    self.products.sort(function(l, r) {
      if (l.price() < r.price()) {
        return 1;
      } else {
        return -1;
      }
    });
  };
};

appViewModel = new AppViewModel;

ko.applyBindings(appViewModel);

appViewModel.load();

//# sourceMappingURL=data:application/json;base64,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O0VBQUEsQ0FoQ3BCLENBRGE7QUFBQSxDQXREZixDQUFBOztBQUFBLFlBOEZBLEdBQWUsR0FBQSxDQUFBLFlBOUZmLENBQUE7O0FBQUEsRUErRkUsQ0FBQyxhQUFILENBQWlCLFlBQWpCLENBL0ZBLENBQUE7O0FBQUEsWUFnR1ksQ0FBQyxJQUFiLENBQUEsQ0FoR0EsQ0FBQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJgdmFyIHByb2R1Y3RzID0gW1xuICB7XG4gICAgXCJuYW1lXCI6IFwiQnVkbGlnaHRcIixcbiAgICBcInByaWNlXCI6IDIuNTAsXG4gICAgXCJwcmljZUZsb29yXCI6IDIuNTAsXG4gICAgXCJzdGF0dXNcIjogXCJuZXV0cmFsXCIsXG4gICAgXCJsb2dvXCI6IFwiaHR0cDovL2Vtd2dyYWRzdHVkZW50LmZpbGVzLndvcmRwcmVzcy5jb20vMjAxMi8wNy9idWR3ZWlzZXItYm93dGllLWxvZ28ucG5nXCJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkZhdCBUaXJlXCIsXG4gICAgXCJwcmljZVwiOiA0LjUwLFxuICAgIFwicHJpY2VGbG9vclwiOiAyLjUwLFxuICAgIFwic3RhdHVzXCI6IFwibmV1dHJhbFwiLFxuICAgIFwibG9nb1wiOiBcImh0dHA6Ly9iZWVyc3RyZWV0am91cm5hbC5jb20vd3AtY29udGVudC91cGxvYWRzL05ldy1CZWxnaXVtLUJyZXdpbmctTG9nbzguZ2lmXCJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkVhc3kgU3RyZWV0IFdoZWV0XCIsXG4gICAgXCJwcmljZVwiOiA0LjUwLFxuICAgIFwicHJpY2VGbG9vclwiOiAyLjIwLFxuICAgIFwic3RhdHVzXCI6IFwibmV1dHJhbFwiLFxuICAgIFwibG9nb1wiOiBcImh0dHA6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvZW4vMy8zMy9PZGVsbF9CcmV3aW5nX0NvbXBhbnlfbG9nby5wbmdcIlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiWWV0aSBTdG91dFwiLFxuICAgIFwicHJpY2VcIjogNC43NSxcbiAgICBcInByaWNlRmxvb3JcIjogMi43NSxcbiAgICBcInN0YXR1c1wiOiBcIm5ldXRyYWxcIixcbiAgICBcImxvZ29cIjogXCJodHRwOi8vY2ljZXJvc2NoYXR0ZXIuZmlsZXMud29yZHByZXNzLmNvbS8yMDExLzA0L2dyZWF0LWRpdmlkZS1sb2dvLnBuZ1wiXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJIYXplZCBIb3BweSBTZXNzaW9uIEFsZVwiLFxuICAgIFwicHJpY2VcIjogNC4wMCxcbiAgICBcInByaWNlRmxvb3JcIjogMy41MCxcbiAgICBcInN0YXR1c1wiOiBcIm5ldXRyYWxcIixcbiAgICBcImxvZ29cIjogXCJodHRwOi8vYmVlcnB1bHNlLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxMS8xMS9ib3VsZGVyLWJlZXItY28uanBnXCJcbiAgfVxuXTtgXG5cblByb2R1Y3QgPSAoZGF0YSkgLT5cbiAgc2VsZiA9IHRoaXNcbiAgc2VsZi5uYW1lID0ga28ub2JzZXJ2YWJsZShkYXRhLm5hbWUpXG4gIHNlbGYucHJpY2UgPSBrby5vYnNlcnZhYmxlKGRhdGEucHJpY2UpXG4gIHNlbGYucHJpY2VGbG9vciA9IGtvLm9ic2VydmFibGUoZGF0YS5wcmljZUZsb29yKVxuICBzZWxmLnN0YXR1cyA9IGtvLm9ic2VydmFibGUoZGF0YS5zdGF0dXMpXG4gIHNlbGYubG9nbyA9IGtvLm9ic2VydmFibGUoZGF0YS5sb2dvKVxuICBzZWxmLmxhc3RVcGRhdGUgPSBrby5vYnNlcnZhYmxlKG1vbWVudC51dGMoKS5mb3JtYXQoJ2RkZCBNTU0gREQgWVlZWSBISDptbTpzcyB6JykpXG5cbiAgc2VsZi5idXkgPSAtPlxuICAgIHNlbGYucHJpY2Ugc2VsZi5wcmljZSgpICsgMC4wNVxuICAgIHNlbGYuc3RhdHVzICd1cCdcbiAgICByZXR1cm5cblxuICB0aGlzXG5cbkFwcFZpZXdNb2RlbCA9IC0+XG4gIHNlbGYgPSB0aGlzXG4gIHNlbGYucHJvZHVjdHMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKVxuICBzZWxmLnB1cmNoYXNlcyA9IGtvLm9ic2VydmFibGVBcnJheSgpXG5cbiAgc2VsZi5sb2FkID0gLT5cbiAgICBfLmVhY2ggcHJvZHVjdHMsIChkYXRhKSAtPlxuICAgICAgc2VsZi5wcm9kdWN0cy5wdXNoIG5ldyBQcm9kdWN0KGRhdGEsIHBhcmVudClcbiAgICAgIHJldHVyblxuICAgIHNlbGYuc29ydFByb2R1Y3RzKClcbiAgICBzZWxmLmNoYW5nZVByaWNlcygpXG4gICAgcmV0dXJuXG5cbiAgc2VsZi5jaGFuZ2VQcmljZXMgPSAtPlxuICAgIHNldEludGVydmFsICgtPlxuICAgICAgXy5lYWNoIHNlbGYucHJvZHVjdHMoKSwgKGRhdGEpIC0+XG4gICAgICAgIGlmIGRhdGEuc3RhdHVzKCkgPT0gJ3VwJyBhbmQgbW9tZW50KCkuZGlmZihkYXRhLmxhc3RVcGRhdGUoKSwgJ3NlY29uZHMnKSA+IDI1XG4gICAgICAgICAgc2VsZi5sb3dlclByaWNlIGRhdGEsIDAuMDFcbiAgICAgICAgaWYgZGF0YS5zdGF0dXMoKSA9PSAnZG93bicgb3IgZGF0YS5zdGF0dXMoKSA9PSAnbmV1dHJhbCdcbiAgICAgICAgICBzZWxmLmxvd2VyUHJpY2UgZGF0YSwgMC4wMVxuICAgICAgICByZXR1cm5cbiAgICAgIHNlbGYuc29ydFByb2R1Y3RzKClcbiAgICAgIHJldHVyblxuICAgICksIDUwMDBcbiAgICByZXR1cm5cblxuICBzZWxmLmxvd2VyUHJpY2UgPSAocHJvZHVjdCwgY2hhbmdlKSAtPlxuICAgIGlmIHByb2R1Y3QucHJpY2UoKS50b0ZpeGVkKDIpID4gcHJvZHVjdC5wcmljZUZsb29yKClcbiAgICAgIHByb2R1Y3QucHJpY2UgbWF0aC5zdWJ0cmFjdChwcm9kdWN0LnByaWNlKCksIGNoYW5nZSlcbiAgICAgIHByb2R1Y3QubGFzdFVwZGF0ZSBtb21lbnQudXRjKCkuZm9ybWF0KCdkZGQgTU1NIEREIFlZWVkgSEg6bW06c3MgeicpXG4gICAgICBwcm9kdWN0LnN0YXR1cyAnZG93bidcbiAgICByZXR1cm5cblxuICBzZWxmLnNvcnRQcm9kdWN0cyA9IC0+XG4gICAgc2VsZi5wcm9kdWN0cy5zb3J0IChsLCByKSAtPlxuICAgICAgaWYgbC5wcmljZSgpIDwgci5wcmljZSgpIHRoZW4gMSBlbHNlIC0xXG4gICAgcmV0dXJuXG5cbiAgcmV0dXJuXG5cbmFwcFZpZXdNb2RlbCA9IG5ldyBBcHBWaWV3TW9kZWxcbmtvLmFwcGx5QmluZGluZ3MgYXBwVmlld01vZGVsXG5hcHBWaWV3TW9kZWwubG9hZCgpIl19