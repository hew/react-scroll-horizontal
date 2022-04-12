# 👨🏼‍💻 contributing

I would love your help to improve this project! Here are a few ways to contribute, and some guidelines to help you along the way.

## 🐛 issues

If you come across any bugs or something that doesn't seem right, please [open an issue][issues]. Also, if you have an idea for the project, open an issue to start the discussion.

When possible, please include a link to a `git` repository or a [CodeSandbox][codesandbox] which illustrates the problem you're facing. This is especially important when you find a bug.

## 🔃 pull requests

Yes, I accept pull requests! You can submit a pull request to fix a bug, implement a feature, add tests, or improve the documentation.

If you've never created a pull request before, you can [learn how][kcd-pr] for free!

### 🎛 setup

In order to submit a pull request, you'll have to setup your own development environment. Start by [forking][fork] the repository.

Then you can clone the forked repository to your system.

```bash
git clone https://github.com/<username>/react-library-starter
```

Next you need to install the dependencies.

```bash
cd react-library-starter
npm install
```

Finally, you can build and test the project.

```bash
npm run test
npm run build
```

Now you're ready to start writing code!

### 💎 format

When writing your code, please try to follow the existing code style.

Your code will be automatically linted and formatted before each commit. However, if you want to manually lint and format, use the provided `npm` scripts.

```bash
npm run lint:fix
npm run format:fix
```

### 🧪 tests

The project maintains `100%` test coverage. If you change code, please maintain complete test coverage. You can run the tests to confirm.

```bash
npm run test
```

### 📖 documentation

If you make any changes that require documentation updates, please include them in the same pull request.

### 🔹 commits

This project do not enforce a specific commit style. However, if you submit a pull request that closes an issue, please reference it in the commit message.

```bash
git commit -m "Fix a bug. Closes #1."
```

### 💬 feedback

Once your pull request is submitted, I may provide you with some feedback. While working on the feedback, please move the pull request to `Draft` state. Once you've finished addressing the feedback, mark the pull request as `Ready for review` and mention me in a comment.

```
Alright @bradgarropy, how's this?
```

### ⚖ license

Any code you contribute is subject to the [MIT license][license].

## ✨ contributors

I appreciate any and all types of contributions to this project! Contributors are recognized here and in the [`readme`][contributors].

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://bradgarropy.com"><img src="https://avatars.githubusercontent.com/u/11336745?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brad Garropy</b></sub></a><br /><a href="https://github.com/bradgarropy/react-library-starter/commits?author=bradgarropy" title="Code">💻</a> <a href="https://github.com/bradgarropy/react-library-starter/commits?author=bradgarropy" title="Documentation">📖</a> <a href="https://github.com/bradgarropy/react-library-starter/commits?author=bradgarropy" title="Tests">⚠️</a> <a href="#infra-bradgarropy" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

[issues]: https://github.com/bradgarropy/react-library-starter/issues
[codesandbox]: https://codesandbox.io
[kcd-pr]: https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github
[license]: https://github.com/bradgarropy/react-library-starter/blob/master/license
[fork]: https://github.com/bradgarropy/react-library-starter/fork
[contributors]: https://github.com/bradgarropy/react-library-starter#-contributors
