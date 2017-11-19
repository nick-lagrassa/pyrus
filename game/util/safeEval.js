import { VM, VMScript } from 'vm2';
const TIMEOUT_MS = 500;
const vm = new VM({ timeout: TIMEOUT_MS });

// Function, Listof[Any] -> Any | Error
export default (code) => {
    let script;
    let timestamp = Date.now();
    try {
        script = new VMScript(code).compile();
    } catch (e) {
        return e;
    }

    try {
        return vm.run(script);
    } catch (e) {
        if (Date.now() - timestamp > TIMEOUT_MS) {
            return new Error('Timeout has occurred');
        }
        return e;
    }
}
