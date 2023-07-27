let { createApp } = Vue

const options = {
    data() {
        return {
            products: [],
            cartItems: [],
            isCartOpen: false,
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/petshop')
            .then(response => response.json())
            .then(data => {
                this.products = data
                this.cartItems = [],
                    console.log(this.cartItems)
            })
            .catch(error => console.log(error))

        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (cartItems) {
            this.cartItems = cartItems;
        }

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
                    alert("This product is not available.");
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

        storeCartItems() {
            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        },

        toggleCart() {
            this.isCartOpen = !this.isCartOpen;
            console.log('isCartOpen:', this.isCartOpen);
        },

    },
    computed: {

    }

}

const app = createApp(options)

app.mount('#app')