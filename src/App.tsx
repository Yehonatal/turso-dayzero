import { FormEvent, useEffect, useState } from "react";
import { createTursoClient } from "./createTursoClient";
import "./App.css";

type User = {
    username: string;
    password: string;
};

function App() {
    const [user, setUser] = useState<User>({
        username: "",
        password: "",
    });

    const getDataIntoDb = async (user: User) => {
        const client = createTursoClient();

        try {
            await client.sync();
            const insertUserQuery = `
              INSERT INTO users (username, password)
              VALUES (:username, :password);
          `;
            const result = await client.execute({
                sql: insertUserQuery,
                args: { username: user.username, password: user.password },
            });
            console.log(result.rowsAffected);
        } catch (e) {
            console.error(e);
        }
    };

    const [show, setShow] = useState<boolean>(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        const newUser: User = {
            username: event.currentTarget.username.value,
            password: event.currentTarget.password.value,
        };

        setUser(newUser);
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 3000);

        getDataIntoDb(newUser);
    }

    useEffect(() => {
        console.log("New user added!");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="username"
                        name="username"
                        required
                    />
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        required
                    />
                    <input type="submit" value="submit" />
                </form>
            </div>

            <div>{show && <p>Successfully added user to turso db 😅</p>}</div>
        </>
    );
}

export default App;
