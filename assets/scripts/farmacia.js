console.log("hola")
const { createApp } = Vue

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
            pharmacyItems: [],
            cartItems: [],
            isCartOpen: false,
        }
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
            .then(datos => datos.json())
            .then(datos => {
                this.items = datos
                this.itemsFarmacia = this.items.filter(item => item.categoria == "farmacia")
                console.log(this.itemsFarmacia)
                console.log(this.radios);
                this.menorMayor = [... this.itemsFarmacia].sort((a, b) => a.precio - b.precio)
                console.log(this.mayorMenor);
                this.mayorMenor = [... this.itemsFarmacia].sort((a, b) => b.precio - a.precio)
                console.log(this.menorMayor);
                this.cartItems = [];
                let pharmacy = datos.map(product => product.categoria == "farmacia")
                console.log(pharmacy)
                this.products = datos
                this.cartItems = [];
                console.log(this.products)
                console.log(this.isCartOpen);
            })
            .catch(error => console.error("F"))
    },
    computed: {
        filtrarBusqueda() {
            if (this.radios == "todo") {
                this.itemsFiltrados = this.search.length > 0 ?
                    this.itemsFarmacia.filter(item => item.producto.toLowerCase().includes(this.search.toLowerCase())) :
                    this.itemsFarmacia = this.items.filter(item => item.categoria == "farmacia")
            } if (this.radios == "mayor") {
                this.itemsFiltrados =
                    this.mayorMenor.filter(item => item.producto.toLowerCase().includes(this.search.toLowerCase()))
            } if (this.radios == "menor") {
                this.itemsFiltrados =
                    this.menorMayor.filter(item => item.producto.toLowerCase().includes(this.search.toLowerCase()))
            }

            console.log(this.itemsFiltrados);
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
    }
})


farmacia.mount("#main")
