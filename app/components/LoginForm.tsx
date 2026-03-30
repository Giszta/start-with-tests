import React, { useState } from "react";

type LoginFormProps = {
    onSubmit: (data: { email: string; password: string }) => void;
}

export function LoginForm({onSubmit}: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { email?: string; password?: string } = {};

        if (!email.includes('@')) {
            newErrors.email = 'Podaj poprawny email';
        }

        if (password.length < 6) {
            newErrors.password = 'Hasło musi zawierać co najmniej 6 znaków';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }
        onSubmit({ email, password });
    };

    return (
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
            <label htmlFor="password">Hasło</label>
            <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        {errors.password && <p>{errors.password}</p>}
    </div>
        <button type="submit">Zaloguj</button>
    </form>
    );
};