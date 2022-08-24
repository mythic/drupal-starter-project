# [PROJECT][]

This is the Drupal application for [PROJECT][].

## Getting Started

This project has a single dependency, and that is [Lando][]. The entire
project's services are contained in the Docker containers managed by [Lando][].
[Lando][] will install a compatible version of Docker and Docker Compose when
[Lando][] is installed.

### Dependencies

* [Lando][] - Download the latest version

## Dependencies

There are two package managers in this project, [Composer][] and [Yarn][].
Composer manages the PHP packages and Drupal libraries. [Yarn][] manages the
Node.js packages required to compile the JavaScript and SCSS in the project.

Both the `composer` and `yarn` commands are wrapped in [Lando][] tooling:

Example:
```bash
$ lando composer require drupal/coffee
```

This command will execute `composer` inside of the PHP docker container managed
by Lando.

```bash
$ lando yarn add underscore
```

This command will execute `yarn` inside of the Node docker container managed by
Lando.

## JavaScript and SCSS

There is a [Webpack][] configuration file located in the project root that is
configured to compile JavaScript files ending in `.es6.js` and SCSS files
ending in `.scss` in any directory located in...

* `/web/modules/custom`
* `/web/themes/custom`

The files that can be compiled by [Webpack][] will generate a `.js` and `.css`
file respectively of their source in the same directory the file is located.
This enhances the developer experience working in this project by using modern
technology while also generating compiled assets compatible for all modern
browsers.

### Build/Compile Assets

Build all asset types:
```bash
$ lando yarn build
```

Build JavaScript assets:
```bash
$ lando yarn build:js
```

Build CSS assets:
```bash
$ lando yarn build:scss
```

### Watch Assets

The watch commands will automatically compile the asset files if a chance in
the file contents are detected.

Watch all asset types:
```bash
$ lando yarn watch
```

Watch JavaScript assets:
```bash
$ lando yarn watch:js
```

Watch CSS assets:
```bash
$ lando yarn watch:scss
```

### Validating Assets

There are two linting protocols in place for JavaScript (eslint) and SCSS
(stylelint). It is recommended to run the validate command in your Continuous
Integration process.

Validate all asset types:
```bash
$ lando yarn validate
```

Watch JavaScript assets:
```bash
$ lando yarn validate:js
```

Watch CSS assets:
```bash
$ lando yarn validate:scss
```

#### Fixing validation errors

You can easily fix validation errors flagged by the linter by executing the fix
command:

Fix all asset types:
```bash
$ lando yarn fix
```

Fix JavaScript assets:
```bash
$ lando yarn fix:js
```

Fix CSS assets:
```bash
$ lando yarn fix:scss
```

[PROJECT]: https://example.com
[Lando]: https://github.com/lando/lando
[Composer]: https://getcomposer.org
[Yarn]: https://yarnpkg.com/
[Webpack]: https://webpack.js.org/
