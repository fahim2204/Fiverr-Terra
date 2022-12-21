import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi"
import Calendar from 'react-calendar';

export default function Home() {

  //Calenders
  const [value, onChange] = useState(new Date());

  // Use the useState hook to create a state variable called "inputFields"
  // and a function to update it called "setInputFields"
  const [inputFields, setInputFields] = useState([{ value: "" }]);

  // Function to handle the addition of a new input field
  const handleAddInputField = () => {
    setInputFields([...inputFields, { value: "" }]);
  }

  // Function to handle the deletion of an input field
  const handleDeleteInputField = (index) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  }

  // Function to handle the change of an input field's value
  const handleInputFieldChange = (index, event) => {
    const newInputFields = [...inputFields];
    newInputFields[index].value = event.target.value;
    setInputFields(newInputFields);
  }




  const totalStep = 7;
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
        .catch(() => { });
    }
  };
  const selectCompany = (item) => {
    setFormData({ ...formData, companyName: item.raisonSociale });
    setCompanyDetails([]);
  };

  useEffect(() => {
    console.log("FormData", formData);
  }, [formData]);

  const handleFirst = () => {
    setFormStep(2);
  };
  const handleSecond = () => {
    setFormStep(3);
  };
  const handleThird = () => {
    setFormStep(4);
  };
  const handleForth = () => {
    setFormStep(5);
  };
  const handleFifth = () => {
    setFormStep(6);
  };
  const handleSixth = () => {
    setFormStep(7);
  };
  const handleSeventh = () => {
    setFormStep(8);
  };
  const handleFromData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Head>
        <title>Comparision - Terra</title>
        <meta name="description" content="Compare" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div style={{ "--progessWidth": `${formStep * (100 / totalStep)}%` }} className="progess-bar"></div>
        <nav class="border-bottom py-2">
          <Link href="/" className="fw-bold fs-3 px-2">
            Terra
          </Link>
        </nav>
        <div className="row mt-4">
          <div className="col-3">
            <ul className="list-unstyled ps-3 d-flex flex-column">
              <li className="my-2">
                <span className="rounded-circle py-1 px-2 bg-black text-white">1</span>
                <span className="ms-2">Your Identity</span>
              </li>
              <li className="my-2">
                <span className="rounded-circle py-1 px-2 bg-black text-white">2</span>
                <span className="ms-2">Your needs</span>
              </li>
              <li className="my-2">
                <span className="rounded-circle py-1 px-2 bg-black text-white">3</span>
                <span className="ms-2">Your meters</span>
              </li>
              <li className="my-2">
                <span className="rounded-circle py-1 px-2 bg-black text-white">4</span>
                <span className="ms-2">Your infomation</span>
              </li>
            </ul>
          </div>
          <div className="col-9">
            {/* //--- STEP-1 */}
            {formStep === 1 && (
              <>
                <div className="col-sm-12 col-md-10 col-lg-8">
                  <div className="main-card border shadow-sm rounded p-4">
                    <p className="fs-4 fw-bold">
                      For which company (company name or SIREN) would you like to compare energy
                      offers?
                    </p>
                    <p>
                      This information is necessary in order to best process your call for tenders
                    </p>
                    <div class="col-12 mb-1">
                      <label for="validationServer03" class="form-label">
                        Company name or SIREN
                      </label>
                      <input
                        type="text"
                        class={`form-control ${formData["companyName"] === "" ? "is-invalid" : "is-valid"
                          }`}
                        name="companyName"
                        onChange={(e) => {
                          fetchCompanyDetails(e);
                        }}
                        value={formData["companyName"]}
                        autoComplete="off"
                        id="validationServer03"
                        aria-describedby="validationServer03Feedback"
                        required
                      />
                      <div id="validationServer03Feedback" class="invalid-feedback">
                        You need to select a company
                      </div>
                    </div>
                    {companyDetails.length > 0 && (
                      <ul className="suggestion-box border shadow-sm rounded-1">
                        {companyDetails.map((item, index) => {
                          return (
                            <>
                              <li
                                onClick={() => {
                                  selectCompany(item);
                                }}
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="fw-bold"><HiOutlineOfficeBuilding className="me-2 fs-4"/>{item.raisonSociale}</div>
                                  <div className="d-flex flex-column align-items-end">
                                    <small>{item.siren.libelle}</small>
                                    <small className="text-danger">{item.codeNaf}</small>
                                  </div>
                                </div>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    )}

                    <div className="text-end">
                      <button className="btn btn-dark py-1 mt-3" onClick={() => handleFirst()}>
                        Start
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* //--- STEP-2 */}
            {formStep === 2 && (
              <>
                <div className="col-sm-12 col-md-10 col-lg-8">
                  <div className="main-card border shadow-sm rounded p-4">
                    <p className="fs-4 fw-bold">
                      Merci de nous confirmer la nature de votre structure
                    </p>
                    <div className="radio-cont d-flex flex-column">
                      <label htmlFor="st-1">
                        <input
                          type="radio"
                          name="structure"
                          id="st-1"
                          value="Une entreprise privée"
                          checked={formData["structure"] === "Une entreprise privée"}
                          onChange={(e) => handleFromData(e)}
                        />
                        <div>
                          <div>
                            Une entreprise privée
                            <small>
                              (TPE, artisans et commergants, PME, PMI, ETI et grandes entreprises)
                            </small>
                          </div>
                        </div>
                      </label>
                      <label htmlFor="st-2">
                        <input
                          type="radio"
                          name="structure"
                          id="st-2"
                          value="Un gestionnaire ou syndic de copropriété"
                          checked={
                            formData["structure"] === "Un gestionnaire ou syndic de copropriété"
                          }
                          onChange={(e) => handleFromData(e)}
                        />
                        <div>Un gestionnaire ou syndic de copropriété</div>
                      </label>
                      <label htmlFor="st-3">
                        <input
                          type="radio"
                          name="structure"
                          id="st-3"
                          value="Une collectivité ou un acheteur public"
                          checked={
                            formData["structure"] === "Une collectivité ou un acheteur public"
                          }
                          onChange={(e) => handleFromData(e)}
                        />
                        <div>Une collectivité ou un acheteur public</div>
                      </label>
                      <label htmlFor="st-4">
                        <input
                          type="radio"
                          name="structure"
                          id="st-4"
                          value="Une association loi 1901"
                          checked={formData["structure"] === "Une association loi 1901"}
                          onChange={(e) => handleFromData(e)}
                        />
                        <div>Une association loi 1901</div>
                      </label>
                      <label htmlFor="st-5">
                        <input
                          type="radio"
                          name="structure"
                          id="st-5"
                          value="Un organisme religieux"
                          checked={formData["structure"] === "Un organisme religieux"}
                          onChange={(e) => handleFromData(e)}
                        />
                        <div> Un organisme religieux</div>
                      </label>
                    </div>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-light text-black py-1 mt-3 border"
                        onClick={() => setFormStep(formStep - 1)}
                      >
                        Previous
                      </button>
                      <button className="btn btn-dark py-1 mt-3" onClick={() => handleSecond()}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* //--- STEP-3 */}
            {formStep === 3 && (
              <>
                <div className="col-sm-12 col-md-10 col-lg-8">
                  <div className="main-card border shadow-sm rounded p-4">
                    <p className="fs-4 fw-bold">
                      Pour quel type d'énergie souhaitez-vous comparer les offres?
                    </p>
                    <div className="radio-cont d-flex flex-column">
                      <label htmlFor="enr-1">
                        <input
                          type="radio"
                          name="energy"
                          id="enr-1"
                          value="Electricité"
                          checked={formData["energy"] === "Electricité"}
                          onChange={(e) => handleFromData(e)}
                        />
                        <div>
                          <div>
                            Electricité
                            <small>(Ma demande concerne uniquement des compteurs éléctriques)</small>
                          </div>
                        </div>
                      </label>
                      <label htmlFor="enr-2">
                        <input
                          type="radio"
                          name="energy"
                          id="enr-2"
                          value="Gaz naturel"
                          checked={formData["energy"] === "Gaz naturel"}
                          onChange={(e) => handleFromData(e)}
                        />
                        <div>
                          <div>Gaz naturel
                            <small>(Ma demande concerne uniquement des compteurs de gaz)</small>
                          </div>
                        </div>
                      </label>
                      <label htmlFor="enr-3">
                        <input
                          type="radio"
                          name="energy"
                          id="enr-3"
                          value="Electricité & Gaz naturel"
                          checked={formData["energy"] === "Electricité & Gaz naturel"}
                          onChange={(e) => handleFromData(e)}
                        />
                        <div>
                          <div>Electricité & Gaz naturel
                            <small>(Ma demande concerne des compteurs éléctriques et de gaz)</small>
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-light text-black py-1 mt-3 border"
                        onClick={() => setFormStep(formStep - 1)}
                      >
                        Previous
                      </button>
                      <button className="btn btn-dark py-1 mt-3" onClick={() => handleThird()}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* //--- STEP-4 */}
            {formStep === 4 && (
              <>
                <div className="col-sm-12 col-md-10 col-lg-8">
                  <div className="main-card border shadow-sm rounded p-4">
                    <p className="fs-4 fw-bold">
                      Document Upload : "Téléverser ma derniere facture"
                    </p>
                    <div className="d-flex flex-column">
                      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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

                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-light text-black py-1 mt-3 border"
                        onClick={() => setFormStep(formStep - 1)}
                      >
                        Previous
                      </button>
                      <button className="btn btn-dark py-1 mt-3" onClick={() => handleForth()}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* //--- STEP-5 */}
            {formStep === 5 && (
              <>
                <div className="col-sm-12 col-md-10 col-lg-8">
                  <div className="main-card border shadow-sm rounded p-4">
                    <p className="fs-4 fw-bold">
                      Merci de nous indiquer la raison de cette mise en concurrence énergie
                    </p>
                    <div className="radio-cont d-flex flex-column">
                      <label htmlFor="res-2">
                        <input
                          type="radio"
                          name="reason"
                          id="res-2"
                          value="Changement de fournisseur sur le site actuel"
                          checked={
                            formData["reason"] === "Changement de fournisseur sur le site actuel"
                          }
                          onChange={(e) => handleFromData(e)}
                        />
                        <div>
                          <div>
                            Changement de fournisseur sur le site actuel
                            <small>
                              (Vous souhaitez mettre en concurrence le fournisseur qui fournit
                              l'électricité etiou le gaz naturel du site dans lequel vous exercez
                              actuellement votre activité professionnelle.)
                            </small>
                          </div>
                        </div>
                      </label>
                      <label htmlFor="res-3">
                        <input
                          type="radio"
                          name="reason"
                          id="res-3"
                          value="Emménagement sur un nouveau site (compteur existant)"
                          checked={
                            formData["reason"] ===
                            "Emménagement sur un nouveau site (compteur existant)"
                          }
                          onChange={(e) => handleFromData(e)}
                        />
                        <div>
                          <div>
                            Emménagement sur un nouveau site (compteur existant)
                            <small>
                              (Vous emménagez sur un site professionnel déjä équipé d'un compteur
                              électricité effou gaz naturel- Ce ou ces compteurs ont déjä un
                              historique de consommation relatif au précédent locataire ou
                              propriétaire du site.)
                            </small>
                          </div>
                        </div>
                      </label>
                      <label htmlFor="res-1">
                        <input
                          type="radio"
                          name="reason"
                          id="res-1"
                          value="Emménagement sur un nouveau site (compteur neuf)"
                          checked={
                            formData["reason"] ===
                            "Emménagement sur un nouveau site (compteur neuf)"
                          }
                          onChange={(e) => handleFromData(e)}
                        />
                        <div>
                          <div>
                            Emménagement sur un nouveau site (compteur neuf)
                            <small>
                              (Vous emménagez sur un site professionnel entiérement neuf n'ayant aucun
                              historique de consommation d'énergie. Le ou les compteurs viennent
                              d'étre mis en service par le gestionnaire de réseau, vous étes en
                              possession d'un consuel.)
                            </small>
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-light text-black py-1 mt-3 border"
                        onClick={() => setFormStep(formStep - 1)}
                      >
                        Previous
                      </button>
                      <button className="btn btn-dark py-1 mt-3" onClick={() => handleFifth()}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* //--- STEP-6 */}
            {formStep === 6 && (
              <>
                <div className="col-sm-12 col-md-10 col-lg-8">
                  <div className="main-card border shadow-sm rounded p-4">
                    <p className="fs-4 fw-bold">
                      Merci de préciser le périmètre de votre comparaison
                    </p>
                    <p className="fs-5 fw-bold mb-1">
                      Vos compteurs électriques
                    </p>

                    <div>
                      {
                        inputFields.map((inputField, index) => (
                          <>
                            <p className="fs-6 mb-0 fw-bold">
                              <small>Numéro de PDL (ou RAE)</small>
                            </p>
                            <div className="d-flex mb-2" key={index}>
                              <input
                                type="text"
                                className="form-control form-control-sm me-2"
                                value={inputField.value}
                                onChange={(event) => handleInputFieldChange(index, event)}
                              />
                              <button className="btn btn-sm" type="button" onClick={() => handleDeleteInputField(index)}><FaTrashAlt /></button>
                            </div>
                          </>
                        ))
                      }
                      <div className="text-center">
                        <button className="btn btn-sm btn-outline-secondary rounded-pill text-black" type="button" onClick={handleAddInputField}><span className="mx-2">+</span>Ajouter un compteur</button></div>
                    </div>
                    <p className="fs-5 fw-bold mb-1 mt-4">
                      Vos compteurs de gaz naturel
                    </p>

                    <div>
                      {
                        inputFields.map((inputField, index) => (
                          <>
                            <p className="fs-6 mb-0 fw-bold">
                              <small>Numéro de PDL (ou RAE)</small>
                            </p>
                            <div className="d-flex mb-2" key={index}>
                              <input
                                type="text"
                                className="form-control form-control-sm me-2"
                                value={inputField.value}
                                onChange={(event) => handleInputFieldChange(index, event)}
                              />
                              <button className="btn btn-sm" type="button" onClick={() => handleDeleteInputField(index)}><FaTrashAlt /></button>
                            </div>
                          </>
                        ))
                      }
                      <div className="text-center">
                        <button className="btn btn-sm btn-outline-secondary rounded-pill text-black" type="button" onClick={handleAddInputField}><span className="mx-2">+</span>Ajouter un compteur</button></div>
                    </div>


                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-light text-black py-1 mt-3 border"
                        onClick={() => setFormStep(formStep - 1)}
                      >
                        Previous
                      </button>
                      <button className="btn btn-dark py-1 mt-3" onClick={() => handleSixth()}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* //--- STEP-7 */}
            {formStep === 7 && (
              <>
                <div className="col-sm-12 col-md-10 col-lg-8">
                  <div className="main-card border shadow-sm rounded p-4">
                    <p className="fs-4 fw-bold">
                      Informations de mise en service
                    </p>
                    <p className="fs-5 mb-2">
                      Informations pour votre compteur électrique
                    </p>
                    <p className="mb-0 fw-bold">Puissance compteur éléctrique souhaitée</p>
                    <div className="radio-cont d-flex flex-column">
                      <label htmlFor="elec-2">
                        <input
                          type="radio"
                          name="electricity"
                          id="elec-2"
                          value="Bleu"
                          checked={
                            formData["electricity"] === "Bleu"
                          }
                          onChange={(e) => handleFromData(e)}
                        />
                        <div>
                          <div>
                            Bleu
                            <small>
                              BT Inférieur à 36kVA
                            </small>
                          </div>
                        </div>
                      </label>
                      <label htmlFor="elec-3">
                        <input
                          type="radio"
                          name="electricity"
                          id="elec-3"
                          value="Jaune"
                          checked={
                            formData["electricity"] ===
                            "Jaune"
                          }
                          onChange={(e) => handleFromData(e)}
                        />
                        <div>
                          <div>
                            Jaune
                            <small>
                              BT Supérieur à 36kVA
                            </small>
                          </div>
                        </div>
                      </label>
                      <label htmlFor="elec-1">
                        <input
                          type="radio"
                          name="electricity"
                          id="elec-1"
                          value="Vert"
                          checked={
                            formData["electricity"] ===
                            "Vert"
                          }
                          onChange={(e) => handleFromData(e)}
                        />
                        <div>
                          <div>
                            Vert
                            <small>
                              HTA
                            </small>
                          </div>
                        </div>
                      </label>
                    </div>
                    <p className="my-2 mt-4">Date de mise en service souhaitée des compteurs électriques</p>
                    <Calendar className="w-100 rounded" onChange={onChange} value={value} />
                    {/* -----------Natural Gas Section */}
                    <p className="fs-5 mt-4 mb-2">
                      Informations pour votre compteur gaz naturel
                    </p>
                    <p className="mb-0 fw-bold">Consommation Annuelle de référence éstimée</p>
                    <div className="radio-cont d-flex flex-column">
                      <label htmlFor="gas-2">
                        <input
                          type="radio"
                          name="gas"
                          id="gas-2"
                          value="0 - 100 MWh/an"
                          checked={
                            formData["gas"] === "0 - 100 MWh/an"
                          }
                          onChange={(e) => handleFromData(e)}
                        />
                        <div>
                          0 - 100 MWh/an
                        </div>
                      </label>
                      <label htmlFor="gas-3">
                        <input
                          type="radio"
                          name="gas"
                          id="gas-3"
                          value="100 Mwh - 20 GWh/an"
                          checked={
                            formData["gas"] ===
                            "100 Mwh - 20 GWh/an"
                          }
                          onChange={(e) => handleFromData(e)}
                        />
                        <div>
                          100 Mwh - 20 GWh/an
                        </div>
                      </label>
                      <label htmlFor="gas-1">
                        <input
                          type="radio"
                          name="gas"
                          id="gas-1"
                          value="Supérieur à 20 GWh/an"
                          checked={
                            formData["gas"] ===
                            "Supérieur à 20 GWh/an"
                          }
                          onChange={(e) => handleFromData(e)}
                        />
                        <div>
                         Supérieur à 20 GWh/an
                        </div>
                      </label>
                    </div>
                    <p className="my-2 mt-4">Date de mise en service souhaitée des compteurs électriques</p>
                    <Calendar className="w-100 rounded" onChange={onChange} value={value} />


                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-light text-black py-1 mt-3 border"
                        onClick={() => setFormStep(formStep - 1)}
                      >
                        Previous
                      </button>
                      <button className="btn btn-dark py-1 mt-3" onClick={() => handleSeventh()}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
