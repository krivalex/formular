import { defineStore } from 'pinia'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebases'

export const useFormulaStore = defineStore('main', {
  state: () => ({
    formula: null,
    formula_page: null,
    all_formulas: null,
  }),
  getters: {
    getFormulaPage() {
      return this.formula_page
    },
  },
  actions: {
    setFormula(formula) {
      this.formula = formula
    },
    getFormula() {
      return this.formula
    },
    async getFormulaPage() {
      await getDocs(collection(db, 'formulas')).then((querySnapshot) => {
        console.log('Total formulas: ', querySnapshot.size)
        querySnapshot.forEach((doc) => {
          this.formula_page = doc.data()
          return this.formula_page
        })
      })
    },
    getFormulas() {
      return this.all_formulas
    },
  },
})
