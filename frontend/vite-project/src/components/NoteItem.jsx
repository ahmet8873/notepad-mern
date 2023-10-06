import { useDispatch } from "react-redux";
import { deleteNote } from "../redux-toolkit/noteSlice";
import NoteDetail from "./NoteDetail";
import { useState } from "react";

const NoteItem = ({ note, backgroundColorClass }) => {
  const dispatch = useDispatch();

  const [showDetail, setShowDetail] = useState(false);

  const handleOpenDetail = () => {
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };
  return (
    <div className={`note ${backgroundColorClass}`}>
      <div>{new Date(note.createdAt).toLocaleString("en-US")}</div>
      <h2>{note.text}</h2>
      <button onClick={() => dispatch(deleteNote(note._id))} className="close">
        X
      </button>
      <button onClick={handleOpenDetail} className="view">
        open modal
      </button>

      {showDetail && <NoteDetail note={note} onClose={handleCloseDetail} />}
    </div>
  );
};

export default NoteItem;
