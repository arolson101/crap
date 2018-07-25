import * as ICO from 'icojs'
import minidom from 'minidom'
import * as path from 'path'
import * as url from 'url'
import isUrl from 'is-url'

export interface FavicoProps {
  from: string
  width: number
  height: number
  uri: string
}

const thumbnailSizes = {
  small: 36,
  medium: 56,
  large: 80,
}

const preferredIconSize = 32

export const getFavico = async (from: string): Promise<FavicoProps> => {
  if (!isUrl(from)) {
    throw new Error(`${from} is not an URL`)
  }

  const urlobj = url.parse(from)
  urlobj.protocol = urlobj.protocol || 'http'

  const result = await fetch(url.format(urlobj), { method: 'get' })
  // console.log({ result })
  if (!result.ok) {
    throw new Error(result.statusText)
  }

  const body = await result.text()
  const doc = minidom(body)

  const links = ([] as string[])
    .concat(
      // <link rel='shortcut icon|icon|apple-touch-icon' href='...'>
      Array.from(doc.getElementsByTagName('link'))
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
        .map(link => link.getAttribute('href'))
        .filter((href): href is string => !!href)
    )
    // .concat(
    //   // <img src='...'>
    //   Array.from(doc.getElementsByTagName('img'))
    //     .map(img => img.getAttribute('src') /*|| img.getAttribute('data-src')*/)
    //     .filter((href): href is string => !!href)
    // )
    .concat(
      // http://ogp.me/
      // <meta property='og:image' content='...'>
      Array.from(doc.getElementsByTagName('meta'))
        .filter(meta => meta.getAttribute('property') === 'og:image')
        .map(meta => meta.getAttribute('content'))
        .filter((href): href is string => !!href)
    )
    .map(href => url.resolve(result.url, href))
    .filter((value, index, array): boolean => {
      // return only unique items
      return index === array.indexOf(value)
    })
  // console.log({ links })

  const images: FavicoProps[] = []

  await Promise.all(
    links.map(async link => {
      const response = await fetch(link, { method: 'get' })
      if (!response.ok) {
        return
      }
      const blob = await response.blob()
      const buf = await toBuffer(blob)
      if (ICO.isICO(buf.buffer as ArrayBuffer)) {
        const mime = 'image/png'
        const parsedImages = await ICO.parse(buf.buffer as ArrayBuffer, mime)
        for (const parsedImage of parsedImages) {
          const { width, height } = parsedImage
          const uri = toDataUri(Buffer.from(parsedImage.buffer), mime)
          const props: FavicoProps = { from, width, height, uri }
          images.push(props)
        }
      } else {
        const ext = path.extname(link).substr(1)
        const { width, height } = imageSize(buf, link)
        const mime = response.headers.get('content-type') || `image/${ext}`
        const uri = toDataUri(buf, mime)
        const props: FavicoProps = { from, width, height, uri }
        images.push(props)
      }
    })
  )
  // console.log({ images })

  if (images.length === 0) {
    throw new Error('no images found')
  }

  const best = images
    .sort((a, b) => a.height - b.height)
    .find(image => image.height >= preferredIconSize) || images[0]
  console.log({ best, sorted: images.sort((a, b) => a.height - b.height) })

  return best
}

const toDataUri = (buf: Buffer, mime: string) => {
  const base64 = Buffer.from(buf).toString('base64')
  const uri = `data:${mime};base64,${base64}`
  return uri
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
  // ico: require('image-size/lib/types/ico'),
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
