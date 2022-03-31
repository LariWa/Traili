<template>
  <div>
    <input
      id="searchText"
      placeholder="search..."
      @change="onTextChangeACB"
      @keypress="onKeyPressedACB"
    />
    <select @change="onDropDownChangeACB">
      <option value="">Choose Category:</option>
      <option v-for="item in categories" :key="item.id" :value="item.id">
        {{ item.name }}
      </option>
    </select>
    <button id="searchBtn" @click="onSearchACB">Search!</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    },
  },
  methods: {
    onTextChangeACB: function (event) {
      this.$emit("searchTextChanged", event.target.value);
    },
    onKeyPressedACB: function (event) {
      if (event.keyCode === 13) {
        //Enter
        this.$emit(
          "searchTextChanged",
          document.getElementById("searchText").value
        );
        document.getElementById("searchBtn").click();
      }
    },
    onSearchACB: function () {
      this.$emit("search");
    },
    onDropDownChangeACB: function (event) {
      this.$emit("categoryChanged", event.target.value);
    },
  },
};
</script>
