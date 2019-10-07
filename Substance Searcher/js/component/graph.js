function histogram(chart, arr) {
 res = c3.generate({
    data: {
        columns: [
            arr
        ],
        type: 'bar'
    },
    bar: {
        width: {
            ratio: 0.5 
        }
        
    },
    bindto: chart,
    axis: {
        x: {
            label: 'Age'
        },
        y: {
            label: 'Number of People'
        }
    }
});

}
function pie(chart, arr) {
    sum = 0
    for(i in arr) {
        sum += i[1]
    }
    res = c3.generate({
    data: {
        columns: 
            arr
        ,
        type : 'pie',
    },
    bindto: chart
});
}

function spline(chart, arr1, arr2) {
var chart = c3.generate({
    data: {
        xs: {
            'People': 'Year',
        },
        columns: [
            arr1,
            arr2,
        ],
        type: 'spline'
        
    },
    bindto: chart
});
}