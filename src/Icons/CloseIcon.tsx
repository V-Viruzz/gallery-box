import { SVGProps } from "react"

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2em"
    height="2em"
    viewBox="0 0 24 24"
    {...props}
  >
    <title>{"Close"}</title>
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={2}
        d="M17 7 7 17M7 7l10 10"
      />
    </g>
  </svg>
)

export default CloseIcon
