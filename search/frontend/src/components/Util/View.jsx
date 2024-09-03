
import React from 'react';
import '../../App.css'; // Import the CSS file

function View(props) {
  const [loading, text, data, filtered, fields, grid_len] = props.data;
  
  return (
    <>
      {!loading ? 
        data.length > 0 && text.length === 0 && filtered.length === 0 ? (
          <div className="table-container">
            <div className="table" style={{ gridTemplateColumns: `repeat(${grid_len}, 1fr)` }}>
              {fields.map(f => (
                <div key={f.name}>
                  <section className="table__header">{f.name}</section>
                  {data.map(info => (
                    <div key={info.id} className="table__data">
                      <p>{info[f.name] ? info[f.name] : "NA"}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="table-container">
            <div className="table" style={{ gridTemplateColumns: `repeat(${grid_len}, 1fr)` }}>
              {fields.map(f => (
                <div key={f.name}>
                  <section className="table__header">{f.name}</section>
                  {filtered.map(info => (
                    <div key={info.id} className="table__data">
                      <p>{info[f.name] ? info[f.name] : "NA"}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) 
        : null}
    </>
  );
}

export default View;

