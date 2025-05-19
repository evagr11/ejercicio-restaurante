import { menu } from './menu.js'
import nunjucks from 'nunjucks'
import fs from 'fs'

function generateHTML (template, data) {
  // Sync bloquea hasta que termina de leer template
  const templateContent = fs.readFileSync(template, 'utf-8')
  const html = nunjucks.renderString(templateContent, data)
  return html
}

function createHTMLFile (template, data, outputFile) {
  const html = generateHTML(template, data)
  fs.writeFileSync(outputFile, html, 'utf-8')
  console.log(`Archivo ${outputFile} generado con éxito.`)
}

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist')
}
nunjucks.configure('views', { autoescape: true })

const menuTemplate = './views/menu.njk'
const locationTemplate = './views/location.njk'

createHTMLFile(menuTemplate, { menu }, './dist/index.html')
createHTMLFile(locationTemplate, { menu }, './dist/location.html')

const imgsFolder = './imgs'
const outputImgsFolder = './dist/imgs'
if (!fs.existsSync(outputImgsFolder)) {
  fs.mkdirSync(outputImgsFolder)
}
const imgFiles = fs.readdirSync(imgsFolder)
imgFiles.forEach(file => {
  const srcPath = `${imgsFolder}/${file}`
  const destPath = `${outputImgsFolder}/${file}`
  fs.copyFileSync(srcPath, destPath)
  console.log(`Archivo ${file} copiado a ${outputImgsFolder}.`)
})

const cssFile = 'style.css'
const outputCssFile = './dist/style.css'
fs.copyFileSync(cssFile, outputCssFile)
