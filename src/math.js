const calculateTip = (total,tipPercent=.25)=>{
    const tip = total*tipPercent
    return total+tip

}
const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
}
const add = (a,b)=>{
    return new Promise((resolve,rejec)=>{
        setTimeout(()=>{
            resolve(a+b)

        },2000)
    })
}



module.exports = {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add
}