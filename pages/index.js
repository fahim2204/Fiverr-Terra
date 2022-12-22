import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi"
import { FcAddImage } from "react-icons/fc";
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




  const totalStep = 9;
  const [formStep, setFormStep] = useState(1);
  const [formQues, setFormQues] = useState(1);
  const [companyDetails, setCompanyDetails] = useState([]);

  const [formData, setFormData] = useState({
    companyName: "",
    companySiren: "",
    companyNaf: "",
    structure: "",
    energy: "",
  });
  const [isError, setisError] = useState(false);

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
    setFormData({ ...formData, companyName: item.raisonSociale, companySiren: item.siren.libelle, companyNaf: item.codeNaf });
    setCompanyDetails([]);
  };

  useEffect(() => {
    console.log("FormData", formData);
  }, [formData]);

  const handleFirst = () => {
    if (formData['companyName'].length < 1 || formData['companySiren'].length < 1 || formData['companyNaf'].length < 1) {
      setisError(true)
    } else {
      setisError(false)
      setFormStep(2);
    }
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
  const handleEighth = () => {
    setFormStep(9);
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
                  <div className="main-card border shadow-sm rounded p-4 mb-3">
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
                        class={`form-control ${isError ? "is-invalid " : ""} ${formData["companyName"].length >= 3 ? "is-valid" : ""} `}
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
                                  <div className="fw-bold"><HiOutlineOfficeBuilding className="me-2 fs-4" />{item.raisonSociale}</div>
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
                    {formData["companyNaf"] !== "" && <>
                      <div className="mid-text mt-4"><span className="fw-bold">Votre sélection</span></div>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column">
                          <div className="">Votre SIREN</div>
                          <div className="text-success"><small className="fw-bold">{formData["companySiren"]}</small></div>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                          <div className="">Votre Code NAF</div>
                          <div className="text-success"><small className="fw-bold">{formData["companyNaf"]}</small></div>
                        </div>

                      </div>
                    </>}
                    <div className="text-end mt-2">
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
                  <div className="main-card border shadow-sm rounded p-4 mb-3">
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
                  <div className="main-card border shadow-sm rounded p-4 mb-3">
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
                  <div className="main-card border shadow-sm rounded p-4 mb-3">
                    <p className="fs-4 mb-0 fw-bold">
                      Téléverser ma derniere facture <small>(facultatif)</small>
                    </p>
                    <p className="lh-sm"><small>Nos courtiers auront besoin de vos factures d'énergie pour mieux traiter votre demande, vous pouvez leur transmettre ici si vous le souhaitez.</small></p>
                    {/* Electricity Bill */}
                    <p className="mb-0 fw-bold"><small>Ma dernière facture d'électricité</small></p>
                    <div className="d-flex flex-column">
                      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps()} className="dropzone p-4 rounded d-flex flex-column align-items-center cursor-pointer">
                            <input {...getInputProps()} />
                            <FcAddImage className="fs-1" />
                            <p className="text-center text-primary opacity-75 mb-0">Téléverser ma facture d'électricité</p>
                            <p className="mb-0"><small>PNG, JPG, GIF, PDF jusqu'à 10MB</small></p>
                          </div>
                        )}
                      </Dropzone>
                    </div>
                    {/* Gas Bill */}
                    <p className="mb-0 fw-bold mt-3"><small>Ma dernière facture de gaz naturel</small></p>
                    <div className="d-flex flex-column">
                      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps()} className="dropzone p-4 rounded d-flex flex-column align-items-center cursor-pointer">
                            <input {...getInputProps()} />
                            <FcAddImage className="fs-1" />
                            <p className="text-center text-primary opacity-75 mb-0">Téléverser ma facture de gaz naturel</p>
                            <p className="mb-0"><small>PNG, JPG, GIF, PDF jusqu'à 10MB</small></p>
                          </div>
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
                  <div className="main-card border shadow-sm rounded p-4 mb-3">
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
                  <div className="main-card border shadow-sm rounded p-4 mb-3">
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
                  <div className="main-card border shadow-sm rounded p-4 mb-3">
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
            {/* //--- STEP-8 */}
            {formStep === 8 && (
              <>
                <div className="col-sm-12 col-md-10 col-lg-8">
                  <div className="main-card border shadow-sm rounded p-4 mb-3">
                    <p className="fs-4 fw-bold mb-0">
                      Merci de nous communiquer vos coordonnées
                    </p>
                    <small className="mb-2">Ces informations restent strictement confidentielles et sont utilisées uniquement dans le cadre de la souscription d'un contrat d'énergie.</small>

                    <div className="fw-bold mt-2"><small>Civilité</small></div>
                    <div className="d-flex justify-content-center align-items-center">
                      <input
                        type="radio"
                        name="gender"
                        id="feed-cat-1"
                        value="Monsieur"
                        checked={
                          formData["gender"] === "Monsieur"
                        }
                        className="cat-radio"
                        onChange={(e) => handleFromData(e)}
                      />
                      <label
                        htmlFor="feed-cat-1"
                        className="feed-emo me-1 feed-emo-1"
                      >
                        Monsieur
                      </label>
                      <input
                        type="radio"
                        name="gender"
                        id="feed-cat-2"
                        value="Madame"
                        checked={
                          formData["gender"] === "Madame"
                        }
                        className="cat-radio"
                        onChange={(e) => handleFromData(e)}
                      />
                      <label
                        htmlFor="feed-cat-2"
                        className="feed-emo ms-1 feed-emo-2"
                      >
                        Madame
                      </label>
                    </div>
                    <label for="firstName" class="form-label mt-2 mb-0">
                      <small className="fw-bold">First Name</small>
                    </label>
                    <input
                      type="text"
                      class={`form-control ${formData["firstName"] === "" ? "is-invalid" : "is-valid"
                        }`}
                      name="firstName"
                      onChange={(e) => handleFromData(e)}
                      value={formData["firstName"]}
                      autoComplete="off"
                      id="firstName"
                      required
                    />
                    <label for="lastName" class="form-label mt-2 mb-0">
                      <small className="fw-bold">Last Name</small>
                    </label>
                    <input
                      type="text"
                      class={`form-control ${formData["lastName"] === "" ? "is-invalid" : "is-valid"
                        }`}
                      name="lastName"
                      onChange={(e) => handleFromData(e)}
                      value={formData["lastName"]}
                      autoComplete="off"
                      id="lastName"
                      required
                    />
                    <label for="email" class="form-label mt-2 mb-0">
                      <small className="fw-bold">Email</small>
                    </label>
                    <input
                      type="email"
                      class={`form-control ${formData["email"] === "" ? "is-invalid" : "is-valid"
                        }`}
                      name="email"
                      onChange={(e) => handleFromData(e)}
                      value={formData["email"]}
                      autoComplete="off"
                      id="email"
                      required
                    />
                    <label for="phone" class="form-label mt-2 mb-0">
                      <small className="fw-bold">Phone</small>
                    </label>
                    <input
                      type="tel"
                      class={`form-control ${formData["phone"] === "" ? "is-invalid" : "is-valid"
                        }`}
                      name="phone"
                      onChange={(e) => handleFromData(e)}
                      value={formData["phone"]}
                      autoComplete="off"
                      id="phone"
                      required
                    />
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-light text-black py-1 mt-3 border"
                        onClick={() => setFormStep(formStep - 1)}
                      >
                        Previous
                      </button>
                      <button className="btn btn-dark py-1 mt-3" onClick={() => handleEighth()}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* //--- STEP-9 */}
            {formStep === 9 && (
              <>
                <div className="col-sm-12 col-md-10 col-lg-8">
                  <div className="main-card border shadow-sm rounded p-4 mb-3">
                    <p className="fs-4 fw-bold mb-0">
                      Confidentialité des données (RGPD)
                    </p>
                    <div className="mb-3 lh-sm"><small>Je souhaite obtenir gratuitement et sans engagement de ma part, informations et offres commerciales utiles à mon activité PROFESSIONNELLE et relatives au marché de l'énergie. Je pourrai à tout moment, d'un simple clic, stopper cette autorisation et obtenir, sur simple demande, la communication, la rectification ou la suppression des données personnelles collectées.</small></div>
                    <div className="d-flex justify-content-center align-items-center">
                      <input
                        type="radio"
                        name="dataprivacy"
                        id="feed-cat-1"
                        value="Yes"
                        checked={
                          formData["dataprivacy"] === "Yes"
                        }
                        className="cat-radio"
                        onChange={(e) => handleFromData(e)}
                      />
                      <label
                        htmlFor="feed-cat-1"
                        className="feed-emo me-1 feed-emo-1"
                      >
                        Oui
                      </label>
                      <input
                        type="radio"
                        name="dataprivacy"
                        id="feed-cat-2"
                        value="No"
                        checked={
                          formData["dataprivacy"] === "No"
                        }
                        className="cat-radio"
                        onChange={(e) => handleFromData(e)}
                      />
                      <label
                        htmlFor="feed-cat-2"
                        className="feed-emo ms-1 feed-emo-2"
                      >
                        Non
                      </label>
                    </div>
                    <div class="form-check mt-3">
                      <input className="form-check-input" type="checkbox" id="agree" name="agree" required />
                      <label class="form-check-label user-select-none" hmtlFor="agree">
                        Je suis d'accord avec ces <span className="border-bottom cursor-pointer" data-bs-toggle="modal" data-bs-target="#termsModal">termes et conditions</span>.
                      </label>
                    </div>

                    {/* <!-- Modal --> */}
                    <div class="modal fade" id="termsModal" tabindex="-1" role="dialog" aria-labelledby="termsModalLabel" aria-hidden="true">
                      <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="termsModalLabel">Termes et conditions</h5>
                          </div>
                          <div class="modal-body">
                            <p className="lh-sm">Par la signature de ce document, le Client autorise expressément TERRA GROUPE, ainsi que l’ensemble des fournisseurs
                              d’énergie partenaires avec lesquels celle-ci est liée par contrat, à demander aux gestionnaires de réseau de distribution de gaz
                              naturel et d’électricité (Enedis, GRDF...) et au(x) fournisseur(s) actuel(s) les caractéristiques techniques et les données
                              d’acheminement, sous réserve de disponibilité:</p>
                            <ul className="lh-sm">
                              <li className="mb-1">L'historique des consommations, en kWh, du site (et puissances atteintes et dépassements de puissance et énergie réactive)</li>
                              <li className="mb-1">L'historique des relevés d'index quotidiens, en kWh, et la puissance maximale quotidienne, en kVA ou kW, du site</li>
                              <li className="mb-1">L'historique des courbes de charge du site (points 10 minutes)</li>
                              <li className="mb-1">Les données techniques et contractuelles disponibles du site</li>
                              <li className="mb-1">La segmentation technique C1, C2, C3, C4 ou C5</li>
                              <li className="mb-1">Les éléments nécessaires à la télérelève des compteurs : numéro de téléphone, code esclave, type de compteur, aiguilleur, fenêtre de lecture,...</li>
                              <li className="mb-1">Les éléments relatifs aux transformateurs de courant « TC » installés : Tension de livraison, rapport de transformation, classe de précision, puissance minimale autorisée, puissance maximale autorisée</li>
                              <li className="mb-1">L'historique des consommations, en m3, du site</li>
                              <li className="mb-1">L'historique des relevés d'index, en m3</li>
                              <li className="mb-1">La capacité journalière des sites concernés en MWh/j</li>
                              <li className="mb-1">La modulation hivernale des sites concernés (TP, T4, T3JJ) en MWh/j</li>
                              <li className="mb-1">Les données techniques et contractuelles disponibles du site</li>
                              <li className="mb-1">La segmentation technique T1, T2, T3, T4</li>
                              <li className="mb-1">Les éléments relatifs au comptage</li>
                            </ul>
                            <p className="lh-sm">
                              La présente autorisation autorise TERRA GROUPE à accéder aux données du point de livraison, et autorise les fournisseurs
                              partenaires de TERRA GROUPE à y accéder également. Elle est consentie pour une durée de 12 mois à compter de la date
                              de signature et n’engage aucun frais de votre part.<br />
                              Le client accepte expressément que ses données personnelles soient conservées par TERRA GROUPE et/ou GRD à des fins de
                              gestion de traçabilité. Conformément à la loi Informatique et Libertés du 6 janvier 1978, le Client dispose d’un droit d’accès, de
                              rectification, de suppression et d’opposition pour motifs légitimes sur l’ensemble des données le concernant qu’il peut exercer sur
                              simple demande auprès de TERRA GROUPE et/ou GRD.
                            </p>

                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="d-flex justify-content-end">

                      <button className="btn btn-dark py-1 mt-3" onClick={() => handleSubmit()}>
                        Suivant
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
