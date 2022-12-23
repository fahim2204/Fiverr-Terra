import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { FaTrashAlt, FiDelete } from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi"
import { FcAddImage, FcFile } from "react-icons/fc";
import { GiCheckMark } from "react-icons/gi";
import Calendar from 'react-calendar';
import { toast, ToastContainer } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner'


export default function Home() {
  const [elecDateValue, setElecDateValue] = useState(new Date());
  const [gasDateValue, setGasDateValue] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData({ ...formData, ["electricityDate"]: Date.parse(elecDateValue) });
  }, [elecDateValue])
  useEffect(() => {
    setFormData({ ...formData, ["gasDate"]: Date.parse(gasDateValue) });
  }, [gasDateValue])


  // Function to handle the addition of a new input field
  const handleAddInputField = (txt) => {
    if (txt === "elec") {
      setFormData({
        ...formData,
        electricMeterNo: [...formData.electricMeterNo, ""]
      });
    } else {
      setFormData({
        ...formData,
        gasMeterNo: [...formData.gasMeterNo, ""]
      });
    }
  }

  // Function to handle the deletion of an input field
  const handleDeleteInputField = (i, txt) => {
    if (txt === "elec") {
      setFormData({
        ...formData,
        electricMeterNo: [...formData.electricMeterNo.slice(0, i),
        ...formData.electricMeterNo.slice(i + 1)]
      });
    }
    else {
      setFormData({
        ...formData,
        gasMeterNo: [...formData.gasMeterNo.slice(0, i),
        ...formData.gasMeterNo.slice(i + 1)]
      });
    }
  }

  // Function to handle the change of an input field's value
  const handleInputFieldChange = (i, event) => {
    if (event.target.name === "electricPdl") {
      setFormData({
        ...formData, electricMeterNo: formData.electricMeterNo.map((item, index) =>
          index === i ? event.target.value : item
        )
      });
    } else {
      setFormData({
        ...formData, gasMeterNo: formData.gasMeterNo.map((item, index) =>
          index === i ? event.target.value : item
        )
      });
    }
  }

  const totalStep = 9;
  const [formStep, setFormStep] = useState(1);
  const [companyDetails, setCompanyDetails] = useState([]);

  const [formData, setFormData] = useState({
    companyName: "",
    companyRegNo: "",
    companyAddress: "",
    structure: "",
    energy: "",
    reason: "",
    electricityDate: "",
    gasDate: "",
    electricConsume: "",
    gasConsume: "",
    electricMeterNo: [""],
    gasMeterNo: [""],
    electricBillDoc: {
      docName: "",
      docData: "",
    },
    gasBillDoc: {
      docName: "",
      docData: "",
    },
    gender: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dataprivacy: "",
    agree: false,
  });
  const [isError, setisError] = useState(false);

  const handleGasBillDoc = (item) => {
    const file = item[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64 = e.target.result;
      setFormData({ ...formData, gasBillDoc: { docName: item[0].name, docData: base64 } });
    };
    reader.readAsDataURL(file);
  }
  const handleElectricBillDoc = (item) => {
    const file = item[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64 = e.target.result;
      setFormData({ ...formData, electricBillDoc: { docName: item[0].name, docData: base64 } });
      // Save the base64 in a state or do something else with it
    };
    reader.readAsDataURL(file);
  }
  const onChangeNoDoc = (e) => {
    if (e.target.name === "noElecBill") {
      e.target.checked ? setFormData({ ...formData, electricBillDoc: { docName: "N/A", docData: "N/A" } }) :
        setFormData({ ...formData, electricBillDoc: { docName: "", docData: "" } })
    } else {
      e.target.checked ? setFormData({ ...formData, gasBillDoc: { docName: "N/A", docData: "N/A" } }) :
        setFormData({ ...formData, gasBillDoc: { docName: "", docData: "" } })
    }
  }

  const fetchCompanyDetails = async (e) => {
    let txt = e.target.value;
    handleFromData(e);
    if (txt.length >= 3) {
      axios
        .get(`https://societeinfo.com/app/rest/api/v2/companies.json?query=${txt}&key=9qmqfovgpchr3au6mbgeas452smldpkl5354glsblmo9vo2930b`)
        .then((x) => {
          // setProfileData(x.data);
          console.log("setProfile", x.data);
          setCompanyDetails(x.data.result);
        })
        .catch(() => { });
    }
  };
  const selectCompany = (item) => {
    setFormData({ ...formData, companyName: item.name, companyRegNo: item.registration_number, companyAddress: item.formatted_address });
    setisError(false)
    setCompanyDetails([]);
  };

  useEffect(() => {
    console.log("FormData", formData);
  }, [formData]);


  const goBack = () => {
    setisError(false);
    if (formStep === 8 && formData['reason'] === "Changement de fournisseur sur le site actuel") {
      setFormStep(formStep - 2);
    } else {
      setFormStep(formStep - 1);
    }
  }
  const handleFirst = () => {
    if (formData['companyName'].length < 1 || formData['companyRegNo'].length < 1 || formData['companyAddress'].length < 1) {
      setisError(true)
    } else {
      setisError(false)
      setFormStep(2);
    }
    // setFormStep(3);
  };
  const handleSecond = () => {
    if (formData['structure'].length < 1) {
      setisError(true)
    } else {
      setisError(false)
      setFormStep(3);
    }
  };
  const handleThird = () => {
    if (formData['energy'].length < 1) {
      setisError(true)
    } else {
      setisError(false)
      setFormStep(4);
    }
  };
  const handleForth = () => {
    if (formData['energy'] === "Electricité & Gaz naturel") {
      if (formData['gasBillDoc']['docData'].length < 2 || formData['electricBillDoc']['docData'].length < 2) {
        setisError(true)
      } else {
        setFormStep(5);
        setisError(false)
      }
    }
    else if (formData['energy'] === "Gaz naturel") {
      if (formData['gasBillDoc']['docData'].length < 2) {
        setisError(true)
      } else {
        setFormStep(5);
        setisError(false)
      }
    }
    else {
      if (formData['electricBillDoc']['docData'].length < 2) {
        setisError(true)
      } else {
        setFormStep(5);
        setisError(false)
      }
    }
  };
  const handleFifth = () => {
    if (formData['reason'].length < 1) {
      setisError(true)
    } else {
      setisError(false)
      setFormStep(6);
    }
  };
  const handleSixth = () => {
    if (formData['reason'] === "Changement de fournisseur sur le site actuel") {
      if (formData['energy'] === "Electricité & Gaz naturel") {
        if (formData['electricMeterNo'][0].length < 1 || formData['gasMeterNo'][0].length < 1) {
          setisError(true)
        } else {
          setFormStep(8);
          setisError(false)
        }
      }
      else if (formData['energy'] === "Gaz naturel") {
        if (formData['gasMeterNo'][0].length < 1) {
          setisError(true)
        } else {
          setFormStep(8);
          setisError(false)
        }
      }
      else {
        if (formData['electricBillDoc']['docData'].length < 2) {
          setisError(true)
        } else {
          setFormStep(8);
          setisError(false)
        }
      }
    }
    else {
      if (formData['energy'] === "Electricité & Gaz naturel") {
        if (formData['electricMeterNo'][0].length < 1 || formData['gasMeterNo'][0].length < 1) {
          setisError(true)
        } else {
          setFormStep(7);
          setisError(false)
        }
      }
      else if (formData['energy'] === "Gaz naturel") {
        if (formData['gasMeterNo'][0].length < 1) {
          setisError(true)
        } else {
          setFormStep(7);
          setisError(false)
        }
      }
      else {
        if (formData['electricBillDoc']['docData'].length < 2) {
          setisError(true)
        } else {
          setFormStep(7);
          setisError(false)
        }
      }
    }
  };
  const handleSeventh = () => {
    if (formData['energy'] === "Electricité & Gaz naturel") {
      if (formData['electricityDate'].length < 1 || formData['electricConsume'].length < 1 || formData['gasDate'].length < 1 || formData['gasConsume'].length < 1) {
        setisError(true)
      } else {
        setFormStep(8);
        setisError(false)
      }
    }
    else if (formData['energy'] === "Gaz naturel") {
      if (formData['gasDate'].length < 1 || formData['gasConsume'].length < 1) {
        setisError(true)
      } else {
        setFormStep(8);
        setisError(false)
      }
    }
    else {
      if (formData['electricityDate'].length < 1 || formData['electricConsume'].length < 1) {
        setisError(true)
      } else {
        setFormStep(8);
        setisError(false)
      }
    }
  };
  const handleEighth = () => {
    if (formData['gender'].length < 1 || formData['firstName'].length < 3 || formData['lastName'].length < 3 || !formData['email'].match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) || formData['phone'].length < 5) {
      setisError(true)
    } else {
      setFormStep(9);
      setisError(false)
    }

  };

  const handleFromData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setisError(false)
  };

  const handleSubmit = () => {
    if (formData['dataprivacy'].length < 1 || !formData['agree']) {
      setisError(true)
    } else {
      setIsLoading(true)
      axios.post("/api/terra", formData).then(() => {
        showSubmitSuccess();
        setFormData({
          companyName: "",
          companyRegNo: "",
          companyAddress: "",
          structure: "",
          energy: "",
          reason: "",
          electricityDate: "",
          gasDate: "",
          electricConsume: "",
          gasConsume: "",
          electricMeterNo: [""],
          gasMeterNo: [""],
          electricBillDoc: {
            docName: "",
            docData: "",
          },
          gasBillDoc: {
            docName: "",
            docData: "",
          },
          gender: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dataprivacy: "",
          agree: false,
        })
        setIsLoading(false)
        setFormStep(1)
      }).catch(() => {
        showSubmitFailed()
        setIsLoading(false)
      })
    }
  }
  const showSubmitSuccess = () => {
    toast.success('Your form has been submitted successfully', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000
    });
  }
  const showSubmitFailed = () => {
    toast.error('Sorry!! Something went wrong!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
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
        <ToastContainer />
        <div style={{ "--progessWidth": `${formStep * (100 / totalStep)}%` }} className="progess-bar"></div>
        <nav class="border-bottom py-2">
          <Link href="/" className="fw-bold fs-3 px-2">
            Terra
          </Link>
        </nav>
        <div className="row mt-4">
          <div className="col-12 col-sm-3 pagination">
            <ul className="list-unstyled ps-3">
              <li className="my-2">
                <div className="bullet">{formStep > 2 ? <GiCheckMark /> : "1"}</div>
                <span className="ms-2">Your Identity</span>
              </li>
              <li className="my-2">
                <div className="bullet">{formStep > 5 ? <GiCheckMark /> : "2"}</div>
                <span className="ms-2">Your needs</span>
              </li>
              <li className="my-2">
                <div className="bullet">{formStep > 7 ? <GiCheckMark /> : "3"}</div>
                <span className="ms-2">Your meters</span>
              </li>
              <li className="my-2">
                <div className="bullet">4</div>
                <span className="ms-2">Your infomation</span>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-9">
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
                      This information is necessary in order to best process your call htmlFor tenders
                    </p>
                    <div class="col-12 mb-1">
                      <label htmlFor="validationServer03" class="form-label">
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
                                  <div className="fw-bold"><HiOutlineOfficeBuilding className="me-2 fs-4" />{item.name}</div>
                                  <div className="d-flex flex-column align-items-end">
                                    <small>{item.registration_number}</small>
                                    <small className="text-danger">{item.formatted_address}</small>
                                  </div>
                                </div>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    )}
                    {formData["companyRegNo"] !== "" && <>
                      <div className="mid-text mt-4"><span className="fw-bold">Votre sélection</span></div>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column">
                          <div className="">Votre SIREN</div>
                          <div className="text-success"><small className="fw-bold">{formData["companyRegNo"]}</small></div>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                          <div className="">Votre Address</div>
                          <div className="text-success"><small className="fw-bold">{formData["companyAddress"]}</small></div>
                        </div>

                      </div>
                    </>}
                    <div className="text-end mt-2">
                      <button className="btn btn-dark py-1 mt-3" onClick={() => handleFirst()}>
                        Démarrer
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
                    {isError && <p className="text-danger my-2"><small>Veuillez sélectionner une option</small></p>}
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-light text-black py-1 mt-3 border"
                        onClick={() => goBack()}
                      >
                        Précédent
                      </button>
                      <button className="btn btn-dark py-1 mt-3" onClick={() => handleSecond()}>
                        Suivant
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
                    {isError && <p className="text-danger my-2"><small>Veuillez sélectionner une option</small></p>}

                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-light text-black py-1 mt-3 border"
                        onClick={() => goBack()}
                      >
                        Précédent
                      </button>
                      <button className="btn btn-dark py-1 mt-3" onClick={() => handleThird()}>
                        Suivant
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
                    {(formData["energy"] === "Electricité" || formData["energy"] === "Electricité & Gaz naturel") &&
                      <>
                        <p className="mb-0 fw-bold"><small>Ma dernière facture d'électricité</small></p>
                        <div className="d-flex flex-column">
                          {formData["electricBillDoc"]["docName"] !== "N/A" &&
                            <>
                              {formData["electricBillDoc"]["docName"].length < 3 ?
                                <>
                                  <Dropzone onDrop={(file) => handleElectricBillDoc(file)}>
                                    {({ getRootProps, getInputProps }) => (
                                      <div {...getRootProps()} className="dropzone p-4 rounded d-flex flex-column align-items-center cursor-pointer">
                                        <input {...getInputProps()} />
                                        <FcAddImage className="fs-1" />
                                        <p className="text-center text-primary opacity-75 mb-0">Téléverser ma facture d'électricité</p>
                                        <p className="mb-0"><small>PNG, JPG, GIF, PDF jusqu'à 10MB</small></p>
                                      </div>
                                    )}
                                  </Dropzone>
                                </> : <>
                                  <div className="d-flex align-items-center my-2 ms-3 fw-semibold">
                                    <FcFile className="fs-4 me-1" />
                                    <small>{formData["electricBillDoc"]["docName"]}</small>
                                  </div>
                                </>
                              }
                            </>
                          }
                          <div class="form-check mt-3">
                            <label class="form-check-label user-select-none" hmtlFor="noElecBill">
                              <input className="form-check-input" type="checkbox" id="noElecBill" name="noElecBill" checked={formData["electricBillDoc"]["docName"] === "N/A"} onChange={(e) => onChangeNoDoc(e)} />
                              Je ne dispose pas de ma facture d'électricité
                            </label>
                          </div>
                        </div>
                      </>
                    }
                    {/* Gas Bill */}
                    {(formData["energy"] === "Gaz naturel" || formData["energy"] === "Electricité & Gaz naturel") &&
                      <>
                        <p className="mb-0 fw-bold mt-3"><small>Ma dernière facture de gaz naturel</small></p>
                        <div className="d-flex flex-column">
                          {formData["gasBillDoc"]["docName"] !== "N/A" &&
                            <>
                              {formData["gasBillDoc"]["docName"].length < 3 ?
                                <>
                                  <Dropzone onDrop={(file) => handleGasBillDoc(file)}>
                                    {({ getRootProps, getInputProps }) => (
                                      <div {...getRootProps()} className="dropzone p-4 rounded d-flex flex-column align-items-center cursor-pointer">
                                        <input {...getInputProps()} />
                                        <FcAddImage className="fs-1" />
                                        <p className="text-center text-primary opacity-75 mb-0">Téléverser ma facture de gaz naturel</p>
                                        <p className="mb-0"><small>PNG, JPG, GIF, PDF jusqu'à 10MB</small></p>
                                      </div>
                                    )}
                                  </Dropzone>
                                </> : <>
                                  <div className="d-flex align-items-center my-2 ms-3 fw-semibold">
                                    <FcFile className="fs-4 me-1" />
                                    <small>{formData["gasBillDoc"]["docName"]}</small>
                                  </div>
                                </>
                              }
                            </>
                          }
                          <div class="form-check mt-3">
                            <label class="form-check-label user-select-none" hmtlFor="noGasBill">
                              <input className="form-check-input" type="checkbox" id="noGasBill" name="noGasBill" checked={formData["gasBillDoc"]["docName"] === "N/A"} onChange={(e) => onChangeNoDoc(e)} />
                              Je ne dispose pas de ma facture de gaz naturel
                            </label>
                          </div>
                        </div>
                      </>}
                    {isError && <p className="text-danger my-2"><small>Veuillez télécharger une copie de la facture ou cocher la case</small></p>}

                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-light text-black py-1 mt-3 border"
                        onClick={() => goBack()}
                      >
                        Précédent
                      </button>
                      <button className="btn btn-dark py-1 mt-3" onClick={() => handleForth()}>
                        Suivant
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
                    {isError && <p className="text-danger my-2"><small>Veuillez sélectionner une option</small></p>}

                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-light text-black py-1 mt-3 border"
                        onClick={() => goBack()}
                      >
                        Précédent
                      </button>
                      <button className="btn btn-dark py-1 mt-3" onClick={() => handleFifth()}>
                        Suivant
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
                    {(formData["energy"] === "Electricité" || formData["energy"] === "Electricité & Gaz naturel") &&
                      <>
                        <p className="fs-5 fw-bold mb-1">
                          Vos compteurs électriques
                        </p>

                        <div>
                          {
                            formData["electricMeterNo"].map((inputField, index) => (
                              <>
                                <p className="fs-6 mb-0 fw-bold">
                                  <small>Numéro de PDL (ou RAE)</small>
                                </p>
                                <div className="d-flex mb-2" key={index}>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm me-2"
                                    name="electricPdl"
                                    value={inputField}
                                    onChange={(event) => handleInputFieldChange(index, event)}
                                  />
                                  <button className="btn btn-sm" type="button" onClick={() => handleDeleteInputField(index, "elec")}><FaTrashAlt /></button>
                                </div>
                              </>
                            ))
                          }
                          <div className="text-center">
                            <button className="btn btn-sm btn-outline-secondary rounded-pill text-black" type="button" onClick={() => handleAddInputField("elec")}><span className="mx-2">+</span>Ajouter un compteur</button></div>
                        </div>
                      </>
                    }
                    {(formData["energy"] === "Gaz naturel" || formData["energy"] === "Electricité & Gaz naturel") &&
                      <>
                        <p className="fs-5 fw-bold mb-1 mt-4">
                          Vos compteurs de gaz naturel
                        </p>

                        <div>
                          {
                            formData["gasMeterNo"].map((inputField, index) => (
                              <>
                                <p className="fs-6 mb-0 fw-bold">
                                  <small>Numéro de PDL (ou RAE)</small>
                                </p>
                                <div className="d-flex mb-2" key={index}>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm me-2"
                                    value={inputField}
                                    name="gasPdl"
                                    onChange={(event) => handleInputFieldChange(index, event)}
                                  />
                                  <button className="btn btn-sm" type="button" onClick={() => handleDeleteInputField(index, "gas")}><FaTrashAlt /></button>
                                </div>
                              </>
                            ))
                          }
                          <div className="text-center">
                            <button className="btn btn-sm btn-outline-secondary rounded-pill text-black" type="button" onClick={() => handleAddInputField("gas")}><span className="mx-2">+</span>Ajouter un compteur</button></div>
                        </div>
                      </>}
                    {isError && <p className="text-danger my-2"><small>Veuillez remplir tous les champs</small></p>}



                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-light text-black py-1 mt-3 border"
                        onClick={() => goBack()}
                      >
                        Précédent
                      </button>
                      <button className="btn btn-dark py-1 mt-3" onClick={() => handleSixth()}>
                        Suivant
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
                    {/* Electric */}
                    {(formData["energy"] === "Electricité" || formData["energy"] === "Electricité & Gaz naturel") &&
                      <>
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
                              name="electricConsume"
                              id="elec-2"
                              value="Bleu"
                              checked={
                                formData["electricConsume"] === "Bleu"
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
                              name="electricConsume"
                              id="elec-3"
                              value="Jaune"
                              checked={
                                formData["electricConsume"] ===
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
                              name="electricConsume"
                              id="elec-1"
                              value="Vert"
                              checked={
                                formData["electricConsume"] ===
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
                        <Calendar className="w-100 rounded" onChange={setElecDateValue} value={elecDateValue} />
                      </>}
                    {/* -----------Natural Gas Section */}
                    {(formData["energy"] === "Gaz naturel" || formData["energy"] === "Electricité & Gaz naturel") &&
                      <>
                        <p className="fs-5 mt-4 mb-2">
                          Informations pour votre compteur gaz naturel
                        </p>
                        <p className="mb-0 fw-bold">Consommation Annuelle de référence éstimée</p>
                        <div className="radio-cont d-flex flex-column">
                          <label htmlFor="gas-2">
                            <input
                              type="radio"
                              name="gasConsume"
                              id="gas-2"
                              value="0 - 100 MWh/an"
                              checked={
                                formData["gasConsume"] === "0 - 100 MWh/an"
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
                              name="gasConsume"
                              id="gas-3"
                              value="100 Mwh - 20 GWh/an"
                              checked={
                                formData["gasConsume"] ===
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
                              name="gasConsume"
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
                        <Calendar className="w-100 rounded" onChange={setGasDateValue} value={gasDateValue} />
                      </>}

                    {isError && <p className="text-danger my-2"><small>Veuillez sélectionner une option</small></p>}


                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-light text-black py-1 mt-3 border"
                        onClick={() => goBack()}
                      >
                        Précédent
                      </button>
                      <button className="btn btn-dark py-1 mt-3" onClick={() => handleSeventh()}>
                        Suivant
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
                    <label htmlFor="firstName" class="form-label mt-2 mb-0">
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
                    <label htmlFor="lastName" class="form-label mt-2 mb-0">
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
                    <label htmlFor="email" class="form-label mt-2 mb-0">
                      <small className="fw-bold">Email</small>
                    </label>
                    <input
                      type="email"
                      class={`form-control ${!formData["email"].match(
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      ) ? "is-invalid" : "is-valid"
                        }`}
                      name="email"
                      onChange={(e) => handleFromData(e)}
                      value={formData["email"]}
                      id="email"
                      required
                    />
                    <label htmlFor="phone" class="form-label mt-2 mb-0">
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

                    {isError && <p className="text-danger my-2"><small>
                      Veuillez saisir tous les champs correctement</small></p>}


                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-light text-black py-1 mt-3 border"
                        onClick={() => goBack()}
                      >
                        Précédent
                      </button>
                      <button className="btn btn-dark py-1 mt-3" onClick={() => handleEighth()}>
                        Suivant
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
                      <label class="form-check-label user-select-none" hmtlFor="agree">
                        <input className="form-check-input" type="checkbox" se id="agree" name="agree" checked={formData["agree"]} onChange={() => setFormData({ ...formData, agree: !formData["agree"] })} />
                        Je suis d'accord avec ces <span className="border-bottom cursor-pointer" data-bs-toggle="modal" data-bs-target="#termsModal">termes et conditions</span>.
                      </label>
                    </div>
                    {isError && <p className="text-danger my-2"><small>Veuillez sélectionner une option</small></p>}

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
                    {isLoading && <div className='d-flex justify-content-center'>
                      <InfinitySpin
                        width='200'
                        color="#4fa94d"
                      />
                    </div>}

                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-light text-black py-1 mt-3 border"
                        onClick={() => goBack()}
                      >
                        Précédent
                      </button>
                      <button disabled={isLoading} className="btn btn-dark py-1 mt-3" onClick={() => handleSubmit()}>
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
