const fs = require("fs");
const path = require("path");

const TEMPLATE_FILE = path.join(__dirname, "template.stories.txt");

/**
 * ストーリーファイルを生成する
 * @param {string} componentPath - コンポーネントのパス
 */
function generateStory(componentPath) {
  // 絶対パスに変換
  const resolvedPath = path.resolve(componentPath);

  // コンポーネント名を取得
  const componentName = path.basename(resolvedPath, ".tsx");

  // ひな型を読み込み
  const template = fs.readFileSync(TEMPLATE_FILE, "utf8");

  // ひな型内のプレースホルダをコンポーネント名で置き換え
  const storyContent = template.replace(/COMPONENT_NAME/g, componentName);

  // 保存先パスを生成
  const storyFilePath = path.join(
    path.dirname(resolvedPath),
    `${componentName}.stories.tsx`
  );

  // ストーリーファイルを生成
  fs.writeFileSync(storyFilePath, storyContent, "utf8");
  console.log(`Story file created: ${storyFilePath}`);
}

// コンポーネントのパスを引数で受け取る
const componentPath = process.argv[2];
console.log(componentPath);
if (!componentPath) {
  console.error("コンポーネントのパスを指定してください。");
  process.exit(1);
}

// ファイルが存在するか確認
if (!fs.existsSync(componentPath)) {
  console.error(`指定されたファイルが存在しません: ${componentPath}`);
  process.exit(1);
}

generateStory(componentPath);
