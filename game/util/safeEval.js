import { VM, VMScript } from 'vm2';
const vm = new VM({ timeout: 1000 });

// Function, Listof[Any] -> Any | Error
export default (code) => {
    let script;
    try {
        script = new VMScript(code).compile();
    } catch (e) {
        return e;
    }

    try {
        return vm.run(script);
    } catch (e) {
        return new Error('Timeout has occurred');
    }
}
