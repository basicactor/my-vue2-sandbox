import { defineStore } from "pinia"

export const useCampaign = defineStore("campaign", {
  //vueで言うとdata()に値する
  state: () => ({
    items: items,
  }),
  //vueで言うとcomputed()に値する
  getters: {
    DoubledCount() {
      return this.count * 10
    },
  },
  //vueで言うとmethod()に値する
  actions: {
    getItemById(id) {
      const matchedItem = this.items.filter((item) => item.id === id)[0]
      return matchedItem
    },
  },
})

const items = [
  {
    actions: "",
    id: "1",
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: "1%",
  },
  {
    actions: "",
    id: "2",
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: "1%",
  },
  {
    actions: "",
    id: "3",
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: "7%",
  },
]
