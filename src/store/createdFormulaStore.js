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
      likes: 0,
      dislikes: 0,
      difficulty: 0,
      comments: [],
      category: null,
      kitchen: null,
      description: null,
      link: null,
    },
  }),
  getters: {},
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
    setFormulaDifficulty(difficulty) {
      this.formula.difficulty = difficulty
    },
    setFormulaCategory(category) {
      this.formula.category = category
    },
    setFormulaKitchen(kitchen) {
      this.formula.kitchen = kitchen
    },
    setFormulaDescription(description) {
      this.formula.description = description
    },
    setFormulaLink(link) {
      this.formula.link = link
    },
    async setFormulaImage(file) {
      const storage = getStorage()
      const storageRef = ref(storage, 'formulas/' + file.name)

      uploadBytes(storageRef, file)
        .then(() => {
          console.log('Файл успешно загружен!')

          getDownloadURL(storageRef)
            .then((downloadURL) => {
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

      if (aspectAspectValues.includes(aspect.aspect)) {
        this.formula.aspects.splice(this.formula.aspects.indexOf(aspect.aspect), 1)
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
        likes: 0,
        dislikes: 0,
        comments: [],
        difficulty: this.formula.difficulty,
        category: this.formula.category,
        kitchen: this.formula.kitchen,
        description: this.formula.description,
      }
      await addDoc(collection(db, 'formulas'), this.formula).then(() => {
        console.log('Formula added')
      })
    },
  },
})
