import saferEval from 'safer-eval';
import { computed } from 'vue';

const makeEvalCode = (env) => (codeValue) => {
    try {
        const res = saferEval(codeValue, env);
        return JSON.stringify(res, null, 2);
    } catch (err) {
        return `ERROR:  ${JSON.stringify(err, null, 2)}`;
    }
}


export function useSaferEval(codeRef, env) {

    const evalCode = makeEvalCode(env)

    const evaluatedCode = computed(() => evalCode(codeRef.value))

    return { evalCode, evaluatedCode }

}