import Head from "next/head";
import { useState } from "react";
import { RegularTodoFragmentDoc, useAddTodoMutation, useGetTodosQuery } from "../generated/graphql";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { data, loading, error } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation({
    update(cache, { data: newData }) {
      const { addTodo } = newData as any;
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: RegularTodoFragmentDoc
            });
            return [...existingTodos, newTodoRef];
          }
        }
      });
    }
  });
  const [value, setValue] = useState("");

  return (
    <div className={styles.container}>
      <Head>
        <title>React w/GraphQL server template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Todo List</h1>
        <form className={styles.form} onSubmit={(e) => {
          e.preventDefault();
          addTodo({
            variables: {
              content: value
            }
          });
          setValue("");
        }}>
          <input
            className={styles.input}
            type="text"
            placeholder="Get eggs from the green grocer"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </form>
        {data?.todos.length === 0 ? (
          <div>You have no todos. Make some!</div>
        ) : (
          <ul className={styles.ul}>
            {data?.todos.map((todo, index) => {
              return <li key={index}>{todo.content}</li>;
            })}
          </ul>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/o2bomb/react-graphql"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code available on Github{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
