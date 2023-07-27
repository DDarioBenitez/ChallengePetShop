console.log("hola");
const { createApp } = Vue;

let farmacia = createApp({
  data() {
    return {
      items: [],
      nombre: undefined,
      categoria: ["Farmacia", "Jugueteria"],
      id: undefined,
      precio: undefined,
      stock: undefined,
      descripcion: undefined,
      itemsFarmacia: undefined,
      radios: "todo",
      search: "",
      mayorMenor: [],
      menorMayor: [],
      itemsFiltrados: [],

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
          (item) => item.categoria == "jugueteria"
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

    this.cartItems = JSON.parse(localStorage.getItem("agregados"));
  },
  computed: {
    filtrarBusqueda() {
      if (this.radios == "todo") {
        this.itemsFiltrados =
          this.search.length > 0
            ? this.itemsFarmacia.filter((item) =>
              item.producto.toLowerCase().includes(this.search.toLowerCase())
            )
            : (this.itemsFarmacia = this.items.filter(
              (item) => item.categoria == "jugueteria"
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

      console.log(this.itemsFiltrados);
    },

    totalPrice() {
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
        localStorage.setItem('agregados', JSON.stringify(this.products) )
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
    storeCartItems() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },

    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
      console.log('isCartOpen:', this.isCartOpen);

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

    buyItems() {
      this.updateStock();
      this.clearCart();
      this.isPurchased = true;
    },

    buyAgain() {
      this.isPurchased = false;      
      this.isPurchased = false;
    },


  },

  

})

farmacia.mount("#main");
