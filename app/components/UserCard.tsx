type UserCardProps = {
  name: string;
  email: string;
};

export function UserCard({ name, email }: UserCardProps) {
  return (
    <article>
      <h3>{name}</h3>
      <p>{email}</p>
    </article>
  );
}