// gulpプラグインを読み込みます
const { src, dest, watch, series } = require("gulp");
// Sassをコンパイルするプラグインを読み込みます
const sass = require("gulp-sass")(require("sass"));
// ファイルをZip圧縮するプラグインを読み込みます
const zip = require("gulp-zip");

/**
 * Sassをコンパイルするタスクです
 */
const compileSass = (done) => {
  // style.scssファイルを取得
  src("src/sass/**/*.scss")
    // Sassのコンパイルを実行
    .pipe(
      // コンパイル後のCSSを展開
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    // cssフォルダー以下に保存
    .pipe(dest("dist/css"));
  done();
};

/**
 * ファイルをZip圧縮するタスクです
 */
const createZip = (done) => {
  // distディレクトリ内のファイルを取得
  src("dist/**/*", { base: "dist" })
    // Zipファイルに圧縮
    .pipe(zip("archive.zip"))
    // outフォルダー以下に保存
    .pipe(dest("out"));
  done();
}

/**
 * Sassファイルを監視し、変更があったらSassを変換します
 */
const watchSassFiles = () => watch("src/**/*.scss", compileSass);

/**
 * ファイルをZip圧縮するタスクです
 */
exports.build = series(compileSass, createZip);

// npx gulpというコマンドを実行した時、watchSassFilesが実行されるようにします
exports.default = watchSassFiles;
