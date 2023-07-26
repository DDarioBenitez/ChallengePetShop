let { createApp } = Vue

const options = {
    data(){
        return {
            showModal: false,
            formData: {
                name: '',
            },
            products: [],
            cartItems: [],
            isCartOpen: false,           
        }},
        created(){
            const cartItems = JSON.parse(localStorage.getItem('cartItems'));
            if (cartItems) {
            this.cartItems = cartItems;
        }
            fetch('https://mindhub-xj03.onrender.com/api/petshop')
            .then(response => response.json())
            .then(data => {
                
                let storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
                    if (storedCartItems) {
                        this.cartItems = storedCartItems;
                    }
            })
            .catch(error => console.log(error))

        

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


    }
};

const app = createApp( options )

app.mount( '#app' )