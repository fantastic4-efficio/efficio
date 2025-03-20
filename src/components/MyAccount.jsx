import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MyAccount.css";

const MyAccount = () => {

   // const {username} = useParams();
    const username = "johndoe";
    const [myAccountInfo, setMyAccountInfo] = useState({});
    const [userTeams, setUserTeams] = useState([])
    


    const fetchMyAccountInfo = async() => {
      try{
        const response = await fetch(`/api/users/myaccountinfo/${username}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // Retrieve token from storage
            "Content-Type": "application/json"
          }
        });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const myAccountInfoList = await response.json();
        console.log("MyAccountInfoList: ", myAccountInfoList);
        setMyAccountInfo(myAccountInfoList);
        getAllTeams(myAccountInfoList); // get data immediately
    } catch (error) {
      console.error("Error fetching projects:", error);
    }} 

    // Two ways to get the distinct team: Either use hash-table to return the unique key or use API to fetch
    const getAllTeams = (myAccountInfo) => {
      const tempUserTeams = {}
      for(let i=0;i<myAccountInfo.length; i++){
        if(myAccountInfo[i].team_name in tempUserTeams){
          console.log('skipping');
        } else {
          tempUserTeams[myAccountInfo[i].team_name] = 1
        }
      }
      let teams = []
      for(const key in tempUserTeams){
        teams.push(key);
      }
      setUserTeams(teams);
    }


      useEffect(() => {
        const wait = async() => {

         await fetchMyAccountInfo()
        }
        wait()
      }, []);


      console.log(`MY ACCOUNT INFO`, myAccountInfo);
      
      console.log(userTeams)
      
      return (
        <div className="profile-container">
          <h2>My Account</h2>
          {myAccountInfo.length > 0 ? (
            <div className="profile-details">
              <div className="avatar-container">
                <img src="./johndoe.webp" alt="User Avatar" className="avatar" />
              </div>
              <div className="user-info">
                <p><strong>First Name: </strong> {myAccountInfo[0].user_first_name || "N/A"}</p>
                <p><strong>Last Name: </strong> {myAccountInfo[0].user_last_name || "N/A"}</p>
                <p><strong>Username: </strong> {myAccountInfo[0].user_username || "N/A"}</p>
                <p><strong>Team Members: </strong>{myAccountInfo.map((teamMember)=>(teamMember.teammate_first_name)).join(',')}</p>
                <p><strong>My Teams: </strong> {userTeams?.map(teams => teams).join(',')}</p>
              </div>
            </div>
          ) : (
            <p>Loading account information...</p>
          )}
        </div>
      ) };

export default MyAccount;
