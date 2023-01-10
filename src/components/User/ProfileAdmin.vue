<script lang="ts">
import { defineComponent } from 'vue';
import { fb } from '@/firebase';
import Icon from '../shared/Icon.vue';

/** Returns null if not a number */
const getNumber = (num: unknown): number | null => {
  if (typeof num === 'number') {
    return num;
  }
    return null;
}

export default defineComponent({
    name: "ProfileAdmin",
    components: { Icon },
    data() {
        return {
            name: "",
            kcal: null,
            carbs: null,
            fat: null,
            protein: null,
            extras: []
        };
    },
    methods: {
      resetInputs() {
        this.name = '';
        this.kcal = null;
        this.carbs = null;
        this.fat = null;
        this.protein = null;
        this.extras = [];
      },
      async createIngredient() {
          fb.addIngredient({
            id: "null",
            name: this.name.toLowerCase(),
            kcal: getNumber(this.kcal),
            carbs: getNumber(this.carbs),
            fat: getNumber(this.fat),
            protein: getNumber(this.protein),
            extras: this.extras
          }).then(() => {
              this.resetInputs();
              alert("Ingrediens tillagd");
          });
      },
    }
});
</script>

<template>
  <div>
    <div class="row">
      <label
        for="name"
        class="required"
      >Namn</label>
      <input
        id="name"
        v-model="name"
        required
      >
    </div>
    <div class="row">
      <label for="kcal">Kalorier</label>
      <input
        id="kcal"
        v-model="kcal"
        type="number"
      >
    </div>
    <div class="row">
      <label for="carbs">Kolhydrater</label>
      <input
        id="carbs"
        v-model="carbs"
        type="number"
      >
    </div>
    <div class="row">
      <label for="fat">Fett</label>
      <input
        id="fat"
        v-model="fat"
        type="number"
      >
    </div>
    <div class="row">
      <label for="protein">Protein</label>
      <input
        id="protein"
        v-model="protein"
        type="number"
      >
    </div>
    <div class="row">
      <button @click="createIngredient">
        Spara ingrediens <Icon
          icon="fa-solid fa-plus"
          color="#fff"
        />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  flex-direction: row;
  align-items: center;

  label {
    width: 6em;
  }
}
.required::after {
  content: ' *';
  color: red;
}
</style>
