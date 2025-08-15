import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const route = path.join(__dirname,'../../data/data.json')

export const data = JSON.parse(await fs.readFile(route,'utf-8'))
