import React from 'react'

function View(props) {
  const [loading, text, data, filtered] = props.data
  return (
    <>
    {!loading ? data.length > 0 && text.length === 0 && filtered.length === 0 ? <div className="table">
        <div>
          <section class="table__header"> ID </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.ID} </p>
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
              <p> {info.korean_name ? info.korean_name : "N/A"} </p>
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
          <section class="table__header"> Marital Status </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.married ? info.married : "N/A"} </p>
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
              {info.baptism_year !== undefined ? <p> {info.baptism+" on "+info.baptism_year} </p> : 
                 <p> {info.baptism+" (date unknown)"} </p>
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
              <p> {info.telephone ? info.telephone : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Address </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.address ? info.address : "N/A"} </p>
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
              <p> {info.vol_exp ? info.vol_exp : "N/A"} </p>
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
              <p> {info.agreement ? info.agreement : "N/A"} </p>
            </div>
          })}
        </div>
        {/* <div>
          <section class="table__header"> Registration # </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.reg_num ? info.reg_num : "N/A"} </p>
            </div>
          })}
        </div> */}
        {/* <div>
          <section class="table__header"> Registration Date </section>
          {data.map(info => {
            return <div key={info.id} className="table__data">
              <p> {info.reg_date ? info.reg_date : "N/A"} </p>
            </div>
          })}
        </div> */}
      </div> : <div className="table">
        <div>
          <section class="table__header"> ID </section>
          {filtered.map(info => {
            return <div key={info.ID} className="table__data">
              <p> {info.ID} </p>
            </div>
          })} </div>
        <div>
          <section class="table__header"> English Name </section>
          {filtered.map(info => {
            return <div key={info.ID} className="table__data">
              <p> {info.english_name} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Korean Name </section>
          {filtered.map(info => {
            return <div key={info.ID} className="table__data">
              <p> {info.korean_name ? info.korean_name : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Gender </section>
          {filtered.map(info => {
            return <div key={info.ID} className="table__data">
              <p> {info.gender} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Category </section>
          {filtered.map(info => {
            return <div key={info.ID} className="table__data">
              <p> {info.category ? info.category : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Marital Status </section>
          {filtered.map(info => {
            return <div key={info.ID} className="table__data">
              <p> {info.married ? info.married : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Age  </section>
          {filtered.map(info => {
            return <div key={info.ID} className="table__data">
              <p> {info.age ? info.age : 0} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Baptism </section>
          {filtered.map(info => {
            return <div key={info.ID} className="table__data">
              <p> {info.baptism+" on "+info.baptism_year} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Email</section>
          {filtered.map(info => {
            return <div key={info.ID} className="table__data">
              <p> {info.email ? info.email : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Telephone </section>
          {filtered.map(info => {
            return <div key={info.ID} className="table__data">
              <p> {info.telephone ? info.telephone : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Address </section>
          {filtered.map(info => {
            return <div key={info.ID} className="table__data">
              <p> {info.address ? info.address : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Hobby </section>
          {filtered.map(info => {
            return <div key={info.ID} className="table__data">
              <p> {info.job ? info.job : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Volunteer Exp. </section>
          {filtered.map(info => {
            return <div key={info.ID} className="table__data">
              <p> {info.volunteering ? info.volunteering : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Offering # </section>
          {filtered.map(info => {
            return <div key={info.ID} className="table__data">
              <p> {info.offering_num ? info.offering_num : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Family Code </section>
          {filtered.map(info => {
            return <div key={info.ID} className="table__data">
              <p> {info.f_code ? info.f_code : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Parent ID 1 </section>
          {filtered.map(info => {
            return <div key={info.ID} className="table__data">
              <p> {info.p_code_1 ? info.p_code_1 : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Parent ID 2 </section>
          {filtered.map(info => {
            return <div key={info.ID} className="table__data">
              <p> {info.p_code_2 ? info.p_code_2 : "N/A"} </p>
            </div>
          })}
        </div>
        <div>
          <section class="table__header"> Consent </section>
          {filtered.map(info => {
            return <div key={info.ID} className="table__data">
              <p> {info.agreement ? info.agreement : "N/A"} </p>
            </div>
          })}
        </div>
      </div> : null}
      </>
  )
}

export default View