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

interface IExtra {
  label: string;
  value: number;
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
            extras: [] as IExtra[]
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
            ...this.extras.map(extra => ({ label: extra.label.toLowerCase(), value: extra.value} )).reduce((obj, item) => ({...obj, [item.label]: item.value}) ,{})
          }).then(() => {
              this.resetInputs();
              alert("Ingrediens tillagd");
          });
      },
      addExtra() {
        this.extras.push({ label: '', value: 0 })
      }
    }
});
</script>

<template>
  <div>
    <h3>Info</h3>
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
    <h3>Extra</h3>
    <div
      v-for="(extra, index) in extras"
      :key="`extras-${index}`"
      class="row"
    >
      <input
        v-model="extra.label"
        type="text"
      >
      <input
        v-model="extra.value"
        type="number"
      >
    </div>
    <button @click="addExtra">
      Lägg till extra <Icon
        icon="fa-solid fa-plus"
        color="#fff"
      />
    </button>
    <div class="spacer" />
    <div class="row">
      <button
        :disabled="name.length < 2"
        :class="{ disabled: name.length < 2 }"
        @click="createIngredient"
      >
        Spara ingrediens <Icon
          icon="fa-solid fa-plus"
          color="#fff"
        />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
#app {
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.5em;

    label {
      width: 6em;
    }
  }
  .required::after {
    content: ' *';
    color: red;
  }
  .spacer {
    padding: 1em;
  }

  button.disabled {
    opacity: 0.5;
  }
}
</style>
