import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizData } from "../context/QuizDataContext";
import { useAuth } from "../context/AuthContext";

function Admin() {
  const navigate = useNavigate();
  const { usersData } = useAuth();
  const { questions, addQuizQuestion, deleteQuizQuestion } = useQuizData();

  const [tab, setTab] = useState("questions");
  const [category, setCategory] = useState("react");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");

  const categories = ["react", "html", "js", "css"];
  const categoryQuestions = questions[category] || [];

  const totalUsers = usersData.length;
  const totalQuizzes = usersData.reduce((a, u) => a + u.results.length, 0);

  const avgScore =
    usersData.length > 0
      ? Math.round(
          usersData.reduce((sum, u) => {
            const avg =
              u.results.reduce((s, r) => s + r.percentage, 0) /
              (u.results.length || 1);
            return sum + avg;
          }, 0) / usersData.length
        )
      : 0;

  const addQ = (e) => {
    e.preventDefault();
    if (!question || options.some((o) => !o) || !answer) return;

    addQuizQuestion(category, { question, options, answer });

    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] px-6 py-10">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-gray-500 text-sm">
            Manage questions & users performance
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 bg-white border rounded-xl hover:shadow transition"
        >
          Home
        </button>
      </div>

      {/* STATS */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-5 mb-8">

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-gray-400 text-sm">Users</p>
          <h2 className="text-2xl font-bold">{totalUsers}</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-gray-400 text-sm">Quizzes</p>
          <h2 className="text-2xl font-bold">{totalQuizzes}</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-gray-400 text-sm">Average Score</p>
          <h2 className="text-2xl font-bold">{avgScore}%</h2>
        </div>

      </div>

      {/* TABS */}
      <div className="max-w-7xl mx-auto flex gap-3 mb-6">
        {["questions", "users"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              tab === t
                ? "bg-yellow-500 text-white shadow"
                : "bg-white border text-gray-600 hover:bg-gray-50"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">

        {/* QUESTIONS */}
        {tab === "questions" && (
          <>
            {/* FORM */}
            <div className="bg-white p-6 rounded-2xl border space-y-3">

              <h2 className="font-semibold text-lg">Add Question</h2>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border rounded-xl"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Question"
                className="w-full p-3 border rounded-xl"
              />

              {options.map((o, i) => (
                <input
                  key={i}
                  value={o}
                  onChange={(e) => {
                    const copy = [...options];
                    copy[i] = e.target.value;
                    setOptions(copy);
                  }}
                  placeholder={`Option ${i + 1}`}
                  className="w-full p-3 border rounded-xl"
                />
              ))}

              <select
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-3 border rounded-xl"
              >
                <option value="">Correct Answer</option>
                {options.map((o, i) => (
                  <option key={i}>{o}</option>
                ))}
              </select>

              <button
                onClick={addQ}
                className="w-full bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition"
              >
                Add Question
              </button>

            </div>

            {/* LIST */}
            <div className="space-y-3">

              {categoryQuestions.length === 0 && (
                <div className="bg-white p-6 rounded-2xl border text-gray-400 text-center">
                  No questions yet
                </div>
              )}

              {categoryQuestions.map((q, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-2xl border"
                >

                  <div className="flex justify-between">
                    <p className="font-medium text-gray-800">{q.question}</p>

                    <button
                      onClick={() => deleteQuizQuestion(category, i)}
                      className="text-red-500 text-sm"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {q.options.map((o, j) => (
                      <span
                        key={j}
                        className={`text-xs px-2 py-1 rounded-full ${
                          o === q.answer
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100"
                        }`}
                      >
                        {o}
                      </span>
                    ))}
                  </div>

                </div>
              ))}

            </div>
          </>
        )}

       {/* USERS */}
{tab === "users" && (
  <div className="space-y-4">

    {usersData.length === 0 ? (
      <div className="bg-white p-8 rounded-2xl border text-center text-gray-400">
        No users data yet
      </div>
    ) : (
      usersData.map((u, i) => {

        const avg =
          u.results.length > 0
            ? Math.round(
                u.results.reduce((a, r) => a + r.percentage, 0) /
                  u.results.length
              )
            : 0;

        return (
          <div
            key={i}
            className="bg-white rounded-2xl border p-5 hover:shadow-sm transition"
          >

            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">

              <h3 className="font-semibold text-gray-800">
                {u.username}
              </h3>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  avg >= 70
                    ? "bg-green-100 text-green-700"
                    : avg >= 40
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                Avg {avg}%
              </span>

            </div>

            {/* RESULTS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">

              {u.results.map((r, j) => (
                <div
                  key={j}
                  className="flex justify-between bg-gray-50 px-3 py-2 rounded-lg"
                >
                  <span className="text-gray-600">
                    {r.category}
                  </span>

                  <span className="font-semibold text-gray-800">
                    {r.percentage}%
                  </span>
                </div>
              ))}

            </div>

          </div>
        );
      })
    )}

  </div>
)}

      </div>
    </div>
  );
}

export default Admin;