# wasm-demo
using Go to build WASM, for Nodejs

## Env
* Go
    * go1.21.3
* Node.js
    * v18.18.1

## Before
### 確認 wasm_exec.js
需從編譯 wasm 的 go 之 sdk 底下取出
```sh
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .
```


### 設置 .vscode/settings.json
滿足 vscode GO language server
```json
{
    "gopls": {
        "build.env": {
            "GOOS": "js",
            "GOARCH": "wasm"
        }
    }
    // "go.buildTags": "js, wasm"
}
```
