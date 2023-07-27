let { createApp } = Vue

const options = {
    data() {
        return {
            showModal: false,
            formData: {
                name: '',
            },
            products: [],
            cartItems: [],
            isCartOpen: false,
            isPurchased: false,
        }
    },
    created() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (cartItems) {
            this.cartItems = cartItems;
        }
        fetch('https://mindhub-xj03.onrender.com/api/petshop')
            .then(response => response.json())
            .then(data => {
                this.products = datos;
                this.cartItems = [];

                let storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
                if (storedCartItems) {
                    this.cartItems = storedCartItems;
                }
            })
            .catch(error => console.log(error))


        computed:{
            totalPrice() {
                return this.cartItems.reduce(
                  (total, item) => total + item.precio * item.quantity,
                  0
                );
              },
        },

       

    methods: {
        validateForm() {
            let email = document.getElementById('exampleInputEmail1').value;

            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Ingrese una dirección de correo Válida");
                return;
            }

            this.showModal = true;
        },

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
=======

};

const app = createApp(options)

app.mount('#app')