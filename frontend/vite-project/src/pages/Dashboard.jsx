import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NoteForm from "../components/NoteForm";

import { getNotes, reset } from "../redux-toolkit/noteSlice";
import NoteItem from "../components/NoteItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.notes);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getNotes());

    return () => {
      dispatch(reset());
    };
  }, [user]);

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}!</h1>
        <p>Notes Dashboard</p>
      </section>
      <NoteForm />
      <section className="content">
        {notes.length > 0 ? (
          <div className="notes">
            {notes.map((note, index) => {
              const backgroundColorClass = `color${(index % 3) + 1}`;
              return (
                <NoteItem
                  key={note._id}
                  note={note}
                  backgroundColorClass={backgroundColorClass}
                />
              );
            })}
          </div>
        ) : (
          <h3>you have not set any notes yet</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
