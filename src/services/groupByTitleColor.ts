
import type { IColor } from "../types/IColor"

export const groupByTitleColor = (items: IColor[]) => {
  const groups = {}
  items.forEach(item => {
    const { title, text, bg, img } = item
       // @ts-ignore  
    if (!groups[title]) {
         // @ts-ignore  
      groups[title] = { title, items: [] }
    }
       // @ts-ignore  
    groups[title].items.push({ text, bg, img })
  })
     // @ts-ignore  
  return Object.values(groups).map(group => ({ title: group.title, items: group.items }))
}