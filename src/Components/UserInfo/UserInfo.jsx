import "./UserInfo.css";
import LocationIcon from "/assets/icon-location.svg";
import TwitterIcon from "/assets/icon-twitter.svg";
import WebsiteIcon from "/assets/icon-website.svg";
import CompanyIcon from "/assets/icon-company.svg";

function UserInfo({ userData }) {
  const noUserData = !userData || userData.message === "Not Found";

  function formatDate(dateString) {
    const date = new Date(dateString)
    const newDate = date.toLocaleDateString("en-GB",{
        year : "numeric",
        month : "short",
        day : "numeric"
    }).replace(",","")
    return newDate;
  }
  function setShortLink(link) {
    const shortWebsiteLink = link?.split("/")[2];
    return shortWebsiteLink;
  }
  function getCompanyName(name){
    return name?.split("@")[1]; 
  }
  return noUserData ? (
    <div id="message">
      <h2>OOPS!</h2>
      <p>No user data found, Please try again</p>
    </div>
  ) : (
    <section id="user-info">
      <div className="user-profile">
        <img
          src={userData.avatar_url}
          alt="User Profile"
          className="user-image"
        />
        <div className="user-profile-name">
          <h2 className="user-name">{userData.name || userData.login}</h2>
          <h4 className="github-user-name">@{userData.login}</h4>
        </div>
        <p className="join-date">Joined {formatDate(userData.created_at)}</p>
        <div className="user-bio">
          <p className="user-bio-text">
            {userData.bio || "This profile has no bio"}
          </p>
        </div>
      </div>
      <ul className="user-stats">
        <li className="user-repos">
          <h4>Repos</h4>
          <h2>{userData.public_repos}</h2>
        </li>
        <li className="user-followers">
          <h4>Followers</h4>
          <h2>{userData.followers}</h2>
        </li>
        <li className="user-following">
          <h4>Following</h4>
          <h2>{userData.following}</h2>
        </li>
      </ul>
      <div className="user-links">
        <div className={`user-location-link ${!userData.location ? 'not-available' : ''}`}>
          <img src={LocationIcon} alt="Location icon" className="icon" />
          <span>{userData.location || "Not Available"}</span>
        </div>
        <div className={`user-twitter-link ${!userData.twitter_username ? 'not-available' : ''}`}>
          <img src={TwitterIcon} alt="Twitter icon" className="icon" />
          {
            userData.twitter_username ? (
                <a href={`https://twitter.com/${userData.twitter_username}`} target="_blank">{userData.twitter_username}</a>
            ):
            (
                <span>Not Available</span>
            )
          }
        </div>
        <div className={`user-website-link ${!userData.blog ? 'not-available' : ''}`}>
          <img src={WebsiteIcon} alt="Website icon" className="icon" />
          {
            userData.blog ? ( <a href={userData.blog} target="_blank">
                {setShortLink(userData.blog)}
          </a>)
          :(
            <span>Not Available</span>
          )
          }
        </div>
        <div className={`user-company-link ${!userData.company ? 'not-available' : ''}`}>
          <img src={CompanyIcon} alt="Company icon" className="icon" />
          {
            userData.company ? (
                <a href={`https://github.com/${getCompanyName(userData.company)}`} target="_blank">{userData.company}</a>
            ):
            (
                <span>Not Available</span>
            )
          }
        </div>
      </div>
    </section>
  );
}

export default UserInfo;
