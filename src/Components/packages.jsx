import { useParams } from "react-router-dom";
import { packagesData } from "../data/packagesData";
import styles from "../Styles/package.module.css";
import { useState, useEffect } from "react";
import axios from "axios";



const carryIcons = [
  "/icons/coat.png",
  "/icons/shoes.png",
  "/icons/sunglasses.png",
  "/icons/sunscreen.png",
  "/icons/medical.png",
  "/icons/id.png"
];

function Package() {
  const { id } = useParams();

  const admin =
JSON.parse(localStorage.getItem("admin"));

const [editing,setEditing] =
useState(false);

const [editData,setEditData] =
useState(null);

const [showConfirm,setShowConfirm] =
useState(false);

const [showSuccess,setShowSuccess] =
useState(false);

  const data = packagesData[id];
  const [dbData, setDbData] = useState(null);

useEffect(() => {
  axios
    .get(`https://localhost:7275/api/travel-package/${id}`)
    .then((res) => {
      setDbData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, [id]);

useEffect(() => {

  if(dbData){

    setEditData(dbData);

  }

}, [dbData]);

const handleSave = async () => {

  try {

    await axios.put(
      `https://localhost:7275/api/travel-package/${id}`,
      editData
    );

    setDbData(editData);

    setEditing(false);

  setShowSuccess(true);

  }
  catch (err) {

    console.log(err);

    alert("Update Failed");

  }

};

  if (!data) {

    return (
      <div className={styles.notFound}>
        <h2>Package Not Found</h2>
      </div>
    );
  }

   if (!dbData || !editData) {
  return <h2>Loading...</h2>;
}


  return (
    <section className={styles.wrapper}>
            <div
        className={styles.hero}
        style={{
          backgroundImage: `url(${data.heroImage})`,
        }}
      >
        <div className={styles.overlay}></div>

        <div className={styles.heroContent}>
          {
editing ?

<input
value={editData.package_name}
onChange={(e)=>
setEditData({
...editData,
package_name:e.target.value
})
}
/>

:

<h1>{dbData.package_name}</h1>

}

{
editing ?

<textarea
value={editData.subtitle}
onChange={(e)=>
setEditData({
...editData,
subtitle:e.target.value
})
}
/>

:

<p>{dbData.subtitle}</p>

}
{
admin && !editing && (

<button
className={styles.editBtn}
onClick={() => setEditing(true)}
>
Edit Package
</button>

)
}

{
admin && editing && (

<div className={styles.actionBtns}>

<button
className={styles.cancelBtn}
onClick={() => {

setEditData(dbData);

setEditing(false);

}}
>
Cancel
</button>

<button
className={styles.saveBtn}
onClick={() =>
setShowConfirm(true)
}
>
Save Changes
</button>

</div>

)
}
        </div>
      </div>
            <div className={styles.infoCard}>
        <div>
          <span>Duration</span>
          {
editing ?

<input
value={editData.duration}
onChange={(e)=>
setEditData({
...editData,
duration:e.target.value
})
}
/>

:

<h3>{dbData.duration}</h3>

}
        </div>

        <div>
          <span>Cities Covered</span>
          {
editing ?

<input
value={editData.cities_covered}
onChange={(e)=>
setEditData({
...editData,
cities_covered:e.target.value
})
}
/>

:

<h3>{dbData.cities_covered}</h3>

}
        </div>

        <div>
          <span>Ideal For</span>
          {
editing ?

<input
value={editData.ideal_for}
onChange={(e)=>
setEditData({
...editData,
ideal_for:e.target.value
})
}
/>

:

<h3>{dbData.ideal_for}</h3>

}
        </div>

        <div>
          <span>Pricing</span>
        {
editing ?

<input
value={editData.pricing}
onChange={(e)=>
setEditData({
...editData,
pricing:e.target.value
})
}
/>

:

<h3>{dbData.pricing}</h3>

}
        </div>
      </div>

            <div className={styles.section}>
        <h2>Overview</h2>

        <p>{data.overview}</p>
      </div>

            <div className={styles.section}>
        <h2>Tour Highlights</h2>

        <div className={styles.highlightGrid}>
          {data.highlights.map((item, index) => (
            <div
              key={index}
              className={styles.highlightCard}
            >
             <div
  className={styles.highlightImage}
  style={{
    backgroundImage: `url(${item.image})`
  }}
></div>

<h4>{item.title}</h4>
            </div>
          ))}
        </div>
      </div>


           <div className={styles.section}>
  <h2>Day Wise Itinerary</h2>

  <div className={styles.timelineWrapper}>
    {editData.itinerary.map((item, index) => (
      <div
        key={index}
        className={styles.timelineCard}
      >
        <div className={styles.timelineImage}>
  <img
    src={data.itineraryImages?.[index]}
    alt={item.day_title}
  />
</div>

       {
editing ?

<input
type="number"
value={item.day_no}
onChange={(e)=>{

const updated=[...editData.itinerary];

updated[index].day_no =
e.target.value;

setEditData({
...editData,
itinerary:updated
});

}}
/>

:

<span className={styles.dayBadge}>
Day {item.day_no}
</span>

}

        {
editing ?

<input
value={item.day_title}
onChange={(e) => {

const updated =
[...editData.itinerary];

updated[index].day_title =
e.target.value;

setEditData({
...editData,
itinerary: updated
});

}}
/>

:

<h3>{item.day_title}</h3>

}

{
editing ?

<textarea
value={item.day_description}
onChange={(e) => {

const updated =
[...editData.itinerary];

updated[index].day_description =
e.target.value;

setEditData({
...editData,
itinerary: updated
});

}}
/>

:

<p>{item.day_description}</p>

}
      </div>
    ))}
  </div>
</div>

            <div className={styles.includeSection}>
        <div className={styles.includeBox}>
          <h2>Package Inclusions</h2>

         {editData.inclusions.map((item,index)=>(

editing ?

<input
key={index}
value={item}
onChange={(e)=>{

const updated =
[...editData.inclusions];

updated[index] =
e.target.value;

setEditData({
...editData,
inclusions: updated
});

}}
/>

:

<p key={index}>
✔ {item}
</p>

))}
        </div>

        <div className={styles.excludeBox}>
          <h2>Package Exclusions</h2>

         {editData.exclusions.map((item,index)=>(

editing ?

<input
key={index}
value={item}
onChange={(e)=>{

const updated =
[...editData.exclusions];

updated[index] =
e.target.value;

setEditData({
...editData,
exclusions: updated
});

}}
/>

:

<p key={index}>
✘ {item}
</p>

))}
        </div>
      </div>

           

            <div className={styles.section}>
        <h2>Things To Carry</h2>
<div className={styles.carryGrid}>
  {data.thingsToCarry.map((item, index) => (
    <div
      key={index}
      className={styles.carryItem}
    >
      <div className={styles.carryIcon}>
        <img
          src={carryIcons[index]}
          alt={item}
        />
      </div>

      <p>{item}</p>
    </div>
  ))}
</div>
      </div>

            <div className={styles.section}>
        <h2>Important Notes</h2>

        <div className={styles.notesBox}>
        {editData.notes.map((item,index)=>(

editing ?

<textarea
key={index}
value={item}
onChange={(e)=>{

const updated =
[...editData.notes];

updated[index] =
e.target.value;

setEditData({
...editData,
notes: updated
});

}}
/>

:

<p key={index}>
• {item}
</p>

))}
        </div>
      </div>

            <div className={styles.section}>
        <h2>Frequently Asked Questions</h2>

        <div className={styles.faqWrap}>
          {data.faq.map((item, index) => (
            <div
              key={index}
              className={styles.faqCard}
            >
              <h4>{item.question}</h4>

              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

            <div className={styles.bookingSection}>
        <h2>
          Ready To Explore Kashmir?
        </h2>

        <p>
          Call or WhatsApp us for
          pricing and bookings.
        </p>

        <div className={styles.contactBox}>
          <h3>
            📞 {data.booking.phone}
          </h3>

          <h3>
            💬 {data.booking.whatsapp}
          </h3>

          <h3>
            📧 {data.booking.email}
          </h3>
        </div>

        <a
          href={`https://wa.me/91${data.booking.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className={styles.bookBtn}
        >
          Book Now
        </a>
      </div>

{
showConfirm && (

<div className={styles.popupOverlay}>

<div className={styles.popupBox}>

<h3>
Save Changes?
</h3>

<p>
Are you sure you want to save
all changes?
</p>

<div className={styles.popupBtns}>

<button
className={styles.cancelBtn}
onClick={() =>
setShowConfirm(false)
}
>
Cancel
</button>

<button
className={styles.saveBtn}
onClick={() => {

setShowConfirm(false);

handleSave();

}}
>
Yes Save
</button>

</div>

</div>

</div>

)
}
{
showSuccess && (

<div className={styles.popupOverlay}>

<div className={styles.popupBox}>

<div className={styles.successIcon}>
✓
</div>

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

)
}
      
    </section>
  );
}

export default Package;

