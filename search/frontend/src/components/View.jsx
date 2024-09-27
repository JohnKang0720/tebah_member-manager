import React, { useEffect } from 'react'

function View(props) {
  const [loading, text, data, filtered] = props.data

  return (
    <>
    {!loading ? data.length > 0 && text.length === 0 && filtered.length === 0 ? <div className="table">
        <div>
          <section class="table__header"> ID </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.id} </p>
            </div>
          })} </div>
        <div>
          <section class="table__header"> English Name </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.english_name ? info.english_name : "-"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Korean Name </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.korean ? info.korean : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Gender </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.gender} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Category </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.category ? info.category : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Category </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.title ? info.title : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Marital Status </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.marital_status ? info.marital_status : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Age  </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.age ? info.age : 0} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Baptism </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              {info.baptism_date !== null ? <p> {info.baptism+" on "+info.baptism_date} </p> : 
                 <p> {info.baptism} </p>
              }
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Email</section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.email ? info.email : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Telephone </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.mobile ? info.mobile : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Address </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.suite !== "0" && info.suite !== null ? info.suite + " " + info.street : (info.street !== null ? info.street : "N/A") } </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Hobby </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.hobby ? info.hobby : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Volunteer Exp. </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.volunteer ? info.volunteer : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Offering # </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.offering_num ? info.offering_num : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Family Code </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.f_code ? info.f_code : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Parent ID 1 </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.p_code_1 ? info.p_code_1 : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Parent ID 2 </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.p_code_2 ? info.p_code_2 : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Consent </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.consent ? info.consent : "N/A"} </p>
            </div>
          })}
        </div>
      </div> : <div className="table">
        <div>
          <section class="table__header"> ID </section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.id} </p>
            </div>
          })} </div>
        <div>
          <section class="table__header"> English Name </section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.english_name} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Korean Name </section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.korean ? info.korean : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Gender </section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.gender} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Category </section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.category ? info.category : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Category </section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.title ? info.title : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Marital Status </section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.marital_status ? info.marital_status : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Age  </section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.age ? info.age : 0} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Baptism </section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              {info.baptism_date !== null ? <p> {info.baptism+" on "+info.baptism_date} </p> : 
                 <p> {info.baptism} </p>
              }
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Email</section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.email ? info.email : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Telephone </section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.mobile ? info.mobile : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Address </section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.suite !== "0" && info.suite !== null ? info.suite + " " + info.street : (info.street !== null ? info.street : "N/A") } </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Hobby </section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.hobby ? info.hobby : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Volunteer Exp. </section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.volunteer ? info.volunteer : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Offering # </section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.offering_num ? info.offering_num : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Family Code </section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.f_code ? info.f_code : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Parent ID 1 </section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.p_code_1 ? info.p_code_1 : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Parent ID 2 </section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.p_code_2 ? info.p_code_2 : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Consent </section>
          {filtered.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.consent ? info.consent : "N/A"} </p>
            </div>
          })}
        </div>
      </div> : null}
      </>
  )
}

export default View