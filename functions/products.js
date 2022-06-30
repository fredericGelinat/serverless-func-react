require('dotenv').config()

const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appYLBb3bqKnaiGXo')
  .table('products')



exports.handler = async (event, context) => {
  const { id } = event.queryStringParameters;
  if (id) {
    try {
        const product = await airtable.retrieve(id)
        const singleProduct = product.fields;
        // const finalProduct ={id, ...singleProduct};

        if(product.error){
            return{
                headers:{
                    "Access-Control-Allow-Origin": "*",
                },
                statusCode:404,
                body:`no product with id : ${id}`,
            }
        }
        return{
            headers:{
                "Access-Control-Allow-Origin": "*",
            },
            statusCode:200,
            body:JSON.stringify(finalProduct)
        }
    } catch (error) {
        return{
            statusCode:500,
            body:`server error`,
        }
    }
    
  }
  try {
    const {records} = await airtable.list()
    const products = records.map((product)=>{
        const {id} = product;
        const {name, image, price} = product.fields
        const url = image[0].url
        return {id, name, url, price}
    })
    return {
        headers:{
            "Access-Control-Allow-Origin": "*",
        },
        statusCode: 200,
        body: JSON.stringify(products),
    }
} catch (error) {
    return {
        statusCode: 500,
        body: 'general server error',
    }
}
};


