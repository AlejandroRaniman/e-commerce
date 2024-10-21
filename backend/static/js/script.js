// Configuración del gráfico de línea
const lineCtx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        datasets: [{
            label: '订单',
            data: [100, 150, 120, 180, 200, 150, 100, 170, 180, 190, 140, 160],
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false
        }, {
            label: '余额',
            data: [90, 130, 110, 170, 190, 130, 90, 150, 160, 180, 120, 140],
            borderColor: 'rgba(153, 102, 255, 1)',
            fill: false
        }]
    }
});

// Configuración del gráfico de pastel
const pieCtx = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
        labels: ['Category A', 'Category B', 'Category C'],
        datasets: [{
            data: [30, 45, 25],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    }
});
