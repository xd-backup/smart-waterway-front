import AppStore from './AppStore'
import EntityStore from './EntityStore'
import DocumentStore from './DocumentStore'

const appStore = new AppStore()
const entityStore = new EntityStore()
const documentStore = new DocumentStore()
const userStore = new userStore()

export default { appStore, entityStore, documentStore, userStore }
