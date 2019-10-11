import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'vl-map.src.js',
    output: {
        file: 'vl-map.js',
        format: 'esm'
    },
    plugins: [
        postcss(),
        production && terser(),
    ]
};