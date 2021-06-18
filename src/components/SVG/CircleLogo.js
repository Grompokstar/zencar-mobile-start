import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.333 2.022a12 12 0 1113.334 19.956A12 12 0 015.333 2.022zm.916 18.599A10.35 10.35 0 1017.751 3.408 10.35 10.35 0 006.249 20.621zM5.763 5.76v1.785h6.625l-6.625 6.62v2.492L16.66 5.761H5.763zm12.48 12.478v-1.785h-6.625l6.624-6.624V7.339l-10.9 10.9h10.9z"
        fill="#FF0034"
      />
    </Svg>
  )
}

export default SvgComponent
