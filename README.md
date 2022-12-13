oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g git-automerge
$ git-automerge COMMAND
running command...
$ git-automerge (--version)
git-automerge/0.0.0 linux-x64 node-v16.15.0
$ git-automerge --help [COMMAND]
USAGE
  $ git-automerge COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`git-automerge hello PERSON`](#git-automerge-hello-person)
* [`git-automerge hello world`](#git-automerge-hello-world)
* [`git-automerge help [COMMAND]`](#git-automerge-help-command)
* [`git-automerge plugins`](#git-automerge-plugins)
* [`git-automerge plugins:install PLUGIN...`](#git-automerge-pluginsinstall-plugin)
* [`git-automerge plugins:inspect PLUGIN...`](#git-automerge-pluginsinspect-plugin)
* [`git-automerge plugins:install PLUGIN...`](#git-automerge-pluginsinstall-plugin-1)
* [`git-automerge plugins:link PLUGIN`](#git-automerge-pluginslink-plugin)
* [`git-automerge plugins:uninstall PLUGIN...`](#git-automerge-pluginsuninstall-plugin)
* [`git-automerge plugins:uninstall PLUGIN...`](#git-automerge-pluginsuninstall-plugin-1)
* [`git-automerge plugins:uninstall PLUGIN...`](#git-automerge-pluginsuninstall-plugin-2)
* [`git-automerge plugins update`](#git-automerge-plugins-update)

## `git-automerge hello PERSON`

Say hello

```
USAGE
  $ git-automerge hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/entrostat/git-automerge/blob/v0.0.0/dist/commands/hello/index.ts)_

## `git-automerge hello world`

Say hello world

```
USAGE
  $ git-automerge hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ git-automerge hello world
  hello world! (./src/commands/hello/world.ts)
```

## `git-automerge help [COMMAND]`

Display help for git-automerge.

```
USAGE
  $ git-automerge help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for git-automerge.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.19/src/commands/help.ts)_

## `git-automerge plugins`

List installed plugins.

```
USAGE
  $ git-automerge plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ git-automerge plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.7/src/commands/plugins/index.ts)_

## `git-automerge plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ git-automerge plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ git-automerge plugins add

EXAMPLES
  $ git-automerge plugins:install myplugin 

  $ git-automerge plugins:install https://github.com/someuser/someplugin

  $ git-automerge plugins:install someuser/someplugin
```

## `git-automerge plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ git-automerge plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ git-automerge plugins:inspect myplugin
```

## `git-automerge plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ git-automerge plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ git-automerge plugins add

EXAMPLES
  $ git-automerge plugins:install myplugin 

  $ git-automerge plugins:install https://github.com/someuser/someplugin

  $ git-automerge plugins:install someuser/someplugin
```

## `git-automerge plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ git-automerge plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ git-automerge plugins:link myplugin
```

## `git-automerge plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ git-automerge plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ git-automerge plugins unlink
  $ git-automerge plugins remove
```

## `git-automerge plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ git-automerge plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ git-automerge plugins unlink
  $ git-automerge plugins remove
```

## `git-automerge plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ git-automerge plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ git-automerge plugins unlink
  $ git-automerge plugins remove
```

## `git-automerge plugins update`

Update installed plugins.

```
USAGE
  $ git-automerge plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
