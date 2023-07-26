console.log("hola")
const { createApp } = Vue

let farmacia = createApp({
    data() {
        return {
            nombre: undefined,
            categoria: ["Farmacia", "Jugueteria"],
            id: undefined,
            precio: undefined,
            stock: undefined,
            descripcion: undefined,
            itemsFarmacia: undefined,

            products: [],
            pharmacyItems: [],
            cartItems: [],
            isCartOpen: false,
        }
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
            .then(datos => datos.json())
            .then(datos => {
                const items = datos
                this.itemsFarmacia = items.filter(item => item.categoria == "farmacia")
                console.log(this.itemsFarmacia)


                this.cartItems = [];
                let pharmacy = datos.map(product => product.categoria == "farmacia")
                console.log(pharmacy)
                this.products = datos
                this.cartItems = "",
                console.log(this.products)
            })
            .catch(error => console.error("F"))
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
})

farmacia.mount("#main")
