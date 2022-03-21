import { getHikeDetails, searchHike } from "../hikeSource.js";

const Hiking = {
  created() {
    searchHike("Stockholm");

    getHikeDetails(39926651);
  },
  unmounted() {},
  render() {
    return <div></div>;
  },
};

export default Hiking;
