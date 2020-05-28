const ctx_mes = document.getElementById("mes");
const mesChart = new Chart(ctx_mes, {
    type: "bar",
    data: {
        labels: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Nobiembre",
            "Diciembre"
        ],
        datasets: [
            {
                label: "Reservas/Mes",
                data: [12, 19, 3, 5, 2, 3, 12, 7, 24, 3, 6, 8],
                backgroundColor: [
                    "rgb( 242, 215, 213 )",
                    "rgb( 235, 222, 240 )",
                    "rgb(212, 230, 241)",
                    "rgb( 209, 242, 235 )",
                    "rgb( 212, 239, 223 )",
                    "rgb( 252, 243, 207 )",
                    "rgb( 250, 229, 211 )",
                    "rgb( 229, 231, 233 )",
                    "rgb( 250, 219, 216 )",
                    "rgb( 232, 218, 239 )",
                    "rgb( 214, 234, 248 )",
                    "rgb( 208, 236, 231 )"
                ],
                borderColor: [
                    "rgb(205, 97, 85)",
                    "rgb(195, 155, 211)",
                    "rgb( 127, 179, 213 )",
                    "rgb( 118, 215, 196 )",
                    "rgb(125, 206, 160)",
                    "rgb( 247, 220, 111 )",
                    "rgb( 240, 178, 122 )",
                    "rgb( 202, 207, 210 )",
                    "rgb( 241, 148, 138 )",
                    "rgb( 187, 143, 206 )",
                    "rgb( 133, 193, 233 )",
                    "rgb( 115, 198, 182 )"
                ],
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }
});
const ctx_semana = document.getElementById("semana");
const semanaChart = new Chart(ctx_semana, {
    type: "line",
    data: {
        labels: [
            "Semana1",
            "Semana2",
            "Semana3",
            "Semana4",
            "Semana5",
            "Semana6",
            "Semana7",
            "Semana8",
            "Semana9",
            "Semana10",
            "Semana11",
            "Semana12",
            "Semana13",
            "Semana14",
            "Semana15",
            "Semana16",
            "Semana17",
            "Semana18",
            "Semana19",
            "Semana20",
            "Semana21",
            "Semana22",
            "Semana23",
            "Semana24",
            "Semana25",
            "Semana26",
            "Semana27",
            "Semana28",
            "Semana29",
            "Semana30",
            "Semana31",
            "Semana32",
            "Semana33",
            "Semana34",
            "Semana35",
            "Semana36",
            "Semana37",
            "Semana38",
            "Semana39",
            "Semana40",
            "Semana41",
            "Semana42",
            "Semana43",
            "Semana44",
            "Semana45",
            "Semana46",
            "Semana47",
            "Semana48",
            "Semana49",
            "Semana50",
            "Semana51",
            "Semana52"
        ],
        datasets: [
            {
                label: "Reservas/Semana",
                data: [
                    12,
                    19,
                    3,
                    5,
                    2,
                    3,
                    12,
                    7,
                    24,
                    3,
                    6,
                    8,
                    3,
                    14,
                    10,
                    13,
                    14,
                    8,
                    5,
                    12,
                    14,
                    7,
                    8,
                    16,
                    9,
                    18,
                    6,
                    12,
                    14,
                    16,
                    18,
                    14,
                    10,
                    6,
                    15,
                    20,
                    21,
                    24,
                    17,
                    15,
                    13,
                    16,
                    18,
                    13,
                    8,
                    11,
                    16,
                    22,
                    20,
                    18,
                    16,
                    14
                ],
                backgroundColor: "rgb(  245, 203, 167 )",
                borderColor: "rgb( 235, 152, 78 )",
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }
});
const ctx_dia = document.getElementById("dia");
const diaChart = new Chart(ctx_dia, {
    type: "bar",
    data: {
        labels: [
            "24 Enero",
            "12 Frebrero",
            "21 Febrero",
            "3 Marzo",
            "18 Marzo",
            "10 Abril",
            "1 Mayo",
            "27 Mayo",
            "10 Junio",
            "15 Junio",
            "16 Julio",
            "13 Agosto",
            "26 Agosto",
            "2 Septiembre",
            "18 Septiembre"
        ],
        datasets: [
            {
                label: "Top 15 dias",
                data: [21, 19, 17, 18, 15, 23, 24, 20, 24, 15, 16, 17, 23, 21, 19],
                backgroundColor: "rgb( 245, 203, 167)",
                borderColor: "rgb( 235, 152, 78 )",
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }
});
document.querySelector("#btn_mes").addEventListener("click", () => {
    ctx_dia.style.opacity = 0;
    ctx_semana.style.opacity = 0;
    ctx_mes.style.opacity = 1;
});
document.querySelector("#btn_semana").addEventListener("click", () => {
    ctx_mes.style.opacity = 0;
    ctx_dia.style.opacity = 0;
    ctx_semana.style.opacity = 1;
});
document.querySelector("#btn_dia").addEventListener("click", () => {
    ctx_mes.style.opacity = 0;
    ctx_semana.style.opacity = 0;
    ctx_dia.style.opacity = 1;
});