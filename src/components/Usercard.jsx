import React from 'react'

const Usercard = ({ user }) => {
    const { firstName, lastName, photoURL, age, gender, about } = user
    return (
        <div>
            <div className="border-1 border-white
card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src={photoURL}
                        alt="Profile Photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    <p>{gender}</p>
                    <p>{age}</p>
                    <p>{about}</p>
                    <div className="card-actions justify-center my-4">
                        <button className="btn btn-primary">Ignore</button>
                        <button className="btn btn-secondary">Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Usercard;
