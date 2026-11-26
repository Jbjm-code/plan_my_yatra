import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/Recommended.module.css";



const packageImages = {

  dubai: "/recommonded/dubai.png",

  thailand: "/recommonded/thailand.png",

  bali: "/recommonded/bali.png",

  andaman: "/recommonded/andaman.png",

  nepal: "/recommonded/nepal.jpg",

  bhutan: "/recommonded/bhutan.jpg",

};



function Recommended() {

  const scrollRef = useRef();

  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);


const admin =
  JSON.parse(localStorage.getItem("admin"));

const [editingId, setEditingId] = useState(null);

const [editData, setEditData] = useState({});

const [showConfirm, setShowConfirm] =
  useState(false);

const [selectedPackage, setSelectedPackage] =
  useState(null);

 const formatPrice = (price) => {
  if (!price) return "";

  // Agar database me text hai to wahi return karo
  if (isNaN(price)) {
    return price;
  }

  const number = String(price).replace(/[^\d]/g, "");

  return `₹ ${Number(number).toLocaleString("en-IN")}`;
};

  useEffect(() => {

    axios
      .get("https://api.planmyyatra.com/api/packages")

      .then((res) => {

        setPackages(res.data);

      })

      .catch((err) => {

        console.log(err);

      });

  }, []);




  const scrollLeft = () => {

    scrollRef.current.scrollBy({

      left: -320,

      behavior: "smooth",

    });

  };




  const scrollRight = () => {

    scrollRef.current.scrollBy({

      left: 320,

      behavior: "smooth",

    });

  };

const handleEdit = (item) => {

  setEditingId(item.id);

  setEditData({
    title: item.title,
    price: item.price,
    oldPrice: item.oldPrice,
  });

};

const handleCancel = () => {

  setEditingId(null);

  setEditData({});

};

const handleSaveClick = (item) => {

  setSelectedPackage(item);

  setShowConfirm(true);

};

const confirmSave = async () => {

  try {
if (!editData.title.trim()) {
  alert("Title cannot be blank. Please fill it.");
  return;
}

if (!editData.price.trim()) {
  alert("Price cannot be blank. Please fill it.");
  return;
}

if (!editData.oldPrice.trim()) {
  alert("Old Price cannot be blank. Please fill it.");
  return;
}
    await axios.put(

      `https://api.planmyyatra.com/api/packages/${selectedPackage.id}`,

      editData

    );

    setPackages(

      packages.map((pkg) =>

        pkg.id === selectedPackage.id

          ? {
              ...pkg,
              ...editData,
            }

          : pkg
      )
    );

    setEditingId(null);

    setShowConfirm(false);

  }

  catch (err) {

    console.log(err);

  }

};


  return (

    <section className={styles.wrapper}>

      {/* LEFT CONTENT */}

      <div className={styles.leftSection}>

        <h2>
          International <br /> Packages
        </h2>

        <div className={styles.stats}>

          <div>
            <span>1000 +</span>
            <p>International packages</p>
          </div>

          <div>
            <span>300 +</span>
            <p>Domestic packages</p>
          </div>

          <div>
            <span>3000 +</span>
            <p>Trusted Hotels</p>
          </div>

        </div>

      </div>




      {/* RIGHT SLIDER */}
<button
          className={`${styles.arrow} ${styles.leftArrow}`}
          onClick={scrollLeft}
        >
          ❮
        </button>
      <div className={styles.sliderWrapper}>

        




        <div className={styles.cardContainer} ref={scrollRef}>

          {packages
  .filter((item) => item.slug !== "andaman")
  .map((item, index) => (

           <div
  className={styles.card}
  key={index}
  onClick={() => {

    if (editingId !== item.id) {

      navigate(`/package/${item.slug}`);

    }

  }}
>

              <img
                src={packageImages[item.slug]}
                alt={item.title}
              />




              <div className={styles.titleRow}>

               {editingId === item.id ? (

  <input
  className={styles.editInput}
  placeholder="Package Name"
  value={editData.title}
  onChange={(e) =>
    setEditData({
      ...editData,
      title: e.target.value
    })
  }
/>

) : (

  <h4>{item.title}</h4>

)}
{editingId === item.id ? (

<input
  className={styles.editPriceInput}
  placeholder="Old Price"
  value={editData.oldPrice}
  onChange={(e) =>
    setEditData({
      ...editData,
      oldPrice: e.target.value
    })
  }
/>

) : (

 <span className={styles.oldPrice}>
  {formatPrice(item.oldPrice)}
</span>

)}

              </div>




              <div className={styles.priceRow}>

                <span>Starting from</span>

                {editingId === item.id ? (

              <input
  className={styles.editPriceInput}
  placeholder="Offer Price"
  value={editData.price}
  onChange={(e) =>
    setEditData({
      ...editData,
      price: e.target.value
    })
  }
/>

                            ) : (

                <strong>{formatPrice(item.price)}</strong>

                  )}

              </div>

{admin && (

  <div className={styles.editActions}>

    {editingId === item.id ? (

      <>

        <button
          className={styles.cancelBtn}
          onClick={(e) => {

            e.stopPropagation();

            handleCancel();

          }}
        >
          Cancel
        </button>

        <button
          className={styles.saveBtn}
          onClick={(e) => {

            e.stopPropagation();

            handleSaveClick(item);

          }}
        >
          Save
        </button>

      </>

    ) : (

      <button
        className={styles.editBtn}
        onClick={(e) => {

          e.stopPropagation();

          handleEdit(item);

        }}
      >
        Edit
      </button>

    )}

  </div>

)}
            </div>

          ))}

        </div>




        

      </div>
<button
          className={`${styles.arrow} ${styles.rightArrow}`}
          onClick={scrollRight}
        >
          ❯
        </button>
        {showConfirm && (

  <div className={styles.popupOverlay}>

    <div className={styles.popupBox}>

      <h3>
        Save Changes?
      </h3>

      <p>
        Are you sure want to save?
      </p>

      <div className={styles.popupBtns}>

        <button
          className={styles.cancelBtn}
          onClick={() =>
            setShowConfirm(false)
          }
        >
          No
        </button>

        <button
          className={styles.saveBtn}
          onClick={confirmSave}
        >
          Yes Save
        </button>

      </div>

    </div>

  </div>

)}
    </section>

  );

}

export default Recommended;