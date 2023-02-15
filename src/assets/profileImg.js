import * as React from "react"

export const ProfileIMG = ({ circleColor = "#f5f5f5", elementColor = "#fec85c" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40}>
    <g data-name="Group 94341" transform="translate(-1050 -15)">
      <circle
        data-name="Ellipse 129276"
        cx={20}
        cy={20}
        r={20}
        transform="translate(1050 15)"
        fill={circleColor}
      />
      <g
        data-name="Group 94336"
        transform="rotate(-5 1145.135 515.05)"
        fill={elementColor}
      >
        <path
          data-name="Rectangle 47"
          d="m1112.628 29.807 10.375-2.017 2.016 10.375-10.374 2.017z"
        />
        <rect
          data-name="Rectangle 48"
          width={11.488}
          height={10.605}
          rx={5.302}
          transform="translate(1099.58 30.504)"
        />
        <path
          data-name="Polygon 1"
          d="m1110.448 16.407 7.618 9.494-11.93 1.89Z"
        />
      </g>
    </g>
  </svg>
)

