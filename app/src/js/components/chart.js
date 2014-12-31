$(function() {
    window.chart = new Highcharts.StockChart({
        chart: {
            renderTo: 'chart',
            width: 900
        },

        credits: {
            enabled: false
        },

        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'Profit & Loss'
        },

        series: [{
            name : 'Data',
            // unix timestamps need to be multiplied by 1000
            data : [
                [1420027378000,-12.34],
                [1420632178000,-28.00],
                [1423310578000,2.00],
                [1423915378000,23.65],
                [1426334578000,38.10],
                [1460635378000,33.00],
                [1465905778000,59.25],
            ],
            tooltip: {
                valueDecimals: 2
            }
        }]
    });
});