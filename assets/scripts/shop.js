let { createApp } = Vue

const options = {
    data() {
        return {
            products: [],
            pharmacyItems: [],
            cartItems: [],
            isCartOpen: false,
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/petshop')
            .then(response => response.json())
            .then(data => {
                this.cartItems = [];
                let pharmacy = data.map(product => product.categoria == "farmacia")
                console.log(pharmacy)
                this.products = data
                this.cartItems = "",
                    console.log(this.products)
            })
            .catch(error => console.log(error))

    },
    methods: {
        addToCart(product) {
            this.cartItems = [...this.cartItems, product];
            console.log('Cart Items:', this.cartItems);
        },

        toggleCart() {
            this.isCartOpen = !this.isCartOpen;
            console.log('isCartOpen:', this.isCartOpen);
        }

    },
    computed: {

    }

}

const app = createApp(options)

app.mount('#app')