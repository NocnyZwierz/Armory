/* eslint-disable prettier/prettier */
import * as fs from 'fs/promises';

const getImageFileType = async (image: { path: string }): Promise<string> => {
  try {
    const file = await fs.readFile(image.path);
    const arr = new Uint8Array(file).subarray(0, 4);
    const header = Array.from(arr)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');

    switch (header) {
      case '89504e47':
        return 'image/png';
      case '47494638':
        return 'image/gif';
      case 'ffd8ffe0':
      case 'ffd8ffe1':
      case 'ffd8ffe2':
      case 'ffd8ffe3':
      case 'ffd8ffe8':
        return 'image/jpeg';
      default:
        return 'unknown';
    }
  } catch (error) {
    console.error(
      `Błąd przy odczycie pliku: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
    return 'unknown';
  }
};

export default getImageFileType;
