git-auto-merger
=================

This CLI helps to create an auto-merge functionality for git. When it fails to merge (due to conflicts), you can send an alert out.

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
$ npm install -g git-auto-merger
$ git-auto-merger COMMAND
running command...
$ git-auto-merger (--version)
git-auto-merger/2.0.12 linux-x64 node-v16.19.0
$ git-auto-merger --help [COMMAND]
USAGE
  $ git-auto-merger COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`git-auto-merger help [COMMAND]`](#git-auto-merger-help-command)
* [`git-auto-merger merge`](#git-auto-merger-merge)
* [`git-auto-merger set credentials smtp`](#git-auto-merger-set-credentials-smtp)

## `git-auto-merger help [COMMAND]`

Display help for git-auto-merger.

```
USAGE
  $ git-auto-merger help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for git-auto-merger.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.19/src/commands/help.ts)_

## `git-auto-merger merge`

Tries to merge the base branch into all of the other ones that have been specified or match a pattern.

```
USAGE
  $ git-auto-merger merge -b <value> [-e <value>] [-i <value>] [-m <value> -P <value>] [-c] [-P]

FLAGS
  -P, --project-name=<value>        The name of the project when sending the notification
  -P, --push-commit                 Push the changes of the merge
  -b, --base-branch=<value>         (required) The base branch that we want to merge into other branches
  -c, --commit                      Commit the changes when the merge takes place
  -e, --exclude-pattern=<value>...  The regex pattern(s) to exclude when running a merge. For example: ^main$
  -i, --include-pattern=<value>...  The regex patterns(s) to include when running a merge. For example: feature.+
  -m, --notify-email=<value>...     Send a notification via SMTP if the merge cannot take place

DESCRIPTION
  Tries to merge the base branch into all of the other ones that have been specified or match a pattern.

  Exclusion takes preference over inclusion, so we will ignore a branch if it triggers in the include and exclude
  patterns.

EXAMPLES
  $ git-auto-merger merge --base-branch=develop --include-pattern='develop
 --include-pattern='feature/.*' --exclude-pattern='main' --notify-email="dev@example.com" --project-name=Test
```

_See code: [dist/commands/merge.ts](https://github.com/entrostat/git-auto-merger/blob/v2.0.12/dist/commands/merge.ts)_

## `git-auto-merger set credentials smtp`

Set the SMTP credentials that should be used to send the alert

```
USAGE
  $ git-auto-merger set credentials smtp -h <value> -u <value> -p <value> -P <value> -f <value> [-s]

FLAGS
  -P, --port=<value>      (required) The SMTP port to use
  -f, --from=<value>      (required) The from email address
  -h, --host=<value>      (required) The SMTP host to connect to
  -p, --password=<value>  (required) The email password
  -s, --tls               TLS enabled
  -u, --username=<value>  (required) The email username

DESCRIPTION
  Set the SMTP credentials that should be used to send the alert

EXAMPLES
  $ git-auto-merger set credentials smtp  --host=smtp.postmarkapp.com --port=587 --username=xxxxx-xxxxx-xxxxx --password=xxxxx-xxxxx-xxxxx --tls --from=info@example.com
```
<!-- commandsstop -->
