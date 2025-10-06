const data = {
    categorical: {
        labels: ['Elektronik', 'Pakaian', 'Makanan', 'Buku', 'Olahraga'],
        values: [120, 85, 75, 50, 40],
        colors: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff']
    },
    temporal: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        values: [65, 59, 80, 81, 56, 55],
        color: '#ff6384'
    },
    comparison: {
        labels: ['Jabodetabek', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur'],
        values: [180, 125, 110, 95],
        colors: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0']
    },
    sales_over_years: {
        labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        values: [150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250],
        color: '#4bc0c0'
    },
    top_products: {
        labels: ['Laptop', 'Smartphone', 'Tablet', 'Headphone', 'Smartwatch'],
        values: [300, 250, 200, 150, 100],
        colors: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff']
    }
};

const analysis = {
    categorical: {
        executive: "Bar chart cocok untuk audiens eksekutif yang perlu melihat perbandingan antar kategori secara cepat dan jelas.",
        technical: "Dot plot mungkin lebih tepat untuk analis yang membutuhkan presisi dalam membandingkan nilai antar kategori.",
        general: "Bar chart mudah dipahami oleh audiens umum dan efektif menunjukkan perbandingan antar kategori."
    },
    temporal: {
        executive: "Line chart ideal untuk menunjukkan tren waktu kepada eksekutif yang tertarik pada pertumbuhan.",
        technical: "Line chart dengan titik data memungkinkan analis melihat nilai spesifik pada setiap periode.",
        general: "Line chart mudah dipahami oleh audiens umum untuk melihat pola tren over time."
    },
    comparison: {
        executive: "Bar chart horizontal memudahkan eksekutif membandingkan performa antar region.",
        technical: "Bar chart horizontal memungkinkan analis melihat perbandingan yang akurat antar kategori.",
        general: "Bar chart horizontal mudah dibaca dan dipahami untuk perbandingan antar region."
    },
    sales_over_years: {
        executive: "Line chart menunjukkan tren penjualan selama 10 tahun, cocok untuk eksekutif yang ingin melihat pertumbuhan jangka panjang.",
        technical: "Line chart dengan data lengkap memungkinkan analisis tren dan pola musiman.",
        general: "Line chart mudah dipahami untuk melihat perubahan penjualan dari tahun ke tahun."
    },
    top_products: {
        executive: "Pie chart donut menampilkan 5 produk teratas yang paling banyak terjual, memberikan gambaran cepat untuk eksekutif.",
        technical: "Pie chart donut memungkinkan analisis proporsi penjualan produk utama.",
        general: "Pie chart donut mudah dipahami untuk melihat distribusi penjualan produk."
    }
};

let myChart = null;

function generateVisualization() {
    const dataType = document.getElementById('dataType').value;
    const audience = document.getElementById('audience').value;
    const chartType = document.getElementById('chartType').value;
    
    if (myChart) {
        myChart.destroy();
    }
    const ctx = document.getElementById('dataChart').getContext('2d');
    let chartData = {
        labels: data[dataType].labels,
        datasets: [{
            label: 'Jumlah Penjualan',
            data: data[dataType].values,
            backgroundColor: chartType === 'line' ? (data[dataType].color || data[dataType].colors[0]) : data[dataType].colors,
            borderColor: chartType === 'line' ? (data[dataType].color || data[dataType].colors[0]) : undefined,
            borderWidth: chartType === 'line' ? 2 : 1,
            fill: chartType === 'line' ? false : (chartType === 'doughnut' ? false : true),
            tension: chartType === 'line' ? 0.1 : 0,
            hoverOffset: chartType === 'doughnut' ? 30 : 0
        }]
    };

    let titleText = dataType === 'categorical' ? 'Penjualan per Kategori' :
                    dataType === 'temporal' ? 'Trend Penjualan' :
                    dataType === 'comparison' ? 'Penjualan per Region' :
                    dataType === 'sales_over_years' ? 'Jumlah Penjualan Selama 10 Tahun (2015-2025)' :
                    '5 Produk Teratas yang Paling Banyak Terjual';

    let config = {
        type: chartType,
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: titleText
                }
            },
            scales: chartType !== 'doughnut' ? {
                y: {
                    beginAtZero: true
                }
            } : {},
            cutout: chartType === 'doughnut' ? '50%' : undefined
        }
    };

    myChart = new Chart(ctx, config);

    let analysisKey = dataType;
    if (dataType !== 'categorical' && dataType !== 'temporal' && dataType !== 'comparison') {
        analysisKey = dataType;
    }
    document.getElementById('analysisText').innerHTML = `
        <h3>Analisis Visualisasi</h3>
        <p><strong>Jenis Data:</strong> ${document.getElementById('dataType').selectedOptions[0].text}</p>
        <p><strong>Profil Audiens:</strong> ${document.getElementById('audience').selectedOptions[0].text}</p>
        <p>${analysis[analysisKey][audience]}</p>
    `;
}

document.getElementById('generateBtn').addEventListener('click', generateVisualization);

document.addEventListener('DOMContentLoaded', function() {
    generateVisualization();
});
