import { getLayoutDB } from "../mongo/profile";


export async function loadLayout(): Promise<Block[]> {
  try {
    const result = await getLayoutDB();
    const jsonData: Block[] = await JSON.parse(result);
    return jsonData;
  } catch (error) {
    //TODO: Handle Error

    return [];
  }
}