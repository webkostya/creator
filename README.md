# Creator
Инструмент для работы с генерацией и обработкой окружения DApp

## Цели
- Инструментарий для создания и публикации приложения "за 5 минут"
- Создание окружения
- Работа в режиме разработки, инструменты разработки и отладки
- Работа с смартконтрактами, парсинг, отладка и проверки
- Генерации шаблонов и скелетов модулей Dapp
- Публикация приложения в Маркетплейсе

## Установка и запуск в режиме разработчика
```
git clone https://github.com/webkostya/creator
cd creator
npm install

// Commands
npm run create
npm run test
npm run help
```

### Создание DApp
Создание приложения относительно выбранного окружения: фреймворк, стили, язык и тд.

#### Targets
- Manifest в соответствии с выбранными параметрами
- Базовое окружение и webpack.config:
    - Hotreload - обновлять весь код в процессе написания для живого просмотра в браузере
    - Простая компиляция всех необходимых assets
    - Мета-возможности с использованием webpack loaders

```
Usage: node index [command] [options]

Options:

  -v, --version     output the version number
  -h, --help        output usage information

Commands:

  create [options]  Create new DApp package

Examples:

$ npm run create
$ npm run test
$ npm run help

Options:

-n, --name <name>            Your package name
-c, --compiler <compiler>    Target compiler
-s, --style <preprocessor>   Styles preprocessor
-f, --framework <framework>  Starter framework