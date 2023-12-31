import React from 'react'

function Level7(props: any){
    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="208.000000pt" height="152.000000pt" viewBox="0 0 208.000000 152.000000"
 preserveAspectRatio="xMidYMid meet">
           
            <g transform="translate(0.000000,152.000000) scale(0.100000,-0.100000)"
            fill="#000000" stroke="none">
            <path d="M992 1401 c3 -37 -3 -60 -18 -75 -14 -15 -13 -16 8 -16 18 0 23 6 24
            29 1 16 4 36 7 45 8 20 37 21 37 1 0 -8 -8 -15 -17 -15 -13 0 -14 -3 -6 -11 6
            -6 9 -18 6 -26 -3 -8 0 -19 8 -23 15 -10 29 -4 29 11 0 6 -4 7 -10 4 -6 -4
            -10 5 -10 19 0 14 5 26 11 26 6 0 9 8 7 17 -4 24 -78 37 -76 14z"/>
            <path d="M796 1217 l-28 -47 -89 0 -89 0 0 -180 0 -180 -85 0 c-47 0 -85 -3
            -85 -7 0 -5 78 -8 174 -8 96 0 178 3 182 8 4 4 -33 7 -82 7 l-89 0 2 171 2
            172 86 -2 85 -2 17 35 c9 20 19 36 22 36 3 0 21 -34 40 -75 19 -42 38 -74 44
            -72 5 1 24 39 43 82 30 74 33 78 42 55 28 -69 63 -140 69 -140 5 0 24 36 43
            81 l35 80 37 -80 c20 -45 41 -81 45 -81 4 0 16 19 25 43 l18 42 81 -2 80 -1 1
            -113 c0 -62 -3 -114 -8 -115 -5 -1 -21 -5 -36 -8 -37 -8 -98 -63 -114 -103
            -27 -64 -8 -158 39 -199 23 -20 68 -41 101 -46 17 -3 19 -13 18 -116 l-1 -112
            -406 0 -406 0 -2 170 -2 170 89 0 c49 0 86 3 83 7 -10 9 -357 10 -357 1 0 -5
            38 -8 85 -8 l85 0 0 -180 0 -180 425 0 425 0 0 120 0 119 42 12 c89 24 149
            121 129 210 -17 73 -84 139 -142 139 l-29 0 0 125 0 125 -96 0 -95 0 -16 -37
            -16 -38 -40 85 -40 85 -39 -85 -40 -85 -34 74 c-19 41 -34 78 -34 82 0 5 -4 9
            -10 9 -5 0 -10 -4 -10 -9 0 -4 -15 -42 -34 -82 l-35 -74 -39 85 -38 85 -28
            -48z m634 -472 l0 -165 -24 0 c-31 0 -85 38 -113 79 -48 71 -17 183 62 228 76
            43 75 44 75 -142z m57 154 c132 -49 147 -236 24 -299 -73 -37 -71 -40 -71 145
            0 96 4 165 9 165 5 0 22 -5 38 -11z"/>
            <path d="M1662 783 c-2 -84 -5 -103 -17 -103 -19 0 -19 -2 1 -48 l15 -37 19
            35 c23 43 24 50 5 50 -11 0 -15 21 -18 103 l-3 102 -2 -102z"/>
            {/* <path d="M294 795 c-29 -29 -31 -56 -4 -80 18 -17 21 -17 45 -1 14 9 25 22 25
            29 0 6 -5 4 -11 -5 -15 -26 -59 -24 -59 3 0 34 19 59 45 59 17 0 25 -6 25 -17
            0 -15 2 -16 10 -3 16 25 11 35 -21 37 -21 2 -38 -5 -55 -22z"/> */}
            {/* <path d="M1746 780 c3 -8 8 -32 11 -52 3 -21 8 -38 12 -38 3 0 19 20 34 45 16
            25 33 45 38 45 5 0 9 5 9 11 0 13 -35 7 -35 -6 -1 -6 -8 -23 -17 -40 -14 -25
            -17 -27 -23 -12 -4 9 -5 27 -1 40 4 18 1 23 -15 23 -14 0 -18 -5 -13 -16z"/> */}
            </g>

            <text x="190" y="85" fontSize="12" textAnchor="middle">{props.volt}V</text>
            <text x="20" y="85" fontSize="12" textAnchor="middle">{props.cap} F</text>
        </svg>

        
    )
}

export default Level7;