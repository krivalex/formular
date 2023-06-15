import { defineStore } from 'pinia'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebases'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const useCreatedFormulaStore = defineStore('createdFormula', {
  state: () => ({
    formula: {
      formulaID: null,
      name: null,
      image_link: null,
      date: null,
      author: null,
      aspects: [],
    },
  }),
  getters: {
    getterFullFormula() {
      return this.formula
    },
    getterFormulaDate() {
      return this.formula.date
    },
    getterFormulaImageLink() {
      return this.formula.image_link
    },
    getterFormulaName() {
      return this.formula.name
    },
    getterFormulaAspects() {
      return this.formula.aspects
    },
  },
  actions: {
    createFormulaID() {
      this.formula.formulaID = '_' + Math.random().toString(36).substr(2, 9)
      return this.formula.formulaID
    },
    createFormula(formula) {
      this.formula = formula
    },
    setFormulaName(name) {
      this.formula.name = name
    },
    async setFormulaImage(file) {
      const storage = getStorage()
      const storageRef = ref(storage, 'formulas/' + file.name)

      uploadBytes(storageRef, file)
        .then((snapshot) => {
          console.log('Файл успешно загружен!')
          console.log('snapshot', snapshot)

          getDownloadURL(storageRef)
            .then((downloadURL) => {
              console.log('Ссылка на загруженный файл:', downloadURL)
              this.formula.image_link = downloadURL
            })
            .catch((error) => {
              console.error('Ошибка получения ссылки на загруженный файл:', error)
            })
        })
        .catch((error) => {
          console.error('Ошибка загрузки файла:', error)
        })
    },
    createFormulaDate() {
      this.formula.date = new Date().toLocaleString()
      return this.formula.date
    },
    setFormulaAuthor() {
      this.formula.author = JSON.parse(localStorage.getItem('user'))
      return this.formula.author
    },
    setFormulaAspects(aspect) {
      let aspectAspectValues = Object.values(this.formula.aspects)
      aspectAspectValues = aspectAspectValues.map((item) => item.aspect)

      console.log('aspectAspectValues', aspectAspectValues)

      if (aspectAspectValues.includes(aspect.aspect)) {
        console.log('includes')
        this.formula.aspects.splice(this.formula.aspects.indexOf(aspect.aspect), 1)
      } else {
        console.log('not includes')
      }
      this.formula.aspects.push(aspect)
    },
    async addFormula() {
      this.formula = {
        formulaID: this.createFormulaID(),
        name: this.formula.name,
        image_link: this.formula.image_link,
        date: this.createFormulaDate(),
        author: this.setFormulaAuthor(),
        aspects: this.formula.aspects,
      }
      console.log('this.formula', this.formula)
      await addDoc(collection(db, 'formulas'), this.formula).then(() => {
        console.log('Formula added')
      })
    },
  },
})
