import { v4 as uuidv4 } from "uuid";

const generateFilename = (ext = "png") => {
  return `${Date.now()}-${uuidv4()}.${ext}`;
};

export { generateFilename };
