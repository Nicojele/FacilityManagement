import { FileResult } from './fileResult';

export async function ReadMetaJSON(filePaths: Array<string>): Promise<Array<FileResult>> {
  const fs = require('fs').promises;
  const path = require('path');

  const filePromises = filePaths.map(async (url) => {
    const jsonDirectory = path.join(process.cwd(), url);
    const fileResult = {
      url: url,
      content: await fs.readFile(jsonDirectory + '/_meta.' + 'de' + '.json', 'utf8'),
    };

    return fileResult;
  });

  const data = await Promise.all(filePromises);

  return data;
}
