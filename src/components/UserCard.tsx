interface UserCardProps {
    username: string
    email: string
}

export default function UserCard({username, email}: UserCardProps) {
    return (
        <li className="user-card">
            <p>{`Username: ${username}`}</p>
            <p>{`Email: ${email}`}</p>
        </li>
    )
}