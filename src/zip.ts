import JSZip from "node-zip";
import fs from "fs";
import packageJson from "../package.json";

(function zipping() {
  try {
    const FILES: string[] = [
      "dist/src/index.js",
      //TODO:
      //"dist/src/betting-manager.js",
      //"dist/src/background.js",
      "manifest.json",
      //"resources/???.png",
    ];
    console.log("Start Zipping...​​ 🙌🍞​🍖​🥬​​🧀🍞​​️​");
    const zip = new JSZip();
    fs.mkdir("zip", {recursive: true}, (e) => {
      if (e) throw e;
    });
    for (let file of FILES) {
      zip.file(file, fs.readFileSync(file));
    }
    const data = zip.generate({type: "nodebuffer"});
    fs.writeFileSync(`zip/${packageJson.name}.zip`, data);
    console.log(`🥪　Finished!: zip/${packageJson.name}.zip was created`);
  } catch (e) {
    console.error(e.message);
  }
})();
