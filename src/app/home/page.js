"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/firebase/auth";
import Loader from "@/components/Loader";
import { db } from "@/firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  Timestamp,
} from "firebase/firestore";
import {AiOutlinePlus,AiFillDelete} from 'react-icons/ai'


const page = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const { authUser, isLoading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/login");
    }
    if(!!authUser){
      fetchTodo(authUser.uid)
    }
  }, [authUser, isLoading]);

  const addtoTodo = async () => {
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        owner: authUser.uid,
        content: todoInput,
        complete: false,
        date: Timestamp.fromDate(new Date("August 11, 2023")),
      });
      console.log("Document written with ID: ", docRef.id);
      fetchTodo(authUser.uid)
      setTodoInput("")
    } catch (error) {
      console.log(error);
    }
  };

  const markAsCompleted = async(event,docId) => {
    try {
      const docRefd = doc(db, "todos", docId)
      await updateDoc(docRefd,{
        completed: event.target.checked
      })
      fetchTodo(authUser.uid)
    } catch (error) {
      console.error(error);
    }
  }

  const deleteTodo = async(docId) => {
    try {
      const deletetodo = await deleteDoc(doc(db,"todos", docId))
      fetchTodo(authUser.uid)
    } catch (error) {
      console.error(error);
    }
  }
 
  const fetchTodo = async (uid) => {
    try {
      const q = query(collection(db, "todos"), where("owner", "==", uid));

      const querySnapshot = await getDocs(q);
      let data = []
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        data.push({...doc.data(), id: doc.id})
      });
      setTodos(data)
    } catch (error) {
      console.error(error);
    }
  };

  const onkeyUp = (event) => {
    if(event.key === "Enter" && todoInput.length > 0 ){
      addtoTodo()
    }
  }
  return !authUser ? (
    <Loader />
  ) : (
    <>
      <header className="bg-teal-400 p-2 h-10 w-full flex items-end justify-end">
        <button
          className="bg-transparent w-24 text-white rounded-sm"
          onClick={signOut}
        >
          Logout
        </button>
      </header>
      <div className="w-96 h-auto mt-20 container mx-auto p-6 bg-white shadow">
        <h3 className="text-3xl text-center font-bold text-indigo-300">
          Todos
        </h3>

        <div className="w-full flex justify-between items-center">
          <input
            type="text"
            placeholder="Add Task"
            className="outline-none border-b-2 w-54  placeholder:text-xs placeholder:text-slate-400"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            onKeyUp={onkeyUp}
          />
          <button
            className="bg-indigo-400 text-white text-xs rounded"
            onClick={addtoTodo}
          >
            <AiOutlinePlus  className="text-white text-2xl"/>
          </button>
        </div>
      </div>
      <div className="mt-10 container mx-auto w-96 p-4 bg-indigo-100 shadow">
        {
          todos.length > 0 && todos.map((todo,index) => {
            return(
              <div key={todo.id} className="flex items-center justify-between mt-4">
                <div className="flex items-center justify-between gap-3">
                  <input id={`todo-${todo.id}`} type="checkbox" checked={todo.completed} onChange={(e)=>markAsCompleted(e,todo.id)} className="w-4 h-4 accent-green-400 rounded-lg"/>
                  <label className={`font-medium ${todo.completed ? 'line-through' : ''}`} htmlFor={`todo-${todo.id}`}>{todo.content}</label>
                 
                </div>
                <button onClick={()=>deleteTodo(todo.id)} className="bg-transparent text-white p-2 text-xs rounded">
                    <AiFillDelete  className="text-red-600 text-2xl "/>
                  </button>
              </div>
            )
          })
        }
      </div>
    </>
  );
};

export default page;
