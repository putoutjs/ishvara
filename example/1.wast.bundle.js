// example/1.wast.ts
import { create } from "#operator-wasm";
var stack = [];
var imports = [
  ["console", "log", function log(i322) {
    return i322;
  }]
];
var {
  i32,
  local,
  call
} = create({
  stack,
  imports
});
function x(a, b) {
  i32.add(local.get(a), local.get(b));
  call("log");
}
export {
  imports,
  stack,
  x
};
