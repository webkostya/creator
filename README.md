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

// Help
node index.js -h

// Commands
npm run create
```

### Создание DApp
![](preview.gif)

Создание приложения относительно выбранного окружения: фреймворк, стили, язык и тд.

#### Targets
- Manifest в соответствии с выбранными параметрами
- Базовое окружение и webpack.config:
    - Hotreload - обновлять весь код в процессе написания для живого просмотра в браузере
    - Простая компиляция всех необходимых assets
    - Мета-возможности с использованием webpack loaders

```
Usage: create [options]

🛠   Create new DApp package

Options:

  -n, --name <name>            🏷   Your package name
  -c, --compiler <compiler>    🛠   Target compiler
  -s, --style <preprocessor>   💈   Styles preprocessor
  -f, --framework <framework>  📦  Starter framework
  -h, --help                   output usage information
<<<<<<< HEAD
```
=======
```
>>>>>>> 9fc02be8aab63b28407b0f3d06a6f79445f54974
