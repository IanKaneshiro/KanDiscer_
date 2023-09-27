import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { discTypes, manufactures } from "../../utils/seederData";
import { updateDisc } from "../../store/discs";

const UpdateDiscModal = ({ disc, approve }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [manufacturer, setManufacture] = useState(disc?.manufacturer);
  const [name, setName] = useState(disc?.name);
  const [type, setType] = useState(disc?.type);
  const [description, setDescription] = useState(disc?.description);
  const [purchase_link, setPurchaseLink] = useState(disc?.purchaseLink);
  const [plastics, setPlastics] = useState(disc?.plastics);
  const [speed, setSpeed] = useState(disc?.speed);
  const [glide, setGlide] = useState(disc?.glide);
  const [turn, setTurn] = useState(disc?.turn);
  const [fade, setFade] = useState(disc?.fade);
  const [height, setHeight] = useState(disc?.height);
  const [rim_depth, setRimDepth] = useState(disc?.rimDepth);
  const [rim_width, setRimWidth] = useState(disc?.rimWidth);
  const [image_url, setImageUrl] = useState(null);

  const [errors, setErrors] = useState({});

  if (!sessionUser) {
    closeModal();
    return <Redirect to="/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("manufacturer", manufacturer);
    formData.append("name", name);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("purchase_link", purchase_link);
    formData.append("plastics", plastics);
    formData.append("speed", speed);
    formData.append("glide", glide);
    formData.append("turn", turn);
    formData.append("fade", fade);
    formData.append("height", height);
    formData.append("rim_depth", rim_depth);
    formData.append("rim_width", rim_width);
    formData.append("image_url", image_url);
    const data = await dispatch(updateDisc(formData, disc.id, approve));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <form className="create_disc__main" onSubmit={handleSubmit}>
      <div className="create_disc__form">
        <div class="create_disc__info">
          <label>
            Manufacturer
            <select
              required
              value={manufacturer}
              onChange={(e) => setManufacture(e.target.value)}
            >
              <option disabled value="">
                Please select a manufacturer...
              </option>
              {manufactures.map((man) => (
                <option key={man} value={man}>
                  {man}
                </option>
              ))}
            </select>
          </label>
          {errors.manufacturer && <p>{errors.manufacturer}</p>}
          <label>
            Name
            <input
              required
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          {errors.name && <p className="errors">{errors.name}</p>}
          <label>
            Description
            <textarea
              placeholder="Short description of disc"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          {errors.description && <p className="errors">{errors.description}</p>}{" "}
          <label>
            Type of Disc
            <select
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option disabled value="">
                Please select a type...
              </option>
              {discTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          {errors.type && <p className="errors">{errors.type}</p>}
          <label>
            Link to Purchase
            <input
              placeholder="Add a link to purchase"
              type="text"
              value={purchase_link}
              onChange={(e) => setPurchaseLink(e.target.value)}
            />
          </label>
          {errors.purchase_link && (
            <p className="errors">{errors.purchase_link}</p>
          )}
          <label>
            Plastic Types
            <input
              placeholder="Esp, Ti, Z"
              type="text"
              value={plastics}
              onChange={(e) => setPlastics(e.target.value)}
              required
            />
          </label>
          {errors.plastics && <p className="errors">{errors.plastics}</p>}
          <label>
            Current Image:
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                style={{ width: "100px" }}
                src={disc.imageUrl}
                alt={disc.id}
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageUrl(e.target.files[0])}
            />
          </label>
          {errors.image_url && <p className="errors">{errors.image_url}</p>}
        </div>
        <div class="create_disc__flight">
          <span>
            <table className="disc_tile__flight">
              <thead>
                <tr>
                  <th>Speed</th>
                  <th>Glide</th>
                  <th>Turn</th>
                  <th>Fade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{speed}</td>
                  <td>{glide}</td>
                  <td>{turn}</td>
                  <td>{fade}</td>
                </tr>
              </tbody>
            </table>
          </span>
          <label>
            Speed
            <input
              placeholder="Speed"
              type="range"
              min="1"
              max="15"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              required
            />
          </label>
          {errors.speed && <p className="errors">{errors.speed}</p>}
          <label>
            Glide
            <input
              placeholder="Glide"
              type="range"
              min="1"
              max="7"
              value={glide}
              onChange={(e) => setGlide(e.target.value)}
              required
            />
          </label>
          {errors.glide && <p className="errors">{errors.glide}</p>}
          <label>
            Turn
            <input
              placeholder="Turn"
              type="range"
              min="-5"
              max="2"
              value={turn}
              onChange={(e) => setTurn(e.target.value)}
              required
            />
          </label>
          {errors.turn && <p className="errors">{errors.turn}</p>}
          <label>
            Fade
            <input
              placeholder="Fade"
              type="range"
              min="0"
              max="6"
              value={fade}
              onChange={(e) => setFade(e.target.value)}
              required
            />
          </label>
          {errors.fade && <p className="errors">{errors.fade}</p>}
          <label>
            Height
            <input
              required
              value={height}
              type="decimal"
              placeholder="In Cm"
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
          {errors.height && <p className="errors">{errors.height}</p>}
          <label>
            Rim Depth
            <input
              required
              value={rim_depth}
              type="decimal"
              placeholder="In Cm"
              onChange={(e) => setRimDepth(e.target.value)}
            />
          </label>
          {errors.rim_depth && <p className="errors">{errors.rim_depth}</p>}{" "}
          <label>
            Rim Width
            <input
              required
              value={rim_width}
              type="decimal"
              placeholder="In Cm"
              onChange={(e) => setRimWidth(e.target.value)}
            />
          </label>
          {errors.rim_width && <p className="errors">{errors.rim_width}</p>}{" "}
        </div>
      </div>
      <button type="submit">{approve ? "Approve" : "Save Changes"}</button>
    </form>
  );
};

export default UpdateDiscModal;
