import React from 'react'
import { useParams} from 'react-router-dom'
import { Breadcrumb} from 'react-icons/io'

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};


const Products = () => {
  const [ products, setProducts] = useState(null)
  const [ activeClick, setActiveClick] = useState(null)
  const [params] =useSearchParams()
  const [sort, setSort] = useState('')

  const fetchProductsByCategory = async (queries) => {
    const response = await apiGetProducts(queries)
    if ( response.success) setProducts(response.products)
  }
 
    const { categgory } =useParams()
    useEffect(() => {
      const queries = object.fromEntries([...params])
      let priceQuery = {}
      if (queries.to && queries.from ) {
        priceQuery ={
          $and: [
            { price: { gte: queries.from}},
            { price: { lte: queries.to}}
          ]
        }
        delete queries.price
      } else {
        if (queries.from) queries.price = { gte: queries.from}
        if (queries.to) queries.price = { lte: queries.to}
      }


      delete queries.to
      delete queries.from
      const q = { ...priceQuery, ...queries}
      fetchProductsByCategory(queries)
      window.scrollTo(0, 0)
    },[params])
    const changeActiveFilter =useCallback((name) => {
      if (activeClick === name) setActiveClick(null)
        else setActiveClick(name)
    }, [activeClick])
    const changeValue = useCallback((value) => {
      setSort(value)
    }, [sort])
      
    return(
    <div className = 'w-full'> 
    <div className="h-[81px] flex justify-center items-center bg-gray-100">
    <div  className="w-main">
      <h3 className="font-semibold uppercase">
        {categgory}
      </h3>
      <Breadcrumb
        category={category}
      />
    </div>
  </div>
  <div className='w-main boder p-4 flex justify-between'>
    <div className= 'w-4/5 flex-auto flex flex-col gap-3'>
      <span className= 'font-semibold text-sm'>Filter by</span>
    </div>
    <div className='w-1/5 flex'>
        sort by
    </div>
    <div className= 'mt-8 w-main m-auto'>
      Products
      </div>
      <Masony
        breakpointCols={breakpointColumnsObj}
        className=" my-masonry-grid flex mx-[-10px]"
        columnclassName="my-masonry-grid_column">
          {products?.map(el =>(
            <Product
            key={index}
            pid={el.id}
            productData={el}
            nomarl={true}
            />
          ))}
        </Masony>
    
    <div className='w-full h-[500px]'>

    </div>

  </div>
  </div>
  

)
}

export default Products