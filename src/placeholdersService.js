const phRegex = /(?<={{)([^{}<>,.\/;:'"\\|\[\]~`!@#$%^&*\(\)_+\W]+)(?=}})/g;

const getPlaceholders = (content) => {
  return [...content.matchAll(phRegex)].map((m) => m[0]);
};

const replaceInText = (content, placeholder, value) => {
  return content.replaceAll(`{{${placeholder}}}`, value);
};

exports.default = {
  async getPlaceholders(templates) {
    let placeholders = [];

    for (const template of templates) {
      placeholders = [
        ...placeholders,
        ...getPlaceholders(template.path),
        ...getPlaceholders(template.content),
      ];
    }

    return [...new Set(placeholders)];
  },
  async replacePlaceholders(templates, phValues) {
    const files = [];

    for (const template of templates) {
      let newContent = template.content;
      let newPath = template.path;

      for (const key in phValues) {
        newPath = replaceInText(newPath, key, phValues[key]);
        newContent = replaceInText(newContent, key, phValues[key]);
      }

      files.push({ ...template, path: newPath, content: newContent });
    }

    return files;
  },
};
