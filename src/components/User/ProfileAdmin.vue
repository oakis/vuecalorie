<template>
  <div>
    <input
      v-model="ingredientInputValue"
      placeholder="Lägg till ingrediens"
    >
    <button @click="createIngredient">
      Spara ingrediens <Icon
        icon="fa-solid fa-plus"
        color="#fff"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fb } from '@/firebase';
import Icon from '../shared/Icon.vue';

export default defineComponent({
    name: "ProfileAdmin",
    components: { Icon },
    data: function () {
        return {
            ingredientInputValue: ""
        };
    },
    methods: {
        async createIngredient() {
            fb.addIngredient({ id: "undefined", name: this.ingredientInputValue.toLowerCase() }).then(() => {
                this.ingredientInputValue = "";
                alert("Ingrediens tillagd");
            });
        },
    }
});
</script>

<style scoped lang="scss">
</style>
