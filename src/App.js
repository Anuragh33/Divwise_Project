import { useState } from "react"

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
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
    setShowFriend(!showFriend)
  }

  function handleSelectedFriends(friend) {
    setSelelctedFriend(friend)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} onSelect={handleSelectedFriends} />
        {showFriend && <FormAddFriend onAddFriends={handleAddFriend} />}
        <Button onClick={handleFriendForm}>
          {showFriend ? "Close" : "Add Friend!!"}
        </Button>
      </div>
      {selectedFriend && (
        <MainForm
          selectedFriend={selectedFriend}
          setSelelctedFriend={setSelelctedFriend}
        />
      )}
    </div>
  )
}

function FriendsList({ friends, onSelect }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friends friend={friend} key={friend.id} onSelect={onSelect} />
      ))}
    </ul>
  )
}

function Friends({ friend, onSelect }) {
  return (
    <li>
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
      {/* <p className={friend.balance > 0 && "green"}>
        {friend.balance > 0 && `${friend.name} owes you $${friend.balance}`}
      </p>
      <p className={friend.balance < 0 && "red"}>
        {friend.balance < 0 && `You owe him $${Math.abs(friend.balance)}`}
      </p> */}
      <Button onClick={() => onSelect(friend)}>Select</Button>{" "}
    </li>
  )
}

function FormAddFriend({ onAddFriends }) {
  const [name, setName] = useState("")
  const [image, setImage] = useState("https://i.pravatar.cc/48")
  const id = crypto.randomUUID()

  function handleSubmit(e) {
    e.preventDefault()

    if (!name || !image) return

    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id: id,
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
      <Button>Submit</Button>
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

function MainForm({ selectedFriend, setSelelctedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with the {selectedFriend.name} </h2>
      <label>💰 Total Bill</label>
      <input type="text"></input>

      <label>🙋🏻‍♂️ Your expense?</label>
      <input type="text"></input>

      <label>🤷🏻‍♂️ Your friends expense?</label>
      <input type="text"></input>

      <label>🙆🏻‍♂️ How's paying?</label>
      <select>
        <option value="user">You are paying</option>
        <option value="x">{selectedFriend.name} is paying</option>
      </select>

      <Button>Submit</Button>
    </form>
  )
}
