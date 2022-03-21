const Hiking = {
  created() {},
  unmounted() {},
  render() {
    return (
      <div>
        test{searchTest()}
        {getDetailsTest()}
      </div>
    );
  },
};
function treatHTTPResponseACB(response) {
  console.log(response);
  /*TODO throw if the HTTP response is not 200, otherwise return response.json()*/
  if (response.status != 200) {
    throw "Invalid response";
  } else {
    return response.json();
  }
}
function searchTest() {
  fetch(
    "http://www.outdooractive.com/api/search/?" +
      new URLSearchParams({
        key: "yourtest-outdoora-ctiveapi",
        q: "Stockholm",
        project: "api-dev-oa",
        lang: "en",
        fallback: false,
      }),

    {
      // object literal
      method: "GET", // HTTP method
      headers: {
        Accept: "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    } /* end of second fetch parameter, object */
  )
    .then(treatHTTPResponseACB)
    .then((res) => console.log(res));
}
function getDetailsTest() {
  fetch(
    "http://www.outdooractive.com/api/project/api-dev-oa/oois/39926651,2923968,26934362?" +
      new URLSearchParams({
        key: "yourtest-outdoora-ctiveapi",
        project: "api-dev-oa",
        lang: "en",
        fallback: false,
      }),
    {
      // object literal
      method: "GET", // HTTP method
      headers: {
        Accept: "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    } /* end of second fetch parameter, object */
  )
    .then(treatHTTPResponseACB)
    .then((res) => console.log(res));
}

export default Hiking;
