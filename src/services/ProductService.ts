import { safeParse } from "valibot"
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types"
import axios from "axios"
import { toBoolean } from "../utils"

const url = import.meta.env.VITE_API_URL

type ProductData = {
    [k: string]: FormDataEntryValue
}

export async function addProduct(data: ProductData) {
    try {

        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if (result.success) {
            await axios.post(`${url}/api/products`, {
                name: result.output.name,
                price: result.output.price
            })

        } else {
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)

    }
}

export async function getProducts() {
    try {
        const { data } = await axios.get(`${url}/api/products`)
        const result = safeParse(ProductsSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(id: Product['id']) {
    try {
        const { data } = await axios.get(`${url}/api/products/${id}`)
        const result = safeParse(ProductSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function editProduct(data: ProductData, id: Product['id']) {
    try {
        const result = safeParse(ProductSchema, {
            name: data.name,
            price: +data.price,
            availability: toBoolean(data.availability.toString()),
            id
        })
        if (result.success) {
            const { data } = await axios.put(`${url}/api/products/${id}`, result.output)
            console.log(data)
        }
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id: Product['id']) {
    try {
        await axios.delete(`${url}/api/products/${id}`)

    } catch (error) {
        console.log(error)
    }
}

export async function updateProductAvailability(id: Product['id']) {
    try {
        await axios.patch(`${url}/api/products/${id}`)
    } catch (error) {
        console.log(error)
    }
}