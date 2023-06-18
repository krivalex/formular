import { defineStore } from 'pinia'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from '@/firebases'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const useFormulaStore = defineStore('main', {
  state: () => ({
    formula: null,
    formula_page: [],
    uploaded_image: null,
    all_formulas: null,
    formulaID: null,
    image_link: null,
    search_query: null,
    searched_formulas: [],
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
    getterSearchQuery() {
      return this.search_query
    },
    getterSearchedFormulas() {
      return this.searched_formulas
    },
  },
  actions: {
    createUniqueId() {
      console.log('createUniqueId')
      this.formulaID = '_' + Math.random().toString(36).substr(2, 9)
      return this.formulaID
    },
    setSearchQuery(query) {
      this.search_query = query
    },
    async searchFormulas() {
      await getDocs(collection(db, 'formulas')).then((querySnapshot) => {
        let uniqueFormulas = new Set()

        querySnapshot.forEach((doc) => {
          if (this.search_query === null || this.search_query === '') {
            this.searched_formulas = []
            return this.searched_formulas
          }

          const name_check = doc.data().name.toLowerCase().includes(this.search_query.toLowerCase())
          const description_check = doc.data().description.toLowerCase().includes(this.search_query.toLowerCase())
          const category_check = doc.data().category.toLowerCase().includes(this.search_query.toLowerCase())
          const kitchen_check = doc.data().kitchen.toLowerCase().includes(this.search_query.toLowerCase())
          const aspects = doc.data().aspects
          const aspects_check = Object.values(aspects).some((aspect) => {
            return Object.values(aspect).some((aspect_one) => {
              return String(aspect_one).toLowerCase().includes(this.search_query.toLowerCase())
            })
          })

          if (name_check || description_check || aspects_check || category_check || kitchen_check) {
            uniqueFormulas.add(doc.data())
            this.searched_formulas = Array.from(uniqueFormulas)
            return this.searched_formulas
          }
        })
      })
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
          this.formula_page.push(doc.data())
        })
        return this.formula_page
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
