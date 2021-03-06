import React from "react";
import { useEffect, useState } from "react";
import apiHandler from "../api/apiHandler";
import useAuth from "../auth/useAuth";
import "../styles/userMatchList.css";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/*const matchAPIList = [
  {
    nanny: {
      name: "Marie-Noel France",
      role: "nanny",
      age: 45,
      email: "marienoel.france@gmail.com",
      phone: "0691234567",
      address: "28 rue de vaugirard 75015 Paris",
      picture:
        "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427165/62_bu6hcb.jpg",
      experience: 10,
      resume:
        " i am graduated from babyschool i enjoy taking care of all children",
      availability: "fullTime",
    },

    nanny: {
      name: "Rosemary Chapman",
      role: "nanny",
      age: 37,
      email: "rosemary.Chapman@gmail.com",
      phone: "0691234567",
      address: "8 rue Tiphaine 75015 Paris",
      picture:
        "https://res.cloudinary.com/dgblvjmrn/image/upload/c_thumb,w_200,g_face/v1642427165/86_evzxio.jpg",
      experience: 25,
      resume:
        "The greatest gift I can give to your children is my time, my love, and my attention.",
      availability: "fullTime",
    },

    family: {
      name: "Caroline Smith",
      role: "family",
      age: 35,
      email: "caroline.smith@gmail.com",
      phone: "0712233445",
      address: "90 rue de la convention 75015 Paris",
      picture:
        "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427161/images-4_rcjqon.jpg",
      numberOfKids: 1,
      kidsAge: [5],
      description:
        "Pierre is full of energy, he likes reading and playing football",
      availability: "afterSchool",
    },

  },
];

console.log("matchAPIList>>>>>>>>", matchAPIList[0].nanny)*/

const UserMatchList = () => {
  const [match, setMatch] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const endpoint = "/api/matches/matchList";
    const fetchMatchList = async () => {
      const findMatchList = await apiHandler.findMatchList(endpoint);
      console.log("findMatchList", findMatchList);
      setMatch(findMatchList);
    };
    fetchMatchList();
  }, []);

  return (
    <div>
      {match.map((el) => {
        return (
          <div
            key="match._id"
            className="container d-flex justify-content-center ml-auto"
          >
            <div className="card mb-3">
              {currentUser.role[0] === "family" && (
                <>
                  <img
                    src={el.nanny.picture}
                    alt={el.nanny.name}
                    className="card-img-top"
                  />
                  <div className="card-body bg-light">
                    <p className="card-title">
                      {el.nanny.name} - <span></span> {el.nanny.age} ans
                    </p>

                    <p className="card-text">
                      <i class="fa-solid fa-inbox"></i> {el.nanny.email}
                    </p>

                    <p className="card-text">
                      <i className="fa-solid fa-square-phone"></i>
                      {el.nanny.phone}
                    </p>
                    <p className="card-text">
                      <i className="fa-solid fa-envelope"></i>
                      {el.nanny.address}
                    </p>
                    <p className="card-text">
                    <i class="fa-regular fa-address-card"></i>Resume: <span></span>
                      {el.nanny.resume}
                    </p>
                    <p className="card-text">
                    <i class="fa-regular fa-calendar"></i> Availability: <span></span>
                      {el.nanny.availability}
                    </p>
                  </div>
                </>
              )}
              {currentUser.role[0] === "nanny" && (
                <>
                  <img
                    src={el.family.picture}
                    alt={el.family.name}
                    className="card-img-top"
                  />
                  <div className="card-body bg-light">
                    <p className="card-title">
                      {el.family.name} - <span></span>
                      {el.family.age} ans
                    </p>
                    <p className="card-text">
                      <i class="fa-solid fa-inbox"></i>
                      {el.family.email}
                    </p>
                    <p className="card-text">
                      <i class="fa-solid fa-square-phone"></i>
                      {el.family.phone}
                    </p>
                    <p className="card-text">
                      <i className="fa-solid fa-envelope"></i>
                      {el.family.address}
                    </p>
                    <p className="card-text"> <i class="fa-solid fa-child" style={{paddingRight: "0.5rem"}}></i> Number of kids: <span></span>{el.family.numberOfKids}</p>
                    <p className="card-text"><i class="fa-solid fa-baby-carriage"></i> <span></span> Kids age: <span></span>{el.family.kidsAge}</p>
                    <p className="card-text"><i class="fa-regular fa-comment-dots"></i> Description: <span></span> {el.family.description}</p>
                    <p className="card-text">
                    <i class="fa-regular fa-calendar"></i> Availability: <span></span>
                      {el.family.availability}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserMatchList;
