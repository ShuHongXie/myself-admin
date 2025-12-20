import { Injectable } from '@nestjs/common'
import { ResultData } from '@utils/ResultData'

@Injectable()
export class UploadService {
  /**
   * 上传图片（固定返回测试链接）
   */
  uploadImage(file: Express.Multer.File) {
    // 这里暂时固定返回一个图片链接，实际项目中应该将文件上传到云存储或本地存储
    const imageUrl =
      'https://egc-ipc-prd-1306540153.cos.ap-guangzhou.myqcloud.com/2025/20251219162257067RFGJWPypH3HqwN1.jpg'

    return ResultData.success('上传成功', {
      url: imageUrl,
      fileName: file?.originalname || 'test.jpg',
      fileSize: file?.size || 0
    })
  }
}
