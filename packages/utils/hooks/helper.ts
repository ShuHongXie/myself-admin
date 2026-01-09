export /**
 * @description
 * @author xieshuhong
 * @param {File} file 原始文件
 * @param {{ quality?: number; maxWidth?: number; maxHeight?: number }} [options={}] 压缩选项
 * @return {*}  {(Promise<Blob | File>)} 压缩后的 Blob
 */
const compressImage = (
  file: File,
  options: { quality?: number; maxWidth?: number; maxHeight?: number } = {}
): Promise<Blob | File> => {
  const { quality = 0.8, maxWidth, maxHeight } = options
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        if (maxWidth && width > maxWidth) {
          height = (maxWidth / width) * height
          width = maxWidth
        }
        if (maxHeight && height > maxHeight) {
          width = (maxHeight / height) * width
          height = maxHeight
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('图片压缩失败'))
            }
          },
          file.type,
          quality
        )
      }
      img.onerror = (err) => reject(err)
    }
    reader.onerror = (err) => reject(err)
  })
}
