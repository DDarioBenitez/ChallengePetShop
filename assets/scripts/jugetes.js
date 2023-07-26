let { createApp } = Vue

const options = {
    data() {
        return {
            products: [],
            juguetesItems: [],
            cartItems: [],
            isCartOpen: false,
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/petshop')
            .then(response => response.json())
            .then(data => {
                this.products = data
                this.cartItems = [];
                this.juguetesItems = products.filter(item => item.categoria == "juguetes")
                let pharmacy = data.map(product => product.categoria == "juguetes")
                this.cartItems = "",
                    console.log(this.juguetesItems)
            })
            .catch(error => console.log(error))

    },
    methods: {
        addToCart(product) {
            this.cartItems = [...this.cartItems, product];
            // console.log('Cart Items:', this.cartItems);
        },

        toggleCart() {
            this.isCartOpen = !this.isCartOpen;
            // console.log('isCartOpen:', this.isCartOpen);
        }

    },
    computed: {

    }

}

const app = createApp(options)

app.mount('#app')
