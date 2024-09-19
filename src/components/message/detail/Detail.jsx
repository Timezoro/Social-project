import "./detail.css";

const Detail = () => {
  return (
    <div className="detail">

      <div className="detail-user">
        <img src="./avatar.png" alt="" />
        <h2>Kevin Hart</h2>
        <p>Lorem ipsum dolor, sit.</p>
      </div>

      <div className="detail-info">

        {/* Chat Setting */}
        <div className="detail-option">
          <div className="opt-title">
            <span>Chat Setting</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        {/* Chat Setting */}
        <div className="detail-option">
          <div className="opt-title">
            <span>Chat Setting</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        {/* Privacy */}
        <div className="detail-option">
          <div className="opt-title">
            <span>Privacy % help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        {/* Shared Photo */}
        <div className="detail-option">

          <div className="opt-title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>

          <div className="detailopt-photo">

            <div className="detailopt-photoItem">
              <div className="photo-detail">
                <img src="https://fastly.picsum.photos/id/15/2500/1667.jpg?hmac=Lv03D1Y3AsZ9L2tMMC1KQZekBVaQSDc1waqJ54IHvo4" alt="" />
                <span>photo_1.png</span>
              </div>              
              <img src="./download.png" alt="" className="phtdet-icon"/>
            </div>

            <div className="detailopt-photoItem">
              <div className="photo-detail">
                <img src="https://fastly.picsum.photos/id/15/2500/1667.jpg?hmac=Lv03D1Y3AsZ9L2tMMC1KQZekBVaQSDc1waqJ54IHvo4" alt="" />
                <span>photo_1.png</span>
              </div>              
              <img src="./download.png" alt="" className="phtdet-icon"/>
            </div>
            
          </div>

        </div>

        {/* Shared Files */}
        <div className="detail-option">
          <div className="opt-title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <button>Block User</button>
        <button className="logout">Logout</button>

      </div>

    </div>
  )
}

export default Detail