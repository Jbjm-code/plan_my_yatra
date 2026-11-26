
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Styles/PackageDetails.module.css";
import { Link } from "react-router-dom";

const galleryImages = {
  dubai: [
    "/package/dubai/img3.png",
    "/package/dubai/img1.png",
    "/package/dubai/img2.png",
    "/package/dubai/img4.jpg",
  ],

  andaman: [
    "/package/andaman/img1.jpg",
    "/package/andaman/img2.jpg",
    "/package/andaman/img3.png",
    "/package/andaman/img4.jpg",
  ],

  thailand: [
    "/package/thailand/t1.png",
    "/package/thailand/t2.png",
    "/package/thailand/t3.png",
    "/package/thailand/t4.jpg",
  ],

  bali: [
    "/package/bali/b1.png",
    "/package/bali/b2.png",
    "/package/bali/b3.png",
    "/package/bali/b4.jpg",
  ],

  bhutan: [
    "/package/bhutan/img1.png",
    "/package/bhutan/img2.png",
    "/package/bhutan/img3.png",
    "/package/bhutan/img4.jpg",
  ],

  nepal: [
    "/package/nepal/n1.png",
    "/package/nepal/n2.png",
    "/package/nepal/n3.png",
    "/package/nepal/n4.jpg",
  ],
};

const heroImages = {
  dubai: "/recommonded/dubai.png",
  andaman: "/recommonded/andaman.png",
  thailand: "/recommonded/thailand.png",
  bali: "/recommonded/bali.png",
  bhutan: "/recommonded/bhutan.jpg",
  nepal: "/recommonded/nepal.jpg",
};

function PackageDetails() {

  const { id } = useParams();

  const [pkg, setPkg] = useState(null);

  const [editing, setEditing] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

    const [showSuccess, setShowSuccess] =
useState(false);

 const [editData, setEditData] =
useState({
  title: "",
  price: "",
  includes: [],
  exclusions: []
});

  const admin =
    JSON.parse(localStorage.getItem("admin"));

  const formatPrice = (price) => {
  if (!price) return "";

  const value = String(price);

  // Agar number nahi hai (Coming Soon, Must Visit, etc.)
  if (!/\d/.test(value)) {
    return value;
  }

  const number = value.replace(/[^\d]/g, "");

  return `₹ ${Number(number).toLocaleString("en-IN")}`;
};

  useEffect(() => {

   
 axios.get(
  `https://api.planmyyatra.com/api/Packages/slug/${id}`
)

      .then((res) => {

        setPkg(res.data);

      })
      .catch((err) => {

        console.log(err);

      });

  }, [id]);

  useEffect(() => {

    if (pkg) {

      setEditData({
  title: pkg.title,
  price: pkg.price,
  includes: pkg.inclusions || [],
  exclusions: pkg.exclusions || []
});

    }

  }, [pkg]);

  const handleSave = async () => {
    
    if (!editData.title.trim()) {
  alert("Title cannot be blank. Please fill it.");
  return;
}

if (!editData.price.trim()) {
  alert("Price cannot be blank. Please fill it.");
  return;
}

if (editData.includes.some(x => !x.trim())) {
  alert("Inclusion cannot be blank. Please fill it.");
  return;
}

if (editData.exclusions.some(x => !x.trim())) {
  alert("Exclusion cannot be blank. Please fill it.");
  return;
}

    try {

   await axios.put(
  `https://api.planmyyatra.com/api/Packages/${pkg.id}`,
  {
    title: editData.title,
    price: editData.price,
    oldPrice: editData.oldPrice,
    inclusions: editData.includes,
    exclusions: editData.exclusions
  }
);

      setPkg({
  ...pkg,
  title: editData.title,
  price: editData.price,
  inclusions: editData.includes,
 exclusions: editData.exclusions
});

      setEditing(false);

setShowConfirm(false);

setShowSuccess(true);

    }

    catch (err) {

      console.log(err);

    }

  };

  if (!pkg) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className={styles.wrapper}>

      {/* HERO */}
      <div
        className={styles.hero}
        style={{
          backgroundImage:
            `url(${heroImages[id]})`
        }}
      >
        <div className={styles.overlay}>

          {editing ? (

            <input
              className={styles.editInput}
              value={editData.title}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  title: e.target.value
                })
              }
            />

          ) : (

            <h1>{pkg.title}</h1>

          )}

         {id === "andaman" ? (

  <div className={styles.packageButtons}>

    <Link
  to="/state-package/andaman-highlights"
  className={styles.packageBtn}
>
  Package 1
</Link>

<Link
  to="/state-package/andaman-premium"
  className={styles.packageBtn}
>
  Package 2
</Link>

  </div>

) : (

  <>

    <p>{pkg.duration}</p>

    {editing ? (

      <input
        className={styles.priceInput}
        value={editData.price}
        onChange={(e) =>
          setEditData({
            ...editData,
            price: e.target.value
          })
        }
      />

    ) : (

   <h2>{formatPrice(pkg.price)}</h2>

    )}

  </>

          )}

          {admin && (

            <div className={styles.editActions}>

              {editing ? (

                <>

                  <button
                    className={styles.cancelBtn}
                    onClick={() =>
                      setEditing(false)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    className={styles.saveBtn}
                    onClick={() =>
                      setShowConfirm(true)
                    }
                  >
                    Save
                  </button>

                </>

              ) : (

                <button
                  className={styles.editBtn}
                  onClick={() =>
                    setEditing(true)
                  }
                >
                  Edit
                </button>

              )}

            </div>

          )}

        </div>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>

        <h2 className={styles.sectionTitle}>
          TOUR HIGHLIGHTS
        </h2>

        {/* HIGHLIGHTS */}
        <div className={styles.gallery}>

          {pkg.highlights?.map((item, i) => (

            <div
              key={i}
              className={styles.imageCard}
            >

              <img
  src={galleryImages[id]?.[i]}
  alt={item}
/>

              <p>{item}</p>

            </div>

          ))}

        </div>

        {/* DETAILS */}
        <div className={styles.detailsWrapper}>

          {/* PRICE */}
          <div className={styles.priceCircle}>

            <p>Starting From</p>

            {editing ? (

              <input
                className={styles.circlePriceInput}
                value={editData.price}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    price: e.target.value
                  })
                }
              />

            ) : (

             <h2>{formatPrice(pkg.price)}</h2>

            )}

            <span>Per Person</span>

            <small>+ taxes</small>

          </div>

          {/* INCLUSION BOX */}
         <div className={styles.includeBox}>

  {/* INCLUSIONS */}

  <div className={styles.boxContent}>

    <h3>INCLUSIONS</h3>

    {editing
? editData.includes.map((item, i) => (

<input
key={i}
className={styles.includeInput}
value={item}
onChange={(e) => {

const updated =
[...editData.includes];

updated[i] = e.target.value;

setEditData({
...editData,
includes: updated
});

}}
/>

))
: pkg.inclusions?.map((item, i) => (

<p key={i}>
✔ {item}
</p>

))
}

  </div>

  {/* EXCLUSIONS */}

  <div className={styles.boxContent}>

    <h3>EXCLUSIONS</h3>

   {editing
? editData.exclusions.map((item, i) => (

<input
key={i}
className={styles.includeInput}
value={item}
onChange={(e) => {

const updated =
[...editData.exclusions];

updated[i] = e.target.value;

setEditData({
...editData,
exclusions: updated
});

}}
/>

))
: pkg.exclusions?.map((item, i) => (

<p key={i}>
✖ {item}
</p>

))
}

  </div>

  {/* IMAGE */}

  <div className={styles.boxImage}>

    <img
      src={heroImages[id]}
      alt={pkg.title}
    />

  </div>

</div>

        </div>

      </div>

      {showConfirm && (

        <div className={styles.popupOverlay}>

          <div className={styles.popupBox}>

            <h3>
              Save Changes?
            </h3>

            <p>
              Are you sure?
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
                onClick={handleSave}
              >
                Yes Save
              </button>

            </div>

          </div>

        </div>

      )}

      {showSuccess && (

<div className={styles.popupOverlay}>

<div className={styles.popupBox}>

<h3>
Success
</h3>

<p>
Changes Saved Successfully
</p>

<button
className={styles.saveBtn}
onClick={() =>
setShowSuccess(false)
}
>
OK
</button>

</div>

</div>

)}

    </section>
  );
}

export default PackageDetails;

