<div align="center">
<img height=150 src="src-tauri/icons/icon.png" />
</div>

<p align="center"><span><b>simplefe</b>, based on <a href="https://xplorer.space">Xplore</a> </span></p>

---
## 开发环境
```sh
$ yarn tauri info
--------------------------------------------
--------------------------------------------
Environment
  › OS: Windows 10.0.22621 X64
  › Webview2: 116.0.1938.62
  › MSVC:
      - Visual Studio Community 2022
      - Visual Studio ���ɹ��� 2019
  › Node.js: 18.17.0
  › npm: 9.8.0
  › pnpm: 8.6.12
  › yarn: 1.22.19
  › rustup: 1.26.0
  › rustc: 1.70.0
  › cargo: 1.70.0
  › Rust toolchain: stable-x86_64-pc-windows-msvc

Packages
  › @tauri-apps/cli [NPM]: 1.1.1
  › @tauri-apps/api [NPM]: 1.1.0
  › tauri [RUST]: 1.4.1,
  › tauri-build [RUST]: 1.4.0,
  › tao [RUST]: 0.16.2,
  › wry [RUST]: 0.24.3,

App
  › build-type: bundle
  › CSP: unset
  › distDir: ../out/src
  › devPath: http://localhost:8080/
  › bundler: Webpack
```



---

## Development

If you want to run this project in your local system, please follow this guide:

1. Fork this project

2. Clone the project to your local system using this command

3. Follow [this guide](https://tauri.studio/en/docs/getting-started/intro/#setting-up-your-environment) to set up Tauri environment

```sh
$ git clone https://github.com/<your_github_username>/simplefe.git
```

4. Change directory to the root directory of this project

```sh
$ cd simplefe
```

5. Install all dependencies using [`yarn`](https://yarnpkg.com/)

```sh
$ yarn
```

6. Run the project in development mode. Please note that it might takes some times for Cargo to install dependencies for the first run.

```sh
$ yarn dev
```

---

## LICENSE

[Apache-2.0](https://apache.org/licenses/LICENSE-2.0)

---
