// app/page.js
import Image from "next/image"

const getAllItems = async () => {
  const resp = await fetch("http://localhost:3000/api/item/readall", {cache: "no-store"})
  const {items} = await resp.json()
  return items
}

const ItemBox = ({item}) => (
  <div>
    <Image src={item.image} width={750} height={500} alt="item-image" priority/>
    <h2>{item.price}</h2>
    <h3>{item.title}</h3>
    <p>{item.description}</p>
  </div>
)

const ReadAllItems = async () => {
  const items = await getAllItems()

  return (
    <div>
      <h1 className="h1-style">こんにちは</h1>
      {items.map(item => <ItemBox key={item._id} item={item} />)}
    </div>
  )
}

export default ReadAllItems
