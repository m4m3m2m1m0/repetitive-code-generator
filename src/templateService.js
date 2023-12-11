const { readdir } = require("fs").promises;
const { readFileSync } = require("fs");

const checkTemplateFolderExists = async (dir) => {
  try {
    await readdir(dir, { withFileTypes: true });
  } catch (e) {
    throw "Template folder not found";
  }
};

const searchDirectory = async (dir, dirPrefix = "") => {
  let result = [];

  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      result = [
        ...result,
        ...(await searchDirectory(
          `${dir}/${dirent.name}`,
          `${dirPrefix}/${dirent.name}`
        )),
      ];
    } else {
      result.push(`${dirPrefix}${dirPrefix ? "/" : ""}${dirent.name}`);
    }
  }

  return result;
};

const searchTemplatesFolder = async (dir) => {
  let result = [];

  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      result.push(dirent.name);
    }
  }

  return result;
};

exports.default = {
  async getAvailableTemplateNames(templateFolder) {
    await checkTemplateFolderExists(templateFolder);
    return await searchTemplatesFolder(templateFolder);
  },
  async getTemplates(templateFolder) {
    const dirContent = await searchDirectory(templateFolder);
    const files = [];

    for (const dir of dirContent) {
      files.push({
        path: dir,
        content: readFileSync(`${templateFolder}/${dir}`, "utf8"),
      });
    }

    return files;
  },
};
