import React from 'react'

export default function Mapping(props) {
    const [data, column, name, filtered] = props.param
    return (
        <div>
            <section class="table__header"> {column} </section>
            {name === "" ? data.map(info => {
                return <div key={info.id} className="table__data">
                    <p> {info[column] || "NA"} </p>
                </div>
            }) : filtered.map(info => {
                return <div key={info.id} className="table__data">
                    <p> {info[column] || "NA"} </p>
                </div>
            })}
        </div>
    )
}
