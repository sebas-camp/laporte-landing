import { useState, useEffect, Fragment } from "react";
/* import { Transition } from "react-transition-group"; */
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Spotify } from "react-spotify-embed";
import { useForm } from '@formspree/react';
import Cookies from 'js-cookie';
import { Dialog, Transition  } from '@headlessui/react'

function App() {
  const [isOpenHeader, setIsOpenHeader] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [state, handleSubmit] = useForm("mjvdnzyr");

  

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit(e);
    if (state.succeeded) {
      window.location.href = '/gracias';
    }
  };

  const handleClickHeader = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("id-section");
    const element = document.getElementById(id);
    const headerOffset = 75;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    /* element.scrollIntoView({ behavior: 'smooth'}) */
    if (element) {
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    setIsOpenHeader(false);
  };

  const handleTrackClick = (track) => {
    let new_track = "https://open.spotify.com/track/" + track;
    setSelectedTrack(new_track);
  };

  const handleCloseClick = () => {
    setSelectedTrack(null);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseClickImage = () => {
    setSelectedImage(null);
  };


  const [isOpenModalPrivacidad, setIsOpenModalPrivacidad] = useState(false)
  const [isOpenModalCookies, setIsOpenModalCookies] = useState(false)

  function closeModal() {
    setIsOpenModalPrivacidad(false)
  }

  function closeModalDos() {
    setIsOpenModalCookies(false)
  }

  /* ACEPTAR COOKIES */
  /* Cookies.remove("coookieAceptada") */
  const [coookieAceptada,setCoookieAceptada] = useState()
  useEffect(() => {
    const isCookie = Cookies.get("coookieAceptada")
    if (isCookie == undefined || isCookie == "") {            
      setCoookieAceptada(false)
    }
  })

  const handleCookie = ()=>{
    var token = "true";
    const cookie_days = Math.round(100080 / 1440);
    Cookies.set('coookieAceptada', token, { expires: cookie_days});
    setCoookieAceptada(true)
  }
  /* FIN ACEPTAR COOKIES */

  return (
    <>
      <main className="scroll-smooth">
        <header className="z-10	flex items-center justify-center gap-7 px-4 py-3 bg-[#212236] text-white sticky top-0">
          <a
            id-section="carrusel-home"
            onClick={handleClickHeader}
            className="cursor-pointer text-xs font-medium hidden md:block"
          >
            HOME
          </a>
          <a
            id-section="noticias"
            onClick={handleClickHeader}
            className="cursor-pointer text-xs font-medium hidden md:block"
          >
            MÁS POPULARES
          </a>
          <a
            id-section="musica"
            onClick={handleClickHeader}
            className="cursor-pointer text-xs font-medium hidden md:block"
          >
            MUSIC & VIDEO
          </a>
          <a
            id-section="carrusel-home"
            onClick={handleClickHeader}
            className="text-5xl font-medium hidden md:block cursor-pointer"
          >
            LAPORTE
          </a>
          <a
            id-section="biografia"
            onClick={handleClickHeader}
            className="cursor-pointer text-xs font-medium hidden md:block"
          >
            BIOGRAFIA
          </a>
          <a
            id-section="galeria"
            onClick={handleClickHeader}
            className="cursor-pointer text-xs font-medium hidden md:block"
          >
            GALERIA
          </a>
          <a
            id-section="contacto"
            onClick={handleClickHeader}
            className="cursor-pointer text-xs font-medium hidden md:block"
          >
            CONTACTO
          </a>
          <div className="block md:hidden ml-left">
            <a
              id-section="carrusel-home"
              onClick={handleClickHeader}
              className="block px-4 py-2 text-2xl font-bold hover:bg-gray-800"
            >
              LAPORTE
            </a>
          </div>
          <div className="block md:hidden ml-auto">
            <button
              onClick={() => setIsOpenHeader(!isOpenHeader)}
              className="flex border-0 items-center px-3 py-2 border-0 rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-align-left"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="14" y2="12" />
                <line x1="4" y1="18" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          {/* <Transition in={isOpenHeader} timeout={300}>
            {(state) => (
              <div
                className={`${
                  isOpenHeader ? "block" : "hidden"
                } md:hidden fixed top-14 right-0 z-50 w-48 py-2 bg-[#23243a] text-white rounded transition-all duration-300 ease-in-out transform`}
                style={{
                  transform:
                    state === "entering" || state === "entered"
                      ? "translateY(0)"
                      : "translateY(-100%)",
                }}
              >
                <a
                  id-section="carrusel-home"
                  onClick={handleClickHeader}
                  className="block px-4 py-2 text-lg font-medium hover:bg-gray-800"
                >
                  HOME
                </a>
                <a
                  id-section="noticias"
                  onClick={handleClickHeader}
                  className="block px-4 py-2 text-lg font-medium hover:bg-gray-800"
                >
                  MÁS POPULARES
                </a>
                <a
                  id-section="musica"
                  onClick={handleClickHeader}
                  className="block px-4 py-2 text-lg font-medium hover:bg-gray-800"
                >
                  MUSIC & VIDEO
                </a>
                <a
                  id-section="biografia"
                  onClick={handleClickHeader}
                  className="block px-4 py-2 text-lg font-medium hover:bg-gray-800"
                >
                  BIOGRAFIA
                </a>
                <a
                  id-section="galeria"
                  onClick={handleClickHeader}
                  className="block px-4 py-2 text-lg font-medium hover:bg-gray-800"
                >
                  GALERIA
                </a>
                <a
                  id-section="contacto"
                  onClick={handleClickHeader}
                  className="block px-4 py-2 text-lg font-medium hover:bg-gray-800"
                >
                  CONTACTO
                </a>
              </div>
            )}
          </Transition> */}
        </header>
        <div id="carrusel-home">
          <div className="bg-black">
            <img src="https://res.cloudinary.com/dswzcvwem/image/upload/v1715034212/miguel%20laporte/DSC01979_3.f9341ef3483b48fbb092_k3tq26.webp" />
          </div>
        </div>
        <div className="" id="noticias">
          <div className="text-center mb-5 mt-10 hidden">
            <h1 className="text-2xl	md:text-4xl	inline-block pb-2.5	border-b border-black">
              NOTICIAS
            </h1>
          </div>
          <div className="grid grid-cols-1">
            <div className="pt-5 md:pb-20">
              <div className="m-auto text-black min-h-full items-center justify-center flex px-8 py-8 md:px-16 md:py-0">
                <div id="spotify-embed-iframe">
                  <div id="embed-iframe"></div>
                  <div>
                    <Spotify
                      wide
                      link="https://open.spotify.com/artist/2BP0jSttglAB5Nr7zL9CUY"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-8 px-4 md:px-0" id="musica">
          <div className="grid md:grid-cols-2 gap-10 mb-7 mt-10">
            <div className="text-center">
              <h1 className="text-2xl	md:text-4xl	inline-block pb-2.5	border-b border-black">
                Musica
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-10">
                <div>
                  <img
                    className="m-auto ease-in-out duration-500 hover:scale-105 cursor-pointer"
                    alt="track miguel laporte"
                    onClick={() => handleTrackClick("23bJw4CIqEHtqmntC8AgVj")}
                    src="/img/musica/img1.png"
                  />
                </div>
                <div>
                  <img
                    className="m-auto ease-in-out duration-500 hover:scale-105 cursor-pointer"
                    alt="track miguel laporte"
                    onClick={() => handleTrackClick("2ywHwJkDgOBpQZV7r9ZKdP")}
                    src="/img/musica/img2.png"
                  />
                </div>
                <div>
                  <img
                    className="m-auto ease-in-out duration-500 hover:scale-105 cursor-pointer"
                    alt="track miguel laporte"
                    onClick={() => handleTrackClick("1goBvC6TFvvfMulxqPqkle")}
                    src="/img/musica/img3.png"
                  />
                </div>
                <div>
                  <img
                    className="m-auto ease-in-out duration-500 hover:scale-105 cursor-pointer"
                    alt="track miguel laporte"
                    onClick={() => handleTrackClick("1aN7expPCCPo3L4AAaywMz")}
                    src="/img/musica/img4.png"
                  />
                </div>
                <div>
                  <img
                    className="m-auto ease-in-out duration-500 hover:scale-105 cursor-pointer"
                    alt="track miguel laporte"
                    onClick={() => handleTrackClick("0aMjQ87hzbRKVBpSqpLye4")}
                    src="/img/musica/img5.png"
                  />
                </div>
                <div>
                  <img
                    className="m-auto ease-in-out duration-500 hover:scale-105 cursor-pointer"
                    alt="track miguel laporte"
                    onClick={() => handleTrackClick("0gr91ooNxMx7VRFd1x5OXs")}
                    src="/img/musica/img6.png"
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-4xl	inline-block pb-2.5	border-b border-black">
                Videos
              </h1>

              <div className="my-5">
                <iframe
                  className="m-auto w-9/12"
                  samesite="none"
                  height="285"
                  src="https://www.youtube.com/embed/Ie41v5C7EUE"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="my-5">
                <iframe
                  className="m-auto w-9/12"
                  samesite="none"
                  height="285"
                  src="https://www.youtube.com/embed/ttWck3AAN9c"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="mb-5 hidden">
                <iframe
                  className="m-auto w-9/12"
                  samesite="none"
                  height="285"
                  src="https://www.youtube.com/embed/z4zj_KqSj1I"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          {selectedTrack && (
            <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-75 overflow-hidden">
              <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-lg">
                  <Spotify
                    link={selectedTrack}
                    className="w-full object-cover m-auto w-4/6 md:w-fit"
                  />

                  <button
                    className="absolute top-2	right-2 p-2 text-white"
                    onClick={handleCloseClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-9 h-9"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="pb-8 pt-5">
          <div className="text-center mb-7 mt-10" id="biografia">
            <h1 className="text-2xl	md:text-4xl	inline-block pb-2.5	border-b border-black">
              Biografia
            </h1>
          </div>

          <div className="grid  md:grid-cols-2 gap-10">
            <div className="">
              <img className="w-full m-auto" src="/img/biografia/img2.jpeg" />
            </div>

            <div className="px-14 m-auto">
              <h2 className="hidden text-center text-2xl md:text-3xl">
                ¿ Quién soy ?
              </h2>
              <br />
              <p className="text-center text-lg">
                Laporte es un artista malagueño con más de 20 años de
                trayectoria artística.{" "}
              </p>

              <p className="text-center text-lg">
                Comenzó a los 10 años en el coro de niños de su ciudad en Málaga
                y desde entonces no ha parado de formarse y trabajar para dar su
                nombre a conocer en el ámbito musical.{" "}
              </p>
              <br />
              <p className="text-center text-lg">
                Los últimos 8 años, ha estado en Sudamérica (México y Perú)
                dando a conocer su música como cantante y compositor tanto en
                televisión como en teatros, salas de conciertos y compartiendo
                escenario con artistas reconocidos por toda Sudamérica .{" "}
              </p>
              <br />
              <p className="text-center text-lg">
                Esta firmado como artista en la discografíca Kiva music del
                reconocido productor Mexicano Stefano Vieni y como compositor
                por una de las editoriales mas importante como es Warner
                Chappell México.
              </p>
              <br />
              <p className="text-center text-lg">
                {" "}
                Actualmente Laporte está preparando su nuevo trabajo
                discográfico que sin duda dará mucho que hablar.
              </p>
              <br />
            </div>

            <div className="px-14 hidden">
              <p className="text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus hendrerit fermentum enim, id laoreet eros. Nam pretium
                erat ante, nec molestie velit eleifend in. Duis semper, odio et
                dapibus faucibus, eros massa pharetra odio, bibendum congue
                mauris odio sed magna. Cras at eros sed urna fermentum cursus
                quis a nulla. Donec non lacus dignissim, consectetur mauris ac,
                mollis felis. Sed dolor erat, blandit quis lectus quis,
                tincidunt vestibulum leo. Proin ultricies, lacus vel sagittis
                faucibus, ligula lectus porta metus, nec pretium elit sem eu
                justo. Quisque vel elit et eros congue porttitor id a purus.
                Integer luctus est quis urna vulputate, faucibus vestibulum leo
                ultrices. Mauris lobortis bibendum nisl, eu varius turpis
                eleifend ut. Nam eleifend bibendum purus.
              </p>
            </div>

            <div className=" hidden">
              <img className="w-9/12 m-auto" src="/img/biografia/img2.jpeg" />
            </div>
          </div>
        </div>
        <div className="pb-8" id="galeria">
          <div className="text-center mb-5 mt-10">
            <h1 className="text-2xl	md:text-4xl	inline-block pb-2.5	border-b border-black">
              Galeria
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="m-4	md:mx-8 ease-in-out duration-300 hover:scale-110">
              <img
                className="w-80 m-auto cursor-pointer"
                onClick={() => handleImageClick("/img/galeria/galeria1.png")}
                src="/img/galeria/galeria1.png"
              />
            </div>
            <div className="m-4	md:mx-8 ease-in-out duration-300 hover:scale-110">
              <img
                className="w-80 m-auto cursor-pointer"
                onClick={() => handleImageClick("/img/galeria/galeria2.png")}
                src="/img/galeria/galeria2.png"
              />
            </div>
            <div className="m-4	md:mx-8 ease-in-out duration-300 hover:scale-110">
              <img
                className="w-80 m-auto cursor-pointer"
                onClick={() => handleImageClick("/img/galeria/galeria3.png")}
                src="/img/galeria/galeria3.png"
              />
            </div>
            <div className="m-4	md:mx-8 ease-in-out duration-300 hover:scale-110">
              <img
                className="w-80 m-auto cursor-pointer"
                onClick={() => handleImageClick("/img/galeria/galeria4.png")}
                src="/img/galeria/galeria4.png"
              />
            </div>
            <div className="m-4	md:mx-8 ease-in-out duration-300 hover:scale-110">
              <img
                className="w-80 m-auto cursor-pointer"
                onClick={() => handleImageClick("/img/galeria/galeria5.png")}
                src="/img/galeria/galeria5.png"
              />
            </div>
            <div className="m-4	md:mx-8 ease-in-out duration-300 hover:scale-110">
              <img
                className="w-80 m-auto cursor-pointer"
                onClick={() => handleImageClick("/img/galeria/galeria6.png")}
                src="/img/galeria/galeria6.png"
              />
            </div>
            <div className="m-4	md:mx-8 ease-in-out duration-300 hover:scale-110">
              <img
                className="w-80 m-auto cursor-pointer"
                onClick={() => handleImageClick("/img/galeria/galeria7.png")}
                src="/img/galeria/galeria7.png"
              />
            </div>
            <div className="m-4	md:mx-8 ease-in-out duration-300 hover:scale-110">
              <img
                className="w-80 m-auto cursor-pointer"
                onClick={() => handleImageClick("/img/galeria/galeria8.png")}
                src="/img/galeria/galeria8.png"
              />
            </div>
            <div className="m-4	md:mx-8 ease-in-out duration-300 hover:scale-110 md:block hidden">
              <img
                className="w-80 m-auto cursor-pointer"
                onClick={() => handleImageClick("/img/galeria/galeria9.png")}
                src="/img/galeria/galeria9.png"
              />
            </div>
          </div>

          {/* Render the full screen image */}
          {selectedImage && (
            <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-75 overflow-hidden">
              <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-lg">
                  <img
                    src={selectedImage}
                    alt={selectedImage}
                    className="w-full object-cover m-auto w-4/6 md:w-fit"
                  />
                  <button
                    className="absolute top-2	right-2 p-2 text-white"
                    onClick={handleCloseClickImage}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-9 h-9"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-10" id="contacto">
          <div className="col-span-3 text-center">
            <h1 className="text-2xl md:text-4xl	inline-block pb-2.5	border-b border-black">
              Contacto
            </h1>
          </div>

          <div className="col-span-3 md:col-span-1 hidden">
            <div className="container my-9 px-6 mx-auto">
              <img className="m-auto" src="/img/contacto/contacto.png" />
            </div>
          </div>

          <div className="col-span-3 md:col-span-3">
            <div className="container my-9 px-6 mx-auto">
              <section className="mb-32 text-center text-gray-800">
                <div className="max-w-[700px] mx-auto px-3 lg:px-6">
                  <form onSubmit={(e) => handleSubmitForm(e)}>
                    <input
                      type="text"
                      className="form-control block
                        form-group mb-14
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border-b border-solid border-gray-300                          
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Nombre"
                      name="name"
                      required
                    />

                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control block
                        form-group mb-14
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border-b border-solid border-gray-300                         
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Correo"
                      required
                    />

                    <input
                      type="text"
                      className="form-control block
                        form-group mb-14
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border-b border-solid border-gray-300
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Asunto"
                      name="Asunto"
                      required
                    />

                    <textarea
                      className="
                        form-group mb-14
                        form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border-b border-solid border-gray-300                          
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                      "
                      id="message"
                      name="message"
                      rows="3"
                      required
                      placeholder="Mensaje"
                    ></textarea>

                    <button
                      type="submit"
                      className="
                        w-full
                        px-6
                        py-2.5
                        bg-[#212236]
                        text-white
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        rounded
                        shadow-md
                        hover:bg-slate-600 hover:shadow-lg
                        focus:bg-slate-600 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-slate-600 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out"
                      disabled={state.submitting}
                    >
                      ENVIAR MENSAJE
                    </button>

                    <input type="hidden" name="_next" value="/gracias"></input>
                    <input type="hidden" name="_captcha" value="false"></input>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
        <div className="text-white bg-[#212236] text-center	py-3">

          <Transition appear show={isOpenModalPrivacidad} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900 text-center"
                          >
                            POLITICAS DE PRIVACIDAD 
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500 pb-2">
                              En este sitio web, recopilamos información personal de nuestros visitantes solo cuando sea necesario para proporcionar los servicios solicitados, como cuando alguien llena el formulario de contacto. La información que podemos recopilar incluye, pero no se limita a, nombres, direcciones de correo electrónico y números de teléfono.
                            </p>
                            <p className="text-sm text-gray-500 pb-2">
                              Utilizamos la información recopilada para proporcionar información actualizada sobre el cantante, como fechas de concierto y lanzamientos de nuevos álbumes, así como para promocionar eventos y ofertas especiales. No compartimos la información personal de nuestros visitantes con terceros, a menos que sea necesario para proporcionar el servicio solicitado o que tengamos su consentimiento.
                            </p>
                            <p className="text-sm text-gray-500 pb-2">
                             Si tiene alguna pregunta sobre nuestras políticas de privacidad, no dude en ponerse en contacto con nosotros a través del correo electrónico contacto@laporteoficial.com
                            </p>
                            <p className="text-sm text-gray-500 pb-2">
                              Aceptando nuestras políticas de privacidad al utilizar este sitio web, usted está de acuerdo con los términos y condiciones establecidos en esta política. Nos reservamos el derecho de modificar esta política en cualquier momento, por lo que le recomendamos revisarla periódicamente.
                            </p>
                          </div>

                          <div className="mt-4 text-center">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={closeModal}
                            >
                              Entendido, Gracias!
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
            </Dialog>
          </Transition>

          <Transition appear show={isOpenModalCookies} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModalDos}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900 text-center"
                          >
                            POLITICAS DE COOKIES
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500 pb-2">
                            Nuestra página web utiliza cookies para mejorar la experiencia del usuario y para ofrecer servicios personalizados. En esta sección, te explicamos qué son las cookies, cómo las utilizamos y cómo puedes controlar su uso.
                            </p>
                            <p className="text-sm text-gray-500 pb-2">
                            ¿Qué son las cookies?
                            <br/>
                            Las cookies son pequeños archivos de texto que se descargan en tu ordenador o dispositivo móvil cuando visitas un sitio web. Las cookies se utilizan para recordar tus preferencias de navegación, para personalizar la publicidad y para recopilar información sobre tus hábitos de navegación.
                            </p>
                            <p className="text-sm text-gray-500 pb-2">
                            ¿Cómo utilizamos las cookies?
                            <br/>
                            Utilizamos cookies para:
                            <br/> 
                            -Mejorar la experiencia del usuario en nuestro sitio web.
                              
                            -Analizar el tráfico del sitio web y la navegación de los usuarios.
                              
                            -Personalizar la publicidad en función de tus intereses.
                              
                            -Proporcionar servicios personalizados a los usuarios.
                              
                            -Facilitar el acceso a ciertas áreas del sitio web.
                            </p>
                            <p className="text-sm text-gray-500 pb-2">
                              ¿Qué tipos de cookies utilizamos?
                              <br/> 
                              Utilizamos cookies de sesión y cookies persistentes, cookies de terceros y cookies de seguimiento. Las cookies de sesión se eliminan cuando cierras el navegador, mientras que las cookies persistentes permanecen en tu ordenador o dispositivo móvil durante un período de tiempo determinado. Las cookies de terceros son aquellas que se descargan desde un servidor diferente al sitio web que estás visitando. Las cookies de seguimiento se utilizan para analizar el comportamiento de los usuarios en nuestro sitio web.
                            </p>

                            <p className="text-sm text-gray-500 pb-2">
                            
                            ¿Cómo puedes controlar el uso de las cookies?
                            <br/>
                            Puedes controlar el uso de las cookies a través de la configuración de tu navegador. Si no deseas que se descarguen cookies en tu ordenador o dispositivo móvil, puedes desactivarlas a través de la configuración del navegador. Sin embargo, debes tener en cuenta que desactivar las cookies puede afectar a la funcionalidad del sitio web.
                            </p>
                            <p className="text-sm text-gray-500 pb-2">
                            ¿Compartimos los datos recopilados a través de las cookies?
                            <br/>
                            No compartimos los datos recopilados a través de las cookies con terceros. Utilizamos los datos recopilados únicamente para mejorar la experiencia del usuario en nuestro sitio web.
                            </p>
                            <p className="text-sm text-gray-500 pb-2">
                            ¿Necesitas más información?
                            <br/>
                            Si necesitas más información sobre cómo utilizamos las cookies, no dudes en ponerte en contacto con nosotros a través de la sección de contacto de nuestro sitio web.
                            </p>
                          </div>

                          <div className="mt-4 text-center">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={closeModalDos}
                            >
                              Entendido, Gracias!
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
            </Dialog>
          </Transition>

          <h3 className='text-sm'>
              <a className="cursor-pointer md:mr-5 hover:underline md:inline block md:p-0 py-3" onClick={() => setIsOpenModalPrivacidad(true)}>POLITICAS DE PRIVACIDAD</a>
              <a className="cursor-pointer hover:underline md:ml-5 md:inline block md:p-0 py-3" onClick={() => setIsOpenModalCookies(true)}>POLITICAS DE COOKIES</a>
          </h3>

          <div className="md:grid md:grid-cols-3 gap-4">

              <div className='hidden md:block'>
                <img className='m-auto w-6/12	' src="/img/footer/logo_miguel_bg.png" ></img>
              </div>

              <div className='flex items-center justify-center gap-4 md:gap-7 px-4 py-2'>

                <a className='p-1 rounded bg-[#81b71a] hover:bg-[#91cf1d]' href='https://open.spotify.com/artist/2BP0jSttglAB5Nr7zL9CUY' target="_blank">
                    <span className='block'>                    
                        <svg className='fill-white w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"/></svg>                    
                    </span>
                </a>

                <a className='p-1 rounded bg-[#3b5998] hover:bg-[#4674d5]' href='https://www.facebook.com/MiguelLaporteOficial' target="_blank">
                    <span className='block'>
                        <svg className='fill-white w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>
                    </span>
                </a>

                <a className=' rounded bg-[#fe455d] ' href='https://music.apple.com/pe/artist/miguel-laporte/1054030663' target="_blank">                  
                  <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8 fill-[#d36eea] rounded bg-[#212236]' viewBox="0 0 602 602"><g transform="translate(0 -450.362)"><linearGradient id="a" gradientUnits="userSpaceOnUse" x1="342.206" y1="289.775" x2="342.79" y2="880.123" gradientTransform="matrix(1 0 0 -1 -41.5 1338.724)"><stop offset="0" stopColor="#bb5bfd"/><stop offset="1" stopColor="#eb82d6"/></linearGradient><path fill="url(#a)" d="M138.684 451.362h324.631c76.277 0 137.685 61.407 137.685 137.684v324.631c0 76.277-61.407 137.685-137.685 137.685H138.684C62.407 1051.362 1 989.955 1 913.678V589.046c0-76.277 61.407-137.684 137.684-137.684z"/><path fill="#FFF" d="M300.462 487.623c-142.359 0-257.758 115.399-257.758 257.758 0 142.36 115.399 257.759 257.758 257.759 142.36 0 257.759-115.398 257.759-257.759 0-142.359-115.399-257.758-257.759-257.758zm0 28.449c126.63 0 229.311 102.681 229.311 229.31 0 126.63-102.681 229.311-229.311 229.311-126.629 0-229.095-102.681-229.095-229.311 0-126.629 102.466-229.31 229.095-229.31z"/><path fill="#FFF" d="M407.873 573.447l-178.746 48.334h-.207v72.706h.207v130c-7.82-4.706-17.407-7.5-27.707-7.5-26.533 0-47.913 18.427-47.913 41.04 0 22.62 21.386 40.834 47.913 40.834s49.073-18.233 48.127-40.833l-.487-11.6-1.18-157.154 141.247-38.127v143.54c-8.247-5.686-18.774-9.166-30.207-9.166-26.533 0-47.92 18.427-47.92 41.04 0 22.62 21.387 40.833 47.92 40.833s48.833-18.213 48.833-40.833c0-.213.007-.413 0-.627l.127-179.793V573.447h-.007z"/></g></svg>
                </a>

                <a className=' rounded ' href='https://music.amazon.com/artists/B017CK1FJA/miguel-laporte' target="_blank">                  
                  <svg fill="#e3f8fb" className='w-8 h-8 fill-[#e3f8fb] bg-[#e3f8fb] rounded' viewBox="0 0 32.00 32.00" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(4,4), scale(0.75)"><rect x="0" y="0" width="32.00" height="32.00" rx="4.16" fill="#7ed0ec" strokeWidth="0"></rect></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.064"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Amazon"> <path d="M26.49,30H5.5A3.35,3.35,0,0,1,3,29a3.35,3.35,0,0,1-1-2.48V5.5A3.35,3.35,0,0,1,3,3,3.35,3.35,0,0,1,5.5,2h21A3.35,3.35,0,0,1,29,3,3.35,3.35,0,0,1,30,5.5v21A3.52,3.52,0,0,1,26.49,30Zm-11-5.79a11.06,11.06,0,0,0,6.74-2.28.51.51,0,0,0,.23-.4.46.46,0,0,0-.51-.49l-.42.12a13.72,13.72,0,0,1-6,1.35,14.45,14.45,0,0,1-7.1-2.44l-.37-.14c-.26,0-.39.13-.4.4a.47.47,0,0,0,.17.34A11.5,11.5,0,0,0,15.47,24.21Zm-1.71-4.58a4.61,4.61,0,0,0,3.55-1.56,3.18,3.18,0,0,0,.58.83c.42.43.71.64.9.64a.73.73,0,0,0,.37-.16,8.39,8.39,0,0,0,.7-.6l.7-.62a.47.47,0,0,0,.23-.33.39.39,0,0,0-.1-.27.26.26,0,0,1-.09-.17,7.25,7.25,0,0,1-.47-.75,23.73,23.73,0,0,1-.22-4.75c0-2.92-1.45-4.38-4.37-4.38C13,7.65,11.5,8.74,11,10.8c0,.29.12.43.34.43l2,.27a1,1,0,0,0,.42-.43A1.67,1.67,0,0,1,15.4,9.76,1.28,1.28,0,0,1,16.84,11l0,1.2q-6.23,0-6.23,4.15a3.16,3.16,0,0,0,.92,2.47A3.21,3.21,0,0,0,13.76,19.63ZM15,17.54A1.35,1.35,0,0,1,13.73,16c0-1.42,1-2.13,3.16-2.13v.62a7.43,7.43,0,0,1,0,1.07,3.1,3.1,0,0,1-.42,1.13,1.64,1.64,0,0,1-1.12.82Zm7.92,5.26c.46,0,.84-.48,1.16-1.41a4.06,4.06,0,0,0,.25-1.32c0-.5-.44-.76-1.31-.76-1.43.11-2.17.42-2.23,1,0,.23.12.34.37.34l1.42-.16c.33,0,.5.08.5.16a2.64,2.64,0,0,1-.18.84c-.11.33-.2.57-.25.71a.94.94,0,0,0-.09.29A.32.32,0,0,0,22.93,22.8Z"></path> </g> </g></svg>
                </a>                

                <a className='p-1 rounded bg-[#e4405f] hover:bg-[#f95574]'  href='https://www.instagram.com/soylaporteoficial/' target="_blank">
                    <span className='block'>
                        <svg className='fill-white w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                    </span>
                </a>

                <a className='p-1 rounded bg-[#e52d27] hover:bg-[#ff4c46]'  href='https://www.youtube.com/channel/UCXp12NoA8KxXs4yyroY9N3Q' target="_blank">
                    <span className='block'>
                        <svg className='fill-white w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg>
                    </span>
                </a>

                <a className='p-1 rounded bg-[#55acee] hover:bg-[#76bff7]'  href='https://twitter.com/MiguelLaporte' target="_blank">
                    <span className='block'>
                        <svg className='fill-white w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>
                    </span>
                </a>

              </div>

              <div className='hidden md:flex '>               
                <img className='m-auto w-5/12	' src="/img/footer/kiva_logo_fondo.png" ></img>                
                <img className='m-auto w-5/12	' src="/img/footer/warner_logo_fondo.png" ></img>
              </div>

          </div>   
            
          <div className="grid grid-cols-3 gap-4 block md:hidden">  
            <img className='m-auto' src="/img/footer/kiva_logo_fondo.png" ></img>
            <img className='m-auto' src="/img/footer/logo_miguel_bg.png" ></img>
            <img className='m-auto' src="/img/footer/warner_logo_fondo.png" ></img>
          </div> 
            

        </div>

        {coookieAceptada == false &&        
          <div className="fixed bottom-0 left-0 px-4 lg:px-10 pb-4 z-10 w-full">
            <div className="relative p-14 bg-[#000] rounded-xl px-2.5	py-6 relative">                
              <div className="flex flex-wrap items-center -mx-4">
                <div className="w-full md:w-auto px-4 mb-4 lg:mb-0">                 
                  <p className="text-gray-200 leading-loose text-xs">Al usar este sitio web, usted acepta nuestro <a className='underline cursor-pointer' onClick={() => setIsOpenModalCookies(true)}>uso de cookies</a>. Usamos cookies para brindarle una excelente experiencia y ayudar a que nuestro sitio web funcione de manera efectiva.</p>
                </div>                            
                <a onClick={()=>{handleCookie()}} className="bg-transparent text-white font-bold cursor-pointer" >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 absolute top-1 right-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </a>                
              </div>
            </div>
          </div>
        }
      </main>
    </>
  );
}

export default App;
