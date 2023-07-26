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
            itemsFarmacia: undefined
        }
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
            .then(datos => datos.json())
            .then(datos => {
                const items = datos
                this.itemsFarmacia = items.filter(item => item.categoria == "farmacia")
                console.log(this.itemsFarmacia)
            })
            .catch(error => console.error("F"))
    }
})

farmacia.mount("#main")
