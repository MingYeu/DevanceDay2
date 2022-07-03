import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

export default function Users() {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      if (users) {
        return;
      }
  
      const res = await fetch("/api/getUsers");
      setUsers(await res.json());
    }
    
    getUser()
  }, [users]);

  const handleDelete = useCallback(async (_id) => {
    setIsLoading(true);

    await fetch("/api/deleteUser?_id=" + _id, {
      method: "DELETE"
    });

    setIsLoading(false);
    setUsers(null);
  }, []);

  return (
    <div className="container">
      <section className="section">
        <div className="columns">
          <div className="column">
            <Link passHref href="/users/create">
              <button className="button is-dark">create</button>
            </Link>
          </div>
        </div>
        {!users && <span>loading...</span>}
        <div className="columns is-multiline">
          {users?.map(({ name, country, _id }) => (
            <div key={_id} className="column is-6">
              <div className="card">
                <div className="card-content">
                  <div className="columns is-vcentered">
                    <div className="column">
                      <b>{name}</b>
                      <p>{country}</p>
                    </div>
                    <div className="column is-narrow">
                      <div className="buttons">
                        <Link passHref href={"/users/update/" + _id}>
                          <button
                            disabled={isLoading}
                            className="button is-dark"
                          >
                            update
                          </button>
                        </Link>
                        <button
                          disabled={isLoading}
                          className="button is-danger"
                          onClick={() => handleDelete(_id)}
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}