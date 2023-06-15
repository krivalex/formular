import { defineStore } from 'pinia'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebases'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const useCreatedFormulaStore = defineStore('main', {
  state: () => ({
    formula: {
      formulaID: null,
      name: null,
      image_link: null,
      date: null,
      author: null,
      aspects: [
        {
          stroke: null,
          aspect: null,
          count: null,
          unit: null,
        },
      ],
    },
  }),
  getters: {
    getterFullFormula() {
      return this.formula
    },
  },
  actions: {
    createFormulaID() {
      this.formula.formulaID = '_' + Math.random().toString(36).substr(2, 9)
      return this.formula.formulaID
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
              this.image_link = downloadURL
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
      const dateNow = new Date()
      this.formula.date = dateNow
    },
    setFormulaAuthor(author) {
      this.formula.author = author
    },
    setFormulaAspects(aspect) {
      this.formula.aspects.push(aspect)
    },
    async setFormula() {
      await addDoc(collection(db, 'formulas'), this.formula).then(() => {
        console.log('Formula added')
      })
    },
  },
})
