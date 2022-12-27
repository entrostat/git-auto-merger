# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

### [1.6.1](https://github.com/entrostat/git-auto-merger/compare/v1.6.0...v1.6.1) (2022-12-27)


### Bug Fixes

* **logging:** Added the base merge branch to the logs ([7eedbb9](https://github.com/entrostat/git-auto-merger/commit/7eedbb96efcbb9e3403a9f41e5b13d5647d43635))
* **version:** Installed the latest version of entro-version for release management ([83be550](https://github.com/entrostat/git-auto-merger/commit/83be5502ec78e3129e1308e39f45ed9f8cef11ee))

## [1.6.0](https://github.com/entrostat/git-auto-merger/compare/v1.5.2...v1.6.0) (2022-12-14)


### Features

* **logging:** Use git status instead of git diff so get a better overview of the merge conflicts ([23e512b](https://github.com/entrostat/git-auto-merger/commit/23e512b52176f3ad4f9e0fa4cdac11a26f9329c4))

### [1.5.2](https://github.com/entrostat/git-auto-merger/compare/v1.5.1...v1.5.2) (2022-12-14)


### Bug Fixes

* **git:** Allow unrelated histories ([6a7fab9](https://github.com/entrostat/git-auto-merger/commit/6a7fab9e82a96dbb666135c791ab4607176e7692))

### [1.5.1](https://github.com/entrostat/git-auto-merger/compare/v1.5.0...v1.5.1) (2022-12-14)


### Bug Fixes

* **logging:** Fixed the output, removed a ':' in one of the sentences ([80d9a89](https://github.com/entrostat/git-auto-merger/commit/80d9a89360a24e658de01b4c66d42afefa8577ea))

## [1.5.0](https://github.com/entrostat/git-auto-merger/compare/v1.4.0...v1.5.0) (2022-12-14)


### Features

* **logging:** Output the branches that were found at the start ([8ab022d](https://github.com/entrostat/git-auto-merger/commit/8ab022d1a9f3e4c710e686ab85a33b88af759437))

## [1.4.0](https://github.com/entrostat/git-auto-merger/compare/v1.3.0...v1.4.0) (2022-12-14)


### Features

* **git:** Checkout all of the local branches so that we can merge into each one ([7ff4937](https://github.com/entrostat/git-auto-merger/commit/7ff49370f60c055980e65577ab6a6b6a61543075))

## [1.3.0](https://github.com/entrostat/git-auto-merger/compare/v1.2.0...v1.3.0) (2022-12-14)


### Features

* **git:** List all of the branches ([64755d3](https://github.com/entrostat/git-auto-merger/commit/64755d313052b68e800787e66eed2e91793ff2b8))

## [1.2.0](https://github.com/entrostat/git-auto-merger/compare/v1.1.2...v1.2.0) (2022-12-14)


### Features

* **cli:** Added the patterns that are being filtered on ([b5dca38](https://github.com/entrostat/git-auto-merger/commit/b5dca38cc8d2326041b2d2dfda17c727615ae4bd))

### [1.1.2](https://github.com/entrostat/git-auto-merger/compare/v1.1.1...v1.1.2) (2022-12-14)


### Bug Fixes

* **keywords:** Added keywords for the CLI ([4a39aca](https://github.com/entrostat/git-auto-merger/commit/4a39acaf7c85f3bacc210801f2d303238cc54a36))

### [1.1.1](https://github.com/entrostat/git-auto-merger/compare/v1.1.0...v1.1.1) (2022-12-14)


### Bug Fixes

* **build:** Added a note about running with npm not yarn ([bf66617](https://github.com/entrostat/git-auto-merger/commit/bf66617cc0277c0902970fb23cafbd556fca1dd9))
* **build:** Check out the develop branch after publishing ([25e9d30](https://github.com/entrostat/git-auto-merger/commit/25e9d306f85e892d600a1f7e753ce8ad5334df08))

## [1.1.0](https://github.com/entrostat/git-auto-merger/compare/v1.0.3...v1.1.0) (2022-12-14)


### Features

* **build:** Added the publish package script ([e4ba158](https://github.com/entrostat/git-auto-merger/commit/e4ba158b0ef02c143e5de769aa999fbd876a0145))


### Bug Fixes

* **name:** Changed the name from auto-merge to auto-merger ([8759e28](https://github.com/entrostat/git-auto-merger/commit/8759e285424b02f6b314fe6626da0c1a24765450))

### [1.0.3](https://github.com/entrostat/git-auto-merger/compare/v1.0.2...v1.0.3) (2022-12-14)


### Bug Fixes

* **name:** Changed the name to allow us to publish to npm ([86c82e9](https://github.com/entrostat/git-auto-merger/commit/86c82e919524d726162dcfb38656289b53833f1d))

### [1.0.2](https://github.com/entrostat/git-auto-merger/compare/v1.0.1...v1.0.2) (2022-12-14)


### Bug Fixes

* **build:** Changed the name of the bin file and changelog repo entries ([6f904c1](https://github.com/entrostat/git-auto-merger/commit/6f904c14ded6833249acda1b515c9f8a76a7f586))

### [1.0.1](https://github.com/entrostat/git-auto-merger/compare/v1.0.0...v1.0.1) (2022-12-14)


### Bug Fixes

* **build:** Changed the name of the auto-merge package ([185cdbf](https://github.com/entrostat/git-auto-merger/commit/185cdbf34c95561d3de27caca7d819111ba7b2f2))
* **build:** Set the minimum node requirement to 16 ([886eb0c](https://github.com/entrostat/git-auto-merger/commit/886eb0cdba7445adc22c4b209f637a217aadd65a))

## 1.0.0 (2022-12-14)


### Features

* **merge:** Added the ability to merge a base branch into other branches to see if it succeeded or not ([421cd56](https://github.com/entrostat/git-auto-merger/commit/421cd56188928ed522c7dff63cfbd20ad1c20cb0))
* **notifications:** Added the email notification to the merge command ([108c5fd](https://github.com/entrostat/git-auto-merger/commit/108c5fd38821855d175a3936f630e60bf2224d7a))
* **versioning:** Added entro-version to the project ([6ad3101](https://github.com/entrostat/git-auto-merger/commit/6ad31014da49f77567b71e2771ded23be13ab2c4))
* **versioning:** Added the release script ([4b19b96](https://github.com/entrostat/git-auto-merger/commit/4b19b96d6d10cc8345986220d573706b436e0fa3))


### Bug Fixes

* **versioning:** Set the main branch name to main ([efd53c4](https://github.com/entrostat/git-auto-merger/commit/efd53c4f2defe0bd7efc1476fccca556845923d8))
