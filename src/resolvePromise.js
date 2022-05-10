function resolvePromise(promiseToResolve, promiseState, notifyACB) {
  promiseState.promise = promiseToResolve;
  promiseState.data = null;
  promiseState.error = null;

  if (notifyACB) notifyACB();
  function saveDataACB(result) {
    if (promiseState.promise !== promiseToResolve) return;
    if (!result) promiseState.data = [];
    else promiseState.data = result;
    if (notifyACB) notifyACB();
  }

  function saveErrorACB(err) {
    if (promiseState.promise !== promiseToResolve) return;
    promiseState.error = err;
    if (notifyACB) notifyACB();
  }
  if (promiseToResolve !== null)
    promiseToResolve.then(saveDataACB).catch(saveErrorACB);
}

export default resolvePromise;
export { resolvePromise };
