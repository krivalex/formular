import { defineStore } from 'pinia'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from '@/firebases'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const useFormulaStore = defineStore('main', {
  state: () => ({
    formula: null,
    formula_page: null,
    uploaded_image: null,
    all_formulas: null,
    formulaID: null,
    image_link: null,
  }),
  getters: {
    getterFormulaPage() {
      return this.formula_page
    },
    getterUniqueID() {
      return this.formulaID
    },
    getterImageLink() {
      return this.image_link
    },
  },
  actions: {
    createUniqueId() {
      console.log('createUniqueId')
      this.formulaID = '_' + Math.random().toString(36).substr(2, 9)
      return this.formulaID
    },
    async setFormula(formula) {
      await addDoc(collection(db, 'formulas'), formula).then(() => {
        console.log('Formula added')
      })
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
  },
})
