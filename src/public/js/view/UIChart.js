/* global Chart */

import './plugins/chart-min.js';

export const showChart = (usersRegistered, reservasDone, topClients) => {
    new Chart('chartContainer', {
        type: 'line',
        data: {
            labels: usersRegistered.map((dato) => Object.keys(dato)),
            datasets: [
                {
                    label: usersRegistered.chartName,
                    data: usersRegistered.map((dato) => Object.values(dato)[0]),
                    backgroundColor: usersRegistered.map(() => `rgb(246, 153, 40)`),
                    borderColor: 'rgb(246, 153, 40)',
                    borderWidth: 1,
                    fill: false,
                },
                {
                    label: reservasDone.chartName,
                    data: reservasDone.map((dato) => Object.values(dato)[0]),
                    backgroundColor: reservasDone.map(() => `rgb(148, 81, 162)`),
                    borderColor: 'rgb(148, 81, 162)',
                    borderWidth: 1,
                    fill: false,
                },
                {
                    label: topClients.chartName,
                    data: topClients.map((dato) => Object.values(dato)[0]),
                    backgroundColor: topClients.map(() => `rgb(1, 139, 204)`),
                    borderColor: 'rgb(1, 139, 204)',
                    borderWidth: 1,
                    fill: false,
                },
            ],
        },
        options: {
            tooltips: {
                callbacks: {
                    label: (tooltipItem, data) =>
                        tooltipItem.datasetIndex === 2 &&
                        data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] > 0
                            ? [
                                  `Mejor Cliente`,
                                  `Nombre: ${Object.keys(topClients[tooltipItem.index])}`,
                                  `Reservas: ${
                                      data.datasets[tooltipItem.datasetIndex].data[
                                          tooltipItem.index
                                      ] === 0
                                          ? ''
                                          : data.datasets[tooltipItem.datasetIndex].data[
                                                tooltipItem.index
                                            ]
                                  }`,
                              ]
                            : tooltipItem.datasetIndex === 2 &&
                              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] === 0
                            ? ''
                            : data.datasets[tooltipItem.datasetIndex].label +
                              ': ' +
                              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index],
                },
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    });
};
