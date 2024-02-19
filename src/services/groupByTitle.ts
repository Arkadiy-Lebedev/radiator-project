
import type { IEyeliner } from "../types/IEyeliner"

export const groupByTitle = (items: IEyeliner[]) => {
  const groups = {}
  items.forEach(item => {
    const { title, text, status, img, type } = item
       // @ts-ignore  
    if (!groups[title]) {
         // @ts-ignore  
      groups[title] = { title, items: [] }
    }
       // @ts-ignore  
    groups[title].items.push({ text, status, img, type })
  })
     // @ts-ignore  
  return Object.values(groups).map(group => ({ title: group.title, items: group.items }))
}