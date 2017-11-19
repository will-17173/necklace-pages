var browserSync = require("browser-sync");

browserSync({
    server: './src',
    files: ['src', 'src/assets/black-friday-2017/css/style.css']
});