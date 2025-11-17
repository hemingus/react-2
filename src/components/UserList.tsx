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
    const [formData, setFormData] = useState<User>({
        username: "",
        email: "",
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(formData).some(v => !v)) {
            alert("Please fill out all fields.");
            return;
        }
        const newUser = {...formData};
        setUsers(prevUsers => [...prevUsers, newUser]);
        setFormData({username: "", email: ""})
        e.currentTarget.reset();
    }

    const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();

            const form = e.currentTarget.form;
            if(!form) return;
            const index = Array.prototype.indexOf.call(form, e.currentTarget);
            const nextElement = form.elements.item(index + 1);

            if (!nextElement) {
                form.requestSubmit();
                return;
            }
            if (nextElement instanceof HTMLElement) {
                nextElement.focus();
            }
        }
    };

    return (
        <div className="user-component">
            <h2>Users</h2>
            <form className="new-user-form" onSubmit={handleSubmit} action="add user">
                <label htmlFor="name-input">Name: </label>
                <input
                name="username"
                id="name-input" 
                type="text"
                onKeyDown={handleEnterKey}
                onChange={(e) => setFormData(prev => ({...prev, [e.target.name]: e.target.value}))}/>

                <label htmlFor="email-input">Email: </label>
                <input 
                name="email"
                id="email-input" 
                type="text"
                onKeyDown={handleEnterKey}
                onChange={(e) => setFormData(prev => ({...prev, [e.target.name]: e.target.value}))}/>

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