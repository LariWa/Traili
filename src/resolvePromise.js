function resolvePromise(promiseToResolve, promiseState, notifyACB) {
  promiseState.promise = promiseToResolve;
  promiseState.data = null;
  promiseState.error = null;

  if (notifyACB) notifyACB();
  function saveDataACB(result) {
    if (promiseState.promise !== promiseToResolve) return;
    /* TODO save result in promiseState, as before */
    promiseState.data = result;
    //console.log("search result: %o",result);
    if (notifyACB) notifyACB();
  }

  function saveErrorACB(err) {
    /* TODO same check as above */
    /* TODO save err in promiseState, as before */
    if (promiseState.promise !== promiseToResolve) return;
    promiseState.error = err;
    if (notifyACB) notifyACB();
  }
  if (promiseToResolve !== null)
    promiseToResolve.then(saveDataACB).catch(saveErrorACB);
}

export default resolvePromise;
export { resolvePromise };
