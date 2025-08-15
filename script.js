let key = "7feecdef9797d7c896920773aa5417ad"

function colocarNaTela(dados){
    console.log(dados)
    document.querySelector(".title-weather").innerHTML = "Previsão do tempo em " + dados.name
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C"
    document.querySelector(".descricao").innerHTML = dados.weather[0].description
    document.querySelector(".weather-icon").src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + "@2x.png"
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%"
}

async function buscarCidade(cidade){
    try {
        if (!cidade || cidade.trim() === "") {
            alert("Por favor, digite o nome de uma cidade!")
            return
        }

        let dados = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + 
            encodeURIComponent(cidade) + 
            "&appid=" + 
            key + 
            "&lang=pt_br" +
            "&units=metric"
        )
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`)
            }
            return resposta.json()
        })
        
        colocarNaTela(dados)
    } catch (erro) {
        console.error("Erro ao buscar cidade:", erro)
        alert("Erro ao buscar cidade. Verifique se o nome está correto e tente novamente.")
    }
}

function clickButton(){
    let cidade = document.querySelector(".input-cidade").value
    buscarCidade(cidade)
}