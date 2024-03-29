// app/page.js
import Image from "next/image"
import Link from "next/link";

const getAllItems = async () => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readall`, {cache: "no-store"})
  const {items} = await resp.json()
  return items
}

const ItemBox = ({item: {_id, image, price, title, description}}) => (
  <Link href={`/item/readsingle/${_id}`}>
    <Image src={image} width={750} height={500} alt="item-image" priority />
    <h2>{price}</h2>
    <h3>{title}</h3>
    <p>{description.substring(0, 80)}...</p>
  </Link>
)

const ReadAllItems = async () => {
  const items = await getAllItems()

  return (
    <div className="grid-container-in">
      {items.map(item => <ItemBox key={item._id} item={item} />)}
    </div>
  )
}

export default ReadAllItems
