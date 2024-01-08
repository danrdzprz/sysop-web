
export const useImage = () => {
  
/**
 * The function `localImage` returns the URL of a local image file based on the provided folder, name,
 * and extension, or a default image URL if the file does not exist.
 * @param {string} folder - The `folder` parameter is a string that represents the name of the folder
 * where the image is located.
 * @param {string} name - The `name` parameter is a string that represents the name of the image file.
 * @param {string} extension - The `extension` parameter is a string that represents the file extension
 * of the image file. It could be any valid file extension such as "jpg", "png", "gif", etc.
 * @returns The function `localImage` returns a string.
 */
  const localImage = (folder: string, name: string, extension: string): string => {
    const defaultImage =
      "https://p7.hiclipart.com/preview/711/621/180/error-computer-icons-orange-error-icon.jpg"
    try {
      return new URL(`../assets/images/${folder}/${name}.${extension}`,import.meta.url).href
    } catch (e) {
      return defaultImage
    }
  }

  return {
    localImage
  }
}


