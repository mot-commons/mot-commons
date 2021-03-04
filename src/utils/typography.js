import Typography from "typography"
import Theme from "typography-theme-bootstrap"

Theme.googleFonts = [
  {
    name: "Noto+Serif+JP",
    styles: ["400", "700"],
  },
]
Theme.headerFontFamily = ["Noto Serif JP", "serif"]
Theme.bodyFontFamily = ["Noto Serif JP", "serif"]

const typography = new Typography(Theme)

export const { scale, rhythm, options } = typography
export default typography
