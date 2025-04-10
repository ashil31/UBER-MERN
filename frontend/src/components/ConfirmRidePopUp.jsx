import { FaMapMarkerAlt } from "react-icons/fa";
import { FaLocationPinLock } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import profile from "../assets/profile.png";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId: props.ride._id,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    if (response.status === 200 || response.status === 201) {
      props.setConfirmRidePopupPanel(false);
      props.setRidePopupPanel(false);
      navigate("/captain-riding", {
        state: { ride: props.ride },
      });
    }
  };

  return (
    <div className="p-1">
      <div className="flex items-center gap-3 mb-4">
        <div
          onClick={() => props.setConfirmRidePopupPanel(false)}
          className="text-xl"
        >
          <IoMdArrowRoundForward className="" />{" "}
        </div>
        <div>
          <h3 className="text-center text-xl font-semibold">
            Confirm New Ride
          </h3>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2 bg-[#ebd43b] p-3 rounded-xl">
        <div className="flex items-center gap-2">
          <img
            src={profile}
            className="h-11 w-11 rounded-full object-cover"
            alt=""
          />
          <h4 className="font-medium text-lg">
            {props.ride?.user?.fullName.firstName}{" "}
            {props.ride?.user?.fullName.lastName}
          </h4>
        </div>
        <h5 className="text-lg font-medium">2.2 KM</h5>
      </div>

      {/* Ride Details */}
      <div className="flex flex-col items-center justify-between gap-3">
        <div className="w-full mt-2">
          <div className="flex items-center gap-3 p-3 border-b-2">
            <FaMapMarkerAlt className="text-gray-900 text-lg" />
            <div className="w-full">
              <h3 className="font-semibold text-base">PICKUP</h3>
              <p className="text-sm font-normal text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border-b-2">
            <FaLocationPinLock className="text-gray-900 text-lg" />
            <div className="w-full">
              <h3 className="font-semibold text-base">DESTINATION</h3>
              <p className="text-sm font-normal text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3">
            <MdOutlinePayment className="text-gray-900 text-lg" />
            <div className="w-full">
              <h3 className="font-semibold text-base">₹{props.ride?.fare}</h3>
              <p className="text-sm font-normal text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <form onSubmit={submitHandler}>
            <input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="bg-[#eee] px-12 py-2 text-base rounded-xl w-full mt-5"
            />
            <div className="mt-5 flex justify-center gap-4 w-full">
              <button className="w-40 rounded-xl bg-[#3beb53] text-center text-black font-semibold p-2">
                Confirm
              </button>
              <button
                onClick={() => {
                  props.setRidePopupPanel(false);
                  props.setConfirmRidePopupPanel(false);
                }}
                className="w-40 rounded-xl bg-[#eb3b3b] text-black font-semibold p-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
