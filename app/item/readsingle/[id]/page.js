// app/item/readsingle/[id]/page.js
import Image from "next/image";

const getSingleItem = async (id) => {
  const url = `http://localhost:3000/api/item/readsingle/${id}`
  const resp = await fetch(url, {cache: "no-store"})
  const { item } = await resp.json()
  return item
}

const ReadSingleItem = async (context) => {
  const { image, title, price, description } = await getSingleItem(context.params.id)

  return (
    <div>
      <div>
        <Image src={image} width={750} height={500} alt="item-image" priority />
      </div>
      <div>
        <h1>{title}</h1>
        <h2>{price}</h2>
        <hr/>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default ReadSingleItem
