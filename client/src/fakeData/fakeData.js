// Data for Bar chart
const dataBar = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    series: [
      [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
      [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
    ]
  };

const optionsBar = {
seriesBarDistance: 10,
axisX: {
    showGrid: false
},
height: "350"
};

// const legendBar = {
// names: ["Tesla Model S", "BMW 5 Series"],
// types: ["info", "danger"]
// };

// const responsiveBar = [
// [
//     "screen and (max-width: 640px)",
//     {
//     seriesBarDistance: 5,
//     axisX: {
//         labelInterpolationFnc: function(value) {
//         return value[0];
//         }
//     }
//     }
// ]
// ];


// Data for Pie chart
const dataPie = {
    labels: ["40%", "20%", "40%"],
    series: [40, 20, 40]
  };

const optionsPie = {
// seriesPieDistance: 10,
// axisX: {
//     showGrid: false
// },
height: "250"
};

// const legendPie = {
// names: ["Open", "Bounce", "Unsubscribe"],
// types: ["info", "danger", "warning"]
// };


// Data for Line Chart
const dataLine = {
labels: [
    "9:00AM",
    "12:00AM",
    "3:00PM",
    "6:00PM",
    "9:00PM",
    "12:00PM",
    "3:00AM",
    "6:00AM"
],
series: [
    [287, 385, 490, 492, 554, 586, 698, 695],
    [67, 152, 143, 240, 287, 335, 435, 437],
    [23, 113, 67, 108, 190, 239, 307, 308]
]
};

const optionsLine = {
low: 0,
high: 800,
showArea: false,
height: "345px",
axisX: {
    showGrid: false
},
lineSmooth: true,
showLine: true,
showPoint: true,
fullWidth: true,
chartPadding: {
    right: 50
}
};

// const responsiveLine = [
// [
//     "screen and (max-width: 640px)",
//     {
//     axisX: {
//         labelInterpolationFnc: function(value) {
//         return value[0];
//         }
//     }
//     }
// ]
// ];

// const legendLine = {
// names: ["Open", "Click", "Click Second Time"],
// types: ["info", "danger", "warning"]
// };




module.exports = {
    dataBar,
    optionsBar,
    dataPie,
    optionsPie,
    dataLine,
    optionsLine
}