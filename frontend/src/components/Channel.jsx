const Channel = ({ name }) => {
  return (
    <li className="nav-item w-100">
      <button className="w-100 rounded-0 text-start btn btn-secondary" type="button">
        <span className="me-1">#</span>
        {name}
      </button>
    </li>
  );
};

export default Channel;
