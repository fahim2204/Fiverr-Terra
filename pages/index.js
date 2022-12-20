import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { useState, useEffect } from 'react';
import axios from "axios";
import Dropzone from 'react-dropzone'

export default function Home() {
  const [formStep, setFormStep] = useState(1);
  const [formQues, setFormQues] = useState(1);
  const [companyDetails, setCompanyDetails] = useState([]);

  const [formData, setFormData] = useState({
    companyName: "",
    structure: "",
    energy: "",

  });

  const fetchCompanyDetails = async (e) => {
    let txt = e.target.value;
    handleFromData(e);
    if (txt.length >= 3) {
      axios
        .get(`https://comparaison.opera-energie.com/api/v1/entreprise/suggestion/${txt}`)
        .then((x) => {
          // setProfileData(x.data);
          console.log("setProfile", x.data);
          setCompanyDetails(x.data);
        })
        .catch(() => {

        });

    }
  }
  const selectCompany = (item) => {
    setFormData({ ...formData, companyName: item.raisonSociale })
    setCompanyDetails([]);
  }

  useEffect(() => {
    console.log("FormData", formData);
  }, [formData])

  const handleFirst = () => {
    setFormStep(2)
  };
  const handleSecond = () => {
    setFormStep(3)
  };
  const handleThird = () => {
    setFormStep(4)
  };
  const handleForth = () => {
    setFormStep(5)
  };
  const handleFromData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  return (
    <>
      <Head>
        <title>Comparision - Terra</title>
        <meta name="description" content="Compare" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div style={{ "--progessWidth": `${formStep * 20}%` }} className="progess-bar"></div>
        <nav class="border-bottom py-2">
          <Link href="/" className='fw-bold fs-3 px-2'>Terra</Link>
        </nav>
        <div className="row mt-4">
          <div className="col-3">
            <ul className='list-unstyled ps-3 d-flex flex-column'>
              <li className='my-2'><span className='rounded-circle py-1 px-2 bg-black text-white'>1</span><span className='ms-2'>Your Identity</span></li>
              <li className='my-2'><span className='rounded-circle py-1 px-2 bg-black text-white'>2</span><span className='ms-2'>Your needs</span></li>
              <li className='my-2'><span className='rounded-circle py-1 px-2 bg-black text-white'>3</span><span className='ms-2'>Your meters</span></li>
              <li className='my-2'><span className='rounded-circle py-1 px-2 bg-black text-white'>4</span><span className='ms-2'>Your infomation</span></li>
            </ul>
          </div>
          <div className="col-9">
            {/* //--- STEP-1 */}
            {formStep === 1 && <>
              <div className="col-sm-12 col-md-10 col-lg-8">
                <div className="main-card border shadow-sm rounded p-4">
                  <p className="fs-4 fw-bold">
                    For which company (company name or SIREN) would you like to compare energy offers?
                  </p>
                  <p>This information is necessary in order to best process your call for tenders</p>
                  <div class="col-12 mb-1">
                    <label for="validationServer03" class="form-label">Company name or SIREN</label>
                    <input type="text" class={`form-control ${formData["companyName"] === "" ? "is-invalid" : "is-valid"}`} name="companyName"
                      onChange={e => { fetchCompanyDetails(e) }} value={formData["companyName"]} autoComplete="off" id="validationServer03" aria-describedby="validationServer03Feedback" required />
                    <div id="validationServer03Feedback" class="invalid-feedback">
                      You need to select a company
                    </div>
                  </div>
                  {companyDetails.length > 0 &&
                    <ul className='suggestion-box border shadow-sm rounded-1'>
                      {companyDetails.map((item, index) => {
                        return (<><li onClick={() => { selectCompany(item) }}>{item.raisonSociale}</li></>)
                      })}
                    </ul>
                  }

                  <div className='text-end'><button className='btn btn-dark py-1 mt-3' onClick={() => handleFirst()}>Start</button></div>
                </div>
              </div>
            </>}
            {/* //--- STEP-2 */}
            {formStep === 2 && <>
              <div className="col-sm-12 col-md-10 col-lg-8">
                <div className="main-card border shadow-sm rounded p-4">
                  <p className="fs-4 fw-bold">
                    Merci de nous confirmer la nature de votre structure
                  </p>
                  <div className="d-flex flex-column">
                    <div className='radio-cont'>
                      <input
                        type="radio"
                        name="structure"
                        id="st-1"
                        value="Une entreprise privée"
                        checked={formData["structure"] === "Une entreprise privée"}
                        onChange={(e) => handleFromData(e)}
                      />
                      <label
                        htmlFor="st-1"
                        className="feed-emo-1"
                        title="Very Bad"
                      >
                        Une entreprise privée<br />
                        <small>(TPE, artisans et commergants, PME, PMI, ETI et grandes entreprises)</small>
                      </label>
                    </div>
                    <div className='radio-cont'>
                      <input
                        type="radio"
                        name="structure"
                        id="st-2"
                        value="Un gestionnaire ou syndic de copropriété"
                        checked={formData["structure"] === "Un gestionnaire ou syndic de copropriété"}
                        onChange={(e) => handleFromData(e)}
                      />
                      <label
                        htmlFor="st-2"
                        className="feed-emo-1"
                        title="Very Bad"
                      >
                        Un gestionnaire ou syndic de copropriété
                      </label>
                    </div>
                    <div className='radio-cont'>
                      <input
                        type="radio"
                        name="structure"
                        id="st-3"
                        value="Une collectivité ou un acheteur public"
                        checked={formData["structure"] === "Une collectivité ou un acheteur public"}
                        onChange={(e) => handleFromData(e)}
                      />
                      <label
                        htmlFor="st-3"
                        className="feed-emo-1"
                        title="Very Bad"
                      >
                        Une collectivité ou un acheteur public
                      </label>
                    </div>
                    <div className='radio-cont'>
                      <input
                        type="radio"
                        name="structure"
                        id="st-4"
                        value="Une association loi 1901"
                        checked={formData["structure"] === "Une association loi 1901"}
                        onChange={(e) => handleFromData(e)}
                      />
                      <label
                        htmlFor="st-4"
                        className="feed-emo-1"
                        title="Very Bad"
                      >
                        Une association loi 1901
                      </label>
                    </div>
                    <div className='radio-cont'>
                      <input
                        type="radio"
                        name="structure"
                        id="st-5"
                        value="Un organisme religieux"
                        checked={formData["structure"] === "Un organisme religieux"}
                        onChange={(e) => handleFromData(e)}
                      />
                      <label
                        htmlFor="st-5"
                        className="feed-emo-1"
                        title="Very Bad"
                      >
                        Un organisme religieux
                      </label>
                    </div>

                  </div>
                  <div className='d-flex justify-content-between'>
                    <button className='btn btn-light text-black py-1 mt-3 border' onClick={() => setFormStep(formStep - 1)}>Previous</button>
                    <button className='btn btn-dark py-1 mt-3' onClick={() => handleSecond()}>Next</button>
                  </div>
                </div>
              </div>
            </>}
            {/* //--- STEP-3 */}
            {formStep === 3 && <>
              <div className="col-sm-12 col-md-10 col-lg-8">
                <div className="main-card border shadow-sm rounded p-4">
                  <p className="fs-4 fw-bold">
                    Pour quel type d'énergie souhaitez-vous comparer les offres?
                  </p>
                  <div className="d-flex flex-column">
                    <div className='radio-cont'>
                      <input
                        type="radio"
                        name="energy"
                        id="enr-1"
                        value="Electricité"
                        checked={formData["energy"] === 'Electricité'}
                        onChange={(e) => handleFromData(e)}
                      />
                      <label
                        htmlFor="enr-1"
                        className="feed-emo-1"
                        title="Very Bad"
                      >
                        Electricité<br />
                        <small>(Ma demande concerne uniquement des compteurs éléctriques)</small>
                      </label>
                    </div>
                    <div className='radio-cont'>
                      <input
                        type="radio"
                        name="energy"
                        id="enr-2"
                        value="Gaz naturel"
                        checked={formData["energy"] === 'Gaz naturel'}
                        onChange={(e) => handleFromData(e)}
                      />
                      <label
                        htmlFor="enr-2"
                        className="feed-emo-1"
                        title="Very Bad"
                      >
                        Gaz naturel<br />
                        <small>(Ma demande concerne uniquement des compteurs de gaz)</small>
                      </label>
                    </div>
                    <div className='radio-cont'>
                      <input
                        type="radio"
                        name="energy"
                        id="enr-3"
                        value="Electricité & Gaz naturel"
                        checked={formData["energy"] === 'Electricité & Gaz naturel'}
                        onChange={(e) => handleFromData(e)}
                      />
                      <label
                        htmlFor="enr-3"
                        className="feed-emo-1"
                        title="Very Bad"
                      >
                        Electricité & Gaz naturel<br />
                        <small>(Ma demande concerne des compteurs éléctriques et de gaz)</small>
                      </label>
                    </div>
                  </div>

                  <div className='d-flex justify-content-between'>
                    <button className='btn btn-light text-black py-1 mt-3 border' onClick={() => setFormStep(formStep - 1)}>Previous</button>
                    <button className='btn btn-dark py-1 mt-3' onClick={() => handleThird()}>Next</button>
                  </div>
                </div>
              </div>
            </>}
            {/* //--- STEP-4 */}
            {formStep === 4 && <>
              <div className="col-sm-12 col-md-10 col-lg-8">
                <div className="main-card border shadow-sm rounded p-4">
                  <p className="fs-4 fw-bold">
                    Document Upload : "Téléverser ma derniere facture"
                  </p>
                  <div className="d-flex flex-column">
                    <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                          </div>
                        </section>
                      )}
                    </Dropzone>

                  </div>

                  <div className='d-flex justify-content-between'>
                    <button className='btn btn-light text-black py-1 mt-3 border' onClick={() => setFormStep(formStep - 1)}>Previous</button>
                    <button className='btn btn-dark py-1 mt-3' onClick={() => handleForth()}>Next</button>
                  </div>
                </div>
              </div>
            </>}
            {/* //--- STEP-5 */}
            {formStep === 5 && <>
              <div className="col-sm-12 col-md-10 col-lg-8">
                <div className="main-card border shadow-sm rounded p-4">
                  <p className="fs-4 fw-bold">
                    Merci de nous indiquer la raison de cette mise en concurrence énergie
                  </p>
                  <div className="d-flex flex-column">
                    <div className='radio-cont'>
                      <input
                        type="radio"
                        name="reason"
                        id="res-2"
                        value="Changement de fournisseur sur le site actuel"
                        checked={formData["reason"] === 'Changement de fournisseur sur le site actuel'}
                        onChange={(e) => handleFromData(e)}
                      />
                      <label
                        htmlFor="res-2"
                        className="feed-emo-1"
                        title="Very Bad"
                      >
                        Changement de fournisseur sur le site actuel<br />
                        <small>(Vous souhaitez mettre en concurrence le fournisseur qui fournit l'électricité etiou le gaz naturel du site
                          dans lequel vous exercez actuellement votre activité professionnelle.)</small>
                      </label>
                    </div>
                    <div className='radio-cont'>
                      <input
                        type="radio"
                        name="reason"
                        id="res-3"
                        value="Emménagement sur un nouveau site (compteur existant)"
                        checked={formData["reason"] === 'Emménagement sur un nouveau site (compteur existant)'}
                        onChange={(e) => handleFromData(e)}
                      />
                      <label
                        htmlFor="res-3"
                        className="feed-emo-1"
                        title="Very Bad"
                      >
                        Emménagement sur un nouveau site (compteur existant)<br />
                        <small>(Vous emménagez sur un site professionnel déjä équipé d'un compteur électricité effou gaz naturel-
                          Ce ou ces compteurs ont déjä un historique de consommation relatif au précédent locataire ou
                          propriétaire du site.)</small>
                      </label>
                    </div>
                    <div className='radio-cont'>
                      <input
                        type="radio"
                        name="reason"
                        id="res-1"
                        value="Emménagement sur un nouveau site (compteur neuf)"
                        checked={formData["reason"] === 'Emménagement sur un nouveau site (compteur neuf)'}
                        onChange={(e) => handleFromData(e)}
                      />
                      <label
                        htmlFor="res-1"
                        className="feed-emo-1"
                        title="Very Bad"
                      >
                        Emménagement sur un nouveau site (compteur neuf)<br />
                        <small>(Vous emménagez sur un site professionnel entiérement neuf n'ayant aucun historique de
consommation d'énergie. Le ou les compteurs viennent d'étre mis en service par le gestionnaire de
réseau, vous étes en possession d'un consuel.)</small>
                      </label>
                    </div>
                  </div>

                  <div className='d-flex justify-content-between'>
                    <button className='btn btn-light text-black py-1 mt-3 border' onClick={() => setFormStep(formStep - 1)}>Previous</button>
                    <button className='btn btn-dark py-1 mt-3' onClick={() => handleSecond()}>Next</button>
                  </div>
                </div>
              </div>
            </>}
          </div>
        </div>
      </main>
    </>
  )
}
