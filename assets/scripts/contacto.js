let { createApp } = Vue

const options = {
    data(){
        return {
            showModal: false,
            formData: {
                name: '',
            }            
        }},
        created(){

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
        }

    }
};

const app = createApp( options )

app.mount( '#app' )