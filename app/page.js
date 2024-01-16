// app/page.js

const getAllItems = async () => {
  const resp = await fetch("http://localhost:3000/api/item/readall")
  const {items} = await resp.json()
  return items
}

const ItemBox = ({item}) => (
  <div>
    <img src={item.image} alt="" />
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
      {items.map(item => <ItemBox item={item} />)}
    </div>
  )
}

export default ReadAllItems
