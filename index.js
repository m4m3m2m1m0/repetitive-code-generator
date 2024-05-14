const config = require("./src/config").default;
const templateService = require("./src/templateService").default;
const placeholdersService = require("./src/placeholdersService").default;
const fs = require("fs");
const path = require("path");
const prompts = require("prompts");

const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

const askTemplate = async (options) => {
  return await prompts(
    {
      type: "select",
      name: "template",
      message: "Select template",
      choices: options.map((o) => ({
        title: o,
        value: o,
      })),
    },
    { onCancel: process.exit }
  );
};

const askPlaceholders = async (placeholders) => {
  const questions = placeholders.map((p) => ({
    type: "text",
    name: p,
    message: `Value of '${p}': `,
  }));

  return await prompts(questions, { onCancel: process.exit });
};

const entry = async (val) => {
  try {
    const workDir = process.cwd();

    const configObj = await config.getConfig(`${workDir}/rcg.json`);

    const tempalteFolder = configObj?.templateFolder ?? "rcg";
    const entryTargetFolder = configObj?.entryTargetFolder ?? "";

    const templateNames = await templateService.getAvailableTemplateNames(
      `${workDir}/${tempalteFolder}`
    );

    const chosenTemplate = await askTemplate(templateNames);

    const templates = await templateService.getTemplates(
      `${workDir}/${tempalteFolder}/${chosenTemplate.template}`
    );

    const placeholders = await placeholdersService.getPlaceholders(templates);

    const placeholderResponse = await askPlaceholders(placeholders);

    const readyTemplates = await placeholdersService.replacePlaceholders(
      templates,
      placeholderResponse
    );

    for (const file of readyTemplates) {
      const dir = `${workDir}/${entryTargetFolder}${
        entryTargetFolder ? "/" : ""
      }${file.path}`;

      ensureDirectoryExistence(dir);

      if (!fs.existsSync(dir)) {
        fs.writeFileSync(dir, file.content);
      } else {
        console.log(`Omitted ${file.path}, because it already exists.`);
      }
    }
  } catch (e) {
    console.log(e);
  }

  return;
};

exports.entry = entry;
