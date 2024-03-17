import { useEffect, useState } from "react"

export const useGetProductDataGroups = () => {

  const [ productGroups, setProductGroups ] = useState([[]])
  const [ fetchedProductData, setFetchedProductData ] = useState([])

  useEffect(() => {

    const fetchProductData = async () => {

      const products = [
        {
          id: 1,
          img: './images/le-tombeau-cover.jpg',
          name: 'TEKALLI DUO: DUALITY',
          description: 'CD Album - Works by Olivier Messiaen, Maurice Ravel, and Michael Brown.',
          price: 15
        },
        {
          id: 2,
          img: './images/le-tombeau-cover.jpg',
          name: 'MAURICE RAVEL: Le tombeau de Couperin, transcription for violin and piano',
          description: 'A challenging transcription of a work by one of my all time favorite composers Maurice Ravel.',
          price: 20
        },
        {
          id: 3,
          img: './images/le-tombeau-cover.jpg',
          name: 'BILL EVANS: Waltz for Debby',
          description: 'A challenging transcription for violin and piano of Bill Evan\'s tune Waltz for Debby.' ,
          price: 15
        },
        {
          id: 4,
          img: './images/le-tombeau-cover.jpg',
          name: 'P. I. TCHAIKOVSKY: The Nutcracker Transcriptions',
          description: 'A challenging set of transcriptions for violin and piano of movements from Tchaikovsky\'s Nutcracker Suite.',
          price: 20
        },
        {
          id: 5,
          img: './images/le-tombeau-cover.jpg',
          name: 'ENRIQUE GRANADOS: La maja y el ruiseñor & El pelele',
          description: 'Two transcriptions for violin and piano from Granados\'s opera "Goyescas"',
          price: 20
        },
      ]
    
      const groupsOfThree: any[][] = [] 
      products.forEach((product, index) => {
        if (index % 3 === 0) {
          groupsOfThree.push([])
        }
        groupsOfThree[groupsOfThree.length - 1].push(product)
      })
    
      const leftOver = 3 - groupsOfThree[groupsOfThree.length - 1].length
      for (let i = 0; i < leftOver; i++) {
        groupsOfThree[groupsOfThree.length - 1].push(null)
      }
    
      setProductGroups(groupsOfThree)
      setFetchedProductData(products)
    }

    fetchProductData()

  }, [])

  return { productGroups, fetchedProductData }
}