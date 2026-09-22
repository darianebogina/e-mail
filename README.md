# e-mail

Генератор и отправщик HTML-писем (email-дайджест NFT.RU) на основе MJML-шаблона.

## Как это работает

1. `src/index.mjml.hbs` — шаблон письма в формате MJML с Handlebars-плейсхолдерами.
2. `data/mock.json` — данные, которыми заполняется шаблон (карточки новостей/статей, картинки, ссылки).
3. `build.js` рендерит Handlebars-шаблон, компилирует MJML в HTML и сохраняет результат в `dist/index.html`.
4. `send.js` собирает письмо (через `build.js`) и отправляет его по SMTP (Yandex) через `nodemailer`.

## Установка

```bash
npm install
```

## Сборка письма

```bash
npm run build
```

Готовый HTML появится в `dist/index.html` — его можно открыть в браузере или использовать для предпросмотра в почтовом клиенте.

## Отправка письма

Перед отправкой создайте файл `.env` в корне проекта со следующими переменными:

```
YANDEX_USER=you@yandex.ru
YANDEX_APP_PASSWORD=пароль_приложения
MAIL_TO=recipient1@example.com,recipient2@example.com
```

Затем выполните:

```bash
npm run send
```

Скрипт соберёт письмо, установит соединение с `smtp.yandex.ru` и отправит его всем адресатам из `MAIL_TO`.

## Структура проекта

```
data/            моковые данные для шаблона (mock.json)
src/             MJML+Handlebars шаблон письма
images/          изображения, используемые в письме
dist/            собранный HTML (генерируется командой build)
build.js         сборка шаблона в HTML
send.js          отправка письма по SMTP
```
