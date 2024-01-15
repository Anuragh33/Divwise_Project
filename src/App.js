import { useState } from "react"

const initialFriends = [
  {
    id: 118836,
    name: "Amar",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Rakesh",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anandh",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
  {
    id: 468432,
    name: "Rajesh",
    image: "https://i.pravatar.cc/48?u=468432",
    balance: 23,
  },
]

export default function App() {
  const [showFriend, setShowFriend] = useState(false)
  const [friends, setFriends] = useState(initialFriends)
  const [selectedFriend, setSelelctedFriend] = useState(null)

  function handleFriendForm() {
    setShowFriend(!showFriend)
  }

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend])
    setShowFriend(false)
  }

  function handleSelectedFriends(friend) {
    // setSelelctedFriend(friend)
    setSelelctedFriend((cur) => (cur?.id === friend.id ? "" : friend))
    setShowFriend(false)
  }

  function handleSplitBill(value) {
    setFriends((friends) => {
      return friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    })
    setSelelctedFriend(null)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelect={handleSelectedFriends}
        />

        {showFriend && <FormAddFriend onAddFriends={handleAddFriend} />}

        <Button onClick={handleFriendForm}>
          {showFriend ? "Close" : "Add Friend!!"}
        </Button>
      </div>

      {selectedFriend && (
        <MainForm
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  )
}

function FriendsList({ friends, onSelect, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friends
          friend={friend}
          key={friend.id}
          onSelect={onSelect}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  )
}

function Friends({ friend, onSelect, selectedFriend }) {
  const isSelect = selectedFriend?.id === friend.id
  return (
    <li className={isSelect ? " selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p>{friend.balance === 0 && "All balances are settled!!"}</p>
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${friend.balance}
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">You owe him ${Math.abs(friend.balance)}</p>
      )}
      <Button onClick={() => onSelect(friend)}>
        {!isSelect ? "Select" : "Close"}
      </Button>{" "}
    </li>
  )
}

function FormAddFriend({ onAddFriends }) {
  const [name, setName] = useState("")
  const [image, setImage] = useState("https://i.pravatar.cc/48")

  function handleSubmit(e) {
    e.preventDefault()

    if (!name || !image) return
    const id = crypto.randomUUID()

    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    }

    onAddFriends(newFriend)

    setName("")
    setImage("https://i.pravatar.cc/48")
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🚶🏻‍♂️ Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>📸 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  )
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}

function MainForm({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("")
  const [paidByUser, setPaidByUser] = useState("")
  const paidByFriend = bill ? bill - paidByUser : ""
  const [whoIsPaying, setWhoIsPaying] = useState("user")

  function handleSubmit(e) {
    e.preventDefault()

    if (!bill || !paidByUser) return
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser)
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with the {selectedFriend.name} </h2>
      <label>💰 Total Bill</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>

      <label>🙋🏻‍♂️ Your expense?</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      ></input>

      <label>🤷🏻‍♂️ {selectedFriend.name}'s expense?</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🙆🏻‍♂️ How's paying?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You are paying</option>
        <option value="friend">{selectedFriend.name} is paying</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  )
}
