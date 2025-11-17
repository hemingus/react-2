interface UserCardProps {
    username: string
    email: string
}

export default function UserCard({username, email}: UserCardProps) {
    return (
        <li className="user-card">
            <p><strong>Username: </strong>{username}</p>
            <p><strong>Email: </strong>{email}</p>
        </li>
    )
}