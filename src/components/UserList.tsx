import { useState, type FormEvent } from "react";
import UserCard from "./UserCard";

const mockData = [
    { username: 'Ola Normann', email: 'ola.normann@norge.no'},
    { username: 'Torleif', email: 'torleif@kodehode.no' },
    { username: 'Jan Egil', email: 'jan.egil@kodehode.no' },
    { username: 'Sander', email: 'sander@kodehode.no' },
]

type User = {
    username: string,
    email: string
}

export default function UserList() {
    const [users, setUsers] = useState<User[]>(mockData);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username || !email) return;
        const newUser = {username, email};
        setUsers(prevUsers => [...prevUsers, newUser]);
        setUsername("");
        setEmail("");
    }

    return (
        <div className="user-component">
            <h2>Users</h2>
            <form onSubmit={handleSubmit} action="add user">
                <label htmlFor="name-input">Name: </label>
                <input 
                id="name-input" 
                type="text"
                onChange={(e) => setUsername(e.currentTarget.value)}/>
                <label htmlFor="email-input">Email: </label>
                <input 
                id="email-input" 
                type="text"
                onChange={(e) => setEmail(e.currentTarget.value)}/>
                <button  type="submit">Submit</button>
            </form>
            <ul className="user-list">
                {users.map(user => {
                    return <UserCard key={user.email} {...user} />
                })}
            </ul>
        </div>
    )
}