package main

import (
	"encoding/hex"
	"fmt"
	"syscall/js"

	"github.com/ethereum/go-ethereum/crypto"
)

func add(this js.Value, args []js.Value) interface{} {
	a, b := args[0].Int(), args[1].Int()
	return a + b
}

func show(this js.Value, args []js.Value) interface{} {
	a, b := args[0].String(), args[1].String()

	return fmt.Sprintf("%s%s", a, b)
}

func Keccak256(this js.Value, args []js.Value) interface{} {
	if len(args) != 1 {
		return "invalid params"
	}
	data := args[0].String()
	hash := crypto.Keccak256([]byte(data))
	return hex.EncodeToString(hash)
}

func decrypt(this js.Value, args []js.Value) interface{} {
	println("#### decrypt 1")
	aa := args[0].String()
	// fmt.Println("#### decrypt 2 aa: ", aa)
	// fmt.Println("#### decrypt 3")
	// fmt.Println("#### decrypt 5 plainText ", "aaaaa")
	return aa
}

func main() {
	js.Global().Set("add", js.FuncOf(add))
	js.Global().Set("show", js.FuncOf(show))
	js.Global().Set("Keccak256", js.FuncOf(Keccak256))
	js.Global().Set("decA", js.FuncOf(decrypt))
	fmt.Println("[main.wasm] Successfully.")

	<-make(chan bool)
}
