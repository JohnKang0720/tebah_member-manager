import React from 'react'

export default function Mapping(props) {
    const [data, column] = props.param
    return (
        <div>
            <section class="table__header"> {column} </section>
            {data.map(info => {
                return <div key={info.id} className="table__data">
                    <p> {info[column] || "NA"} </p>
                </div>
            })}
        </div>
    )
}
