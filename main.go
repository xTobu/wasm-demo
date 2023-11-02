package main

import (
	"fmt"
	"syscall/js"
	"time"
)

type fn func(this js.Value, args []js.Value) (any, error)

var (
	jsErr     js.Value = js.Global().Get("Error")
	jsPromise js.Value = js.Global().Get("Promise")
)

func asyncFunc(innerFunc fn) js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) any {
		handler := js.FuncOf(func(_ js.Value, promFn []js.Value) any {
			resolve, reject := promFn[0], promFn[1]

			go func() {
				defer func() {
					if r := recover(); r != nil {
						reject.Invoke(jsErr.New(fmt.Sprint("panic:", r)))
					}
				}()

				res, err := innerFunc(this, args)
				if err != nil {
					reject.Invoke(jsErr.New(err.Error()))
				} else {
					resolve.Invoke(res)
				}
			}()

			return nil
		})

		return jsPromise.New(handler)
	})
}

func twoSum(this js.Value, args []js.Value) (result any, err error) {
	fmt.Println("[main.wasm][twoSum] Triggered.")
	fmt.Println("[main.wasm][twoSum] Sleep 1 seconds, test async.")
	time.Sleep(1 * time.Second)
	fmt.Println("[main.wasm][twoSum] Awake!")

	if len(args) != 2 {
		err = fmt.Errorf("[main.wasm][twoSum] args length is not equal two.")
		return
	}

	a, b := args[0].Int(), args[1].Int()
	result = a + b

	return
}

func show(this js.Value, args []js.Value) interface{} {

	return fmt.Sprintf("%v", args)
}

func main() {
	// pure func: 當 Go 處理 goroutine 時, JS 無法等待, 會發生 deadlock
	js.Global().Set("show", js.FuncOf(show))

	// async func: 包裝一層 goroutine, 調用 js.Promise 和 js.Error
	js.Global().Set("twoSum", asyncFunc(twoSum))

	fmt.Println("[main.wasm] Loaded.")

	<-make(chan bool)
}
