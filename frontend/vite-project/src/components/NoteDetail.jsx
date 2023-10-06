const NoteDetail = ({ note, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="note-detail">
        <div>{new Date(note.createdAt).toLocaleString("en-US")}</div>
        <h2>{note.text}</h2>
        <button onClick={onClose} className="close">
          Close
        </button>
      </div>
    </div>
  );
};

export default NoteDetail;
