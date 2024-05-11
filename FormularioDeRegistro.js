document.getElementById('formularioRegistro').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    var valores = formData.entries();
    valores.forEach(element => {
        console.log(element)
    });
})