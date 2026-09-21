const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const mjml2html = require('mjml');

const templatePath = path.join(__dirname, 'src', 'index.mjml.hbs');
const dataPath = path.join(__dirname, 'data', 'mock.json');
const outputPath = path.join(__dirname, 'dist', 'index.html');

async function build() {
    const template = fs.readFileSync(templatePath, 'utf8');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    const compileTemplate = Handlebars.compile(template);
    const mjmlSource = compileTemplate(data);
    const { html, errors } = await mjml2html(mjmlSource, { filePath: templatePath });

    errors.forEach((error) => console.error(error.formattedMessage || error.message));

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html);
    console.log(`✓ Собрано: ${path.relative(__dirname, outputPath)}`);

    return { html, data };
}

module.exports = { build, outputPath };

if (require.main === module) {
    build().catch((err) => {
        console.error('Ошибка сборки:', err.message);
        process.exit(1);
    });
}
