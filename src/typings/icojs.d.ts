declare module 'icojs' {
  export interface ParsedImage {
    width: number // Image width.
    height: number // Image height.
    bpp: number // Image color depth as bits per pixel.
    buffer: ArrayBuffer // Image buffer
  }

  interface ICO {
    isICO(source: ArrayBuffer): boolean
    parse(buffer: ArrayBuffer, mime?: string): Promise<Array<ParsedImage>>
    parseSync(buffer: ArrayBuffer, mime?: string): Array<ParsedImage>
  }

  var ICO: ICO
  export = ICO
}
