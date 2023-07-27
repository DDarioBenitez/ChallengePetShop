console.log("hola");
const { createApp } = Vue;

let farmacia = createApp({
  data() {
    return {
      items: [],
      categoria: ["Farmacia", "Jugueteria"],
      id: undefined,
      itemsFarmacia: undefined,
      radios: "todo",
      search: "",
      mayorMenor: [],
      menorMayor: [],
      itemsFiltrados: [],
      aux: undefined,

      products: [],
      cartItems: [],
      isCartOpen: false,
      isPurchased: false,
    }
  },
  created() {
    fetch("https://mindhub-xj03.onrender.com/api/petshop")
      .then((datos) => datos.json())
      .then((datos) => {
        this.items = datos;
        this.itemsFarmacia = this.items.filter(
          (item) => item.categoria == "farmacia"
        );
        console.log(this.itemsFarmacia);
        console.log(this.radios);
        this.menorMayor = [...this.itemsFarmacia].sort(
          (a, b) => a.precio - b.precio
        );
        console.log(this.mayorMenor);
        this.mayorMenor = [...this.itemsFarmacia].sort(
          (a, b) => b.precio - a.precio
        );
        console.log(this.menorMayor);


        this.products = datos;
        this.cartItems = [];

      })
      .catch((error) => console.error("F"));

    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems) {
      this.cartItems = cartItems;
    }
  },
  computed: {
    tem() {
      this.bDark == true ? this.tema = 'card col-11 col-lg-3 col-md-4 position-relative align-self-center align-self-lg-stretch boxShadow text-light bg-dark' : this.tema = 'card col-11 col-lg-3 col-md-4 position-relative align-self-center align-self-lg-stretch boxShadow card-tema'
    },
    filtrarBusqueda() {
      if (this.radios == "todo") {
        this.itemsFiltrados =
          this.search.length > 0
            ? this.itemsFarmacia.filter((item) =>
              item.producto.toLowerCase().includes(this.search.toLowerCase())
            )
            : (this.itemsFarmacia = this.items.filter(
              (item) => item.categoria == "farmacia"
            ));
      }
      if (this.radios == "mayor") {
        this.itemsFiltrados = this.mayorMenor.filter((item) =>
          item.producto.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      if (this.radios == "menor") {
        this.itemsFiltrados = this.menorMayor.filter((item) =>
          item.producto.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      console.log(this.bDark);
      console.log(this.itemsFiltrados);
    },

    totalPrice() {
      console.log(this.aux);
      return this.cartItems.reduce(
        (total, item) => total + item.precio * item.quantity,
        0
      );
    },
  },

  methods: {

    addToCart(product) {
      const productIndex = this.products.findIndex(item => item._id === product._id);
      if (productIndex !== -1) {
        const selectedProduct = this.products[productIndex];
        if (selectedProduct.disponibles >= 1) {
          const cartItemIndex = this.cartItems.findIndex(item => item._id === product._id);
          if (cartItemIndex !== -1) {
            this.cartItems[cartItemIndex].quantity++;
          } else {
            this.cartItems.push({ ...selectedProduct, quantity: 1 });
          }
          selectedProduct.disponibles--;
        } else {
          alert("Lo sentimos, El Producto ya está agotado.");
        }
      }
      this.storeCartItems();
    },

    removeFromCart(product) {
      const productIndex = this.products.findIndex(item => item._id === product._id);
      if (productIndex !== -1) {
        const selectedProduct = this.products[productIndex];
        const cartItemIndex = this.cartItems.findIndex(item => item._id === product._id);
        if (cartItemIndex !== -1) {
          if (this.cartItems[cartItemIndex].quantity > 1) {
            this.cartItems[cartItemIndex].quantity--;
          } else {
            this.cartItems.splice(cartItemIndex, 1);
          }
          selectedProduct.disponibles++;
        }
      }
      this.storeCartItems();
    },


    clearCart() {
      this.cartItems.forEach(item => {
        const productIndex = this.products.findIndex(p => p._id === item._id);
        if (productIndex !== -1) {
          this.products[productIndex].disponibles += item.quantity;
        }
      });
      this.cartItems = [];
      this.storeCartItems();
    },

    updateStock() {
      this.cartItems.forEach((item) => {
        const productIndex = this.products.findIndex(
          (p) => p._id === item._id
        );
        if (productIndex !== -1) {
          this.products[productIndex].disponibles -= item.quantity;
        }
      });
    },

    storeCartItems() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },

    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
      console.log('isCartOpen:', this.isCartOpen);

    },
    buyItems() {
      this.updateStock();
      this.clearCart();
      this.isPurchased = true;
    },
    buyAgain() {
      this.isPurchased = false;
      this.clearCart();
    },
  },
})

farmacia.mount("#main");
