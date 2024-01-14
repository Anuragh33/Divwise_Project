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

  return (
    <div className="app">
      <div className="sidebar">
        <FriedsList />
        {showFriend && <FormAddFriend />}
        <Button>Add Friend!!</Button>
      </div>
      <MainForm />
    </div>
  )
}

function FriedsList() {
  const friends = initialFriends
  return (
    <ul>
      {friends.map((friend) => (
        <Friends friend={friend} key={friend.id} />
      ))}
    </ul>
  )
}

function Friends({ friend }) {
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
      <Button>Select</Button>{" "}
    </li>
  )
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>🚶🏻‍♂️ Friend name</label>
      <input type="text"></input>
      <label>📸 Image URL</label>
      <input type="text"></input>
      <Button>Submit</Button>
    </form>
  )
}

function Button({ children }) {
  return <button className="button">{children}</button>
}

function MainForm() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with the x</h2>
      <label>💰 Total Bill</label>
      <input type="text"></input>

      <label>🙋🏻‍♂️ Your expense?</label>
      <input type="text"></input>

      <label>🤷🏻‍♂️ Your friends expense?</label>
      <input type="text"></input>

      <label>🙆🏻‍♂️ How's paying?</label>
      <select>
        <option value="user">You are paying</option>
        <option value="x">Your friend is paying</option>
      </select>

      <Button>Submit</Button>
    </form>
  )
}
