
const canvas = document.getElementById('myChart');

var ctx = canvas.getContext('2d');

let weights = canvas.dataset.weights.split(",").map(params => parseInt(params))
let months = canvas.dataset.months.split(",")
let days = canvas.dataset.days.split(",").map(params => parseInt(params))

let monthsAndDays = [];
let weightDefault = [];

if(days[0]){
    for (let index = 0; index < months.length; index++) {
        monthsAndDays.push(`${days[index]}/${months[index]}`)
        weightDefault.push(weights[index])
    }
} else {
    monthsAndDays.push('Inicio')
    weightDefault.push(0)
}


console.log(weights)
console.log(canvas.dataset.months)
console.log(months)

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: monthsAndDays,
        datasets: [{
            label: 'Mi peso',
            data: weightDefault,
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
            }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
