import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'vl-map.src.js',
    output: {
        file: 'vl-map.js',
        format: 'esm'
    },
    plugins: [
        production && terser()
    ]
};