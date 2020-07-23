import saferEval from 'safer-eval';
import { computed } from 'vue';

const makeEvalCode = (env) => (code) => {
    try {
        const res = saferEval(code, env);
        return JSON.stringify(res, null, 2);
    } catch (err) {
        return `ERROR: ${err}`;
    }
}

export function useSaferEval(codeRef, env) {

    const evalCode = makeEvalCode(env)

    const evaluatedCodeRef = computed(() => evalCode(codeRef.value))

    return { evalCode, evaluatedCodeRef }

}