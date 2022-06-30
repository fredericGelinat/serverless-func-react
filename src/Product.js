import React,{useState, useEffect} from 'react'
import axios from  'axios'
import {Link, useParams} from 'react-router-dom'



export const Product = () => {
    const [loading, setloading] = useState(true);
    const [product, setProduct]= useState(null);
    const {productID} = useParams()
    const fetchData = async ()=>{
        try {
            const {data} = await axios.get(`/api/products?id=${productID}`)
            setProduct(data)
        } catch (error) {
            
        }
        setloading(false)
    }
    useEffect(() => {
        fetchData()
    })
    if(loading){
        return (<section className='section section-center'>
            <h2>loading...</h2>
        </section>)
    }
    const {fields} = product
    const {name, desc, price, image} = fields
    console.log(name)
  return (
    <section className='section section-center'>

    <Link to="/" className='link'>
        back home
    </Link>
    <div>
        <div className='title'>
            <h2>{name}</h2>
            <div className='title-underline'></div>
        </div>
        <article className='single-product'>
            <img className='single-product-img' src={image[0].url} alt={name}/>
        <div>
            <h5>{name}</h5>
            <h5 className='price'>€{price}</h5>
            <p>{desc}</p>
        </div>
        </article>
    </div>
    </section>
  )
}
export default Product