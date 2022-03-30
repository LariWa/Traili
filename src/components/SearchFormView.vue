<template>
    <div>
        <input id="searchText"
               placeholder="search..."
               @change="onTextChangeACB"
               @keypress="onKeyPressedACB" />
        <select @change="onDropDownChangeACB">
            <option value="">Choose Category:</option>
            <option v-for="item in this.$store.state.categories"
                    :key="item.id"
                    :value="item.id">
                {{ item.name }}
            </option>
        </select>

        <select @change="onDropDownDateChangeACB">
            <option value="">Choose date:</option>
            <option value="03-31">03-31</option>
            <option value="04-01">04-01</option>

        </select>

        <button id="searchBtn" @click="onSearchACB">Search!</button>
    </div>
</template>

<script>
export default {
  data() {
    return {};
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
    onDropDownDateChangeACB: function (event) {
          this.$emit("dateChanged", event.target.value);
      },
  },
};
</script>
