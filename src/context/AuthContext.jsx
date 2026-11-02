import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";
const USERS_DATA_KEY = "quizUsersData";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem(USERS_DATA_KEY);
    if (storedData) {
      setUsersData(JSON.parse(storedData));
    }
  }, []);

  const saveUsersData = (data) => {
    localStorage.setItem(USERS_DATA_KEY, JSON.stringify(data));
    setUsersData(data);
  };

  const login = (username, password = null) => {
    const trimmedUsername = username.trim();
    if (trimmedUsername.toLowerCase() === ADMIN_USERNAME) {
      if (password === ADMIN_PASSWORD) {
        setUser({ username: trimmedUsername, role: "admin" });
        return { success: true, role: "admin" };
      } else {
        return { success: false, error: "Invalid admin password" };
      }
    } else {
      if (trimmedUsername.length > 0) {
        setUser({ username: trimmedUsername, role: "user" });
        return { success: true, role: "user" };
      } else {
        return { success: false, error: "Please enter a username" };
      }
    }
  };

  const logout = () => {
    setUser(null);
  };

  const addQuizResult = (username, category, score, totalQuestions) => {
    const existingData = localStorage.getItem(USERS_DATA_KEY);
    let currentData = existingData ? JSON.parse(existingData) : [];

    const newResult = {
      id: Date.now(),
      category,
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      date: new Date().toLocaleString(),
    };

    let updatedUsersData = [...currentData];
    const existingUserIndex = updatedUsersData.findIndex(u => u.username === username);

    if (existingUserIndex !== -1) {
      const lastResult = updatedUsersData[existingUserIndex].results[updatedUsersData[existingUserIndex].results.length - 1];
      if (lastResult && lastResult.category === category) {
        const lastTime = new Date(lastResult.date).getTime();
        const currentTime = new Date().getTime();
        if (currentTime - lastTime < 5000) {
          console.log("Duplicate result prevented");
          return;
        }
      }
      updatedUsersData[existingUserIndex].results.push(newResult);
      updatedUsersData[existingUserIndex].totalQuizzes = updatedUsersData[existingUserIndex].results.length;
    } else {
      updatedUsersData.push({
        username: username,
        results: [newResult],
        totalQuizzes: 1,
      });
    }

    saveUsersData(updatedUsersData);
  };

  const getAllUsersResults = () => usersData;

  const clearAllResults = () => {
    if (window.confirm("Are you sure you want to clear all user results?")) {
      saveUsersData([]);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addQuizResult, getAllUsersResults, usersData, clearAllResults }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);