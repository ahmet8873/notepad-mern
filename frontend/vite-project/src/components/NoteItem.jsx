import { useDispatch } from "react-redux";
import { deleteNote } from "../redux-toolkit/noteSlice";

const NoteItem = ({ note, backgroundColorClass }) => {
  const dispatch = useDispatch();
  return (
    <div className={`note ${backgroundColorClass}`}>
      <div>{new Date(note.createdAt).toLocaleString("en-US")}</div>
      <h2>{note.text}</h2>
      <button onClick={() => dispatch(deleteNote(note._id))} className="close">
        X
      </button>
    </div>
  );
};

export default NoteItem;
