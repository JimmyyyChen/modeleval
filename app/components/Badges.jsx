export default function Badges({ badges }) {
  return (
    <div className="test-xs flex flex-row flex-wrap items-center">
      {badges.map((item) => (
        <div key={item.id} className="mx-2 my-2 flex flex-row items-center">
          <button
            className="badge badge-primary badge-outline h-6 max-h-6 space-x-2"
            // onClick={}
          >
            {item.svg}
            <div>{item.label}</div>
          </button>
        </div>
      ))}
    </div>
  );
}
