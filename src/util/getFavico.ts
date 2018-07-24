const minidom = require('minidom')
import * as url from 'url'
import * as path from 'path'
import blobToBuffer from 'blob-to-buffer'

const thumbnailSizes = {
  small: 36,
  medium: 56,
  large: 80,
}

export const GetImages = async () => {
  const result = await fetch('http://netflix.com', { method: 'get' })
  console.log({ result })
  if (result.ok) {
    const body = await result.text()
    const doc = minidom(body) as HTMLDocument

    const icons = Array.from(doc.getElementsByTagName('link'))
      .filter(link => {
        switch (link.getAttribute('rel')) {
          case 'shortcut icon':
          case 'icon':
          case 'apple-touch-icon':
            return true
          default:
            return false
        }
      })
      .filter(link => !!link.getAttribute('href'))
      .map(link => {
        return url.resolve(result.url, link.getAttribute('href') as string)
      })
      .filter((value, index, array): boolean => {
        // return only unique items
        return array.indexOf(value) === index
      })
    console.log({ icons })

    const images = await Promise.all(
      icons.map(async icon => {
        const response = await fetch(icon, { method: 'get' })
        fetch(icon, { method: 'get' })
        const blob = await response.blob()
        const buf = await toBuffer(blob)
        const { width, height } = imageSize(buf, icon)
        const base64 = Buffer.from(buf).toString('base64')
        const mime = response.headers.get('content-type') || `image/${path.extname(icon).substr(1)}`
        const uri = `data:${mime};base64,${base64}`
        const props: ImageProps = {
          style: { width, height },
          source: { uri }
        }
        return props
      })
    )
    console.log({ images })
    return images
  }
}

export interface ImageProps {
  style: { width: number, height: number }
  source: { uri: string }
}

const toBuffer = (blob: Blob) => {
  return new Promise<Buffer>((resolve, reject) => {
    const fr = new FileReader()

    const loadend = (e: any) => {
      fr.removeEventListener('loadend', loadend, false)
      if (e.error) {
        reject(e.error)
      } else {
        const dataUrl = fr.result as string
        const marker = 'base64,'
        const idx = dataUrl.indexOf(marker)
        if (idx) {
          const buf = Buffer.from(dataUrl.substr(idx + marker.length), 'base64')
          resolve(buf)
        } else {
          reject(new Error(`'${marker}' not found in string`))
        }
      }
    }

    fr.addEventListener('loadend', loadend, false)
    fr.readAsDataURL(blob)
  })
}

interface ImageSize {
  width: number
  height: number
  type: string
}

interface TypeHandler {
  detect: (buffer: Buffer, filepath: string) => boolean
  calculate: (buffer: Buffer, filepath: string) => ImageSize | false
}

interface TypeHandlerMap {
  [ext: string]: TypeHandler
}

let typeHandlers: TypeHandlerMap = {
  png: require('image-size/lib/types/png'),
  ico: require('image-size/lib/types/ico'),
  jpg: require('image-size/lib/types/jpg'),
  gif: require('image-size/lib/types/gif'),
  icns: require('image-size/lib/types/icns'),
  bmp: require('image-size/lib/types/bmp'),
  svg: require('image-size/lib/types/svg'),
  // cur: require('image-size/lib/types/cur'),
  // dds: require('image-size/lib/types/dds'),
  // psd: require('image-size/lib/types/psd'),
  // tiff: require('image-size/lib/types/tiff'),
  // webp: require('image-size/lib/types/webp'),
}

const detector = (buffer: Buffer, filepath: string) => {
  for (let type in typeHandlers) {
    const result = typeHandlers[type].detect(buffer, filepath)
    if (result) {
      return type
    }
  }
  return undefined
}

function imageSize(buffer: Buffer, filepath: string) {
  // detect the file type.. don't rely on the extension
  let type = detector(buffer, filepath)!

  // find an appropriate handler for this file type
  if (type in typeHandlers) {
    const size = typeHandlers[type].calculate(buffer, filepath)
    if (size !== false) {
      size.type = type
      return size
    }
  }

  // throw up, if we don't understand the file
  throw new TypeError('unsupported file type: ' + type + ' (file: ' + filepath + ')')
}
