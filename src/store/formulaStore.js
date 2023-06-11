import { defineStore } from 'pinia'

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useFormulaStore = defineStore('main', {
  state: () => ({
    formula: null,
    formula_page: null,
    all_formulas: null,
  }),
  getters: {},
  actions: {
    setFormula(formula) {
      this.formula = formula
    },
    getFormula(formulaID) {
      return this.formula
    },
    getFormulaPage() {
      return this.formula_page
    },
    getFormulas() {
      return this.all_formulas
    },
  },
})
