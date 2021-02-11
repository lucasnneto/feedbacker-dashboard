import Store from '../store'

export default function useStoremodule(module) {
  if (module) return Store[module]
  return Store
}
